#!/usr/bin/env node
// Read-only QA of generated HTML from an isolated --routes build.
// Example: node scripts/verify_rendered_editorial.mjs --routes=/gastronomia/adega-perola/
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const input=process.argv.find(x=>x.startsWith('--routes='))?.slice('--routes='.length);
if(!input)throw Error('Explicit --routes required. No full-site scan is permitted.');
const routes=input.split(',').filter(Boolean);
const names={
 compras:['compras-01.js','rio-residual-compras-01.js'],
 gastronomia:['gastronomia-01.js','gastronomia-02.js','gastronomia-03.js','rio-residual-gastronomia-01.js','page-fixes-01.js']
};
const dictionaries={};
for(const [section,files] of Object.entries(names)){
 dictionaries[section]={};
 for(const filename of files){
  const module=await import(pathToFileURL(path.join(root,'assets/js/translations/chunks',filename)).href);
  Object.assign(dictionaries[section],module.default||{});
 }
}
const decode=s=>s
 .replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16)))
 .replace(/&#([0-9]+);/g,(_,n)=>String.fromCodePoint(Number(n)))
 .replace(/&nbsp;/gi,' ').replace(/&amp;/gi,'&')
 .replace(/&quot;/gi,'"').replace(/&apos;/gi,"'")
 .replace(/&lt;/gi,'<').replace(/&gt;/gi,'>');
const norm=s=>decode(s).replace(/\s+/g,' ').trim();
const withoutScripts=s=>s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'')
 .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'')
 .replace(/<!--[ \s\S]*?-->/g,'');
const visible=s=>norm(withoutScripts(s).replace(/<[^>]+>/g,' '));
let checked=0;const errors=[];
for(const route of routes){
 if(!/^\/(compras|gastronomia)\/[^/]+\/$/.test(route))throw Error('Unsupported route '+route);
 const section=route.split('/')[1];
 const source=path.join(root,route.slice(1),'index.html');
 if(!fs.existsSync(source))throw Error('Source not found '+route);
 const clean=withoutScripts(fs.readFileSync(source,'utf8'));
 const blocks=[...new Set([...clean.matchAll(/<(p|h[1-6]|li|div|span)\b[^>]*>([^<>]+)<\/\1>/gi)]
  .map(m=>norm(m[2])).filter(s=>s.length>=100))];
 for(const lang of ['pt','en']){
  const dest=path.join(root,'dist',lang,route.slice(1),'index.html');
  if(!fs.existsSync(dest)){errors.push(lang+route+': missing generated file');continue}
  const html=fs.readFileSync(dest,'utf8');
  if(!html.includes('rel="canonical"'))errors.push(lang+route+': missing canonical');
  if(!html.includes('hreflang'))errors.push(lang+route+': missing hreflang');
  const body=visible(html);
  if(process.argv.includes('--diagnostics')){
   const longParagraphs=[...withoutScripts(html).matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map(m=>norm(m[1].replace(/<[^>]+>/g,' '))).filter(t=>t.length>100).slice(0,5);
   console.log('RENDERED '+lang+route+' '+JSON.stringify(longParagraphs.map(t=>t.slice(0,410))));
  }
  for(const block of blocks){
   const hit=dictionaries[section][block]?.[lang.toUpperCase()];
   if(!hit){errors.push(lang+route+': missing dictionary key '+block.slice(0,65));continue}
   checked++;
   if(!body.includes(norm(hit))){
    const sourceText=norm(block),translation=norm(hit);
    errors.push(lang+route+': translated visible paragraph absent '+block.slice(0,65)
      +' | originalStillVisible='+body.includes(sourceText)
      +' | originalPrefix='+body.includes(sourceText.slice(0,72))
      +' | translatedPrefix='+body.includes(translation.slice(0,72))
      +' | langTag='+html.match(/<html[^>]*lang=["']([^"']+)/i)?.[1]);
   }
  }
 }
}
console.log(JSON.stringify({routes:routes.length,checkedTranslatedBlocks:checked,failures:errors.length,examples:errors.slice(0,96)},null,2));
if(errors.length)process.exitCode=1;
