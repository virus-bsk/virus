// Quick verification harness for the weekly plan (run: node scripts/test-weekly-plan.mjs)
// Simulates: Week 1 (no previous week), Week 2 (mix of prev + this), the Week-1
// boundary the swipe carousel clamps at, and the swipe-release decision itself.
const {
  buildWeeklyPlan,
  courseWeekCount,
  offsetForWeekNo,
  resolveSwipeTarget,
  seededPick,
  weekNoForOffset,
  weekPickerOptions,
  WEEK_SLOTS,
} = await import("../src/maang/basic-dsa/weeklyPlan.js");

// Fake bank of 40 problems: Basic(0-9) Advanced(10-19) DP(20-29) Graphs(30-39)
const bank = Array.from({ length: 40 }, (_, i) => ({
  uid: `p${i}`,
  title: `Problem ${i}`,
  topic: i < 10 ? "Basic" : i < 20 ? "Advanced" : i < 30 ? "DP" : "Graphs",
}));

function weekWithStartOffset(weeksAgo, offset) {
  return buildWeeklyPlan(bank, weeksAgo + offset);
}

let failures = 0;
function check(name, cond, detail = "") {
  if (cond) {
    console.log(`  ✅ ${name}`);
  } else {
    failures++;
    console.error(`  ❌ ${name} ${detail}`);
  }
}

// ---------- Week 1 (course started this week) ----------
console.log("\n=== WEEK 1 (no previous week) ===");
const w1 = weekWithStartOffset(0, 0);
check("weekNo is 1", w1.weekNo === 1);
check("cannot go to prev week", w1.canGoPrev === false);

const sun1 = w1.days.find((d) => d.key === "sun");
const thisWeeks10 = w1.days
  .filter((d) => d.type === "practice")
  .flatMap((d) => d.problems);
const sun1Titles = sun1.problems.map((p) => p.title);
const sun1Topics = sun1.problems.map((p) => p.topic);
console.log(
  `  Sunday problems: ${sun1Titles.join(", ")} [${sun1Topics.join(", ")}]`,
);
check(
  "both Sunday problems come from THIS week's 10",
  sun1.problems.every((p) => thisWeeks10.includes(p)),
  JSON.stringify(sun1Titles),
);
check(
  "NO Graph/unreached-topic question on Week 1 Sunday",
  sun1.problems.every((p) => p.topic === "Basic"),
  JSON.stringify(sun1Topics),
);
check(
  "the two Sunday problems are different",
  sun1.problems[0].uid !== sun1.problems[1].uid,
);
check("Sunday flagged as no-prev-week", sun1.hasPrevWeek === false);

// Determinism: same week ⇒ same plan
const w1again = weekWithStartOffset(0, 0);
check(
  "deterministic across re-builds",
  JSON.stringify(w1again.days.map((d) => d.problems.map((p) => p.uid))) ===
    JSON.stringify(w1.days.map((d) => d.problems.map((p) => p.uid))),
);

// ---------- Week 2 (has a previous week) ----------
console.log("\n=== WEEK 2 (has previous week) ===");
const w2 = weekWithStartOffset(1, 0);
check("weekNo is 2", w2.weekNo === 2);
check("can go to prev week", w2.canGoPrev === true);
const sun2 = w2.days.find((d) => d.key === "sun");
const w2prev10 = weekWithStartOffset(1, -1)
  .days.filter((d) => d.type === "practice")
  .flatMap((d) => d.problems);
const w2cur10 = w2.days
  .filter((d) => d.type === "practice")
  .flatMap((d) => d.problems);
console.log(
  `  Sunday problems: ${sun2.problems.map((p) => p.title).join(", ")}`,
);
check(
  "1 Sunday problem from LAST week",
  w2prev10.some((p) => p.uid === sun2.problems[0].uid),
);
check(
  "1 Sunday problem from THIS week",
  w2cur10.some((p) => p.uid === sun2.problems[1].uid),
);
check("Sunday flagged as having prev week", sun2.hasPrevWeek === true);

// ---------- Wrap-around: final week's Sunday still mixes correctly ----------
console.log("\n=== WRAP-AROUND (near end of bank) ===");
const w4 = weekWithStartOffset(1, 2); // course week 3
const sun4 = w4.days.find((d) => d.key === "sun");
console.log(
  `  Week 3 Sunday problems: ${sun4.problems.map((p) => p.title).join(", ")}`,
);
check(
  "two distinct problems on later weeks",
  sun4.problems[0].uid !== sun4.problems[1].uid,
);

