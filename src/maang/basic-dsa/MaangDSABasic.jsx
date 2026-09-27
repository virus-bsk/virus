import {
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import VideoPlayerModal from "../../components/VideoPlayerModal";
import {
  dsaBasicProblems as BASIC_PROBLEMS,
  googleSeriesIntro,
} from "./dsaBasicProblems";
import {
  buildWeeklyPlan,
  resolveSwipeTarget,
  saturdayAssessment,
  sundayAssessment,
  weekPickerOptions,
} from "./weeklyPlan";
import leetcodeLogo from "../../assets/leetcode-logo.png";
import gfgLogo from "../../assets/gfg-logo.png";
import youtubeLogo from "../../assets/youtube-logo.svg";
import "./MaangDSABasic.css";
const difficulties = ["All", "Easy", "Medium", "Hard"];

// Default hidden state for each assessment day (Sat / Sun) in a week's plan.
// Kept at module scope so it stays a stable reference for the reveal logic.
const HIDDEN_DAY = { shown: false, nonce: 0 };

// Reveal state for a week nobody has revealed yet. Stable reference so the
// memoised week panes below don't re-render on every parent render.
const HIDDEN_WEEK = { sat: HIDDEN_DAY, sun: HIDDEN_DAY };

// Swipe/drag tuning for the weekly-plan carousel.
const DRAG_START_PX = 8; // horizontal travel before a press becomes a drag
const OVERDRAG_DAMPING = 0.32; // rubber-band factor past the first/last week
const SNAP_MS = 280; // snap animation duration

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Shared problem card — used by the Problem Library grid.
 *
 * Props:
 *   problem : the DSA problem object
 *   onOpen  : opens the video modal for this problem
 *   chip    : optional small label shown in the card top row
 */
const ProblemCard = memo(function ProblemCard({ problem, onOpen }) {
  const hasVideo = !!problem.videoLink;
  const description =
    problem.description ||
    "Practice this problem and build stronger algorithmic thinking with a focused DSA approach.";

  const difficultyLong = problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1);
  const difficultyLabel = difficultyLong === "Hard" ? "HARD" : difficultyLong;
  const platformColors =
    problem.platform === "leetcode"
      ? { bg: "linear-gradient(135deg,#f59e0b,#d97706)", text: "#ffffff" }
      : problem.platform === "gfg"
      ? { bg: "linear-gradient(135deg,#22c55e,#16a34a)", text: "#ffffff" }
      : { bg: "linear-gradient(135deg,#ef4444,#dc2626)", text: "#ffffff" };
  const platformLabel =
    problem.platform === "leetcode"
      ? "LeetCode"
      : problem.platform === "gfg"
      ? "GFG"
      : "YouTube";
  const platformLogo =
    problem.platform === "leetcode"
      ? leetcodeLogo
      : problem.platform === "gfg"
      ? gfgLogo
      : youtubeLogo;

  return (
    <div
      className="mdsa-problem-card"
      style={{
        "--topic-color": topicColors[problem.topic] || "#60a5fa",
        "--platform-bg": platformColors.bg,
        "--platform-text": platformColors.text,
      }}
      role="button"
      tabIndex={0}
      aria-label={`${problem.title} - ${problem.difficulty} ${problem.topic}`}
      onClick={() => onOpen(problem)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(problem);
        }
      }}
    >
      <div className="mdsa-problem-top">
        <span className="mdsa-problem-id">#{problem.id}</span>
      </div>

      <div className="mdsa-problem-body">
        <h3 className="mdsa-problem-title">{problem.title}</h3>
        <p className="mdsa-problem-description">{description}</p>
        <span
          className={`mdsa-difficulty-badge mdsa-${problem.difficulty.toLowerCase()}`}
        >
          {difficultyLabel}
        </span>
      </div>

      <div className="mdsa-problem-footer">
        <div
          className={`mdsa-video-btn ${hasVideo ? "available" : "soon"}`}
          title={hasVideo ? "Watch video solution" : "Video coming soon"}
        >
          <img
            className="mdsa-video-logo"
            src={youtubeLogo}
            alt="YouTube"
          />
          <span className="mdsa-solve-text">
            {hasVideo ? "YouTube" : "Soon"}
          </span>
        </div>
        <a
          href={problem.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mdsa-solve-btn"
          onClick={(e) => e.stopPropagation()}
          title="Solve this problem"
          data-platform={problem.platform}
          style={{ background: platformColors.bg, color: platformColors.text }}
        >
          <img
            className="mdsa-solve-logo"
            src={platformLogo}
            alt={platformLabel}
          />
          <span className="mdsa-solve-text">{platformLabel}</span>
        </a>
      </div>
    </div>
  );
});
/**
 * One week of the weekly plan — its seven day rows (Mon → Sun).
 *
 * These panes are rendered side by side inside the swipe carousel below, so
 * each one is exactly one viewport wide and the neighbouring week slides into
 * view while the viewer is still dragging. The neighbours are decoration until
 * they land in the middle: `inert` keeps their cards/buttons out of the click
 * path and the tab order, so only the week on screen is really interactive.
 *
 * Props:
 *   plan        : buildWeeklyPlan() result for THIS pane's week
 *   problems    : the problem bank (used to re-roll the assessments)
 *   reveal      : { sat, sun } reveal state for this week (keyed by weekIdx)
 *   onOpenVideo : opens the video modal for a problem
 *   onReveal    : (weekIdx, dayKey) → fresh random assessment questions
 *   isCurrent   : true for the week actually on screen (shows the "Today" chip)
 */
