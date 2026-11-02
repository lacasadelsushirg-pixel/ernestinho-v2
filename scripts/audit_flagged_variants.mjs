#!/usr/bin/env node
// Regression audit of the 82 remaining variants originally flagged in the 2026-11-02 report.
// Only reads source JSON and isolated dist/ HTML. Writes a report to dist/; never deploys.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist=path.join(root,'dist');
const report=JSON.parse(fs.readFileSync(path.join(root,'docs/seo/revision-traducciones-84-20261102.json'),'utf8'));
const published=new Set([
 '/pt/gastronomia/nino-cucina-ipanema/',
 '/pt/gastronomia/temperarte-bolivar/'
]);
const cleaned=t=>String(t||'').replace(/&nbsp;/gi,' ').replace(/&amp;/gi,'&')
 .replace(/&quot;/gi,'"').replace(/&#39;/gi,"'").replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n)))
 .replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const renderedText=html=>cleaned(html.replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi,'')
 .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'')
 .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'')
 .replace(/<!--[\s\S]*?-->/g,''));
const suspects=['← Volver a Gastronomía','Mi lectura personal como Ernestinho',
 'Qué pedir y por qué','Información práctica','Cómo llegar y mapa','Mi consejo específico',
 'Experiencia según el momento del día','Yo te recomiendo','Para mí,'];
// The original external alert mistakenly treated two genuinely Portuguese paragraphs as Spanish.
const verifiedNativePortuguese=new Set(['/pt/gastronomia/arp-bar/','/pt/gastronomia/quiteria/']);
const results=[];
for(const entry of report){
 const pathname=new URL(entry.url).pathname;
 if(published.has(pathname))continue;
 const lang=entry.idioma;
 const base=pathname.replace(/^\/(?:pt|en)(?=\/)/,'');
 const dest=path.join(dist,pathname.slice(1),'index.html');
 if(!['pt','en'].includes(lang))throw Error('Unexpected target '+pathname);
 const current={pathname,lang,source:base,reportExampleLength:entry.ejemplo?.length||0,
  htmlPresent:fs.existsSync(dest),exampleStillVisible:false,similarBeginningVisible:false,nativePortugueseExcerpt:verifiedNativePortuguese.has(pathname),
  canonicalPresent:false,hreflangPresent:false,suspectSpanishPhrases:[]};
 if(current.htmlPresent){
  const html=fs.readFileSync(dest,'utf8'),body=renderedText(html),example=cleaned(entry.ejemplo);
  current.exampleStillVisible=example.length>=90&&body.includes(example);
  current.similarBeginningVisible=example.length>=90&&body.includes(example.slice(0,90));
  current.canonicalPresent=html.includes('https://www.ernestinhocarioca.com.br'+pathname);
  current.hreflangPresent=html.includes('hreflang');
  current.suspectSpanishPhrases=suspects.filter(p=>body.includes(p));
 }
 results.push(current);
}
const missing=results.filter(r=>!r.htmlPresent);
const stale=results.filter(r=>!r.nativePortugueseExcerpt&&(r.exampleStillVisible||r.similarBeginningVisible));
const nativePortuguese=results.filter(r=>r.nativePortugueseExcerpt);
const metadata=results.filter(r=>!r.canonicalPresent||!r.hreflangPresent);
const possible=results.filter(r=>r.suspectSpanishPhrases.length);
const out={originalFlagged:report.length,alreadyPublishedVariants:published.size,
 checkedVariants:results.length,expected:82,missingHTML:missing.length,
 stillVisibleSpanishExamples:stale.length,nativePortugueseExamples:nativePortuguese.length,missingCanonicalOrHreflang:metadata.length,
 possibleShortSpanishLeaks:possible.length,
 missing,stale,metadata,possible:possible.map(({pathname,suspectSpanishPhrases})=>({pathname,suspectSpanishPhrases})),
 results};
fs.writeFileSync(path.join(dist,'audit-82-flagged-variants.json'),JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify({...out,results:undefined},null,2));
if(results.length!==82||missing.length||stale.length||metadata.length)process.exitCode=1;