// ---------- Swipe boundary (the carousel clamps instead of a dead `disabled`) ----------
console.log("\n=== SWIPE BOUNDARY (clamp at Week 1, never inert) ===");
// Fresh learner (course started this week): dragging back must have a real,
// reachable destination, i.e. it clamps to Week 1 instead of being disabled.
const freshW1 = weekWithStartOffset(0, 0);
check("fresh learner: minOffset is 0 (Week 1 floor)", freshW1.minOffset === 0);
check(
  "fresh learner: canGoPrev is false at the floor",
  freshW1.canGoPrev === false,
);
const freshClamped = weekWithStartOffset(
  0,
  Math.max(freshW1.minOffset, -1), // component clamp: max(w - 1, minOffset)
);
check(
  "fresh learner: clicking back stays on Week 1",
  freshClamped.weekNo === 1,
);
check(
  "fresh learner: back never shows unreached topics",
  freshClamped.days
    .filter((d) => d.type === "practice")
    .flatMap((d) => d.problems)
    .every((p) => p.topic === "Basic"),
);

// Learner 4 weeks in: back must work and still stop at Week 1.
const week4 = weekWithStartOffset(3, 0);
check("Week 4: canGoPrev is true", week4.canGoPrev === true);
check("Week 4: minOffset is 0 (Week 1 floor)", week4.minOffset === 0);
const week4Back = buildWeeklyPlan(bank, 0);
check("Week 4: clamped back reaches Week 1", week4Back.weekNo === 1);
check(
  "Week 4: Week 1 floor reports canGoPrev false",
  week4Back.canGoPrev === false,
);
const week4Mid = weekWithStartOffset(3, -1);
check("Week 4: one step back is Week 3", week4Mid.weekNo === 3);
check(
  "Week 4: one step back still allows going back",
  week4Mid.canGoPrev === true,
);

// Offsets below the floor must be prevented by minOffset (they would wrap to
// the far end of the bank and show topics the learner has never reached).
check(
  "offsets below Week 1 clamp to Week 1",
  buildWeeklyPlan(bank, -1).weekNo === 1,
);

// ---------- Swipe release → which week the carousel lands on ----------
// Mirrors the drag in MaangDSABasic.jsx: the plan follows the pointer and the
// rail snaps to the nearest week when it is released.
console.log("\n=== SWIPE RELEASE → WEEK ===");
const W = 900; // carousel width in px (desktop, 3 panes: prev · current · next)
const MID = 1; // index of the week on screen inside that window
const THREE = 3;

// A tap (or a vertical scroll) must never change the week.
check(
  "tap (3px) stays on the same week",
  resolveSwipeTarget(MID, 3, 0.05, W, THREE) === MID,
);
check(
  "small nudge (30px) stays on the same week",
  resolveSwipeTarget(MID, -30, 0.2, W, THREE) === MID,
);

// A real drag moves exactly one week, in the direction the content moved.
check(
  "drag left → next week",
  resolveSwipeTarget(MID, -W * 0.3, -0.4, W, THREE) === MID + 1,
);
check(
  "drag right → previous week",
  resolveSwipeTarget(MID, W * 0.3, 0.4, W, THREE) === MID - 1,
);

// A quick flick counts even with little travel (a thumb swipe is short).
check(
  "quick flick left → next week",
  resolveSwipeTarget(MID, -12, -0.9, W, THREE) === MID + 1,
);
check(
  "quick flick right → previous week",
  resolveSwipeTarget(MID, 12, 0.9, W, THREE) === MID - 1,
);
check(
  "a last-moment flick decides the direction",
  resolveSwipeTarget(MID, 200, -0.9, W, THREE) === MID + 1,
);

// Narrow screens: the threshold scales with the viewport but never below 48px.
check(
  "phone width: 20% drag moves a week",
  resolveSwipeTarget(MID, -80, 0.1, 400, THREE) === MID + 1,
);
check(
  "phone width: 40px nudge does not",
  resolveSwipeTarget(MID, -40, 0.1, 400, THREE) === MID,
);

// Boundaries: the answer is always a pane that is actually rendered.
check(
  "dragging past the last pane clamps",
  resolveSwipeTarget(2, -600, -1, W, THREE) === 2,
);
check(
  "dragging past the first pane clamps",
  resolveSwipeTarget(0, 600, 1, W, THREE) === 0,
);
check(
  "Week 1 floor (2 panes) cannot go before the start",
  resolveSwipeTarget(0, 600, 1, W, 2) === 0,
);
check(
  "single pane → nothing to change",
  resolveSwipeTarget(0, -600, -1, W, 1) === 0,
);
check(
  "swiping forward at Week 1 still works",
  resolveSwipeTarget(0, -600, -1, W, 2) === 1,
);

