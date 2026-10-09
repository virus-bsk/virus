// ===== Weekly DSA Preparation Planner (shared) ==========================
// Builds a deterministic 7-day study plan from any problem bank:
//   • Mon–Fri ..... learn 2 new problems per day, IN TRACK ORDER
//                   (no shuffling — Basic → Advanced → DP → Graphs,
//                    each sheet in its own numbering)
//   • Saturday .... assessment: 2 problems taken from THIS week's 10
//   • Sunday ...... assessment: 1 random from LAST week
//                             + 1 random from THIS week (never anywhere else)
//                   (on Week 1 there is no last week — Sunday then tests
//                    2 problems from THIS week instead of wrapping to the
//                    end of the bank, which would show unreached topics)
//   • Every 5 study weeks, one revision week randomly revisits those 5 weeks
// Same course week number ⇒ exact same schedule (stable, no flicker on
// re-render, safe across builds/servers).

/** FNV-1a string hash → unsigned 32-bit integer. */
function fnv1a(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

/** mulberry32 PRNG — tiny, fast and fully deterministic for a given seed. */
function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Shallow-copy `items`, deterministically shuffle them (Fisher–Yates driven
 * by the hashed seed) and return the first `count` entries.
 */
export function seededPick(items, count, seedStr) {
  const rand = mulberry32(fnv1a(String(seedStr)));
  const arr = items.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.max(0, count));
}

// ---------------------------------------------------------------------------
// Course-style week numbering ("Week 1", "Week 2", …)
//
// These are self-paced course weeks, so completion status controls which
// indexes are unlocked rather than calendar dates.
// ---------------------------------------------------------------------------

/** Problems handed out per course week (5 learn days × 2 problems). */
export const WEEK_SLOTS = 10;
export const REVIEW_INTERVAL_WEEKS = 5;
const TIMELINE_CYCLE_WEEKS = REVIEW_INTERVAL_WEEKS + 1;

/**
 * The 10 problem slots assigned to the given course week index. Slots are
 * carved straight out of `order` (the track's natural sequence), so practice
 * advances sequentially through the course and wraps around at the end.
 */
function slotsForWeek(order, weekIdx) {
  const out = [];
  const len = order.length;
  for (let i = 0; i < WEEK_SLOTS; i++) {
    const idx = (((weekIdx * WEEK_SLOTS + i) % len) + len) % len;
    out.push(order[idx]);
  }
  return out;
}

function isRevisionWeek(weekIdx) {
  return weekIdx > 0 && (weekIdx + 1) % TIMELINE_CYCLE_WEEKS === 0;
}

function studyWeekIndex(weekIdx) {
  return weekIdx - Math.floor(weekIdx / TIMELINE_CYCLE_WEEKS);
}

function revisionProblems(order, weekIdx) {
  const revisionCycle = Math.floor(weekIdx / TIMELINE_CYCLE_WEEKS);
  const firstStudyWeek = (revisionCycle + 1) * REVIEW_INTERVAL_WEEKS;
  const pool = [];
  for (
    let studyIdx = firstStudyWeek - REVIEW_INTERVAL_WEEKS;
    studyIdx < firstStudyWeek;
    studyIdx += 1
  ) {
    pool.push(...slotsForWeek(order, studyIdx));
  }

  const unique = [
    ...new Map(
      pool.map((problem, index) => [
        problem.uid ?? problem.id ?? `${problem.title}-${index}`,
        problem,
      ]),
    ).values(),
  ];
  return seededPick(unique, WEEK_SLOTS, `revision-${weekIdx}-${order.length}`);
}

// ---------------------------------------------------------------------------
// Randomized assessment builders (Sat / Sun)
//
// These keep the exact same RULES as before, but let the caller pass a `nonce`
// so the actual questions can change every time the learner taps reveal /
// "get new questions" on the Weekly Preparation page. nonce = 0 reproduces the
// original deterministic plan (used by buildWeeklyPlan's default and tests).
// ---------------------------------------------------------------------------

/**
 * Saturday assessment — 2 problems drawn from THIS week's 10 practice slots.
 * Rules: both problems belong to the current week, and they are distinct.
 */
export function saturdayAssessment(bank, weekIdx, nonce = 0) {
  const current = slotsForWeek(bank, weekIdx);
  const seedTail = nonce ? `-${nonce}` : "";
  return seededPick(current, 2, `sat-${weekIdx}-${bank.length}${seedTail}`);
}

/**
 * Sunday assessment — 1 problem from LAST week + 1 from THIS week.
 * On Week 1 (no previous week) both come from THIS week instead of wrapping to
 * the far end of the bank. Rule: the two problems are always different.
 */
export function sundayAssessment(bank, weekIdx, nonce = 0) {
  const current = slotsForWeek(bank, weekIdx);
  const previous = slotsForWeek(bank, weekIdx - 1);
  const hasPrevWeek = weekIdx > 0;
  const prevPool = hasPrevWeek ? previous : current;
  const seedTail = nonce ? `-${nonce}` : "";
  const prevPick = seededPick(
    prevPool,
    1,
    `sun-prev-${weekIdx}-${bank.length}${seedTail}`,
  )[0];
  const curPool = current.filter((p) => p !== prevPick);
  const curPick = seededPick(
    curPool.length ? curPool : current,
    1,
    `sun-cur-${weekIdx}-${bank.length}${seedTail}`,
  )[0];
  return { hasPrevWeek, problems: [prevPick, curPick] };
}

