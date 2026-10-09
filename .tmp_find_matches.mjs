import fs from "fs";
import path from "path";

const base = process.cwd();
const files = [
  "src/maang/basic-dsa/dsaBasicProblems.js",
  "src/maang/advanced-dsa/dsaAdvancedProblems.js",
  "src/maang/graph/dsaGraphProblems.js",
  "src/maang/dp/dsaDpProblems.js",
  "src/data/dsa/dsaLeetcodeProblems.js",
];

const texts = Object.fromEntries(
const canonMap = new Map([...texts['src/data/dsa/dsaLeetcodeProblems.js'].matchAll(/title:\s*["']([^"']+)["'][\s\S]*?videoLink:\s*(["'].*?["'])/g)].map((m) => [m[1], m[2]]));
);
for (const f of files.slice(0, -1)) {
  const entries = [...texts[f].matchAll(/title:\s*["']([^"']+)["'][\s\S]*?videoLink:\s*([\w\W]*?)[,\n]/g)].map((m) => ({ title: m[1], videoLink: m[2].trim() }));
  const matches = entries.filter((e) => canonMap.has(e.title));
  if (matches.length) {
    console.log('FILE', f);
    for (const e of matches) {
      console.log('  ', e.title, '=>', e.videoLink);
    }
  }
  const names = arrs[f].filter((t) => canon.has(t));
  console.log(f, names.length, names);
}
const all = [
  ...new Set(
    files
      .slice(0, -1)
      .flatMap((f) => arrs[f])
      .filter((t) => canon.has(t)),
  ),
];
console.log("TOTAL", all.length, all);