// ---------- Week picker (the dropdown in the weekly header) ----------
// The picker lists only weeks already solved and the next active week.
console.log("\n=== WEEK PICKER (dropdown) ===");
check("WEEK_SLOTS is 10 (5 learn days × 2 problems)", WEEK_SLOTS === 10);
check("40-problem bank → 4 course weeks", courseWeekCount(bank) === 4);
check(
  "exactly 10 problems → 1 full week",
  courseWeekCount(bank.slice(0, 10)) === 1,
);
check(
  "11 problems → 2 weeks (last one partial)",
  courseWeekCount(bank.slice(0, 11)) === 2,
);
check("empty bank still offers Week 1", courseWeekCount([]) === 1);
check("missing bank does not throw", courseWeekCount(undefined) === 1);

// Week number ⇄ absolute, zero-based course index.
check("fresh learner: Week 1 is offset 0", weekNoForOffset(0, 0) === 1);
check("Week 5: index 4 is Week 5", weekNoForOffset(4, 0) === 5);
check("Week 1 has index 0", offsetForWeekNo(1, 0) === 0);
check(
  "weekNo ⇄ index round-trips",
  Array.from({ length: 12 }, (_, i) =>
    offsetForWeekNo(weekNoForOffset(i, 0), 0),
  ).every((o, i) => o === i),
);

// A new learner sees Week 1 only; the active week caps the picker.
const freshPick = weekPickerOptions(bank, 0, 0);
check(
  "new learner is offered Week 1 only",
  freshPick.map((o) => o.weekNo).join(",") === "1",
  JSON.stringify(freshPick),
);
check("fresh learner list starts at the floor", freshPick[0].offset === 0);
check(
  "unlocked options are unique and ascending",
  freshPick.every((o, i) => o.weekNo === i + 1 && o.offset === i),
);
const unlockedThree = weekPickerOptions(bank, 0, 2);
check(
  "three unlocked course weeks expose only Weeks 1–3",
  unlockedThree.length === 3,
);

// The real weekly page bank (all four sheets merged) — 185 problems.
const realBank = Array.from({ length: 185 }, (_, i) => ({
  uid: `r${i}`,
  title: `R${i}`,
  topic: ["Basic", "Advanced", "DP", "Graphs"][Math.floor(i / 45)] || "Graphs",
}));
check(
  "185-problem bank includes 3 revision weeks",
  courseWeekCount(realBank) === 22,
);
check(
  "new learner is offered Week 1 only",
  weekPickerOptions(realBank, 0, 0).length === 1,
);

// After the first five weeks are solved, Week 5 is the latest accessible week.
const week5Pick = weekPickerOptions(realBank, 0, 4);
const week5Plan = buildWeeklyPlan(realBank, 4);
check(
  "Week 5 is the last unlocked picker option",
  week5Pick.at(-1).offset === week5Plan.weekIdx,
);
check("Week 5 learner sees only Weeks 1–5", week5Pick.length === 5);
check(
  "every listed week opens exactly that week",
  week5Pick.every(
    (o) => buildWeeklyPlan(realBank, o.offset).weekNo === o.weekNo,
  ),
);
check(
  "jumping back to Week 1 lands on Week 1",
  buildWeeklyPlan(realBank, week5Pick[0].offset).weekNo === 1,
);
check(
  "Week 1 has no earlier week",
  buildWeeklyPlan(realBank, week5Pick[0].offset).canGoPrev === false,
);

// Week 6 is a stable unique revision set from the previous five study weeks.
const reviewBank = Array.from({ length: 60 }, (_, i) => ({
  uid: `review-${i}`,
  title: `Review ${i}`,
}));
const reviewPlan = buildWeeklyPlan(reviewBank, 5);
const reviewQuestions = reviewPlan.days
  .filter((day) => day.type === "practice")
  .flatMap((day) => day.problems);
check(
  "six study weeks add a Week 6 revision week",
  courseWeekCount(reviewBank) === 7,
);
check("Week 6 is marked as a revision week", reviewPlan.isRevision === true);
check("revision questions are unique", new Set(reviewQuestions).size === 10);
check(
  "revision draws from the previous five study weeks",
  reviewQuestions.every((problem) => Number(problem.uid.split("-")[1]) < 50),
);
check(
  "revision questions are stable across rebuilds",
  JSON.stringify(reviewQuestions.map((problem) => problem.uid)) ===
    JSON.stringify(
      buildWeeklyPlan(reviewBank, 5)
        .days.filter((day) => day.type === "practice")
        .flatMap((day) => day.problems)
        .map((problem) => problem.uid),
    ),
);
check(
  "Week 7 resumes with new material",
  buildWeeklyPlan(reviewBank, 6).days[0].problems[0].uid === "review-50",
);

console.log(
  failures === 0
    ? "\n🎉 ALL CHECKS PASSED"
    : `\n💥 ${failures} CHECK(S) FAILED`,
);
process.exit(failures === 0 ? 0 : 1);
