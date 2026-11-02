#!/usr/bin/env node
// Checks repaired legacy inline paragraph dictionaries without deployment.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import shared from '../assets/js/translations/chunks/rio-residual-gastronomia-01.js';
import {pathToFileURL} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const slugs=[
 'adega-perola','churrascaria-palace','rio-scenarium','lasai',
 'angu-do-gomes','assador','confeitaria-colombo','cachambeer',
 'carretao-siqueira','casa-do-sardo','bb-lanches','cavalo-marinho',
 'confeitaria-manon','casa-porto','ferro-e-farinha','gurume',
 'jobi','arab-leblon','coisas-de-bamba','spesso','eclipse',
 'aipo-aipim-391','aipo-aipim-605','bar-da-gema','cafe-do-alto',
 'aipo-aipim-920','cabanna','bar-luiz',
 'nova-capela','pesqueiro','kilograma-centro','point-de-grumari',
 'temperarte-posto6','xian','shiso','sabor-das-aguas','rufino-parrilla',
 'prana','oro','sushi-leblon','don-pascual',
 'nino-cucina-ipanema','temperarte-bolivar',
 'joaquina','pilograma-prime-grill','nido-ristorante','delirio','bira-de-guaratiba','bafo-da-prainha'
];
const rendered=process.argv.includes('--rendered');
const acceptedPositions=JSON.parse(fs.readFileSync(path.join(root,'docs/seo/variantes-posicionales-validas-20261102.json'),'utf8'));
const allShared={};
for(const name of ['common-02.js','metadata-01.js','metadata-02.js','gastronomia-01.js','gastronomia-02.js','gastronomia-03.js','rio-residual-gastronomia-01.js','page-fixes-01.js']) Object.assign(allShared,(await import(pathToFileURL(path.join(root,'assets/js/translations/chunks',name)).href)).default||{});
const tidy=s=>String(s||'').replace(/<[^>]*>/g,' ').replace(/&nbsp;/gi,' ')
 .replace(/&amp;/gi,'&').replace(/&quot;/gi,'"').replace(/&#39;/g,"'")
 .replace(/&#(\d+);/g,(_,d)=>String.fromCodePoint(Number(d)))
 .replace(/\s+/g,' ').trim();
const paragraphs=s=>[...s.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map(m=>tidy(m[1]));
let checked=0,slots=0;const errors=[];
for(const slug of slugs){
 const route='/gastronomia/'+slug+'/',file=path.join(root,'gastronomia',slug,'index.html');
 const src=fs.readFileSync(file,'utf8'),bodyStart=src.indexOf('<body');
 const spanish=paragraphs(src.slice(bodyStart,src.indexOf('<script',bodyStart)));
 const at=src.indexOf('const D='),end=src.indexOf(",P=[...document.querySelectorAll('p')]",at);
 if(at<0||end<0||spanish.length<11){errors.push(slug+': missing source dictionary or paragraphs');continue}
 let dictionary;try{dictionary=JSON.parse(src.slice(at+8,end))}
 catch{errors.push(slug+': invalid source dictionary');continue}
 for(const lang of ['pt','en']){
  const entries=dictionary[lang]||{},count=Object.keys(entries).length;
  if(count!==spanish.length)errors.push(lang+route+': '+count+' slots for '+spanish.length+' paragraphs');
  slots+=count;
  for(const j of (slug==='bar-luiz'?[7]:slug==='nido-ristorante'?[]:[7,9])){
   if(/^[📍🏘🕐💰🍽☎📅♿🚇]/u.test(spanish[j]))continue;
   const expected=shared[spanish[j]]?.[lang.toUpperCase()];
   if(!expected||tidy(entries[j])!==tidy(expected))
    errors.push(lang+route+': source paragraph '+j+' not aligned to expected translation');
  }
  if(!rendered)continue;
  const dest=path.join(root,'dist',lang,'gastronomia',slug,'index.html');
  if(!fs.existsSync(dest)){errors.push(lang+route+': generated HTML missing');continue}
  const html=fs.readFileSync(dest,'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'')
   .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'');
  const target=paragraphs(html.slice(html.indexOf('<body')));
  for(let j=0;j<spanish.length;j++){
   const expected=tidy(entries[j]),actual=target[j]||'';
   const sharedAlternative=tidy(allShared[spanish[j]]?.[lang.toUpperCase()]);
   if(actual!==expected && (!sharedAlternative || actual!==sharedAlternative) && !acceptedPositions.some(x=>x.route===route&&x.locale===lang&&x.index===j&&tidy(x.accepted)===actual))
    errors.push(lang+route+': paragraph '+j+' differs from both aligned dictionary and shared translation: '+actual.slice(0,90));
   if((j!==7&&j!==9)||/^[📍🏘🕐💰🍽☎📅♿🚇]/u.test(spanish[j]))continue;
   if(expected&&!actual.includes(expected.slice(0,Math.min(45,expected.length))))
    errors.push(lang+route+': rendered paragraph '+j+' displaced or missing');
   if(actual.includes(spanish[j].slice(0,Math.min(75,spanish[j].length))))
    errors.push(lang+route+': Spanish paragraph '+j+' still rendered');
  }
 }
 checked++;
}
console.log(JSON.stringify({routes:checked,localeSlots:slots,rendered,failures:errors.length,examples:errors.slice(0,70)},null,2));
if(errors.length)process.exitCode=1;
