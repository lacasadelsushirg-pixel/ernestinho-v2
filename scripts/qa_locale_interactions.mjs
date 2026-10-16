// Compare Spanish main content/geometry and click the real URL selector.
import fs from 'node:fs';import path from 'node:path';import http from 'node:http';
import {execFile} from 'node:child_process';import {promisify} from 'node:util';import {chromium} from 'playwright-core';
import {loadBuildLibraries} from './build_vendor.mjs';
import {buildBrowserOptions} from './build_browser.mjs';
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
function makeServer(directory){return http.createServer((req,res)=>{let file=path.resolve(directory,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(directory+path.sep)&&file!==directory){res.writeHead(403).end();return;}if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');if(!fs.existsSync(file)){res.writeHead(404).end();return;}res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':'application/octet-stream');fs.createReadStream(file).pipe(res);});}
const server=makeServer(path.join(root,'dist')),sourceServer=makeServer(root);
await Promise.all([new Promise(r=>server.listen(0,'127.0.0.1',r)),new Promise(r=>sourceServer.listen(0,'127.0.0.1',r))]);
const base='http://127.0.0.1:'+server.address().port,sourceBase='http://127.0.0.1:'+sourceServer.address().port;
const libs=await loadBuildLibraries();const exec=promisify(execFile);const cache=new Map();const rows=[];
const browser=await chromium.launch(await buildBrowserOptions());
const hubs=['/','/guia/','/experiencias/','/gastronomia/','/cultura/','/vida-nocturna/','/compras/','/transportes/','/hospedaje/'];
fs.mkdirSync('/tmp/ec-seo-shots',{recursive:true});
async function run(width){const ctx=await browser.newContext({viewport:{width,height:width===390?844:900},isMobile:width===390,hasTouch:width===390});const page=await ctx.newPage();
 await ctx.route('**/*',async r=>{
  const req=r.request(),url=req.url();if([base,sourceBase].includes(new URL(url).origin))return r.continue();
  if(libs.has(url))return r.fulfill({body:libs.get(url),contentType:'text/javascript'});
  try{if(!cache.has(url))cache.set(url,exec('curl',['-fLsS','--max-time','20',url],{encoding:'buffer',maxBuffer:16*1024*1024}));const {stdout}=await cache.get(url);await r.fulfill({body:stdout,contentType:req.resourceType()==='stylesheet'?'text/css':req.resourceType()==='image'?'image/jpeg':'application/octet-stream'});}catch{await r.abort();}
 });
 const ready=async()=>page.evaluate(async()=>{for(const s of document.querySelectorAll('script[type="module"][src]'))if(new URL(s.src).origin===location.origin){const m=await import(s.src);if(m.ready)await m.ready;}await new Promise(r=>setTimeout(r,100));});
 const snapshot=()=>page.evaluate(async()=>{
  // Compare laid-out content, not content-visibility's provisional offscreen sizes.
  const style=document.createElement('style');style.textContent='main,main *{content-visibility:visible!important}';document.head.appendChild(style);
  await document.fonts.ready;
  await Promise.all([...document.images].filter(i=>i.loading!=='lazy').map(i=>i.decode().catch(()=>{})));
  await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
  const main=document.querySelector('main');
  const gallery=main?.querySelector(':scope > .ec-bulk-photo-gallery');
  const galleryInfo=gallery?{photos:gallery.querySelectorAll('img').length,label:gallery.getAttribute('aria-label')}:null;
  // The build serializes approved Hostinger photo references into a gallery
  // after rendering. It is shared media, not locale-dependent page geometry.
  // Keep it in the overflow/image checks, but omit it for source-vs-build size.
  const priorDisplay=gallery?.style.display;
  if(gallery)gallery.style.display='none';
  const rect=main?.getBoundingClientRect();
  if(gallery)gallery.style.display=priorDisplay;
  const value={main:main?.innerText,rect:rect?{x:rect.x,y:rect.y,width:rect.width,height:rect.height}:null,gallery:galleryInfo,overflow:document.documentElement.scrollWidth>innerWidth+1,broken:[...document.images].filter(i=>i.complete&&i.currentSrc&&i.naturalWidth===0).map(i=>i.currentSrc)};
  style.remove();return value;
 });
 for(const route of hubs){const row={route,width,problems:[],cycles:[]};
  await page.goto(sourceBase+route,{waitUntil:'load'});await page.evaluate(()=>localStorage.setItem('ec-lang','ES'));await ready();const source=await snapshot();
  await page.goto(base+route+'?localeQa=1#locale-proof',{waitUntil:'load'});await ready();const output=await snapshot();
  if(source.main!==output.main)row.problems.push('Spanish main text differs from source');
  if(source.rect&&output.rect&&Object.keys(source.rect).some(k=>Math.abs(source.rect[k]-output.rect[k])>1))row.problems.push('Main geometry differs '+JSON.stringify({source:source.rect,output:output.rect}));
  if(output.overflow)row.problems.push('Overflow');
  row.inheritedUnavailableImages=output.broken.filter(url=>source.broken.includes(url));
  const newBroken=output.broken.filter(url=>!source.broken.includes(url));
  if(newBroken.length)row.problems.push('New loaded image unavailable: '+newBroken.join(', '));
  if(route==='/'||route==='/hospedaje/')await page.screenshot({path:'/tmp/ec-seo-shots/'+(route==='/'?'home':'stay')+'-'+width+'-ES.png'});
  for(const language of ['PT','EN','ES']){
   const selector=width===390?`.ec-mobile-language-row a[data-ec-language="${language}"]`:`.ec-desktop-language a[data-desktop-language="${language}"]`;
   const pathname=(language==='ES'?'':'/'+language.toLowerCase())+route;
   await Promise.all([page.waitForURL(base+pathname+'?localeQa=1#locale-proof'),page.locator(selector).first().click()]);await ready();
   const actual=await page.evaluate(()=>({path:location.pathname,search:location.search,hash:location.hash,lang:document.documentElement.lang,overflow:document.documentElement.scrollWidth>innerWidth+1,highlights:(()=>{const section=document.querySelector('.home-highlights');return section?{label:section.getAttribute('aria-label'),cards:[...section.querySelectorAll('.home-highlight')].slice(1).map(card=>({text:card.innerText,alt:card.querySelector('img')?.alt}))}:null})()}));
   if(actual.path!==pathname||actual.search!=='?localeQa=1'||actual.hash!=='#locale-proof')row.problems.push('Selector lost equivalent URL/query/hash '+language);
   if(actual.overflow)row.problems.push('Overflow '+language);
   if(route==='/'&&actual.highlights){
    const expected={ES:{label:'Río en vivo, Ernestinho en TV y eventos',media:'Enlaces originales a programas, entrevistas y coberturas en Chile y Argentina.',event:'Fiestas, festivales y encuentros para sumar a tu viaje.',mediaAlt:'Ernestinho durante una aparición en televisión',eventAlt:'Eventos de Río de Janeiro'},PT:{label:'Rio ao vivo, Ernestinho na TV e eventos',media:'Links originais para programas, entrevistas e reportagens no Chile e na Argentina.',event:'Festas, festivais e encontros para incluir na sua viagem.',mediaAlt:'Ernestinho durante uma participação na televisão',eventAlt:'Eventos do Rio de Janeiro'},EN:{label:'Rio live, Ernestinho on TV and events',media:'Original links to TV programs, interviews and coverage in Chile and Argentina.',event:'Festivals and gatherings to add to your trip.',mediaAlt:'Ernestinho during a television appearance',eventAlt:'Events in Rio de Janeiro'}}[language];
    const [media,event]=actual.highlights.cards;
    if(actual.highlights.label!==expected.label||!media.text.includes(expected.media)||!event.text.includes(expected.event)||media.alt!==expected.mediaAlt||event.alt!==expected.eventAlt)row.problems.push('Home highlight card copy/alt is not localized '+language);
   }
   row.cycles.push(actual);
  }
  rows.push(row);
 }
 await ctx.close();
}
try{await Promise.all([run(390),run(1365)]);}finally{await browser.close();server.close();sourceServer.close();}
const summary={combinations:rows.length,realSelectorNavigations:rows.length*3,failed:rows.filter(r=>r.problems.length).length,rows};
fs.writeFileSync(path.join(root,'docs/seo/QA_INTERACTIONS.json'),JSON.stringify(summary,null,2));console.log(JSON.stringify(summary,null,2));if(summary.failed)process.exitCode=1;
