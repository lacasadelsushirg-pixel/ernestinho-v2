import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {chromium} from 'playwright-core';
import {buildBrowserOptions} from './build_browser.mjs';
import {loadBuildLibraries} from './build_vendor.mjs';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {BOUNCE_IMAGES} from '../assets/js/bounce.js';
const root=path.resolve(import.meta.dirname,'..'),dist=path.join(root,'dist');
const server=http.createServer((req,res)=>{let file=path.join(dist,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');if(!fs.existsSync(file))return res.writeHead(404).end();res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':'application/octet-stream');fs.createReadStream(file).pipe(res);});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch(await buildBrowserOptions());
const libraries=await loadBuildLibraries(),cache=new Map(),exec=promisify(execFile),rows=[];
// Reuse the exact HTTP-downloaded files already inspected, without substituting creatives.
for(const [locale,variants] of Object.entries(BOUNCE_IMAGES))for(const [variant,url] of Object.entries(variants)){const file='/tmp/bounce-images/'+locale+'-'+({vertical:'v',compact:'c',wide:'w'}[variant])+'.png';if(fs.existsSync(file))cache.set(url,Promise.resolve({stdout:fs.readFileSync(file)}));}
const routeFilter=process.argv.find(a=>a.startsWith('--routes='))?.slice(9).split(',');
const reportPath=process.argv.find(a=>a.startsWith('--output='))?.slice(9)||'docs/buzios/QA_VISUAL_BUZIOS_V15.json';
fs.mkdirSync('/tmp/buzios-v15-shots',{recursive:true});
try{
 for(const width of [1365,390]){
  const ctx=await browser.newContext({viewport:{width,height:900},isMobile:width===390,hasTouch:width===390});
  await ctx.addInitScript(()=>{window.__bounceEvents=[];window.gtag=(...args)=>window.__bounceEvents.push(args);});
  await ctx.route('**/*',async r=>{const u=r.request().url();if(new URL(u).origin===base)return r.continue();if(libraries.has(u))return r.fulfill({body:libraries.get(u),contentType:'text/javascript'});try{if(!cache.has(u))cache.set(u,exec('curl',['-fLsS','--max-time','25',u],{encoding:'buffer',maxBuffer:16*1024*1024}));const {stdout}=await cache.get(u);return r.fulfill({body:stdout,contentType:r.request().resourceType()==='image'?'image/jpeg':r.request().resourceType()==='stylesheet'?'text/css':'application/octet-stream'});}catch{return r.abort();}});
  const page=await ctx.newPage();
  for(const route of ['/destinos/buzios/','/destinos/buzios/playas/','/destinos/buzios/alojamiento/','/destinos/buzios/experiencias/paseo-barco/','/guia/guarda-equipaje/','/guia/','/guia/aeropuertos/','/hospedaje/'].filter(r=>!routeFilter||routeFilter.includes(r))){
   const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base+route+'?qa=1#bz-app',{waitUntil:'load'});await page.evaluate(async()=>{for(const s of document.querySelectorAll('script[type="module"][src]')){const m=await import(s.src);if(m.ready)await m.ready;}await document.fonts.ready;});
   await page.evaluate(async()=>{for(const image of document.querySelectorAll('img')){if(image.src.includes('/assets/images/buzios/')||image.src.includes('/v179115')){image.loading='eager';try{await image.decode();}catch{}}}});
   const row={route,width,cycles:[],errors,brokenImages:await page.evaluate(()=>[...document.images].filter(i=>(i.src.includes('/assets/images/buzios/')||i.src.includes('/v179115')||location.pathname.includes('/destinos/'))&&i.complete&&i.naturalWidth===0).map(i=>i.src))};
   await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:'/tmp/buzios-v15-shots/'+route.split('/').filter(Boolean).at(-1)+'-'+width+'.png'});
   if(route==='/destinos/buzios/'){await page.evaluate(()=>scrollTo({top:document.querySelector('.bz-portal').offsetTop,behavior:'instant'}));await page.screenshot({path:'/tmp/buzios-v15-shots/portal-cards-'+width+'.png'});}
   if(route==='/guia/'){await page.locator('#ec-luggage-guide-card').screenshot({path:'/tmp/buzios-v15-shots/guide-thumbnail-'+width+'.png'});}
   if(route==='/guia/guarda-equipaje/'){
    await page.locator('[data-bounce-source]').first().scrollIntoViewIfNeeded();await page.waitForTimeout(250);
    await page.evaluate(()=>{const a=document.querySelector('[data-bounce-click]');a.addEventListener('click',e=>e.preventDefault());a.click();});
    const events=await page.evaluate(()=>window.__bounceEvents);for(const name of ['bounce_view','bounce_click'])if(!events.some(e=>e[1]===name&&e[2].bounce_source==='guia-equipaje'))throw Error('Bounce tracking missing: '+name);row.tracking=events;
   }
   for(const language of ['PT','EN','ES']){const selector=width===390?`.ec-mobile-language-row a[data-ec-language="${language}"]`:`.ec-desktop-language a[data-desktop-language="${language}"]`;const expected=(language==='ES'?'':'/'+language.toLowerCase())+route;await Promise.all([page.waitForURL(base+expected+'?qa=1#bz-app'),page.locator(selector).first().click()]);await page.evaluate(async()=>{for(const s of document.querySelectorAll('script[type="module"][src]')){const m=await import(s.src);if(m.ready)await m.ready;}});const value=await page.evaluate(()=>({pathname:location.pathname,search:location.search,hash:location.hash,overflow:document.documentElement.scrollWidth>innerWidth+1}));if(value.pathname!==expected||value.search!=='?qa=1'||value.hash!=='#bz-app'||value.overflow)throw Error('Locale cycle failed: '+JSON.stringify(value));await page.evaluate(async()=>{for(const image of document.querySelectorAll('[data-bounce-source] img')){image.loading='eager';try{await image.decode();}catch{}}});
    const banners=await page.evaluate(()=>[...document.querySelectorAll('[data-bounce-source]')].map(n=>({language:n.dataset.bounceLanguage,variant:n.dataset.bounceVariant,src:n.querySelector('img').src,loaded:n.querySelector('img').naturalWidth>0,href:n.querySelector('a').href})));
    if(banners.some(n=>n.language!==language||!n.loaded||n.href!=='https://go.bounce.com/ERNESTINHO8980973466'))throw Error('Bounce locale/image/link failed: '+route+' '+language+' '+JSON.stringify(banners));row.cycles.push({...value,banners});}
   rows.push(row);
  }
  await page.goto(base+'/',{waitUntil:'load'});await page.locator('.home-buzios').scrollIntoViewIfNeeded();await page.locator('.home-buzios').screenshot({path:'/tmp/buzios-v15-shots/home-block-'+width+'.png'});
  await ctx.close();
 }
}finally{await browser.close();server.close();}
const report={combinations:rows.length,realSelectorNavigations:rows.length*3,failures:rows.filter(r=>r.errors.length||r.brokenImages.length).length,rows};
fs.writeFileSync(path.resolve(root,reportPath),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(report.failures)process.exitCode=1;
