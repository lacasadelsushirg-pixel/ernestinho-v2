#!/usr/bin/env node
// Read-only audit: compare all PT/EN rendered editorial image labels, captions
// and headings with their ES sources. Only an explicit GitHub preview dist/ is scanned.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const reportFile=path.join(dist,'audit-rendered-shortcopy.json');
if(!fs.existsSync(path.join(dist,'locale-manifest.json')))throw Error('Explicit isolated dist/ required');
const manifest=JSON.parse(fs.readFileSync(path.join(dist,'locale-manifest.json'),'utf8'));
const sources=[...new Set(manifest.routes.filter(r=>r.language==='PT'||r.language==='EN')
 .map(r=>r.source).filter(x=>/^\/(?:compras|gastronomia)\/[^/]+\/$/.test(x)))];
if(sources.length<20)throw Error('Insufficient isolated scope; expected many editorial routes');
const decode=t=>String(t||'').replace(/&nbsp;/ig,' ').replace(/&amp;/ig,'&')
 .replace(/&quot;/ig,'"').replace(/&#39;/g,"'").replace(/&apos;/ig,"'")
 .replace(/&#([0-9]+);/g,(_,n)=>String.fromCodePoint(Number(n)))
 .replace(/&#x([a-f0-9]+);/ig,(_,n)=>String.fromCodePoint(parseInt(n,16)));
const clean=t=>decode(String(t||'').replace(/<[^>]*>/g,' ')).replace(/\s+/g,' ').trim();
const extract=html=>{
 const out={alt:[],caption:[],heading:[],notice:[]};
 const withoutScripts=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/ig,'')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/ig,'');
 for(const hit of withoutScripts.matchAll(/<img\b[^>]*\balt=(["'])(.*?)\1/ig))out.alt.push(clean(hit[2]));
 for(const hit of withoutScripts.matchAll(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/ig))out.caption.push(clean(hit[1]));
 for(const hit of withoutScripts.matchAll(/<h[2-4]\b[^>]*>([\s\S]*?)<\/h[2-4]>/ig))out.heading.push(clean(hit[1]));
 for(const hit of withoutScripts.matchAll(/<div\b[^>]*class=["'][^"']*\bnotice\b[^"']*["'][^>]*>([\s\S]*?)<\/div>/ig))out.notice.push(clean(hit[1]));
 return out;
};
const spanishMarker=/\b(?:comercio|productos|calle|mercanc[ií]as|escaparates|fotograf[ií]a|im[aá]genes?|la|el|las|los|un|una|para|del|por|qu[eé]|c[oó]mo|volver|direcci[oó]n|fachada|sal[oó]n|preparaci[oó]n|experiencia|plato|restaurante|gu[ií]a|consejo|historia|galer[ií]a|visita|servicio|bebida|a[cç]a[ií] con)\b/i;
const highlySpanish=/\b(?:fotograf[ií]a|im[aá]genes?|volver|direcci[oó]n|preparaci[oó]n|galer[ií]a|plato servido|la fachada|el ambiente|y car[aá]cter|y propuesta|por qu[eé])\b/i;
// Some Spanish source files were written with genuinely Portuguese image names.
const nativePortugueseSameAsSource=new Set([
 'Mesa do restaurante Arp','Delírio Tropical em Ipanema',
 'Balcão do Delírio Tropical','Prato do Delírio Tropical',
 'Sobremesa do Delírio','Restaurante Quitéria','Fachada do Quitéria'
]);
let acceptedNativePortuguese=0;
const matches=[];const routeCounts={};
for(const source of sources){
 const srcFile=path.join(root,source.slice(1),'index.html');
 if(!fs.existsSync(srcFile))continue;
 const es=extract(fs.readFileSync(srcFile,'utf8'));
 for(const locale of ['pt','en']){
  const file=path.join(dist,locale,source.slice(1),'index.html');
  if(!fs.existsSync(file))continue;
  const translated=extract(fs.readFileSync(file,'utf8'));
  for(const kind of Object.keys(es)){
   const spanishSet=new Set(es[kind].filter(s=>s.length>8&&spanishMarker.test(s)));
   const seen=new Set();
   for(const text of translated[kind]){
    if(!spanishSet.has(text)||seen.has(kind+'|'+text))continue;
    if(locale==='pt'&&nativePortugueseSameAsSource.has(text)){acceptedNativePortuguese++;continue;}
    seen.add(kind+'|'+text);
    matches.push({source,locale,kind,text,confidence:highlySpanish.test(text)?'high':'review'});
    routeCounts[locale+source]=(routeCounts[locale+source]||0)+1;
   }
  }
 }
}
const byKind={},byLocale={},byConfidence={};
for(const hit of matches){
 byKind[hit.kind]=(byKind[hit.kind]||0)+1;
 byLocale[hit.locale]=(byLocale[hit.locale]||0)+1;
 byConfidence[hit.confidence]=(byConfidence[hit.confidence]||0)+1;
}
const result={sourcesExamined:sources.length,localizedVariants:sources.length*2,
 sourceEqualSpanishMicrocopy:matches.length,validPortugueseSharedWithSource:acceptedNativePortuguese,byKind,byLocale,byConfidence,
 topRoutes:Object.entries(routeCounts).sort((a,b)=>b[1]-a[1]).slice(0,25),
 explanation:'Exact matches between visible PT/EN labels and Spanish source; high means clear Spanish language markers, review means editorial inspection needed. Proper names can be valid. This is NOT a production audit.',
 details:matches};
fs.writeFileSync(reportFile,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({...result,details:matches.slice(0,24)},null,2));
// Intentionally nonblocking: provides a ranked repair queue, not a publication gate.
