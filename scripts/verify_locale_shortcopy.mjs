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
 {route:'gastronomia/churrascaria-palace',selector:'map',text:{pt:'Mapa e como chegar',en:'Map and directions'}},
 {route:'gastronomia/lasai',selector:'caption',text:{pt:'O ambiente que define a experiência',en:'The atmosphere that defines the experience'}},
 {route:'gastronomia/adega-perola',selector:'alt',text:{pt:'A fachada e a chegada ao restaurante',en:'The façade and arrival at the restaurant'}},
 {route:'gastronomia/churrascaria-palace',selector:'alt',text:{pt:'A fachada e a chegada ao restaurante',en:'The façade and arrival at the restaurant'}},
 {route:'gastronomia/lasai',selector:'alt',text:{pt:'Lasai: prato ou bebida',en:'Lasai: dish or drink'}},
 {route:'compras/feira-sao-cristovao',selector:'rec',text:{pt:'Eu não tentaria conhecer tudo em uma visita.',en:'I would not try to see everything in one visit.'}},
 {route:'compras/feira-sao-cristovao',selector:'family',text:{pt:'Pode funcionar para famílias, casais e viajantes.',en:'It can work for families, couples and solo travelers.'}}
];
let checked=0;const failures=[];
for(const item of items)for(const [lang,want] of Object.entries(item.text)){
 const file=path.join(root,'dist',lang,item.route,'index.html');
 if(!fs.existsSync(file)){failures.push(lang+'/'+item.route+': file missing');continue;}
 const html=fs.readFileSync(file,'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');
 const re=item.selector==='notice'?/<div class="notice"[^>]*>([^<]+)<\/div>/gi:item.selector==='caption'?/<figcaption\b[^>]*>([^<]+)<\/figcaption>/gi:item.selector==='alt'?/<img\b[^>]*\balt="([^"]+)"/gi:item.selector==='rec'?/<p\b[^>]*id="rec"[^>]*>([^<]+)<\/p>/gi:item.selector==='family'?/<p\b[^>]*id="family"[^>]*>([^<]+)<\/p>/gi:/<h2\b[^>]*>([^<]+)<\/h2>/gi;
 const found=[...html.matchAll(re)].map(x=>x[1].trim());
 if(!found.some(x=>x.includes(want)))failures.push(lang+'/'+item.route+': expected '+want+', found '+found.map(x=>x.slice(0,100)).join(' // '));
 if(['rec','family'].includes(item.selector)&&found.some(x=>/Yo no intentaría conocerlo todo|Puede funcionar muy bien para familias/.test(x)))failures.push(lang+'/'+item.route+': Spanish source remains in '+item.selector);
 if(lang==='en'&&found.some(x=>x==='Mapa y cómo llegar'))failures.push(lang+'/'+item.route+': Spanish map heading remains');
 checked++;
}
console.log(JSON.stringify({checked,errors:failures.length,failures},null,2));
if(failures.length)process.exitCode=1;