const WeekPane = memo(function WeekPane({
  plan,
  problems,
  reveal,
  onOpenVideo,
  onReveal,
  isCurrent,
}) {
  const todayJsDay = new Date().getDay();

  return (
    <div className="mdsa-wp-pane" inert={isCurrent ? undefined : true}>
      {plan.days.map((day, i) => {
        const isToday = isCurrent && day.jsDay === todayJsDay;
        // Weekend days are assessments — hidden until revealed.
        const isAssessment =
          day.type === "test-week" || day.type === "test-mixed";
        const revealInfo = isAssessment ? reveal[day.key] : null;
        const shown = revealInfo ? revealInfo.shown : true;

        // Randomized assessment problems — generated fresh on every reveal /
        // "get new questions" click. The RULES stay identical: Sat → this
        // week's 10, Sun → last week + this week (never duplicates). Practice
        // days (Mon–Fri) stay in track order.
        let dayProblems;
        if (!isAssessment) {
          dayProblems = day.problems;
        } else if (!shown) {
          dayProblems = [];
        } else if (day.key === "sat") {
          dayProblems = saturdayAssessment(problems, plan.weekIdx, revealInfo.nonce);
        } else {
          dayProblems = sundayAssessment(
            problems,
            plan.weekIdx,
            revealInfo.nonce,
          ).problems;
        }

        return (
          <article
            key={day.key}
            className={`mdsa-wp-day ${day.type}${isToday ? " today" : ""}${
              isAssessment ? " mdsa-wp-day-assess" : ""
            }`}
          >
            <header className="mdsa-wp-day-head">
              <span className="mdsa-wp-day-no">{i + 1}</span>
              <h3 className="mdsa-wp-day-name">{day.name}</h3>
              <span className={`mdsa-wp-tag ${day.type}`}>
                {day.type === "practice"
                  ? "Learn · 2 new"
                  : day.type === "test-week"
                    ? "Assessment · this week"
                    : "Assessment · prev + this"}
              </span>
              {isToday && <span className="mdsa-wp-today-chip">Today</span>}
            </header>

            <div className="mdsa-wp-day-problems">
              {isAssessment && !shown && (
                <p className="mdsa-wp-random-note">
                  Questions are chosen at random — your set appears below when
                  you tap reveal.
                </p>
              )}

              {isAssessment && !shown ? (
                <button
                  type="button"
                  className={`mdsa-wp-reveal-btn ${day.type}`}
                  onClick={() => onReveal(plan.weekIdx, day.key)}
                >
                  🔒 Reveal assessment questions
                </button>
              ) : (
                <>
                  {dayProblems.filter(Boolean).map((p) => (
                    <ProblemCard
                      key={p.uid}
                      problem={p}
                      onOpen={onOpenVideo}
                      chip={
                        p.sourceSheet === "Basic DSA"
                          ? "Basic"
                          : p.sourceSheet === "Advanced DSA"
                            ? "Advanced"
                            : p.sourceSheet === "Dynamic Programming"
                              ? "DP"
                              : "Graphs"
                      }
                    />
                  ))}
                  {isAssessment && shown && (
                    <button
                      type="button"
                      className={`mdsa-wp-reveal-btn ${day.type}`}
                      onClick={() => onReveal(plan.weekIdx, day.key)}
                    >
                      🔀 Get new questions
                    </button>
                  )}
                </>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
});

// Assign a consistent color per topic (full 27-topic master palette)
const topicColors = {
  // Part 1 — Basic (Array & String algorithms)
  Arrays: "#38bdf8",
  Strings: "#34d399",
  "Sliding Window": "#22d3ee",
  "Two Pointers": "#2dd4bf",
  "Prefix Sum": "#14b8a6",
  "Binary Search": "#f472b6",
  Sorting: "#60a5fa",
  Recursion: "#fb7185",
  Backtracking: "#fba74c",
  Greedy: "#eab308",
  "Bit Manipulation": "#a78bfa",
  Math: "#f59e0b",
  // Part 2 — Data Structures
  Stacks: "#f97316",
  Queues: "#fb923c",
  "Linked Lists": "#4ade80",
  Trees: "#84cc16",
  Tries: "#93c5fd",
  Heaps: "#c084fc",
  // Part 3 — Graphs & DP
  "Graph Traversal": "#f87171",
  "Graph Components": "#ef4444",
  "1D DP": "#818cf8",
  "2D DP": "#a855f7",
  "String DP": "#c084fc",
  "Grid DP": "#e879f9",
  "Knapsack DP": "#f472b6",
  "Partition DP": "#facc15",
  "DP on Trees": "#4ade80",
};

function DsaSheetPage({
  sheetTitle = "Basic DSA",
  titleAccent = "A → Z",
  problems = BASIC_PROBLEMS,
  introLink = googleSeriesIntro.videoLink,
  showWeeklyPlan = false,
  pageTheme = "basic",
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [weekOffset, setWeekOffset] = useState(0);

  // Saturday/Sunday assessment questions are HIDDEN by default and only shown
  // when the learner taps the reveal button. Each reveal/"get new questions"
  // tap rolls a fresh random seed (nonce) so the exact questions change, while
  // the RULES (Sat → this week's 10, Sun → last week + this week) stay fixed.
  //
  // The state is keyed by 0-based week index, so switching weeks automatically
  // starts that week hidden again — nobody can memorise a week's assessment
  // from a previously-opened pane.
  const [assessmentReveal, setAssessmentReveal] = useState({});

  // --- Swipe/drag week carousel -------------------------------------------
  // The plan ITSELF is the week selector: drag the day cards sideways (mouse,
  // finger or pen) and the neighbouring week slides in, snapping to the nearest
  // week when you let go. There are no Prev/Next buttons any more — ← / → and
  // Home do the same job for keyboard users, and the week dropdown in the
  // header jumps straight to any week (see weekChoices below).
  const carouselRef = useRef(null); // viewport that clips the week panes
  const trackRef = useRef(null); // rail holding the panes side by side
  const dragRef = useRef(null); // live gesture, kept out of state (no re-render per move)
  const suppressClickRef = useRef(false); // a completed drag must not also "click"
  const settleRef = useRef(null); // cancels a snap animation still in flight
  const [isDragging, setIsDragging] = useState(false);
  const [paneWidth, setPaneWidth] = useState(0);

  const topics = useMemo(
    () => ["All", ...Array.from(new Set(problems.map((p) => p.topic)))],
    [problems],
  );

  // Stats
  const easy = problems.filter((p) => p.difficulty === "Easy").length;
  const medium = problems.filter((p) => p.difficulty === "Medium").length;
  const hard = problems.filter((p) => p.difficulty === "Hard").length;
  const total = problems.length;

  // Filtered list
  const filtered = useMemo(() => {
    return problems.filter((p) => {
      const topicMatch = selectedTopic === "All" || p.topic === selectedTopic;
      const diffMatch =
        selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
      return topicMatch && diffMatch;
    });
  }, [selectedTopic, selectedDifficulty, problems]);

  // Group problems by topic so the library can render separate grids per
  // category (each with its own heading + accent colour) when "All" is chosen.
  const topicOrder = useMemo(() => {
    return Array.from(new Set(problems.map((p) => p.topic)));
  }, [problems]);

  const filteredGroups = useMemo(() => {
    const groups = new Map();
    for (const p of filtered) {
      (groups.get(p.topic) || groups.set(p.topic, []).get(p.topic)).push(p);
    }
    // Keep a stable, predictable topic order (not insertion-from-filter order)
    const ordered = [];
    for (const t of topicOrder) {
      if (groups.has(t))
        ordered.push({
          topic: t,
          color: topicColors[t] || "#60a5fa",
          problems: groups.get(t),
        });
    }
    return ordered;
  }, [filtered, topicOrder]);

  const openVideo = useCallback((problem) => {
    setSelectedProblem(problem);
    setModalOpen(true);
  }, []);
  const closeVideo = useCallback(() => {
    setSelectedProblem(null);
    setModalOpen(false);
  }, []);

  // Weekly preparation schedule (Mon–Fri learn · Sat/Sun assessments).
  // Only rendered on pages that opt in via showWeeklyPlan.
  const weeklyPlan = useMemo(
    () => (showWeeklyPlan ? buildWeeklyPlan(problems, weekOffset) : null),
    [showWeeklyPlan, problems, weekOffset],
  );

  // Reveal / re-roll one assessment day of one week. The nonce is fresh on every
  // tap so the questions change while the RULES stay identical. The week index
  // comes from the pane that was tapped, so a reveal always belongs to the week
  // it was clicked in.
  const rollAssessment = useCallback((weekIdx, key) => {
    const nonce = Math.floor(Math.random() * 1_000_000_000) + 1;
    setAssessmentReveal((prev) => {
      const weekAll = prev?.[weekIdx] || HIDDEN_WEEK;
      return {
        ...prev,
        [weekIdx]: { ...weekAll, [key]: { shown: true, nonce } },
      };
    });
  }, []);

  // Week 1 is the floor — the earliest week the carousel may land on. It is a
  // clamp rather than a `disabled` control, so a swipe (or ←) at Week 1 simply
  // stays put instead of hitting a dead, unclickable button.
  const planMinOffset = weeklyPlan ? weeklyPlan.minOffset : 0;

  // Panes = the week on screen plus one neighbour on each side (2 panes at the
  // floor). Rendering the neighbours is what lets the next/previous week slide
  // into view while the finger is still moving.
  const paneOffsets = useMemo(() => {
    if (!weeklyPlan) return [];
    const first = Math.max(planMinOffset, weekOffset - 1);
    const offsets = [];
    for (let o = first; o <= weekOffset + 1; o += 1) offsets.push(o);
    return offsets;
  }, [weeklyPlan, weekOffset, planMinOffset]);

  const panePlans = useMemo(() => {
    if (!weeklyPlan) return [];
    return paneOffsets.map((offset) => ({
      offset,
      // The week on screen reuses the plan memoised above; neighbours are built
      // on demand (buildWeeklyPlan is deterministic and cheap).
      plan: offset === weekOffset ? weeklyPlan : buildWeeklyPlan(problems, offset),
    }));
  }, [weeklyPlan, paneOffsets, weekOffset, problems]);

  // Where the week on screen sits among the rendered panes.
  const currentPaneIndex = Math.max(0, paneOffsets.indexOf(weekOffset));

  // The week dropdown: every course week the bank can fill (Week 1 → the last
  // week with new material), plus the week on screen if the learner has swiped
  // past that point — the plan wraps there and a <select> whose value has no
  // option would render blank. Swiping walks one week at a time; this jumps.
  const weekChoices = useMemo(
    () =>
      weeklyPlan ? weekPickerOptions(problems, planMinOffset, weekOffset) : [],
    [weeklyPlan, problems, planMinOffset, weekOffset],
  );

  // Jump to an absolute week offset (clamped at Week 1) — used by the keyboard.
  const goToWeek = useCallback(
    (offset) => setWeekOffset(Math.max(offset, planMinOffset)),
    [planMinOffset],
  );

  // Keyboard parity with the swipe: ← / → change week, Home returns to today.
  const onCarouselKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToWeek(weekOffset - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToWeek(weekOffset + 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goToWeek(0);
      }
    },
    [goToWeek, weekOffset],
  );

  // Keep the measured pane width fresh (resize, rotation, zoom).
  useLayoutEffect(() => {
    const el = carouselRef.current;
    if (!el) return undefined;
    const measure = () => setPaneWidth(el.clientWidth);
    measure();
    if (typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [weeklyPlan]);

  // Line the rail up with the week on screen. Deliberately instant and before
  // paint: after a swipe, the pane that just landed in the middle is re-indexed
  // (the window shifts around it), and animating that bookkeeping jump would
  // look like a second slide.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || paneWidth <= 0) return;
    track.style.transition = "none";
    track.style.transform = `translate3d(${-currentPaneIndex * paneWidth}px, 0, 0)`;
  }, [currentPaneIndex, paneWidth, panePlans]);

  // Never leave listeners or a pending snap behind if the page unmounts.
  useLayoutEffect(
    () => () => {
      if (settleRef.current) settleRef.current();
      if (dragRef.current && dragRef.current.teardown) {
        dragRef.current.teardown();
      }
      dragRef.current = null;
    },
    [],
  );

  // --- Drag the plan ------------------------------------------------------
  // One gesture for mouse, finger and pen. The transform is written straight to
  // the DOM node, so the cards follow the pointer without a React re-render on
  // every pixel of movement — the week itself only changes on release.
  const onCarouselPointerDown = useCallback(
    (e) => {
      const track = trackRef.current;
      if (!track || paneWidth <= 0 || paneOffsets.length < 2) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (dragRef.current) return; // already dragging (e.g. a second finger)

      // Grabbing the rail again cancels a snap still in flight — including the
      // week change it was about to commit — so two gestures can never fight
      // over the same rail a few hundred ms apart.
      if (settleRef.current) settleRef.current();

      // Any click-suppression left over from the previous gesture is stale.
      suppressClickRef.current = false;

      const index = currentPaneIndex;
      const gesture = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        lastX: e.clientX,
        lastAt: e.timeStamp || performance.now(),
        dx: 0,
        velocity: 0,
        moved: false,
      };

      const place = (px) => {
        track.style.transform = `translate3d(${px}px, 0, 0)`;
      };

      // Slide to a pane and, once it is there, commit the week it belongs to.
      const settle = (targetIndex) => {
        const commit = () => {
          const offset = paneOffsets[targetIndex];
          // Changing the week re-renders the panes; the layout effect above
          // then re-centres the rail on the new middle pane without animating.
          if (offset !== undefined && offset !== weekOffset) {
            setWeekOffset(offset);
          }
        };
        if (prefersReducedMotion()) {
          settleRef.current = null;
          track.style.transition = "none";
          place(-targetIndex * paneWidth);
          commit();
          return;
        }
        let done = false;
        const finish = (ev) => {
          if (done) return;
          // Ignore transitions that merely BUBBLE up from a card in the pane
          // (hover/colour fades) — only the rail's own transform ends the snap.
          if (ev && (ev.target !== track || ev.propertyName !== "transform")) {
            return;
          }
          done = true;
          track.removeEventListener("transitionend", finish);
          window.clearTimeout(timer);
          settleRef.current = null;
          commit();
        };
        track.style.transition = `transform ${SNAP_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1)`;
        place(-targetIndex * paneWidth);
        track.addEventListener("transitionend", finish);
        // Safety net — transitionend never fires while the tab is hidden.
        const timer = window.setTimeout(finish, SNAP_MS + 150);
        settleRef.current = () => {
          if (done) return;
          done = true;
          track.removeEventListener("transitionend", finish);
          window.clearTimeout(timer);
          settleRef.current = null;
        };
      };

      const move = (ev) => {
        if (ev.pointerId !== gesture.pointerId) return;
        const dx = ev.clientX - gesture.startX;
        const dy = ev.clientY - gesture.startY;

        if (!gesture.moved) {
          // Only take the gesture over once it is clearly a horizontal drag, so
          // taps and vertical page scrolling keep behaving exactly as before.
          if (Math.abs(dx) < DRAG_START_PX || Math.abs(dx) <= Math.abs(dy)) return;
          gesture.moved = true;
          suppressClickRef.current = true;
          setIsDragging(true);
          track.style.transition = "none";
        }

        const now = ev.timeStamp || performance.now();
        gesture.velocity =
          (ev.clientX - gesture.lastX) / Math.max(now - gesture.lastAt, 1);
        gesture.lastX = ev.clientX;
        gesture.lastAt = now;
        gesture.dx = dx;

        // Rubber-band when there is no week in that direction (Week 1 floor),
        // so the boundary is felt instead of looking broken.
        const hasNeighbour = dx < 0 ? index < paneOffsets.length - 1 : index > 0;
        place(-index * paneWidth + (hasNeighbour ? dx : dx * OVERDRAG_DAMPING));
      };

      function teardown() {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onCancel);
        window.removeEventListener("blur", onWindowBlur);
        if (dragRef.current === gesture) dragRef.current = null;
      }

      function end(ev, aborted) {
        // `ev` is null when the window lost focus mid-drag (see onWindowBlur).
        if (ev && ev.pointerId !== gesture.pointerId) return;
        teardown();
        // A plain tap (no drag) must still reach the card underneath it.
        if (!gesture.moved) return;
        setIsDragging(false);
        settle(
          aborted
            ? index
            : resolveSwipeTarget(
                index,
                gesture.dx,
                gesture.velocity,
                paneWidth,
                paneOffsets.length,
              ),
        );
      }

      function onUp(ev) {
        end(ev, false);
      }

      // The browser took the gesture over (vertical scroll) → snap back.
      function onCancel(ev) {
        end(ev, true);
      }

      // Pointer released outside the window / window focus lost → snap back
      // instead of leaving the rail stuck mid-swipe.
      function onWindowBlur() {
        end(null, true);
      }

      gesture.teardown = teardown;
      dragRef.current = gesture;
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onCancel);
      window.addEventListener("blur", onWindowBlur);
    },
    [currentPaneIndex, paneOffsets, paneWidth, weekOffset],
  );

  // Swallow the click a finished drag would otherwise fire on the card beneath.
  const onCarouselClickCapture = useCallback((e) => {
    if (!suppressClickRef.current) return;
    suppressClickRef.current = false;
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Kill the browser's native text/image drag so the swipe stays smooth.
  const onCarouselDragStart = useCallback((e) => e.preventDefault(), []);

  return (
    <div
      className={`mdsa-page mdsa-page-${pageTheme}${
        showWeeklyPlan ? " mdsa-page-weekly" : ""
      }`}
    >
      {/* ===== HERO ===== */}
      <section className="mdsa-hero">
        <Link to="/maang" className="mdsa-back">
          ← Back to MAANG Preparation
        </Link>

        {/* Small stat boxes, top-right of the header */}
        <section className="mdsa-stats">
          <div className="mdsa-stat-card total">
            <span className="mdsa-stat-num">{total}</span>
            <span className="mdsa-stat-label">Total Problems</span>
          </div>
          <div className="mdsa-stat-card easy">
            <span className="mdsa-stat-num">{easy}</span>
            <span className="mdsa-stat-label">Easy</span>
          </div>
          <div className="mdsa-stat-card medium">
            <span className="mdsa-stat-num">{medium}</span>
            <span className="mdsa-stat-label">Medium</span>
          </div>
          <div className="mdsa-stat-card hard">
            <span className="mdsa-stat-num">{hard}</span>
            <span className="mdsa-stat-label">Hard</span>
          </div>
        </section>

        <div className="mdsa-hero-inner">
          <div className="mdsa-hero-text">
            <h1 className="mdsa-title">
              {sheetTitle}{" "}
              <span className="mdsa-title-accent">{titleAccent}</span>
            </h1>
            <p className="mdsa-subtitle">
              {problems.length} essential DSA problems. Watch video solutions in
              Telugu, solve on LeetCode / GeeksforGeeks.
            </p>
          </div>
          <div className="mdsa-hero-video">
            <a
              className="mdsa-intro-video"
              href={introLink}
              target="_blank"
              rel="noopener noreferrer"
              title="Watch Google Crack Coding Series Intro"
            >
              <img
                className="mdsa-intro-logo"
                src={youtubeLogo}
                alt="YouTube"
              />
              <span className="mdsa-video-text">
                <span className="mdsa-video-label">Watch Intro</span>
                <span className="mdsa-video-sub">Start here · 2 min</span>
              </span>
              <span className="mdsa-video-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== WEEKLY PREPARATION (Mon–Fri learn · Sat/Sun assess) ===== */}
      {weeklyPlan && (
        <section className="mdsa-wp">
          <div className="mdsa-wp-header">
            <h2 className="mdsa-section-title" aria-live="polite">
              Week {weeklyPlan.weekNo}
            </h2>
            <div className="mdsa-wp-weekbar">
              {/* Explicit week picker. The plan is still the selector (drag it
                  sideways), but swiping walks one week at a time — going back
                  to Week 1 from Week 5 would take four swipes, so the dropdown
                  jumps straight to any week. A native <select>, so keyboard,
                  touch and screen-reader behaviour come for free. */}
              {weekChoices.length > 1 && (
                <label className="mdsa-wp-week-select">
                  <span className="mdsa-wp-week-select-label">Jump to week</span>
                  <select
                    value={weekOffset}
                    onChange={(e) => goToWeek(Number(e.target.value))}
                  >
                    {weekChoices.map(({ weekNo, offset }) => (
                      <option key={weekNo} value={offset}>
                        Week {weekNo}
                        {offset === 0 ? " · this week" : ""}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <p className="mdsa-wp-drag-hint">
                <span className="mdsa-wp-drag-icon" aria-hidden="true">
                  ↔
                </span>
                Drag the plan left or right to change week
              </p>
            </div>
          </div>

          {/* The carousel: one pane per week (previous · current · next) with
              the week on screen in the middle, so the neighbouring plan slides
              in while the viewer is still dragging. */}
          <div
            className={`mdsa-wp-carousel${isDragging ? " is-dragging" : ""}`}
            ref={carouselRef}
            role="group"
            aria-roledescription="carousel"
            aria-label={`Weekly plan, week ${weeklyPlan.weekNo}`}
            tabIndex={0}
            onKeyDown={onCarouselKeyDown}
            onPointerDown={onCarouselPointerDown}
            onClickCapture={onCarouselClickCapture}
            onDragStart={onCarouselDragStart}
          >
            <div className="mdsa-wp-track" ref={trackRef}>
              {panePlans.map(({ offset, plan }) => (
                <WeekPane
                  key={offset}
                  plan={plan}
                  problems={problems}
                  reveal={assessmentReveal[plan.weekIdx] || HIDDEN_WEEK}
                  onOpenVideo={openVideo}
                  onReveal={rollAssessment}
                  isCurrent={offset === weekOffset}
                />
              ))}
            </div>
          </div>
          {weekOffset !== 0 && (
            <p className="mdsa-wp-note">
              You're viewing a different week — pick any week from the list
              above, or drag the plan to the right (← / Home) to walk back to
              today.
            </p>
          )}
        </section>
      )}

      {/* Library + filter bar only make sense on the regular sheet pages.
          On the Weekly Preparation page the schedule already curates every
          problem day-by-day, so the whole browse UI below stays hidden. */}
      {!showWeeklyPlan && (
        <>
          {/* ===== PROBLEM LIBRARY ===== */}
          <section className="mdsa-filters-section">
            <h2 className="mdsa-section-title">📚 Problem Library</h2>
            <div className="mdsa-filter-bar">
              <div className="mdsa-filter-group">
                <label>Topic:</label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="mdsa-filter-select"
                >
                  {topics.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mdsa-filter-group">
                <label>Difficulty:</label>
                <div className="mdsa-difficulty-chips">
                  {difficulties.map((d) => (
                    <button
                      key={d}
                      className={`mdsa-diff-chip ${selectedDifficulty === d ? "active" : ""} ${
                        d.toLowerCase() === "easy"
                          ? "easy"
                          : d.toLowerCase() === "medium"
                            ? "medium"
                            : d.toLowerCase() === "hard"
                              ? "hard"
                              : ""
                      }`}
                      onClick={() => setSelectedDifficulty(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <span className="mdsa-filter-count">
                {filtered.length} problems
              </span>
            </div>
          </section>

          {/* ===== PROBLEM GRID (category-grouped when "All" selected) ===== */}
          {filtered.length === 0 ? (
            <section
              className="mdsa-topics-grid"
              style={{
                "--topic-color": topicColors[selectedTopic] || "#60a5fa",
              }}
            >
              <div className="mdsa-empty">
                No problems match your filters. Try changing the topic or
                difficulty.
              </div>
            </section>
          ) : selectedTopic === "All" ? (
            // Grouped view: one colourful grid per category
            <div className="mdsa-category-groups">
              {filteredGroups.map((grp) => (
                <section key={grp.topic} className="mdsa-category-group">
                  <div
                    className="mdsa-category-heading"
                    style={{ "--cat-color": grp.color }}
                  >
                    <span
                      className="mdsa-category-tile"
                      style={{
                        background: `linear-gradient(135deg, ${grp.color}, color-mix(in srgb, ${grp.color} 60%, #000000))`,
                        boxShadow: `0 6px 18px color-mix(in srgb, ${grp.color} 50%, transparent), inset 0 1px 0 rgba(255,255,255,0.35)`,
                      }}
                      aria-hidden="true"
                    >
                      {grp.topic.charAt(0).toUpperCase()}
                    </span>
                    <h3 className="mdsa-category-title">{grp.topic}</h3>
                    <span className="mdsa-category-count">
                      {grp.problems.length} problem
                      {grp.problems.length === 1 ? "" : "s"}
                    </span>
                  </div>
                  <div
                    className="mdsa-topics-grid"
                    style={{ "--topic-color": grp.color }}
                  >
                    {grp.problems.map((p) => (
                      <ProblemCard key={p.id} problem={p} onOpen={openVideo} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            // Single category selected → one flat grid
            <section
              className="mdsa-topics-grid"
              style={{
                "--topic-color": topicColors[selectedTopic] || "#60a5fa",
              }}
            >
              {filtered.map((p) => (
                <ProblemCard key={p.id} problem={p} onOpen={openVideo} />
              ))}
            </section>
          )}
        </>
      )}

      {/* ===== Video Modal ===== */}
      <VideoPlayerModal
        isOpen={modalOpen}
        onClose={closeVideo}
        videoUrl={selectedProblem?.videoLink || ""}
        title={selectedProblem?.title || ""}
        description={selectedProblem?.description || ""}
      />
    </div>
  );
}

/* Page wrappers ---------------------------------------------------- */

function MaangDSABasic() {
  return (
    <DsaSheetPage
      sheetTitle="Basic DSA"
      titleAccent="Part 1"
      problems={BASIC_PROBLEMS}
      introLink={googleSeriesIntro.videoLink}
      pageTheme="basic"
    />
  );
}

export default MaangDSABasic;
export { DsaSheetPage };
