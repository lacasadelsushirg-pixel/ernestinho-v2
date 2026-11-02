import fs from 'node:fs';
import process from 'node:process';

const cases=JSON.parse(fs.readFileSync('docs/seo/estado-publico-84-20261102.json','utf8'));
const ORIGIN='https://www.ernestinhocarioca.com.br';
const errors=[];
const details=[];
const unique=new Set(cases.map(c=>c.url));
if(cases.length!==84||unique.size!==84)throw Error('Expected 84 unique URLs');
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const attr=(tag,key)=>tag.match(new RegExp('(?:^|\\s)'+key+'=["\\x27]([^"\\x27]*)["\\x27]','i'))?.[1]||'';
const links=html=>(html.match(/<link\b[^>]*>/gi)||[]);
const clean=html=>html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ')
 .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ')
 .replace(/<[^>]+>/g,' ').replace(/&nbsp;/gi,' ').replace(/&amp;/gi,'&').replace(/\s+/g,' ');
const get=async(url)=>{
 for(let attempt=0;attempt<3;attempt++){
  try{const r=await fetch(url,{headers:{'user-agent':'ErnestinhoSEOQA/1.0','cache-control':'no-cache'},signal:AbortSignal.timeout(28000)});return {response:r,text:await r.text()};}
  catch(e){if(attempt===2)throw e;await sleep(500+attempt*1000);}
 }
};
let cursor=0;
async function worker(){
 while(cursor<cases.length){
  const c=cases[cursor++];
  const row={url:c.url,ok:false,issues:[],http:null};
  try{
   const {response,text}=await get(c.url+'?ec_qa=20261102');
   row.http=response.status;
   if(response.status!==200)row.issues.push('HTTP '+response.status);
   const lang=c.url.includes('/pt/')?'pt-BR':'en';
   const htmlLang=attr(text.match(/<html\b[^>]*>/i)?.[0]||'','lang');
   if(!htmlLang||!htmlLang.toLowerCase().startsWith(lang==='pt-BR'?'pt':'en'))row.issues.push('html lang '+htmlLang);
   const tags=links(text);
   const canonical=tags.find(t=>attr(t,'rel').toLowerCase()==='canonical');
   if(!canonical||attr(canonical,'href')!==c.url)row.issues.push('canonical '+(canonical&&attr(canonical,'href')));
   const locales=Object.fromEntries(tags.filter(t=>attr(t,'hreflang')).map(t=>[attr(t,'hreflang'),attr(t,'href')]));
   for(const token of ['es','pt-BR','en','x-default'])if(!locales[token])row.issues.push('hreflang missing '+token);
   if(/noindex/i.test((text.match(/<meta\b[^>]*name=["\x27]robots["\x27][^>]*>/i)||[])[0]||'')||/noindex/i.test(response.headers.get('x-robots-tag')||''))row.issues.push('noindex');
   const visible=clean(text);
   for(const marker of ['Yo te recomiendo','Para mí,','Cuando alguien me pregunta'])if(visible.includes(marker))row.issues.push('untranslated Spanish '+marker);
   row.ok=row.issues.length===0;
  }catch(e){row.issues.push(e.message)}
  details.push(row);
  if(!row.ok)errors.push(row);
 }
}
await Promise.all(Array.from({length:6},worker));
const xml=await get(ORIGIN+'/sitemap.xml?ec_qa=20261102');
const count=(xml.text.match(/<loc>/g)||[]).length;
if(xml.response.status!==200||count<1500)errors.push({url:ORIGIN+'/sitemap.xml',issues:['Sitemap invalid/too small: '+count]});
for(const c of cases)if(!xml.text.includes(c.url))errors.push({url:c.url,issues:['URL missing in sitemap']});
const robots=await get(ORIGIN+'/robots.txt?ec_qa=20261102');
if(robots.response.status!==200)errors.push({url:ORIGIN+'/robots.txt',issues:['HTTP '+robots.response.status]});
const summary={tested:84,passed:details.filter(r=>r.ok).length,failed:errors.length,sitemapUrlCount:count,robotsHttp:robots.response.status,updatedAt:new Date().toISOString(),details,errors};
fs.writeFileSync('qa-public-20261102.json',JSON.stringify(summary,null,2));
console.log(JSON.stringify({tested:summary.tested,passed:summary.passed,failed:summary.failed,sitemapUrlCount:count,robotsHttp:summary.robotsHttp,firstErrors:errors.slice(0,12)},null,2));
if(errors.length)process.exitCode=1;
