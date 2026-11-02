import fs from 'node:fs';
const SITE = 'https://www.ernestinhocarioca.com.br';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const attr = (tag, k) => tag.match(new RegExp('(?:^|\\s)' + k + '=["\\x27]([^"\\x27]*)["\\x27]', 'i'))?.[1] || '';
const linktags = html => html.match(/<link\b[^>]*>/gi) || [];
const plain = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ').replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&(?:nbsp|amp|quot|#39|ldquo|rdquo);/gi, ' ').replace(/\s+/g, ' ').trim();
const bodyText = html => plain((html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)||[])[0] || (html.match(/<body\b[^>]*>[\s\S]*?<\/body>/i)||[])[0] || '');
async function get(url) {
  for(let a=0;a<3;a++) try {
    let r=await fetch(url,{redirect:'follow',headers:{'User-Agent':'ErnestinhoSiteAudit/1.0'},signal:AbortSignal.timeout(25000)});
    return {status:r.status,url:r.url,headers:r.headers,html:await r.text()};
  } catch(e) {
    if(a===2) throw e;
    await sleep(400+500*a);
  }
}
const [sitemap,robots]=await Promise.all([get(SITE+'/sitemap.xml'),get(SITE+'/robots.txt')]);
if(sitemap.status!==200) throw new Error('sitemap HTTP '+sitemap.status);
const urls=[...sitemap.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1].replace(/&amp;/g,'&'));
if(urls.length<1800 || new Set(urls).size!==urls.length)throw new Error('Sitemap missing/duplicate loc: '+urls.length);
const records=new Array(urls.length);
let cursor=0;
const fatal=[];
async function worker(){
 while(cursor<urls.length){
  const i=cursor++;
  const url=urls[i];
  let r={url,lang:url.includes('/pt/')?'pt-BR':url.includes('/en/')?'en':'es',problems:[],warnings:[]};
  try {
   const page=await get(url);
   r.status=page.status;
   if(page.status!==200)r.problems.push('HTTP '+page.status);
   if(page.url!==url)r.problems.push('redirect '+page.url);
   const html=page.html;
   const htmlLang=attr((html.match(/<html\b[^>]*>/i)||[])[0]||'','lang');
   if(!htmlLang.toLowerCase().startsWith(r.lang==='pt-BR'?'pt':r.lang))r.problems.push('lang '+htmlLang);
   const tags=linktags(html),canonical=tags.find(x=>attr(x,'rel').toLowerCase()==='canonical');
   if(attr(canonical||'','href')!==url)r.problems.push('canonical '+attr(canonical||'','href'));
   const hreflang=Object.fromEntries(tags.filter(x=>attr(x,'hreflang')).map(x=>[attr(x,'hreflang'),attr(x,'href')]));
   for(const l of ['es','pt-BR','en','x-default'])if(!hreflang[l])r.problems.push('hreflang '+l);
   if(/<meta\b[^>]*name=["']robots["'][^>]*noindex|<meta\b[^>]*content=["'][^"']*noindex[^>]*name=["']robots["']|noindex/i.test(html.match(/<meta\b[^>]*name=["']robots["'][^>]*>/i)?.[0]||'') || /noindex/i.test(page.headers.get('x-robots-tag')||''))r.problems.push('noindex');
   r.title=plain((html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)||[])[1]||'');
   if(!r.title)r.problems.push('missing title');
   r.description=attr((html.match(/<meta\b[^>]*name=["']description["'][^>]*>/i)||[])[0]||'','content');
   if(!r.description)r.warnings.push('description missing');
   r.main=bodyText(html);
   r.words=r.main.split(/\s+/).filter(Boolean).length;
   if(r.words<100)r.warnings.push('short content '+r.words);
   if(r.lang!=='es'){
    let markers=['Yo te recomiendo','Para mí,','Cuando alguien me pregunta','Yo la recomendaría','Si estás buscando','Te recomiendo conocer'];
    r.spanishMarkers=markers.filter(m=>r.main.includes(m));
    if(r.spanishMarkers.length)r.warnings.push('Spanish visible '+r.spanishMarkers.join(','));
   }
  }catch(e){r.problems.push('fetch exception: '+String(e.message).slice(0,160));}
  records[i]=r;
 }
}
await Promise.all(Array.from({length:16},worker));
const getRoot = url => url.replace(SITE,'').replace(/^\/(?:pt|en)\//,'/');
const original=new Map(records.filter(r=>r.lang==='es').map(r=>[getRoot(r.url),r]));
const grams = txt => {let words=txt.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').match(/[\p{L}\p{N}]+/gu)||[];let set=new Set();for(let i=0;i+6<=words.length;i++)set.add(words.slice(i,i+6).join(' '));return set};
for(const r of records) if(r.lang!=='es' && r.main){
 const es=original.get(getRoot(r.url));
 if(!es||!es.main)continue;
 let a=grams(r.main),b=grams(es.main),matched=0;
 for(const g of a)if(b.has(g))matched++;
 r.spanishSixgramFraction=a.size?Number((matched/a.size).toFixed(3)):0;
 if(r.spanishSixgramFraction>0.5 && a.size>=20)r.warnings.push('high ES overlap '+r.spanishSixgramFraction);
}
const hard=records.filter(r=>r.problems.length);
const highOverlap=records.filter(r=>r.lang!=='es' && r.spanishSixgramFraction>0.5 && r.words>=100);
const short=records.filter(r=>r.words<100);
const missingMeta=records.filter(r=>r.warnings.includes('description missing'));
const markers=records.filter(r=>r.spanishMarkers?.length);
const sections={};
for(const r of highOverlap){const path=r.url.replace(SITE,'').replace(/^\/(?:pt|en)\//,'/').split('/').filter(Boolean);const group=path[0]==='destinos'?'destinos/'+(path[1]||''):path[0]||'home';sections[group]=(sections[group]||0)+1;}
const summary={timestamp:new Date().toISOString(),sitemapCount:urls.length,robotsStatus:robots.status,robotsText:robots.html,langCount:Object.fromEntries(['es','pt-BR','en'].map(l=>[l,records.filter(r=>r.lang===l).length])),http200:records.filter(r=>r.status===200).length,hardFailures:hard.length,highSpanishOverlap:highOverlap.length,highOverlapBySection:sections,spanishMarkers:markers.length,shortUnder100Words:short.length,missingDescriptions:missingMeta.length,sampleHardFailures:hard.slice(0,30).map(r=>({url:r.url,issues:r.problems})),sampleHighOverlap:highOverlap.slice(0,35).map(r=>({url:r.url,fraction:r.spanishSixgramFraction,words:r.words})),sampleShort:short.slice(0,35).map(r=>({url:r.url,words:r.words}))};
fs.writeFileSync('site-wide-audit-20261102.json',JSON.stringify({summary,records},null,2));
console.log(JSON.stringify(summary,null,2));
if(hard.length)process.exitCode=1;
