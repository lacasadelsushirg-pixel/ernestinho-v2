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
  '/destinos/petropolis/guia/terminales/',
  '/destinos/petropolis/guia/guarda-equipaje/',
  '/destinos/petropolis/guia/accesibilidad/',
  '/destinos/petropolis/guia/emergencias/',
  '/destinos/petropolis/guia/viajar-solo/',
  '/destinos/petropolis/guia/mes-a-mes/',
  '/destinos/petropolis/guia/llegada/',
  '/destinos/petropolis/guia/itinerarios-1-2-3-dias/',
  '/destinos/petropolis/guia/sin-auto/',
  '/destinos/petropolis/guia/primera-visita/',
  '/destinos/petropolis/guia/',
  '/destinos/petropolis/guia/errores-frecuentes/',
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
        // Hostinger-hosted imagery may intermittently fail on the first request
        // during deployment. Retry a failed source twice with cache-busting so
        // a persistent 404 still fails QA, while one transient request does not.
        await page.evaluate(async()=>{
          const failed=[...document.images].filter(img=>img.getAttribute('src')&&(!img.complete||img.naturalWidth===0));
          await Promise.all(failed.map(async img=>{
            const source=img.getAttribute('src');
            for(let attempt=1;attempt<=2&&img.naturalWidth===0;attempt++){
              await new Promise(resolve=>{
                let settled=false;
                const done=()=>{if(settled)return;settled=true;resolve()};
                img.addEventListener('load',done,{once:true});
                img.addEventListener('error',done,{once:true});
                const url=new URL(source,location.href);
                url.searchParams.set('_ec_visual_retry',String(attempt));
                img.src=url.href;
                setTimeout(done,12000);
              });
            }
          }));
        });
        // Regional layouts reveal blocks on intersection; a full-page screenshot alone
        // does not scroll and can incorrectly show blank content below the fold.
        await page.evaluate(async()=>{
          const step=Math.max(350,Math.floor(innerHeight*.72));
          const bottom=document.documentElement.scrollHeight;
          for(let y=0;y<bottom;y+=step){
            window.scrollTo(0,y);
            await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
          }
          window.scrollTo(0,0);
          await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
        });
        await page.waitForTimeout(800);
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
            quickCards:document.querySelectorAll('.petr-fact-card').length,
            monthCards:document.querySelectorAll('.petr-month-card').length,
            guideIndexCards:document.querySelectorAll('.petr-guide-card').length,
            guideIndexShortcuts:document.querySelectorAll('.petr-guide-shortcuts a').length,
            guideIndexDistinctPhotos:new Set([...document.querySelectorAll('.petr-guide-card img')].map(img=>img.getAttribute('src'))).size,
            guideIndexBrokenPhotos:[...document.querySelectorAll('.petr-guide-card img')].filter(img=>!img.complete||img.naturalWidth===0).map(img=>img.getAttribute('src')),
            guideIndexGroups:document.querySelectorAll('.petr-guide-group').length,
            guideIndexHeadingBlocked:(()=>{
              const heading=document.querySelector('.petr-guide-group-head');
              if(!heading)return false;
              const x=heading.getBoundingClientRect();
              return [...document.querySelectorAll('.ec-cariocia-launcher,.ec-global-actions>.ec-float-btn')]
                .some(el=>{
                  const y=el.getBoundingClientRect();
                  return x.left<y.right&&x.right>y.left&&x.top<y.bottom&&x.bottom>y.top;
                });
            })(),
            guideIndexShortcutBlocked:(()=>{
              const links=[...document.querySelectorAll('.petr-guide-shortcuts a')];
              const controls=[...document.querySelectorAll('.ec-cariocia-launcher,.ec-global-actions>.ec-float-btn')];
              return links.some(el=>controls.some(control=>{
                const x=el.getBoundingClientRect(),y=control.getBoundingClientRect();
                return x.left<y.right&&x.right>y.left&&x.top<y.bottom&&x.bottom>y.top;
              }));
            })(),
            guideIndexGridColumns:(()=>{
              const grid=document.querySelector('.petr-guide-group .guide-grid');
              return grid?getComputedStyle(grid).gridTemplateColumns.split(' ').length:0;
            })(),
            seasonCards:document.querySelectorAll('.petr-season-card').length,
            itineraryCards:document.querySelectorAll('.petr-day-card').length,
            itineraryStops:document.querySelectorAll('.petr-when').length,
            urgentDialLinks:document.querySelectorAll('.petr-urgent-actions a[href^="tel:"]').length,
            compactIntroOverlap:(()=>{
              const intro=document.querySelector('.petr-compact-intro>p.intro');
              const launch=document.querySelector('.ec-cariocia-launcher');
              const actions=document.querySelector('.ec-global-actions');
              if(!intro||!launch||!actions)return null;
              const textRect=intro.getBoundingClientRect();
              const dockTop=Math.min(launch.getBoundingClientRect().top,actions.getBoundingClientRect().top);
              return {introTop:Math.round(textRect.top),introBottom:Math.round(textRect.bottom),
                dockTop:Math.round(dockTop),overlap:textRect.top<dockTop&&textRect.bottom>dockTop-8};
            })(),
            iaMobileDock:(()=>{
              const launcher=document.querySelector('.ec-cariocia-launcher');
              const actions=document.querySelector('.ec-global-actions');
              if(!launcher||!actions)return null;
              const a=launcher.getBoundingClientRect(),b=actions.getBoundingClientRect();
              return {avatar:{left:Math.round(a.left),right:Math.round(a.right),top:Math.round(a.top),bottom:Math.round(a.bottom)},
                actions:{left:Math.round(b.left),right:Math.round(b.right),top:Math.round(b.top),bottom:Math.round(b.bottom)},
                avatarVisible:a.width>0&&a.height>0,
                sideBySide:a.right+3<=b.left,
                bottomAligned:Math.abs(a.bottom-b.bottom)<=18};
            })(),
            mobileGuideControls:(()=>{
              const dock=document.querySelector('.ec-global-actions');
              if(!dock||!document.querySelector('.petr-local-guide,.petr-month-guide'))return null;
              const rect=dock.getBoundingClientRect();
              return {top:Math.round(rect.top),height:Math.round(rect.height),right:Math.round(innerWidth-rect.right),
                flexDirection:getComputedStyle(dock).flexDirection,visible:rect.height>0};
            })(),
            photoGridColumns:getComputedStyle(document.querySelector('.photo-grid')||document.body).gridTemplateColumns,
            links:document.querySelectorAll('a[href]').length};
        });
        if(route.endsWith('/fotografias/')) {
          const firstSpot=page.locator('.spot').first();
          await firstSpot.scrollIntoViewIfNeeded();
          await page.waitForTimeout(650);
          metrics.firstSpotDisplay=await firstSpot.evaluate(el=>({
            display:getComputedStyle(el).display,
            opacity:getComputedStyle(el).opacity,
            visibility:getComputedStyle(el).visibility,
            top:Math.round(el.getBoundingClientRect().top),
            height:Math.round(el.getBoundingClientRect().height),
            photoLoaded:el.querySelector('img')?.naturalWidth>0
          }));
          await page.screenshot({path:path.join(out,'fotografia-tarjetas-'+vp.width+'.png'),fullPage:false,animations:'disabled'});
          await page.evaluate(()=>window.scrollTo(0,0));
        }
        await page.screenshot({path:path.join(out,label+'-'+vp.width+'.png'),fullPage:true,animations:'disabled'});
        recorded.push({route,viewport:vp.width,...metrics});
        if(metrics.h1!==1||!metrics.main||metrics.overflowPx>4)failures.push({route,viewport:vp.width,reason:'Structural/viewport anomaly',metrics});
        if(route.endsWith('/fotografias/')&&metrics.cards!==12)failures.push({route,viewport:vp.width,reason:'Expected 12 photo cards',metrics});
        if(route.endsWith('/fotografias/')&&metrics.brokenPhotoCards.length)failures.push({route,viewport:vp.width,reason:'Photographic thumbnails genuinely failed to load',broken:metrics.brokenPhotoCards});
        if(route.endsWith('/fotografias/')&&metrics.pendingPhotoCards.length)failures.push({route,viewport:vp.width,reason:'Photographic thumbnails never finished loading',pending:metrics.pendingPhotoCards});
        const practicalCardCounts = {
          '/destinos/petropolis/guia/terminales/':4,
          '/destinos/petropolis/guia/guarda-equipaje/':3,
          '/destinos/petropolis/guia/accesibilidad/':3,
          '/destinos/petropolis/guia/viajar-solo/':3,
          '/destinos/petropolis/guia/llegada/':3,
          '/destinos/petropolis/guia/itinerarios-1-2-3-dias/':3,
          '/destinos/petropolis/guia/sin-auto/':4,
          '/destinos/petropolis/guia/primera-visita/':3,
        };
        if (Object.hasOwn(practicalCardCounts,route) && metrics.quickCards!==practicalCardCounts[route])
          failures.push({route,viewport:vp.width,reason:'Practical guide cards missing',count:metrics.quickCards});
        if(route.endsWith('/guia/')){
          if(metrics.guideIndexCards!==12||metrics.guideIndexShortcuts!==3||metrics.guideIndexDistinctPhotos!==12||metrics.guideIndexGroups!==3)
            failures.push({route,viewport:vp.width,reason:'Petrópolis guide index missing 12 original cards/unique photos or shortcuts',metrics});
          if(metrics.guideIndexBrokenPhotos.length)
            failures.push({route,viewport:vp.width,reason:'Petrópolis guide index has photos that failed to load',photos:metrics.guideIndexBrokenPhotos});
          if(vp.width===390&&metrics.guideIndexGridColumns!==1)
            failures.push({route,viewport:vp.width,reason:'Guide cards must be single-column on a phone',columns:metrics.guideIndexGridColumns});
          if(vp.width===390&&metrics.guideIndexShortcutBlocked)
            failures.push({route,viewport:vp.width,reason:'Floating controls cover one or more quick guide links'});
          if(vp.width===390&&metrics.guideIndexHeadingBlocked)
            failures.push({route,viewport:vp.width,reason:'Floating controls cover the guide section heading'});
        }
        if(route.endsWith('/guia/mes-a-mes/')&&(metrics.monthCards!==12||metrics.seasonCards!==4))
          failures.push({route,viewport:vp.width,reason:'Expected 12 months and 4 season cards',monthCards:metrics.monthCards,seasonCards:metrics.seasonCards});
        if(route.endsWith('/guia/itinerarios-1-2-3-dias/')&&(metrics.itineraryCards!==6||metrics.itineraryStops!==19))
          failures.push({route,viewport:vp.width,reason:'Expected 6 plans and 19 stops',plans:metrics.itineraryCards,stops:metrics.itineraryStops});
        if(route.endsWith('/guia/emergencias/')&&metrics.urgentDialLinks!==4)
          failures.push({route,viewport:vp.width,reason:'Emergency call panel missing',count:metrics.urgentDialLinks});
        if(route.includes('/guia/')&&route!=='/destinos/petropolis/guia/'&&vp.width===390){
          const dock=metrics.mobileGuideControls;
          if(!dock||!dock.visible||dock.flexDirection!=='row'||dock.top<vp.height-86)
            failures.push({route,viewport:vp.width,reason:'Floating actions are not aligned near the mobile footer',dock});
        }
        if(vp.width===390 && (route.endsWith('/guia/sin-auto/')||route.endsWith('/guia/primera-visita/'))){
          const overlap=metrics.compactIntroOverlap;
          if(!overlap||overlap.overlap)
            failures.push({route,viewport:vp.width,reason:'Opening paragraph overlaps mobile IA/actions dock',overlap});
        }
        if(vp.width===390){
          const floating=metrics.iaMobileDock;
          if(!floating||!floating.avatarVisible||!floating.sideBySide||!floating.bottomAligned
             ||floating.avatar.top<vp.height-95||floating.actions.top<vp.height-95){
            failures.push({route,viewport:vp.width,reason:'AI avatar and action buttons do not share safe mobile dock',floating});
          }
        }
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
