import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { resolveQuestion } from "../assets/js/carioc-ia-engine.js";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const input = readFileSync(path.join(root, "docs/CARIOC_IA_V2_120_QUESTIONS.csv"), "utf8");
const rows = input.trim().split(/\r?\n/).slice(1).map(line => {
  const values = [];
  const pattern = /"((?:[^"]|"")*)"(?:,|$)/g;
  let match;
  while ((match = pattern.exec(line))) values.push(match[1].replace(/""/g, '"'));
  if (values.length !== 4) throw new Error("Invalid fixture row: " + line);
  return { id: values[0], category: values[1], language: values[2], question: values[3] };
});
if (rows.length !== 120) throw new Error("Expected 120 scenarios, got " + rows.length);
if (new Set(rows.map(row => row.id)).size !== 120) throw new Error("Duplicate scenario IDs");
const expectedLanguages = ["ES", "PT", "EN"];
const counts = Object.fromEntries(expectedLanguages.map(lang => [lang, 0]));
for (const row of rows) {
  if (!expectedLanguages.includes(row.language)) throw new Error("Unsupported language: " + row.language);
  counts[row.language]++;
}
if (expectedLanguages.some(lang => counts[lang] !== 40)) throw new Error("Expected 40 scenarios per language");
const diagnostics = rows.map(row => {
  try {
    const result = resolveQuestion(row.question);
    const recognized = Boolean(result.intent || result.clarification);
    return {...row, recognized, intent:result.intent?.id ?? null,
      clarification: Boolean(result.clarification), needs_review:!recognized };
  } catch (error) {
    return {...row, recognized:false, intent:null, needs_review:true, error:String(error)};
  }
});
const unresolved = diagnostics.filter(row => !row.recognized);
const report = {count:rows.length, recognized:rows.length-unresolved.length,
  unresolved:unresolved.length, countsByLanguage:counts,
  notice:"Recognition is not proof of answer accuracy; editorial and browser QA remain required.",
  cases:diagnostics};
writeFileSync(path.join(root, "CARIOC_IA_V2_DIAGNOSTIC.json"), JSON.stringify(report,null,2)+"\n");
console.log("Carioc-IA V2: " + report.recognized + "/" + report.count + " recognized; " + report.unresolved + " need review.");
if (unresolved.length) console.log(unresolved.map(row => row.id + " [" + row.language + "]: " + row.question).join("\n"));
if (process.argv.includes("--strict") && unresolved.length) process.exitCode=1;
