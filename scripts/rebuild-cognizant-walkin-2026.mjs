// Build the Cognizant 2026 walk-in interview module from its structured JSON.
//
// Run: node scripts/rebuild-cognizant-walkin-2026.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const companyDir = path.join(
  __dirname,
  "..",
  "src",
  "data",
  "companyInterviews",
  "cognizant",
);
const sourcePath = path.join(companyDir, "cognizant-walkin-2026.json");
const outputPath = path.join(companyDir, "cognizant-walkin-2026.js");
const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

const rounds = source.rounds.map((round) => ({
  name: round.name,
  questions: round.questions.map((question) => ({
    question: question.question,
    answer: question.answer || "",
    code: Array.isArray(question.code)
      ? question.code
          .filter((block) => block && typeof block.content === "string")
          .map((block) => ({
            label: block.label || "",
            language: block.language || "java",
            content: block.content,
          }))
      : question.code &&
          typeof question.code.content === "string" &&
          question.code.content.trim()
        ? {
            language: question.code.language || "java",
            content: question.code.content,
          }
        : null,
  })),
}));

const questionCount = rounds.reduce(
  (sum, round) => sum + round.questions.length,
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
  "// Regenerate with: node scripts/rebuild-cognizant-walkin-2026.mjs\n\n";
fs.writeFileSync(
  outputPath,
  banner + "export const company = " + JSON.stringify(company, null, 2) + ";\n",
  "utf8",
);
console.log(
  `Wrote ${path.relative(path.join(__dirname, ".."), outputPath)} (${rounds.length} round, ${questionCount} questions)`,
);
