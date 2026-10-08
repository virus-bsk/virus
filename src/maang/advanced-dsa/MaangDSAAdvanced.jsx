import { DsaSheetPage } from "../basic-dsa/MaangDSABasic";
import { dsaProblems } from "./dsaAdvancedProblems";

/**
 * MaangDSAAdvanced — Part 2 of the MAANG sheet: Data Structures.
 * (57 problems).
 */
function MaangDSAAdvanced() {
  return (
    <DsaSheetPage
      sheetTitle="Advanced DSA"
      titleAccent="Part 2"
      problems={dsaProblems}
      pageTheme="advanced"
    />
  );
}

export default MaangDSAAdvanced;