// ---------------------------------------------------------------------------
// Swipe / drag carousel — deciding which week to land on
//   paneCount . panes currently rendered (2 at Week 1, otherwise 3)
//
// Returns the pane index to snap to — always inside the rendered panes, so a
// swipe can never leave the weeks that exist (Week 1 stays the floor).
// ---------------------------------------------------------------------------
export const SWIPE_FLICK_VELOCITY = 0.45; // px/ms — a quick flick counts as intent
export const SWIPE_MIN_TRAVEL_PX = 48; // never change week on a tiny nudge
export const SWIPE_TRAVEL_RATIO = 0.18; // …unless this share of the width moved

export function resolveSwipeTarget(index, dx, velocity, width, paneCount) {
  if (!(paneCount > 1)) return 0;
  const flicked = Math.abs(velocity) > SWIPE_FLICK_VELOCITY;
  const dragged =
    Math.abs(dx) > Math.max(SWIPE_MIN_TRAVEL_PX, width * SWIPE_TRAVEL_RATIO);
  let step = 0;
  if (flicked) {
    // A flick wins outright: its direction is the intent even if the pointer
    // only travelled a few pixels.
    step = velocity < 0 ? 1 : -1;
  } else if (dragged) {
    step = dx < 0 ? 1 : -1;
  }
  return Math.min(Math.max(index + step, 0), paneCount - 1);
}

// ---------------------------------------------------------------------------
// Week picker (the dropdown) — choosing a week directly
//
// Swiping walks one week at a time and ←/→ do the same, which is slow when the
// learner wants to go back to Week 1 from Week 5. The dropdown lists every week
// and jumps straight to it.
//
// All the arithmetic lives here (and is unit-tested) so the component only has
// to render the list:
//
//   minOffset . offset of Week 1 (the floor, negative once weeks have passed)
//   offset .... 0 = the course week the learner is on, -1 = last week, +1 = next
//   weekNo .... the number shown in the UI ("Week 1", "Week 2", …)
// ---------------------------------------------------------------------------

/** Course week number ("Week N") for a plan offset. */
export function weekNoForOffset(offset, minOffset) {
  return offset - minOffset + 1;
}

/** The plan offset that shows course week number `weekNo`. */
export function offsetForWeekNo(weekNo, minOffset) {
  return minOffset + weekNo - 1;
}

/** Number of course weeks including revision weeks. */
export function courseWeekCount(bank) {
  if (!bank || bank.length === 0) return 1;
  const studyWeeks = Math.max(1, Math.ceil(bank.length / WEEK_SLOTS));
  return studyWeeks + Math.floor((studyWeeks - 1) / REVIEW_INTERVAL_WEEKS);
}

/** Return the course weeks allowed by the learner's progress. */
export function weekPickerOptions(bank, minOffset = 0, maxOffset = 0) {
  const lastOffset = Math.min(
    courseWeekCount(bank) - 1,
    Math.max(minOffset, maxOffset),
  );
  const options = [];
  for (let offset = minOffset; offset <= lastOffset; offset += 1) {
    const weekNo = weekNoForOffset(offset, minOffset);
    options.push({ weekNo, offset: offsetForWeekNo(weekNo, minOffset) });
  }
  return options;
}

/**
 * Build the plan for a zero-based course-week index. Firestore progress
 * determines which week indexes the page allows the learner to open.
 *
 * Returns { weekNo, weekIdx, minOffset, canGoPrev, days[] } where each day is
 * { key, name, jsDay, type, problems[2] } and type is one of:
 * "practice" | "test-week" (Sat) | "test-mixed" (Sun).
 */
export function buildWeeklyPlan(bank, offset = 0, nonce = 0) {
  if (!bank || bank.length === 0) return null;

  // Natural track order — NO shuffling. The bank is already assembled as
  // Basic → Advanced → DP → Graphs (each sheet in its own sequence), so
  // practice moves through the course week by week in a sensible order.
  const order = bank;
  const minOffset = 0;
  const maxIdx = courseWeekCount(order) - 1;
  const targetIdx = Math.min(Math.max(Math.floor(offset), minOffset), maxIdx);
  const revision = isRevisionWeek(targetIdx);
  const studyIdx = revision ? null : studyWeekIndex(targetIdx);
  const current = revision
    ? revisionProblems(order, targetIdx)
    : slotsForWeek(order, studyIdx);

  const PRACTICE_DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  const days = PRACTICE_DAYS.map((name, i) => ({
    key: `p-${i}`,
    name,
    jsDay: i + 1, // Mon=1 … Fri=5
    type: "practice",
    problems: [current[i * 2], current[i * 2 + 1]],
  }));

  const assessmentBank = revision ? current : order;
  const assessmentWeekIdx = revision ? 0 : studyIdx;

  // Saturday — assessment on THIS week's practice material.
  days.push({
    key: "sat",
    name: "Saturday",
    jsDay: 6,
    type: "test-week",
    problems: saturdayAssessment(assessmentBank, assessmentWeekIdx, nonce),
  });

  // Sunday — retention test mixing LAST week + THIS week (randomized per
  // nonce; rules unchanged). Week 1 has no previous week so it falls back to
  // two problems from THIS week — no wrap-around to unreached topics.
  const { hasPrevWeek, problems: sunProblems } = sundayAssessment(
    assessmentBank,
    assessmentWeekIdx,
    nonce,
  );
  days.push({
    key: "sun",
    name: "Sunday",
    jsDay: 0,
    type: "test-mixed",
    hasPrevWeek: revision || hasPrevWeek,
    problems: sunProblems,
  });

  return {
    weekNo: targetIdx + 1,
    weekIdx: targetIdx,
    isRevision: revision,
    studyWeekIdx: studyIdx,
    minOffset,
    maxOffset: maxIdx,
    canGoPrev: targetIdx > minOffset,
    days,
  };
}
