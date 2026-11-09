// Visual-only QA: renders current branch in isolation, takes 1440/390px screenshots.
// This is NOT a deploy and never writes inside the repository or public_html.
// To run: npm install && node scripts/audit_petropolis_visual.mjs --out=/tmp/petropolis-visual
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import { chromium } from 'playwright-core';
import { buildBrowserOptions } from './build_browser.mjs';
import { verifyApprovedContent } from './guard_approved_content.mjs';
import { root, pre } from './buzios_mirror_core.mjs';
import { renderRegionalRoute, regionalRoutes } from './build_regional_destinations.mjs';

verifyApprovedContent(root);
const selected = [
  '/destinos/petropolis/fotografias/',
  '/destinos/petropolis/barrios/',
  '/destinos/petropolis/barrios/valparaiso/',
  '/destinos/petropolis/cultura/',
  '/destinos/petropolis/cultura/casa-stefan-zweig/',
  '/destinos/petropolis/transportes/onibus/',
];
for (const route of selected) if (!regionalRoutes.includes(route)) throw Error('Missing selected route: ' + route);
const outArg = process.argv.find(a => a.startsWith('--out='));
const out = path.resolve(outArg ? outArg.slice(6) : path.join(os.tmpdir(), 'ernestinho-petropolis-visual'));
const temp = path.resolve(os.tmpdir());
if (out === temp || !out.startsWith(temp + path.sep)) throw Error('Visual output must be inside a dedicated temporary folder');
fs.mkdirSync(out, { recursive:true });
const recorded = [], failures = [];
function respond(req,res){
  try {
    const reqUrl = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(reqUrl.pathname);
    const locale = pathname.match(/^\/(pt|en)(?=\/|$)/)?.[1].toUpperCase() || 'ES';
    const route = pathname.replace(/^\/(pt|en)(?=\/|$)/,'') || '/';
    if (selected.includes(route)) {
      const html = renderRegionalRoute(route,locale);
      res.writeHead(200,{'content-type':'text/html; charset=utf-8','cache-control':'no-store'}).end(html);
      return;
    }
    const f = path.resolve(root, '.' + pathname);
    if (!f.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    if (fs.existsSync(f) && fs.statSync(f).isFile()) {
      const types={'.css':'text/css','.js':'text/javascript','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2'};
      res.writeHead(200,{'content-type':types[path.extname(f)] || 'application/octet-stream'}).end(fs.readFileSync(f));
      return;
    }
    // Some licensed regional photos were uploaded to Hostinger but are not in GitHub.
    // Serve them from the Hostinger domain; never replace them with stock photos.
    if (pathname.startsWith('/FOTOS/') || pathname.startsWith('/assets/images/destinos/lugares/petropolis/')) {
      res.writeHead(302,{location:'https://www.ernestinhocarioca.com.br'+encodeURI(pathname)}).end();return;
    }
    res.writeHead(404).end('Not found');
  } catch(e) { res.writeHead(500).end(e.message); }
}
const server=http.createServer(respond);
await new Promise((resolve,reject)=>server.once('error',reject).listen(0,'127.0.0.1',resolve));
let browser;
try{
  browser=await chromium.launch(await buildBrowserOptions());
  const serverUrl='http://127.0.0.1:'+server.address().port;
  for (const vp of [{width:1440,height:900},{width:390,height:844}]) {
    const context=await browser.newContext({viewport:vp,deviceScaleFactor:1,reducedMotion:'reduce'});
    for (const route of selected) {
      const page=await context.newPage();
      const pathname=pre('ES')+route;
      const label=route.split('/').filter(Boolean).slice(2).join('-') || 'inicio';
      try{
        await page.goto(serverUrl+pathname,{waitUntil:'domcontentloaded',timeout:25000});
        await page.locator('body').waitFor();
        await page.evaluate(async()=>{
          await document.fonts.ready;
          const photos=[...document.images];
          for(const img of photos) { img.loading='eager'; img.fetchPriority='high'; }
          await Promise.all(photos.map(img => new Promise(resolve => {
            if(img.complete) return resolve();
            const done=()=>resolve();
            img.addEventListener('load',done,{once:true});
            img.addEventListener('error',done,{once:true});
            setTimeout(done,18000);
          })));
        });
        await page.waitForTimeout(350);
        const metrics=await page.evaluate(()=>{
          const imgs=[...document.images].map(img=>({src:img.getAttribute('src'),loaded:img.complete&&img.naturalWidth>0}));
          const main=document.querySelector('main');
          return {title:document.title,h1:document.querySelectorAll('h1').length,
            main:!!main,visiblePhotos:imgs.filter(x=>x.loaded).length,
            brokenPhotos:imgs.filter(x=>!x.loaded).map(x=>x.src),
            brokenPhotoCards:[...document.querySelectorAll('.spot img')].filter(x=>x.complete&&x.naturalWidth===0).map(x=>x.getAttribute('src')),
            pendingPhotoCards:[...document.querySelectorAll('.spot img')].filter(x=>!x.complete).map(x=>x.getAttribute('src')),
            overflowPx:Math.max(0,document.documentElement.scrollWidth-innerWidth),
            cards:document.querySelectorAll('.spot').length,
            photoGridColumns:getComputedStyle(document.querySelector('.photo-grid')||document.body).gridTemplateColumns,
            links:document.querySelectorAll('a[href]').length};
        });
        await page.screenshot({path:path.join(out,label+'-'+vp.width+'.png'),fullPage:true,animations:'disabled'});
        recorded.push({route,viewport:vp.width,...metrics});
        if(metrics.h1!==1||!metrics.main||metrics.overflowPx>4)failures.push({route,viewport:vp.width,reason:'Structural/viewport anomaly',metrics});
        if(route.endsWith('/fotografias/')&&metrics.cards!==12)failures.push({route,viewport:vp.width,reason:'Expected 12 photo cards',metrics});
        if(route.endsWith('/fotografias/')&&metrics.brokenPhotoCards.length)failures.push({route,viewport:vp.width,reason:'Photographic thumbnails genuinely failed to load',broken:metrics.brokenPhotoCards});
        if(route.endsWith('/fotografias/')&&metrics.pendingPhotoCards.length)failures.push({route,viewport:vp.width,reason:'Photographic thumbnails never finished loading',pending:metrics.pendingPhotoCards});
      }catch(error){failures.push({route,viewport:vp.width,error:error.message});}
      finally{await page.close();}
    }
    await context.close();
  }
}finally{await browser?.close();await new Promise(resolve=>server.close(resolve));}
const report={tested:new Date().toISOString(),pages:recorded.length,errors:failures.length,failures,results:recorded};
fs.writeFileSync(path.join(out,'visual-report.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(failures.length)process.exitCode=1;
