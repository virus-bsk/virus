import { DsaSheetPage } from "../basic-dsa/MaangDSABasic";
import { dsaBasicProblems as basicProblems } from "../basic-dsa/dsaBasicProblems";
import { dsaProblems as advancedProblems } from "../advanced-dsa/dsaAdvancedProblems";
import { dsaProblems as dpProblems } from "../dp/dsaDpProblems";
import { dsaProblems as graphProblems } from "../graph/dsaGraphProblems";

/**
 * MaangWeeklyPreparation — the complete MAANG DSA preparation track on one
 * page. Merges all four sheets into a single problem bank that powers:
 *
 *   • Weekly Preparation schedule
 *       – Mon–Fri : learn 2 new problems every day (10 / week)
 *       – Sat     : assessment on THIS week's material (2 questions)
 *       – Sun     : retention test mixing LAST week + THIS week (2 questions;
 *                   on Week 1 both come from THIS week — no wrap-around)
 *   • Full browsable Problem Library (grouped by topic)
 *
 *   Basic DSA ..... 96 problems
 *   Advanced DSA .. 57 problems
 *   DP ............ 21 problems
 *   Graphs ........ 11 problems
 *   ---------------------------
 *   Total ......... 185 problems in one track
 */

// Tag every problem with a globally-unique id (`uid`) — the source files
// number their problems independently (each starts at id: 1) — and remember
// which sheet it came from so cards can show a "Basic / Advanced / DP /
// Graphs" chip inside the weekly plan.
const SHEETS = [
  { name: "Basic DSA", prefix: "b", problems: basicProblems },
  { name: "Advanced DSA", prefix: "a", problems: advancedProblems },
  { name: "Dynamic Programming", prefix: "dp", problems: dpProblems },
  { name: "Graphs", prefix: "g", problems: graphProblems },
];

const ALL_PROBLEMS = SHEETS.flatMap(({ name, prefix, problems }) =>
  problems.map((p) => ({ ...p, uid: `${prefix}-${p.id}`, sourceSheet: name })),
);

function MaangWeeklyPreparation() {
  return (
    <DsaSheetPage
      sheetTitle="Weekly Preparation"
      titleAccent="Complete DSA Track"
      problems={ALL_PROBLEMS}
      showWeeklyPlan={true}
      pageTheme="weekly"
    />
  );
}

export default MaangWeeklyPreparation;
