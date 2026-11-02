#!/usr/bin/env node
// Checks repaired legacy inline paragraph dictionaries without deployment.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import shared from '../assets/js/translations/chunks/rio-residual-gastronomia-01.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const slugs=[
 'adega-perola','churrascaria-palace','rio-scenarium','lasai',
 'angu-do-gomes','assador','confeitaria-colombo','cachambeer',
 'carretao-siqueira','casa-do-sardo','bb-lanches','cavalo-marinho',
 'confeitaria-manon','casa-porto','ferro-e-farinha','gurume',
 'jobi','arab-leblon','coisas-de-bamba','spesso','eclipse'
];
const rendered=process.argv.includes('--rendered');
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
  for(const j of [7,9]){
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
  for(const j of [7,9]){
   const expected=tidy(entries[j]),actual=target[j]||'';
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
