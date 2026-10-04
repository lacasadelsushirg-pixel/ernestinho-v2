import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {chromium} from 'playwright-core';
import {buildBrowserOptions} from './build_browser.mjs';
import {loadBuildLibraries} from './build_vendor.mjs';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const root=path.resolve(import.meta.dirname,'..'),dist=path.join(root,'dist');
const server=http.createServer((req,res)=>{let file=path.join(dist,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');if(!fs.existsSync(file))return res.writeHead(404).end();res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':'application/octet-stream');fs.createReadStream(file).pipe(res);});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch(await buildBrowserOptions());
const libraries=await loadBuildLibraries(),cache=new Map(),exec=promisify(execFile),rows=[];
fs.mkdirSync('/tmp/buzios-shots',{recursive:true});
try{
 for(const width of [1365,390]){
  const ctx=await browser.newContext({viewport:{width,height:900},isMobile:width===390,hasTouch:width===390});
  await ctx.route('**/*',async r=>{const u=r.request().url();if(new URL(u).origin===base)return r.continue();if(libraries.has(u))return r.fulfill({body:libraries.get(u),contentType:'text/javascript'});try{if(!cache.has(u))cache.set(u,exec('curl',['-fLsS','--max-time','25',u],{encoding:'buffer',maxBuffer:16*1024*1024}));const {stdout}=await cache.get(u);return r.fulfill({body:stdout,contentType:r.request().resourceType()==='image'?'image/jpeg':r.request().resourceType()==='stylesheet'?'text/css':'application/octet-stream'});}catch{return r.abort();}});
  const page=await ctx.newPage();
  for(const route of ['/destinos/buzios/','/destinos/buzios/playas/','/destinos/buzios/experiencias/paseo-barco/']){
   const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base+route+'?qa=1#bz-app',{waitUntil:'load'});await page.evaluate(async()=>{for(const s of document.querySelectorAll('script[type="module"][src]')){const m=await import(s.src);if(m.ready)await m.ready;}await document.fonts.ready;});
   await page.locator('.bz-hero').screenshot({path:'/tmp/buzios-shots/'+route.split('/').filter(Boolean).at(-1)+'-'+width+'.png'});
   const row={route,width,cycles:[],errors,brokenImages:await page.evaluate(()=>[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src))};
   for(const language of ['PT','EN','ES']){const selector=width===390?`.ec-mobile-language-row a[data-ec-language="${language}"]`:`.ec-desktop-language a[data-desktop-language="${language}"]`;const expected=(language==='ES'?'':'/'+language.toLowerCase())+route;await Promise.all([page.waitForURL(base+expected+'?qa=1#bz-app'),page.locator(selector).first().click()]);const value=await page.evaluate(()=>({pathname:location.pathname,search:location.search,hash:location.hash,overflow:document.documentElement.scrollWidth>innerWidth+1}));if(value.pathname!==expected||value.search!=='?qa=1'||value.hash!=='#bz-app'||value.overflow)throw Error('Locale cycle failed: '+JSON.stringify(value));row.cycles.push(value);}
   rows.push(row);
  }
  await page.goto(base+'/',{waitUntil:'load'});await page.locator('.home-buzios').scrollIntoViewIfNeeded();await page.locator('.home-buzios').screenshot({path:'/tmp/buzios-shots/home-block-'+width+'.png'});
  await ctx.close();
 }
}finally{await browser.close();server.close();}
const report={combinations:rows.length,realSelectorNavigations:rows.length*3,failures:rows.filter(r=>r.errors.length||r.brokenImages.length).length,rows};
fs.writeFileSync(path.join(root,'docs/buzios/QA_VISUAL_BUZIOS_V1.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(report.failures)process.exitCode=1;
