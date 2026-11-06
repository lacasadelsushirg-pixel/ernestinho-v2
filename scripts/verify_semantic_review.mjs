#!/usr/bin/env node
// Regression gate for every manually reviewed alternative, including displaced
// paragraphs that a Spanish-absence check cannot detect. Isolated dist only.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const review=JSON.parse(fs.readFileSync(path.join(root,'docs/seo/revision-semantica-212-20261102.json'),'utf8'));
const decode=s=>s.replace(/&#x([a-f\d]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16)))
 .replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n)).replace(/&nbsp;/gi,' ')
 .replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&apos;/g,"'");
const text=s=>decode(s.replace(/<[^>]*>/g,'')).replace(/\s+/g,' ').trim();
const clean=s=>s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'');
const paragraphs=s=>[...s.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map(m=>text(m[1]));
const errors=[];let checked=0;
for(const row of review.details){
 const file=path.join(root,'dist',row.locale,row.route.slice(1),'index.html');
 if(!fs.existsSync(file)){errors.push({id:row.id,error:'missing HTML'});continue;}
 const html=clean(fs.readFileSync(file,'utf8'));
 const actual=row.scope==='shared-footer'
  ?[...html.matchAll(/<footer\b[^>]*>([\s\S]*?)<\/footer>/gi)].flatMap(m=>paragraphs(m[1])).join(' ')
  :row.scope==='attribute'
   ?text(html.match(new RegExp('<div\\b[^>]*'+row.attribute+'=[\"\']'+row.attributeValue+'[\"\'][^>]*>([\\s\\S]*?)<\\/div>','i'))?.[1]||'')
   :paragraphs(html)[row.paragraphIndex];
 if(actual!==row.expectedAfter)errors.push({id:row.id,route:row.route,locale:row.locale,index:row.paragraphIndex,expected:row.expectedAfter,actual});
 checked++;
}
// Majórica uses an array rather than the indexed D object used by the other
// legacy pages. Assert every slot, including advice, area and map positions.
const source=fs.readFileSync(path.join(root,'gastronomia/majorica/index.html'),'utf8');
const major=JSON.parse(source.match(/\},D=(\{.*?\}),O=\[\],P=\[/s)[1]);
for(const locale of ['pt','en']){
 const rendered=paragraphs(clean(fs.readFileSync(path.join(root,'dist',locale,'gastronomia/majorica/index.html'),'utf8')));
 major[locale].forEach((expected,index)=>{if(rendered[index]!==text(expected))errors.push({route:'/gastronomia/majorica/',locale,index,error:'array dictionary displaced'});checked++;});
}
const manifest=JSON.parse(fs.readFileSync(path.join(root,'dist/locale-manifest.json'),'utf8'));
let headers=0;
for(const row of manifest.routes.filter(x=>/^\/gastronomia\/[^/]+\/$/.test(x.source)&&x.generated!==false)){
 const html=fs.readFileSync(path.join(root,'dist',row.route.slice(1),'index.html'),'utf8');
 if(!/<header\b[^>]*class=["'][^"']*\btopbar\b/.test(html))errors.push({route:row.route,error:'locale prefix suppressed shared header'});
 headers++;
}
const result={reviewedAlternatives:review.count,semanticAndArrayChecks:checked,localizedHeaders:headers,failures:errors.length,errors};
fs.writeFileSync(path.join(root,'dist/audit-semantic-review.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({...result,errors:errors.slice(0,15)},null,2));
if(review.count!==212||review.details.length!==212||errors.length)process.exitCode=1;
