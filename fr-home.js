const ROOT = 'https://www.ernestinhocarioca.com.br/';
const data = await fetch(new URL('./assets/js/translations/fr/piloto-rio.json', import.meta.url), {cache:'force-cache'}).then(r => {if(!r.ok)throw Error('French dictionary HTTP '+r.status);return r.json()});
const fallback = {'Tours':'Excursions','Guía independiente de Río de Janeiro.':'Guide indépendant de Rio de Janeiro.','Río no se visita. Se vive.':'Rio ne se visite pas. Il se vit.','De descubrir Río a vivirlo.':'De la découverte de Rio à l’expérience vécue.','Experiencias anteriores':'Expériences précédentes','Siguientes experiencias':'Expériences suivantes'};
const translations = {...data,...fallback};
let scheduled=false;
function localize(){
  document.documentElement.lang='fr';
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  for(let node; (node=walker.nextNode());){
    if(node.parentElement?.closest('script,style,textarea,noscript,svg,code'))continue;
    const original=node.nodeValue, key=original.trim().replace(/\s+/g,' ');
    const translated=translations[key];
    if(translated && translated!==key)node.nodeValue=original.replace(original.trim(),translated);
  }
  for(const el of document.querySelectorAll('[alt],[aria-label],[title],[placeholder]')){
    for(const field of ['alt','aria-label','title','placeholder']){
      if(!el.hasAttribute(field))continue;
      const old=el.getAttribute(field), value=translations[old];
      if(value && value!==old)el.setAttribute(field,value);
    }
  }
  const toggle=document.getElementById('lang');
  if(toggle && toggle.textContent!=='FR')toggle.textContent='FR';
  const isPreview=location.pathname.startsWith('/fr-vista-luna/');
  const previewRoot=isPreview?'/fr-vista-luna/':'/';
  const readyRoutes=new Set(['','fr/','fr/guia/','fr/guia/dinero/','fr/guia/aeropuertos/','fr/guia/emergencias/','fr/guia/viajar-solo/','fr/guia/vacunas/','fr/guia/apps/','fr/guia/consulados/','fr/guia/menores/','fr/guia/permanencia/','fr/guia/internet/','fr/transportes/']);
  for(const link of document.querySelectorAll('a[href]')){
    const raw=link.getAttribute('href');
    if(!raw||raw.startsWith('#')||/^(?:mailto:|tel:|javascript:|data:)/i.test(raw))continue;
    let url;try{url=new URL(raw,location.href)}catch{continue}
    const pagePath=url.pathname.startsWith(previewRoot)?url.pathname.slice(previewRoot.length):null;
    if(isPreview && url.origin===location.origin && pagePath===null){
      const sourcePath=url.pathname.replace(/^\\/+/, '');
      if(readyRoutes.has('fr/'+sourcePath)){
        link.href=location.origin+previewRoot+'fr/'+sourcePath+url.search+url.hash;
        continue;
      }
    }
    if(url.origin===location.origin && pagePath!==null && !pagePath.startsWith('assets/')){
      if(readyRoutes.has(pagePath))continue;
      // An unfinished French route must lead to the approved Spanish source, never a 404.
      const untranslated=pagePath.startsWith('fr/')?pagePath.slice(3):pagePath;
      if(!untranslated.startsWith('api/') && !untranslated.startsWith('.well-known/'))link.href=ROOT+untranslated+url.search+url.hash;
    }
  }
  for(const el of document.querySelectorAll('[src],[srcset]')){
    const src=el.getAttribute('src');
    if(src?.startsWith('/assets/'))el.setAttribute('src',(location.pathname.startsWith('/fr-vista-luna/')?'/fr-vista-luna':'')+src);
  }
}
localize();
new MutationObserver(()=>{
  if(scheduled)return;
  scheduled=true;
  queueMicrotask(()=>{scheduled=false;localize()});
}).observe(document.body,{subtree:true,childList:true,characterData:true});
for(const button of document.querySelectorAll('[data-carousel-target]')){
  button.addEventListener('click',()=>{
    const track=document.getElementById(button.dataset.carouselTarget);
    const card=track?.querySelector('.feature');
    if(card)track.scrollBy({left:(button.dataset.carouselDirection==='prev'?-1:1)*(card.getBoundingClientRect().width+18),behavior:'smooth'});
  });
}
