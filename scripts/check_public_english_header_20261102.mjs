import { createRequire } from 'node:module';
import { buildBrowserOptions } from './build_browser.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require('playwright-core');
const targets=['/en/','/en/experiencias/','/en/experiencias/pequena-africa/','/en/hospedaje/','/en/hospedaje/estudio-1-1/'];
const browser=await chromium.launch(await buildBrowserOptions());
const results=[];
try{
 const page=await browser.newPage({locale:'en-US'});
 for(const target of targets){
  try{
   const response=await page.goto('https://www.ernestinhocarioca.com.br'+target+'?headeraudit=20261102',{waitUntil:'domcontentloaded',timeout:35000});
   await page.waitForTimeout(1100);
   const data=await page.evaluate(()=>({lang:document.documentElement.lang,nav:document.querySelector('.topbar nav')?.innerText||'',h1:document.querySelector('main h1')?.innerText||'',title:document.title}));
   results.push({target,http:response?.status(),...data,navHasSpanish:/Guía de Río|Tours y Experiencias|Hospedaje|Compras/.test(data.nav)});
  }catch(e){results.push({target,error:String(e.message)})}
 }
 await page.close();
}finally{await browser.close()}
console.log(JSON.stringify(results,null,2));
