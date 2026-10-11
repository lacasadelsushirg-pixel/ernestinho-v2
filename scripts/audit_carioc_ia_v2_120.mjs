import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { resolveQuestion } from "../assets/js/carioc-ia-engine.js";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const input = readFileSync(path.join(root, "docs/CARIOC_IA_V2_120_QUESTIONS.csv"), "utf8");
const rows = input.trim().split(/\r?\n/).slice(1).map(line => {
  const matches = [...line.matchAll(/"(?:[^"]|"")*"(?:,|$)/g)].map(x => x[0].replace(/,$/,"").slice(1,-1).replace(/""/g,'"'));
  if (matches.length!==4) throw new Error("Invalid fixture row: "+line);
  return {id:matches[0],category:matches[1],language:matches[2],question:matches[3]};
});
if(rows.length!==120)throw new Error("Expected 120 scenarios, got "+rows.length);
const diagnostics = rows.map(row=>{
  try {
    const result=resolveQuestion(row.question);
    const valid=!!(result.intent||result.clarification);
    return {...row,resolved:valid,intent:result.intent?.id||null,needs_review:!valid};
  } catch(error) {
    return {...row,resolved:false,intent:null,needs_review:true,error:String(error)};
  }
});
const unresolved=diagnostics.filter(x=>!x.resolved);
const report={count:rows.length,resolved:rows.length-unresolved.length,unresolved:unresolved.length,cases:diagnostics};
writeFileSync(path.join(root,"CARIOC_IA_V2_DIAGNOSTIC.json"),JSON.stringify(report,null,2)+"\n");
console.log("Carioc-IA V2: "+report.resolved+"/"+report.count+" recognized; "+report.unresolved+" require editorial or engine review.");
if(unresolved.length)console.log(unresolved.map(x=>x.id+" ["+x.language+"]: "+x.question).join("\n"));
if(process.argv.includes("--strict")&&unresolved.length)process.exitCode=1;
