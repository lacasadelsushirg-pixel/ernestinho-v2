import fs from'node:fs';import path from'node:path';import http from'node:http';import{chromium}from'playwright-core';import{buildBrowserOptions}from'./build_browser.mjs';
const root=path.resolve('.'),stage=path.resolve('../release-transport/stage'),rows=[];
const server=http.createServer((req,res)=>{let p=decodeURIComponent(new URL(req.url,'http://local').pathname).slice(1);if(p.endsWith('/'))p+='index.html';let f=path.join(stage,p);if(!fs.existsSync(f))f=path.join(root,p);if(!fs.existsSync(f))return res.writeHead(404).end();res.setHeader('content-type',f.endsWith('.js')?'text/javascript':f.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(f));});await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port,browser=await chromium.launch(await buildBrowserOptions());
try{for(const pre of['','/pt','/en']){
 const ctx=await browser.newContext(),p=await ctx.newPage();await ctx.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());await p.addInitScript(()=>{window.open=url=>{window.__prepared=url;};});
 await p.goto(base+pre+'/destinos/buzios/transportes/transporte-privado/',{waitUntil:'load'});await p.waitForFunction(()=>document.querySelector('input[name=date]').min.length===10);
 const fields={date:'2026-12-01',time:'10:30',passengers:'3',bags:'2',name:'Prueba de formulario',phone:'000000000',origin:'Hotel de prueba',destination:'GIG'};
 for(const[name,value]of Object.entries(fields))await p.locator('[name='+name+']').fill(value);
 await p.locator('[name=route]').selectOption('Búzios → GIG');await p.locator('#bz-transfer-form button[type=submit]').click();
 const result=await p.evaluate(()=>({url:window.__prepared}));
 const u=new URL(result.url),message=u.searchParams.get('text');if(u.hostname!=='wa.me'||u.pathname!=='/5521969946938'||!message.includes('Búzios → GIG')||!message.includes('2026-12-01')||!message.includes('Prueba de formulario'))throw Error('Booking failed '+pre);rows.push({locale:pre||'ES',prepared:true});await ctx.close();
}}finally{await browser.close();server.close();}
fs.writeFileSync('../release-transport/booking-checks.json',JSON.stringify(rows,null,2));console.log(JSON.stringify(rows));
