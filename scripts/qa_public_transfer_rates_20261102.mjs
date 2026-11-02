import { createRequire } from 'node:module';
import { buildBrowserOptions } from './build_browser.mjs';
const require=createRequire(import.meta.url),{chromium}=require('playwright-core');
const expect={
 es:{heading:'Navidad, Año Nuevo y Carnaval',valid:'15 de diciembre de 2026',expired:'Para viajes después del 15/12/2026'},
 pt:{heading:'Natal, Réveillon e Carnaval',valid:'15 de dezembro de 2026',expired:'Para viagens após 15/12/2026'},
 en:{heading:'Christmas, New Year and Carnival',valid:'15 December 2026',expired:'For travel after 15 December 2026'}
};
const out=[],browser=await chromium.launch(await buildBrowserOptions());
try{
 for(const [lang,x] of Object.entries(expect)){
  const page=await browser.newPage({viewport:{width:1100,height:850}});
  const url='https://www.ernestinhocarioca.com.br/'+(lang==='es'?'':lang+'/')+'transportes/transporte-privado/?ec_live_qa=20261102';
  let issues=[];
  try{
   const resp=await page.goto(url,{waitUntil:'domcontentloaded',timeout:35000});
   await page.waitForTimeout(900);
   const date=await page.locator('#ec-rate-validity').innerText();
   const heading=await page.locator('#ec-transfer-season-title').innerText();
   if(resp?.status()!==200)issues.push('HTTP '+resp?.status());
   if(!date.includes(x.valid))issues.push('Wrong locale validity: '+date);
   if(heading.trim()!==x.heading)issues.push('Wrong locale seasonal title: '+heading);
   const route=await page.locator('#ec-transfer-form select[name="route"] option').evaluateAll(
     nodes=>nodes.map(x=>x.value).find(v=>v.includes('Región de los Lagos')&&v.includes('Galeão'))||null
   );
   if(!route){issues.push('Booking route not available')}else{
    await page.locator('#ec-transfer-form select[name="route"]').selectOption(route);
    await page.locator('#ec-transfer-form select[name="vehicle"]').selectOption('Spin');
    await page.locator('#ec-transfer-form [name="date"]').fill('2026-12-10');
    await page.locator('#ec-transfer-form [name="date"]').dispatchEvent('change');
    const validPreview=await page.locator('#ec-selected-price').innerText();
    if(!validPreview.includes('R$ 520'))issues.push('Dec 10 preview missing new R$ 520: '+validPreview);
    await page.locator('#ec-transfer-form [name="date"]').fill('2026-12-20');
    await page.locator('#ec-transfer-form [name="date"]').dispatchEvent('change');
    const expiredPreview=await page.locator('#ec-selected-price').innerText();
    if(expiredPreview.includes('R$ 520')||!expiredPreview.includes(x.expired))
      issues.push('Expired date displayed rate or wrong locale notice: '+expiredPreview);
   }
   const tables=await page.locator('.ec-rate-group').count();
   if(tables!==4)issues.push('Wrong group count '+tables);
   out.push({lang,url,pass:!issues.length,issues});
  }catch(e){out.push({lang,url,pass:false,issues:issues.concat(e.message.slice(0,270))})}
  finally{await page.close()}
 }
}finally{await browser.close()}
console.log(JSON.stringify({checked:out.length,passes:out.filter(x=>x.pass).length,issues:out.filter(x=>!x.pass)},null,2));
if(out.some(x=>!x.pass))process.exitCode=1;
