#!/usr/bin/env node
// Read-only editorial i18n coverage audit. Does not build pages or modify files.
// Usage: node scripts/audit_editorial_translations.mjs [--min-length=100] [--json] [--routes=/gastronomia/adega-perola/,/compras/uruguaiana/]
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const args=process.argv.slice(2);
const minLength=Number(args.find(a=>a.startsWith('--min-length='))?.split('=')[1]||100);
if(!Number.isSafeInteger(minLength)||minLength<30)throw Error('Invalid min length');
const requested=args.find(a=>a.startsWith('--routes='))?.slice('--routes='.length).split(',').filter(Boolean)||[];
const asJson=args.includes('--json');
const modules={
 compras:['compras-01.js','rio-residual-compras-01.js'],
 gastronomia:['gastronomia-01.js','gastronomia-02.js','gastronomia-03.js','rio-residual-gastronomia-01.js','page-fixes-01.js']
};
const dictionaries={};
for(const [section,files] of Object.entries(modules)){
 dictionaries[section]={};
 for(const file of files){
  const filepath=path.join(root,'assets/js/translations/chunks',file);
  if(!fs.existsSync(filepath))throw Error('Missing dictionary '+file);
  Object.assign(dictionaries[section],(await import(pathToFileURL(filepath).href)).default||{});
 }
}
function* scan(dir,section){
 if(!fs.existsSync(dir))return;
 for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
  const p=path.join(dir,entry.name);
  if(entry.isDirectory())yield* scan(p,section);
  else if(entry.name==='index.html')yield {file:p,section};
 }
}
const sources=requested.length?requested.map(route=>{
 const section=route.split('/').filter(Boolean)[0];
 if(!modules[section])throw Error('Unsupported section: '+section);
 const file=path.join(root,route.replace(/^\//,'').replace(/\/$/,'')+'/index.html');
 if(!fs.existsSync(file))throw Error('Route source missing: '+route);
 return {file,section};
}):Object.keys(modules).flatMap(section=>[...scan(path.join(root,section),section)]);
const strip=html=>html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<!--[\s\S]*?-->/g,'');
const entities=x=>x.replace(/&nbsp;/gi,' ').replace(/&amp;/gi,'&').replace(/&quot;/gi,'"').replace(/&#39;|&apos;/gi,"'").replace(/&lt;/gi,'<').replace(/&gt;/gi,'>');
const result=[];
for(const {file,section} of sources){
 const html=strip(fs.readFileSync(file,'utf8'));
 const blocks=[...new Set([...html.matchAll(/<(p|h[1-6]|li|div|span)\b[^>]*>([^<>]+)<\/\1>/gi)]
  .map(match=>entities(match[2]).trim().replace(/\s+/g,' '))
  .filter(text=>text.length>=minLength))];
 const dictionary=dictionaries[section];
 const missing=blocks.filter(text=>!dictionary[text]?.PT||!dictionary[text]?.EN);
 result.push({route:'/ '+path.relative(root,file).replaceAll(path.sep,'/').replace(/index\.html$/,'').trim(),section,blocks:blocks.length,translated:blocks.length-missing.length,missing:missing.map(x=>({chars:x.length,excerpt:x.slice(0,150)}))});
}
result.forEach(r=>{r.route=r.route.replace(/^\/\s+/,'/');});
const totals={files:result.length,blocks:result.reduce((n,x)=>n+x.blocks,0),translated:result.reduce((n,x)=>n+x.translated,0),missing:result.reduce((n,x)=>n+x.missing.length,0)};
if(asJson)console.log(JSON.stringify({totals,results:result},null,2));
else{
 console.log('READ-ONLY editorial i18n audit (source-visible text only; NOT a live-site or build check)');
 console.log(JSON.stringify(totals));
 for(const r of result.filter(r=>r.missing.length))console.log(r.route+' '+r.translated+'/'+r.blocks+'; missing: '+r.missing.map(x=>x.excerpt).join(' | '));
}
if(requested.length&&totals.missing>0)process.exitCode=2;
