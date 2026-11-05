import {chromium} from 'playwright-core';
import {buildBrowserOptions} from './build_browser.mjs';
import fs from 'node:fs';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const run=promisify(execFile), cache=new Map();
const smoke=process.env.EC_QA_SMOKE==='1';
const out=process.env.EC_QA_OUTPUT||'/tmp/buzios-parity-qa';fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch(await buildBrowserOptions());
const context=await browser.newContext();
await context.addInitScript(()=>{localStorage.setItem('ec-lang',location.pathname.startsWith('/pt/')?'PT':location.pathname.startsWith('/en/')?'EN':'ES');});
await context.route('**/*',async route=>{
 const u=route.request().url();
 if(smoke&&route.request().resourceType()==='image')return route.abort();
 if(u.startsWith('http://127.0.0.1:8766/'))return route.continue();
 if(!/^https?:/.test(u))return route.continue();
 if(!cache.has(u))cache.set(u,run('curl',['-LsS','--max-time','35','-w','\n%{http_code}\n%{content_type}',u],{encoding:'buffer',maxBuffer:24e6}).then(({stdout:b})=>{const n=b.lastIndexOf(10),m=b.lastIndexOf(10,n-1);return {body:b.subarray(0,m),status:Number(b.subarray(m+1,n).toString())||502,contentType:b.subarray(n+1).toString()||'application/octet-stream'};}).catch(()=>({status:502,body:''})));
 await route.fulfill(await cache.get(u));
});
const results=[];
for(const width of [1440,390]){
 const p=await context.newPage();await p.setViewportSize({width,height:950});
 for(const locale of ['','pt/','en/'])for(const path of (smoke?['','guia/','experiencias/','comer-y-salir/','que-hacer/','playas/','barrios/','transportes/','consejos/','eventos/','vida-nocturna/','alojamiento/','comer-y-salir/rocka/','barrios/tartaruga/'].map(s=>'destinos/buzios/'+s):['fotografia/','destinos/buzios/fotografias/','destinos/buzios/','destinos/buzios/guia/','destinos/buzios/playas/','destinos/buzios/playas/rasa/'])){
  if(locale&&path==='fotografia/')continue;
  const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto('http://127.0.0.1:8766/'+locale+path,{waitUntil:'networkidle',timeout:90000});
  await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});
  await p.evaluate(()=>document.querySelectorAll('img').forEach(i=>i.loading='eager'));
  if(!smoke)await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=800){scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,35));}await Promise.race([Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))),new Promise(r=>setTimeout(r,40000))]);scrollTo({top:0,behavior:'instant'});});
  await p.waitForTimeout(200);
  const data=await p.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,h1:document.querySelector('h1')?.textContent,nav:document.querySelectorAll('.bz-destination-nav').length,footer:document.querySelectorAll('.ec-corporate-footer').length,cards:document.querySelectorAll('.photo-grid .spot').length,broken:[...document.querySelectorAll('.photo-thumb')].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),card:document.querySelector('.spot')?Object.fromEntries(['backgroundColor','borderRadius','fontFamily'].map(k=>[k,getComputedStyle(document.querySelector('.spot'))[k]])):null,columns:document.querySelector('.photo-grid')?getComputedStyle(document.querySelector('.photo-grid')).gridTemplateColumns:null}));
  const key=(locale+path).replaceAll('/','-')+width;
  if(path.includes('fotograf'))await p.screenshot({path:out+'/'+key+'.png',fullPage:true});
  results.push({path:'/'+locale+path,width,...data,errors});console.log(JSON.stringify(results.at(-1)));
 }
 await p.close();
}
fs.writeFileSync(out+'/results.json',JSON.stringify(results,null,2));await browser.close();
if(results.some(r=>r.scroll>r.width||r.errors.length||r.path.includes('/destinos/buzios/')&&(r.nav!==1||r.footer!==1)||r.path.includes('/destinos/buzios/fotografias/')&&(r.cards!==12||r.broken.length)))process.exitCode=1;
