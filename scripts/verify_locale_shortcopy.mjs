#!/usr/bin/env node
// Fail for untranslated short visible HTML in a tightly scoped isolated build.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const items=[
 {route:'gastronomia/polis-sucos',selector:'notice',text:{
  pt:'A marca possui mais de uma unidade em Ipanema; confira o endereço escolhido antes de pedir o carro.',
  en:'Polis Sucos has more than one Ipanema location; check the address before booking a ride.'
 }},
 {route:'gastronomia/adega-perola',selector:'map',text:{pt:'Mapa e como chegar',en:'Map and directions'}},
 {route:'gastronomia/churrascaria-palace',selector:'map',text:{pt:'Mapa e como chegar',en:'Map and directions'}}
];
let checked=0;const failures=[];
for(const item of items)for(const [lang,want] of Object.entries(item.text)){
 const file=path.join(root,'dist',lang,item.route,'index.html');
 if(!fs.existsSync(file)){failures.push(lang+'/'+item.route+': file missing');continue;}
 const html=fs.readFileSync(file,'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');
 const re=item.selector==='notice'?/<div class="notice"[^>]*>([^<]+)<\/div>/gi:/<h2\b[^>]*>([^<]+)<\/h2>/gi;
 const found=[...html.matchAll(re)].map(x=>x[1].trim());
 if(!found.includes(want))failures.push(lang+'/'+item.route+': expected '+want+', found '+found.filter(x=>/Mapa|map|marca|Polis/.test(x)).join(' // '));
 if(lang==='en'&&found.some(x=>x==='Mapa y cómo llegar'))failures.push(lang+'/'+item.route+': Spanish map heading remains');
 checked++;
}
console.log(JSON.stringify({checked,errors:failures.length,failures},null,2));
if(failures.length)process.exitCode=1;
