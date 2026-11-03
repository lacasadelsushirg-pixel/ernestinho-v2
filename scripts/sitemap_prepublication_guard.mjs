#!/usr/bin/env node
// Protect live 2.4k-URL sitemap from accidental replacement by stale ~600-URL source file.
// Read-only. Run before *any* sitemap deploy; no writes to public website.
import fs from 'node:fs';
const localPath=process.argv[2]||'sitemap.xml';
const origin='https://www.ernestinhocarioca.com.br';
const strip=s=>[...s.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(x=>x[1].trim());
const release=new Set(strip(fs.readFileSync(localPath,'utf8')));
let liveXML;
const r=await fetch(origin+'/sitemap.xml?ec_sitemap_guard=20261102',{headers:{'Cache-Control':'no-cache'},signal:AbortSignal.timeout(45000)});
if(r.status!==200)throw Error('Public sitemap HTTP '+r.status+' — FAIL CLOSED');
liveXML=await r.text();
const published=new Set(strip(liveXML));
if(published.size<1500)throw Error('Cannot validate public sitemap baseline: expected 1500+ unique URLs');
const missing=[...published].filter(u=>!release.has(u)),added=[...release].filter(u=>!published.has(u));
const report={candidate:localPath,liveCount:published.size,candidateCount:release.size,removedCount:missing.length,addedCount:added.length,removedExamples:missing.slice(0,30),addedExamples:added.slice(0,30)};
fs.writeFileSync('sitemap-safety-preflight.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({liveCount:report.liveCount,candidateCount:report.candidateCount,removedCount:report.removedCount,addedCount:report.addedCount}));
if(release.size<.95*published.size || missing.length>30){
 console.error('BLOCK: sitemap release would drop many public URLs; requires explicit audited reconciliation');
 process.exitCode=1;
}else{
 console.log('Sitemap release within safety threshold. Review any intentionally removed URLs anyway.');
}
