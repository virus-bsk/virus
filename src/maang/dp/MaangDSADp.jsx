import { DsaSheetPage } from "../basic-dsa/MaangDSABasic";
import { dsaProblems } from "./dsaDpProblems";

/**
 * MaangDSADp — Dynamic Programming sheet of the MAANG track.
 * DP patterns (1D, Grid, String, Knapsack, Partition, DP-on-Trees)
  * (21 problems).
 */
function MaangDSADp() {
  return (
    <DsaSheetPage
      sheetTitle="Dynamic Programming"
      titleAccent="DP Patterns"
      problems={dsaProblems}
      pageTheme="dp"
    />
  );
}

export default MaangDSADp;