// Build the TCS 2025 walk-in interview module from its structured JSON.
//
// Run: node scripts/rebuild-tcs-walkin-2025.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const companyDir = path.join(
  scriptDir,
  "..",
  "src",
  "data",
  "companyInterviews",
  "tcs",
);
const sourcePath = path.join(companyDir, "tcs-walkin-2025.json");
const outputPath = path.join(companyDir, "tcs-walkin-2025.js");
const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

const rounds = source.rounds.map((round) => ({
  name: round.name,
  questions: round.questions.map((question) => ({
    question: question.question,
    answer: question.answer || "",
    code:
      question.code && typeof question.code.content === "string"
        ? {
            label: question.code.label || "",
            language: question.code.language || "java",
            content: question.code.content,
          }
        : null,
  })),
}));

const questionCount = rounds.reduce(
  (total, round) => total + round.questions.length,
  0,
);
const company = {
  id: source.id,
  name: source.name,
  interviews: [
    {
      name: source.interviewName,
      questionCount,
      rounds,
    },
  ],
  questionCount,
};

const banner =
  "// AUTO-GENERATED file — company-wise interview data.\n" +
  `// Source: ${path.basename(sourcePath)}.\n` +
  "// Regenerate with: node scripts/rebuild-tcs-walkin-2025.mjs\n\n";
fs.writeFileSync(
  outputPath,
  banner + "export const company = " + JSON.stringify(company, null, 2) + ";\n",
  "utf8",
);
console.log(
  `Wrote ${path.relative(path.join(scriptDir, ".."), outputPath)} (${rounds.length} rounds, ${questionCount} questions)`,
);
