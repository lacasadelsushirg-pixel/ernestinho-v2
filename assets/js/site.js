import { LANGS, getLanguage, cycleLanguage, setLanguage, applyTranslations } from "./i18n.js";
import { routeParts, hasLocaleRoutes, localeHref, localizeLinks, syncLocaleMetadata } from './locale-routing.js';
import { applySeoMetadata } from './seo-metadata.js';
import { addTransportPhotoReferences } from "./transport-photo-references.js";
import { addBulkPhotoReferences } from "./bulk-photo-references.js";
import { mountCariocIA } from "./carioc-ia.js?v=20261010-avatar2";
if (!document.querySelector('link[href*="components.css"]') && !document.querySelector("[data-ec-brand-type]")) { const fontSheet=document.createElement("link"); fontSheet.rel="stylesheet"; fontSheet.href=new URL("../css/type.css",import.meta.url).href; fontSheet.dataset.ecBrandType=""; document.head.append(fontSheet); }
const common={"Guía de Río":{"PT":"Guia do Rio","EN":"Rio Guide"},"Experiencias":{"PT":"Experiências","EN":"Experiences"},"Transportes":{"PT":"Transportes","EN":"Transport"},"Eventos":{"PT":"Eventos","EN":"Events"},"Hospedaje":{"PT":"Hospedagem","EN":"Stay"},"Compras":{"PT":"Compras","EN":"Shopping"},"Barrios":{"PT":"Bairros","EN":"Neighborhoods"},"Gastronomía":{"PT":"Gastronomia","EN":"Food"},"Consejos":{"PT":"Dicas","EN":"Tips"},"Playas":{"PT":"Praias","EN":"Beaches"},"Vida Nocturna":{"PT":"Vida Noturna","EN":"Nightlife"},"Familia":{"PT":"Família","EN":"Family"},"Atracciones":{"PT":"Atrações","EN":"Attractions"},"Fotografía":{"PT":"Fotografia","EN":"Photography"},"Río no se visita. Se vive.":{"PT":"O Rio não se visita. Se vive.","EN":"Rio isn't just visited. It's lived."},"ABRIR GUÍA →":{"PT":"ABRIR GUIA →","EN":"OPEN GUIDE →"},"DESCUBRIR →":{"PT":"DESCOBRIR →","EN":"DISCOVER →"},"EXPLORAR →":{"PT":"EXPLORAR →","EN":"EXPLORE →"},"VER FICHA →":{"PT":"VER FICHA →","EN":"VIEW GUIDE →"},"Volver a Gastronomía":{"PT":"Voltar à Gastronomia","EN":"Back to Food"},"Antes de ir":{"PT":"Antes de ir","EN":"Before you go"},"Mi lectura":{"PT":"Minha leitura","EN":"My take"},"Buscar por nombre, barrio o estilo…":{"PT":"Buscar por nome, bairro ou estilo…","EN":"Search by name, neighborhood or style…"},"TODOS":{"PT":"TODOS","EN":"ALL"},"PESCADOS / MAR":{"PT":"PEIXES / MAR","EN":"SEAFOOD"},"ASIÁTICA":{"PT":"ASIÁTICA","EN":"ASIAN"},"ALMUERZO / BUFFET":{"PT":"ALMOÇO / BUFFET","EN":"LUNCH / BUFFET"},"VEGETARIANA":{"PT":"VEGETARIANA","EN":"VEGETARIAN"},"QUIOSQUES":{"PT":"QUIOSQUES","EN":"KIOSKS"},"EXPERIENCIAS":{"PT":"EXPERIÊNCIAS","EN":"EXPERIENCES"},"Ficha rápida":{"PT":"Informações rápidas","EN":"Quick facts"},"Barrio mostrado":{"PT":"Bairro","EN":"Neighborhood"},"Clasificación de la ficha":{"PT":"Categoria","EN":"Category"},"Estado de la información":{"PT":"Estado das informações","EN":"Information status"},"Verificación necesaria":{"PT":"Precisa confirmar","EN":"Please confirm"},"Lo que consta en las fuentes":{"PT":"O que consta nas fontes","EN":"What the sources say"},"Café Río":{"PT":"Café Rio","EN":"Rio Coffee"},"Sitio anterior":{"PT":"Site anterior","EN":"Previous site"},"Volver":{"PT":"Voltar","EN":"Back"},"Volver a la página anterior":{"PT":"Voltar à página anterior","EN":"Go back"},"Compartir":{"PT":"Compartilhar","EN":"Share"},"Compartir esta página":{"PT":"Compartilhe esta página","EN":"Share this page"},"Compartir en WhatsApp":{"PT":"Compartilhar no WhatsApp","EN":"Share on WhatsApp"},"Compartir en Instagram":{"PT":"Compartilhar no Instagram","EN":"Share on Instagram"},"Compartir en Facebook":{"PT":"Compartilhar no Facebook","EN":"Share on Facebook"},"Más aplicaciones":{"PT":"Mais aplicativos","EN":"More apps"},"Enlace copiado. Puedes pegarlo en Instagram.":{"PT":"Link copiado. Você pode colá-lo no Instagram.","EN":"Link copied. You can paste it into Instagram."},"Enlace copiado.":{"PT":"Link copiado.","EN":"Link copied."},"No se pudo copiar el enlace.":{"PT":"Não foi possível copiar o link.","EN":"Could not copy the link."},"Abrir TikTok":{"PT":"Abrir TikTok","EN":"Open TikTok"},"Abrir Instagram":{"PT":"Abrir Instagram","EN":"Open Instagram"},"Contactar por WhatsApp":{"PT":"Falar pelo WhatsApp","EN":"Contact on WhatsApp"},"Cambiar idioma":{"PT":"Mudar idioma","EN":"Change language"},"Español":{"PT":"Espanhol","EN":"Spanish"},"Português":{"PT":"Português","EN":"Portuguese"},"English":{"PT":"Inglês","EN":"English"}};
const sectionChunks = {
  "atracciones": ["atracciones-01.js", "atracciones-02.js"],
  "barrios": ["barrios-01.js", "barrios-02.js"],
  "cafe-rio": ["cafe-rio-01.js"],
  "compras": ["compras-01.js"],
  "cultura": ["cultura-01.js", "cultura-02.js", "cultura-03.js", "cultura-04.js", "cultura-05.js", "cultura-06.js", "cultura-07.js", "cultura-08.js", "cultura-09.js", "cultura-10.js", "cultura-11.js", "cultura-12.js", "cultura-13.js", "cultura-14.js", "cultura-15.js"],
  "consejos": ["consejos-01.js", "consejos-02.js", "consejos-03.js"],
  "eventos": ["eventos-01.js", "eventos-02.js"],
  "experiencias": ["experiencias-01.js", "experiencias-02.js", "experiencias-03.js", "experiencias-04.js"],
  "familia": ["familia-01.js", "familia-02.js", "familia-03.js", "familia-04.js", "familia-05.js", "familia-06.js", "familia-07.js", "familia-08.js"],
  "fotografia": ["fotografia-01.js", "fotografia-02.js"],
  "gastronomia": ["gastronomia-01.js", "gastronomia-02.js", "gastronomia-03.js"],
  "guia": ["guia-01.js", "guia-02.js", "guia-03.js"],
  "home": ["home-01.js"],
  "historia": ["historia-01.js"],
  "television": ["television-01.js"],
  "hospedaje": ["hospedaje-01.js"],
  "hoy": ["hoy-01.js"],
  "naturaleza": ["naturaleza-01.js", "naturaleza-02.js"],
  "playas": ["playas-01.js", "playas-02.js"],
  "quiero": ["quiero-01.js"],
  "transportes": ["transportes-01.js"],
  "vida-nocturna": ["vida-nocturna-01.js", "vida-nocturna-02.js", "vida-nocturna-03.js", "vida-nocturna-04.js", "vida-nocturna-05.js", "vida-nocturna-06.js", "vida-nocturna-07.js", "vida-nocturna-08.js", "vida-nocturna-09.js", "vida-nocturna-10.js", "vida-nocturna-11.js"],
};
async function loadSectionTranslations() {
  const section = routeParts().path.split("/").filter(Boolean)[0] || "home";
  const chunks = ["common-02.js", "metadata-01.js", "metadata-02.js", ...(sectionChunks[section] || [])];
  const loaded = await Promise.allSettled(chunks.map(file => import(`./translations/chunks/${file}`)));
  for (const result of loaded) if (result.status === "fulfilled") Object.assign(common, result.value.default);
}
function translatePhrase(text, lang = getLanguage()) {
  return lang === "ES" ? text : common[text]?.[lang] ?? text;
}
const original = new WeakMap();
function translateText(root, lang) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName) || parent.closest("[data-i18n], [data-live], [data-ch-es], [data-tj-es]")) continue;
    if (!original.has(node)) original.set(node, node.nodeValue);
    const base = original.get(node), trimmed = base.trim(), hit = common[trimmed];
    node.nodeValue = hit && lang !== "ES" ? base.replace(trimmed, hit[lang] || trimmed) : base;
  }
}
function ensureTopbarNav() {
  let bar=document.querySelector(".topbar");
  const gastronomyDetail=/^\/gastronomia\/[^/]+\/?$/.test(location.pathname);
  if(!bar&&gastronomyDetail){
    bar=document.createElement("header");
    bar.className="topbar ec-gastronomy-detail-topbar";
    const brand=document.createElement("a");
    brand.className="brand";brand.href="/";brand.setAttribute("aria-label","Ernestinho Carioca");
    brand.innerHTML='<img src="/assets/brand/ec-mark.png" alt="Ernestinho Carioca" width="36" height="36">';
    bar.appendChild(brand);
    document.body.insertBefore(bar,document.body.firstChild);
  }
  if(!bar)return;
  let nav=bar.querySelector(":scope > nav");
  if(!nav){nav=document.createElement("nav");bar.appendChild(nav);}
  nav.classList.add("ec-primary-nav");
  nav.setAttribute("aria-label","Navegación principal");
  const links=[["Guía de Río","/guia/"],["Experiencias","/experiencias/"],["Transportes","/transportes/"],["Hospedaje","/hospedaje/"],["Compras","/compras/"],["Café Río","/cafe-rio/"],["Búzios","/destinos/buzios/"]];
  nav.replaceChildren();
  for(const [label,href] of links){const a=document.createElement("a");a.href=href;a.textContent=label;nav.appendChild(a);}
}
function ensureSocialLinks() {
  const bar=document.querySelector(".topbar");
  if(!bar||bar.querySelector(".ec-social-links"))return;
  const group=document.createElement("div");
  group.className="ec-social-links";
  group.setAttribute("aria-label","Redes sociales");
  const items=[
    ["https://www.tiktok.com/@ernestojdojeda","Abrir TikTok","<svg viewBox='0 0 24 24' aria-hidden='true'><path fill='currentColor' d='M19.6 7.4a7.1 7.1 0 0 1-4.4-1.5v8.2a6.2 6.2 0 1 1-5.1-6.1v3.3a2.9 2.9 0 1 0 1.8 2.7V2h3.3c.2 2.2 1.9 3.9 4.4 4.1z'/></svg>"],
    ["https://www.instagram.com/ernestinhocarioca/","Abrir Instagram","<svg viewBox='0 0 24 24' aria-hidden='true' fill='none' stroke='currentColor' stroke-width='1.8'><rect x='3' y='3' width='18' height='18' rx='5'/><circle cx='12' cy='12' r='4'/><circle cx='17.5' cy='6.7' r='1' fill='currentColor' stroke='none'/></svg>"],
    ["https://wa.me/5521969946938","Contactar por WhatsApp","<svg viewBox='0 0 24 24' aria-hidden='true' fill='none' stroke='currentColor' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'><path d='M20.2 11.6a8.2 8.2 0 0 1-12.1 7.2L3 20l1.3-4.8a8.2 8.2 0 1 1 15.9-3.6Z'/><path d='M8.2 7.8c.3-.6.6-.6.9-.6h.5c.2 0 .4 0 .6.5l.8 1.9c.1.3.1.5-.1.7l-.6.7c-.2.2-.2.4 0 .7.5.8 1.2 1.5 2 2 .3.2.5.2.7-.1l.8-.9c.2-.2.4-.3.7-.2l1.8.9c.3.1.5.3.5.5 0 .3-.2 1.2-.7 1.7-.5.5-1.2.8-2 .7-1.1-.1-2.5-.6-4.1-2-1.7-1.5-2.8-3.4-3.1-4.5-.3-1.1.1-1.8.5-2.1Z'/></svg>"]
  ];
  for(const [href,label,icon] of items){
    const a=document.createElement("a");a.className="ec-social-link";a.href=href;a.target="_blank";a.rel="noopener noreferrer";a.setAttribute("aria-label",label);a.title=label;a.innerHTML=icon;group.appendChild(a);
  }
  const tools=bar.querySelector(".tools");
  if(tools)bar.insertBefore(group,tools);else bar.appendChild(group);
}
function ensureMobileLanguageRow() {
  const existing=document.querySelector(".ec-mobile-language-row");
  if(existing){if(hasLocaleRoutes())existing.querySelectorAll("a[data-ec-language]").forEach(a=>a.href=localeHref(a.dataset.ecLanguage));return;}
  const bar=document.querySelector(".topbar");
  const row=document.createElement("div");
  row.className="ec-mobile-language-row";
  row.setAttribute("role","group");
  row.setAttribute("aria-label","Cambiar idioma");
  const options=[["ES","🇪🇸","Español"],["PT","🇧🇷","Português"],["EN","🇺🇸","English"]];
  for(const [code,flag,label] of options){
    const b=document.createElement(hasLocaleRoutes()?"a":"button");if(b.tagName==="BUTTON")b.type="button";else{b.href=localeHref(code);b.hreflang=code==="PT"?"pt-BR":code.toLowerCase();b.style.textDecoration="none";}b.className="ec-language-choice";b.dataset.ecLanguage=code;b.setAttribute("aria-label",label);b.setAttribute("aria-pressed","false");b.innerHTML="<span aria-hidden='true'>"+flag+"</span><span>"+code+"</span>";
    if(b.tagName==="BUTTON")b.addEventListener("click",()=>apply(code));
    row.appendChild(b);
  }
  if(bar&&bar.parentNode)bar.parentNode.insertBefore(row,bar.nextSibling);else document.body.prepend(row);
}
function hideEmbeddedLanguageControls(){
  const groups=new Set();
  document.querySelectorAll("button[onclick*='setLang'],button[onclick*='renderLang'],button[data-ns-lang],button[data-tj-lang]").forEach(button=>{const parent=button.parentElement;if(parent)groups.add(parent);});
  groups.forEach(group=>{if(group.querySelectorAll("button").length>=3){group.style.display="none";group.setAttribute("aria-hidden","true");}});
  if(/^\/gastronomia\/[^/]+\/?$/.test(location.pathname)){
    document.querySelectorAll(".lang-switcher").forEach(group=>{group.style.display="none";group.setAttribute("aria-hidden","true");});
  }
}
function ensureGlobalStyles() {
  if(document.getElementById("ec-global-controls-style"))return;
  const style=document.createElement("style");
  style.id="ec-global-controls-style";
  style.textContent=`.ec-social-links{display:flex;align-items:center;gap:7px}.topbar .tools{display:flex!important;align-items:center;gap:12px;margin-left:auto;flex:0 0 auto}.ec-desktop-language{display:flex;align-items:center;gap:6px;padding:7px;border:1px solid #e7b85c;border-radius:999px;background:#071313ef}.ec-desktop-language-choice{min-width:44px;height:36px;padding:0 11px;border:0;border-radius:999px;background:#123b3b;color:#f6f0e6;font:800 12px ui-sans-serif,system-ui,sans-serif;letter-spacing:.02em;cursor:pointer}.ec-desktop-language-choice:hover,.ec-desktop-language-choice.is-active{background:#e7b85c;color:#132222}.ec-social-link{display:grid;place-items:center;width:34px;height:34px;border:1px solid rgba(215,164,59,.45);border-radius:50%;color:#e8c36c;transition:background .18s ease,color .18s ease}.ec-social-link:hover{background:#d7a43b;color:#061817}.ec-social-link svg{width:17px;height:17px;display:block}.ec-mobile-language-row{display:none}.ec-corporate-closing{background:#020719;color:#fff}.ec-closing-cta{max-width:1380px;margin:0 auto;padding:54px 7vw;display:flex;align-items:center;justify-content:space-between;gap:32px}.ec-closing-cta h2{margin:0;color:#fff;font-size:clamp(30px,4vw,58px);line-height:.95}.ec-closing-cta p{color:#93a4c8}.ec-closing-cta>a{display:inline-flex;align-items:center;gap:9px;padding:14px 20px;border-radius:999px;background:#fff;color:#071c1b;font-weight:800;font-size:12px}.ec-corporate-footer{min-height:236px;padding:68px 24px 62px;border-top:1px solid #26324b;background:#020719;display:flex;align-items:center;justify-content:space-between;gap:40px}.ec-footer-brand{display:flex;align-items:center;gap:18px}.ec-footer-brand img{width:60px;height:60px;object-fit:contain}.ec-footer-brand strong{display:block;color:#fff;font:900 27px/1 ui-sans-serif,system-ui,sans-serif;letter-spacing:-.04em}.ec-footer-brand strong em{color:#18b8aa;font-style:normal}.ec-footer-brand small{display:block;margin-top:10px;color:#7890bf;font:400 15px/1.2 ui-sans-serif,system-ui,sans-serif;letter-spacing:.14em}.ec-footer-legal{text-align:right;color:#7890bf;font:400 17px/1.45 ui-sans-serif,system-ui,sans-serif}.ec-footer-legal p{margin:0}.ec-footer-legal a{display:inline-block;margin-top:15px;color:#00ead1;font-weight:800}.ec-global-actions{position:fixed;right:18px;bottom:18px;z-index:9998;display:flex;flex-direction:column;align-items:flex-end;gap:8px;font-family:ui-sans-serif,system-ui,sans-serif}.ec-float-btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:44px;padding:10px 14px;border:1px solid #d7a43b;border-radius:999px;background:#092522;color:#fff;font-size:13px;font-weight:700;line-height:1;box-shadow:0 8px 24px rgba(0,0,0,.24);cursor:pointer;text-decoration:none}.ec-float-btn:hover{background:#123d39}.ec-share-panel{position:absolute;right:0;bottom:54px;width:216px;padding:12px;border:1px solid rgba(215,164,59,.55);border-radius:16px;background:#092522;color:#fff;box-shadow:0 14px 38px rgba(0,0,0,.32)}.ec-share-panel[hidden]{display:none!important}.ec-share-panel strong{display:block;padding:5px 7px 9px;color:#e8c36c;font-size:13px}.ec-share-option{display:flex;width:100%;margin:3px 0;padding:10px 9px;border:0;border-radius:10px;background:transparent;color:#fff;text-align:left;font:600 14px ui-sans-serif,system-ui,sans-serif;cursor:pointer}.ec-share-option:hover,.ec-share-option:focus-visible{background:#123d39}.ec-share-status{max-width:260px;padding:8px 11px;border-radius:10px;background:#f7f2e8;color:#061817;font-size:13px;box-shadow:0 5px 20px rgba(0,0,0,.2)}.ec-share-status[hidden]{display:none!important}.ec-language-choice:focus-visible,.ec-social-link:focus-visible,.ec-float-btn:focus-visible,.ec-share-option:focus-visible{outline:3px solid #e8c36c;outline-offset:3px}@media(max-width:900px){.topbar{display:grid!important;grid-template-columns:auto 1fr;grid-template-areas:'brand social' 'nav nav';align-items:center;gap:7px 10px;height:auto!important;min-height:0;padding:8px 4vw!important}.topbar .brand{grid-area:brand}.topbar nav{grid-area:nav;display:flex!important;flex:0 0 100%;width:100%;gap:18px;overflow-x:auto;overscroll-behavior-x:contain;white-space:nowrap;padding:6px 0 4px;scrollbar-width:none}.topbar nav::-webkit-scrollbar{display:none}.topbar nav a{flex:0 0 auto;padding:4px 0;font-size:10px}.topbar .ec-social-links{grid-area:social;justify-self:end}.topbar .tools{display:none!important}.ec-corporate-footer{min-height:0;padding:42px 24px;flex-direction:column;align-items:flex-start}.ec-footer-legal{text-align:left;font-size:14px}.ec-footer-brand strong{font-size:22px}.ec-footer-brand small{font-size:12px}.ec-closing-cta{padding:40px 24px;flex-direction:column;align-items:flex-start}.ec-mobile-language-row{display:flex;justify-content:center;gap:9px;padding:8px 12px;background:#f7f2e8;border-bottom:1px solid rgba(6,24,23,.12)}.ec-language-choice{display:flex;align-items:center;gap:5px;min-height:38px;padding:7px 11px;border:1px solid #9c8b68;border-radius:999px;background:#fff;color:#092522;font:700 12px ui-sans-serif,system-ui,sans-serif;cursor:pointer}.ec-language-choice.is-active{background:#123d39;color:#fff;border-color:#d7a43b}.ec-global-actions{right:12px;bottom:calc(env(safe-area-inset-bottom,0px) + 88px);gap:7px}.ec-float-btn{min-height:44px;padding:10px 12px;font-size:12px}.ec-share-panel{bottom:52px}}`;
  style.textContent += ".ec-gastronomy-detail-topbar{height:74px;padding:0 5vw;display:flex;align-items:center;gap:clamp(10px,2vw,22px);background:rgba(6,24,23,.98);color:#fff;position:sticky;top:0;z-index:10000;border-bottom:1px solid rgba(215,164,59,.3);font-family:ui-sans-serif,system-ui,sans-serif}.ec-gastronomy-detail-topbar .brand{display:grid;place-items:center;flex:0 0 45px;width:45px;height:45px;border:1px solid #e7b85c;border-radius:50%;color:#e7b85c}.ec-gastronomy-detail-topbar .brand img{display:block;width:36px;height:36px;object-fit:contain}.ec-gastronomy-detail-topbar .ec-primary-nav{display:flex;align-items:center;justify-content:flex-start;gap:clamp(8px,1.4vw,18px);flex:1;min-width:0}.ec-gastronomy-detail-topbar .ec-primary-nav a{flex:0 0 auto;color:#fff;text-decoration:none;font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap}.ec-gastronomy-detail-topbar .ec-primary-nav a:hover{color:#e7b85c}@media(max-width:900px){.ec-gastronomy-detail-topbar{display:grid!important;grid-template-columns:auto 1fr;grid-template-areas:'brand social' 'nav nav';align-items:center;gap:7px 10px;height:auto!important;min-height:0;padding:8px 4vw!important}.ec-gastronomy-detail-topbar .brand{grid-area:brand}.ec-gastronomy-detail-topbar .ec-primary-nav{grid-area:nav;display:flex;flex:0 0 100%;width:100%;gap:16px;overflow-x:auto;white-space:nowrap;padding:6px 0 4px;scrollbar-width:none}.ec-gastronomy-detail-topbar .ec-primary-nav::-webkit-scrollbar{display:none}.ec-gastronomy-detail-topbar .tools{display:none!important}.ec-gastronomy-detail-topbar .ec-social-links{grid-area:social;justify-self:end}}";
  document.head.appendChild(style);
}
function ensureTools() {
  const bar=document.querySelector(".topbar");
  let tools=bar?.querySelector(".tools");
  if(!tools&&bar){tools=document.createElement("div");tools.className="tools";bar.appendChild(tools);}
  if(!tools){
    const host=document.querySelector("nav.back,.back")||document.body;
    tools=document.createElement("div");tools.className="ec-language-tools";tools.setAttribute("role","group");tools.setAttribute("aria-label","Cambiar idioma");host.appendChild(tools);
  }
  const oldWhatsApp=tools.querySelector('a[href*="wa.me"]');if(oldWhatsApp)oldWhatsApp.remove();
  let button=tools.querySelector("#lang,[data-lang-toggle],[data-ec-desktop-language-group]");
  if(!button){button=document.createElement("div");button.dataset.langToggle="";tools.appendChild(button);}
  if(button.tagName==="BUTTON"){const replacement=document.createElement("div");replacement.dataset.langToggle="";button.replaceWith(replacement);button=replacement;}
  button.classList.add("ec-desktop-language");
  // Legacy page renderers treat data-lang-toggle as a text-only control.
  button.removeAttribute("data-lang-toggle");
  button.dataset.ecDesktopLanguageGroup="";
  // Some approved headers contain an unmarked legacy language button.
  // Remove only those direct siblings, including ones retained by prerendering.
  for(const legacy of tools.querySelectorAll(':scope > button')){
    if(legacy!==button && /^(ES|PT(?:-BR)?|EN)$/.test(legacy.textContent.trim()))legacy.remove();
  }
  button.setAttribute("role","group");button.setAttribute("aria-label","Cambiar idioma");
  button.replaceChildren();
  for(const code of ["ES","PT","EN"]){const choice=document.createElement(hasLocaleRoutes()?"a":"button");if(choice.tagName==="BUTTON")choice.type="button";else{choice.href=localeHref(code);choice.hreflang=code==="PT"?"pt-BR":code.toLowerCase();choice.style.cssText="text-decoration:none;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box";}choice.className="ec-desktop-language-choice";choice.dataset.desktopLanguage=code;if(document.querySelector("[data-ch-es]"))choice.dataset.ecLanguage=code;choice.textContent=code==="PT"?"PT-BR":code;choice.setAttribute("aria-label",code==="ES"?"Español":code==="PT"?"Português (Brasil)":"English");if(choice.tagName==="BUTTON")choice.addEventListener("click",()=>apply(code));button.appendChild(choice);}
  return button;
}
async function copyCurrentLink(message) {
  let copied=false;
  try{await navigator.clipboard.writeText(location.href);copied=true;}catch(_){}
  if(!copied){
    const field=document.createElement("textarea");field.value=location.href;field.setAttribute("readonly","");field.style.position="fixed";field.style.opacity="0";document.body.appendChild(field);field.select();
    try{copied=document.execCommand("copy");}catch(_){}field.remove();
  }
  const status=document.querySelector(".ec-share-status");
  if(status){status.textContent=translatePhrase(copied?message:"No se pudo copiar el enlace.");status.hidden=false;clearTimeout(status._hideTimer);status._hideTimer=setTimeout(()=>{status.hidden=true;},4200);}
}
async function sharePage(target) {
  const url=location.href,title=document.title;
  if(target==="whatsapp"){window.open("https://wa.me/?text="+encodeURIComponent(title+" "+url),"_blank","noopener,noreferrer");return;}
  if(target==="facebook"){window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(url),"_blank","noopener,noreferrer");return;}
  if(target==="instagram"||target==="native"){
    if(typeof navigator.share==="function"){
      try{await navigator.share({title,url});return;}catch(error){if(error&&error.name==="AbortError")return;}
    }
    await copyCurrentLink(target==="instagram"?"Enlace copiado. Puedes pegarlo en Instagram.":"Enlace copiado.");
  }
}
function ensureGlobalActions() {
  if(document.querySelector(".ec-global-actions"))return;
  const root=document.createElement("div");root.className="ec-global-actions";
  const panel=document.createElement("div");panel.className="ec-share-panel";panel.id="ec-share-panel";panel.hidden=true;
  const heading=document.createElement("strong");heading.textContent="Compartir esta página";panel.appendChild(heading);
  for(const [target,label] of [["whatsapp","Compartir en WhatsApp"],["instagram","Compartir en Instagram"],["facebook","Compartir en Facebook"],["native","Más aplicaciones"]]){
    const button=document.createElement("button");button.type="button";button.className="ec-share-option";button.dataset.shareTarget=target;button.textContent=label;
    button.addEventListener("click",async()=>{panel.hidden=true;const toggle=root.querySelector(".ec-share-toggle");toggle?.setAttribute("aria-expanded","false");await sharePage(target);});
    panel.appendChild(button);
  }
  const status=document.createElement("div");status.className="ec-share-status";status.setAttribute("role","status");status.setAttribute("aria-live","polite");status.hidden=true;panel.appendChild(status);
  const back=document.createElement("a");back.className="ec-float-btn ec-return-link";back.href="/";back.setAttribute("aria-label","Volver a la página anterior");back.innerHTML="<span aria-hidden='true'>↶</span><span>Volver</span>";back.addEventListener("click",event=>{const referrer=document.referrer;try{if(referrer&&new URL(referrer).origin===location.origin&&history.length>1){event.preventDefault();history.back();}}catch(_){}});
  const share=document.createElement("button");share.type="button";share.className="ec-float-btn ec-share-toggle";share.textContent="Compartir";share.setAttribute("aria-expanded","false");share.setAttribute("aria-controls","ec-share-panel");share.setAttribute("aria-label","Compartir esta página");
  share.addEventListener("click",()=>{panel.hidden=!panel.hidden;share.setAttribute("aria-expanded",String(!panel.hidden));});
  root.append(panel,back,share);document.body.appendChild(root);
  document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!panel.hidden){panel.hidden=true;share.setAttribute("aria-expanded","false");}});
  document.addEventListener("click",event=>{if(!root.contains(event.target)&&!panel.hidden){panel.hidden=true;share.setAttribute("aria-expanded","false");}});
}
function translateAttrs(lang) {
  const attrs = [
    ["placeholder", "ecPlaceholder", "i18nPlaceholder"], ["aria-label", "ecAriaLabel", "i18nAriaLabel"],
    ["title", "ecTitle", "i18nTitle"], ["alt", "ecAlt", null], ["content", "ecContent", "i18nContent"]
  ];
  document.querySelectorAll('[placeholder], [aria-label]:not(#lang):not([data-lang-toggle]):not([data-ec-desktop-language-group]), [title], img[alt], meta[name=description], meta[name^="twitter:"], meta[property^="og:"]').forEach(el => {
    for (const [attr, originalKey, translationKey] of attrs) {
      if (!el.hasAttribute(attr) || (translationKey && el.hasAttribute(`data-${translationKey.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}`))) continue;
      if (attr === "content" && !(el.tagName === "META")) continue;
      if (!el.dataset[originalKey]) el.dataset[originalKey] = el.getAttribute(attr);
      const base = el.dataset[originalKey], hit = common[base];
      el.setAttribute(attr, hit && lang !== "ES" ? hit[lang] || base : base);
    }
  });
}
function applyEmbeddedShoppingCopy(lang) {
  // These nodes own their ES/PT/EN copy; keep them out of the phrase cache.
  document.querySelectorAll("[data-ch-es], [data-tj-es]").forEach(el => {
    const prefix = el.hasAttribute("data-tj-es") ? "tj" : "ch";
    const value = el.getAttribute(`data-${prefix}-${lang.toLowerCase()}`);
    if (!value) return;
    const text = [...el.childNodes].find(node => node.nodeType === Node.TEXT_NODE);
    if (text) text.nodeValue = value;
  });
}
function apply(lang) {
  const selected = setLanguage(lang);
  applyEmbeddedShoppingCopy(selected);
  translateText(document.head, selected);
  translateText(document.body, selected);
  translateAttrs(selected);
  applyTranslations(document, selected);
  document.querySelectorAll("[data-desktop-language]").forEach(button => { button.classList.toggle("is-active",button.dataset.desktopLanguage===selected); button.setAttribute("aria-pressed",String(button.dataset.desktopLanguage===selected)); });
  document.querySelectorAll("[data-ec-language]").forEach(button => { const active=button.dataset.ecLanguage===selected; button.classList.toggle("is-active",active); button.setAttribute("aria-pressed",String(active)); });
  document.documentElement.lang = selected === "PT" ? "pt-BR" : selected.toLowerCase();
  applySeoMetadata(selected);
  localizeLinks(document, selected);
  syncLocaleMetadata();
}
function ensureGuideAdn(){const p=routeParts().path;if(!p.startsWith('/guia/'))return;if(document.querySelector('link[data-guide-adn]'))return;const l=document.createElement('link');l.rel='stylesheet';l.href=new URL('../css/guia-adn.css',import.meta.url).href;l.dataset.guideAdn='';document.head.appendChild(l);}

function ensureCorporateClosing(){
  if(document.querySelector(".ec-corporate-closing"))return;
  const oldFooter=document.querySelector("body > footer, main + footer");
  const root=document.createElement("section");root.className="ec-corporate-closing";root.innerHTML=`
    <div class="ec-closing-cta">
      <div><h2>¿QUIERES CONOCER RÍO<br>CONMIGO?</h2><p>Diseñamos tu itinerario o te acompaño en un tour privado exclusivo.</p></div>
      <a href="https://wa.me/5521969946938?text=Hola%20Ernestinho%2C%20quiero%20conocer%20R%C3%ADo%20contigo." target="_blank" rel="noopener noreferrer"><span aria-hidden="true">●</span> HABLAR CON ERNESTINHO POR WHATSAPP</a>
    </div>
    <footer class="ec-corporate-footer">
      <div class="ec-footer-brand"><img src="https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/89161BC4-595E-455D-8211-87277AC58B53" alt="Ernestinho Carioca"><div><strong>ERNESTINHO <em>CARIOCA</em></strong><small>RÍO DE JANEIRO, DESDE MI MIRADA</small></div></div>
      <div class="ec-footer-legal"><p>© 2026 Ernestinho Carioca. Todos los derechos reservados.</p><p>Diseñado para viajeros que buscan vivir Río de forma real y auténtica.</p><a href="/privacidad-precios-condiciones/">Privacidad, precios y condiciones</a></div>
    </footer>`;
  if(oldFooter)oldFooter.replaceWith(root);else document.body.appendChild(root);
}

async function init() {
  addTransportPhotoReferences();
  addBulkPhotoReferences();
  ensureGuideAdn();
  ensureCorporateClosing();
  ensureGlobalStyles();
  ensureTopbarNav();
  ensureSocialLinks();
  ensureMobileLanguageRow();
  hideEmbeddedLanguageControls();
  ensureGlobalActions();
  mountCariocIA();
  const button = ensureTools();
  if (!button) return;
  apply(getLanguage());

  await loadSectionTranslations();
  apply(getLanguage());
  const observer = new MutationObserver(records => {
    const added = records.flatMap(record => [...record.addedNodes]).filter(node => node.nodeType === Node.ELEMENT_NODE);
    if (added.length) for (const node of added) { translateText(node, getLanguage()); translateAttrs(getLanguage()); applyTranslations(node, getLanguage()); localizeLinks(node); }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  document.addEventListener("ec:language", event => {
    const selected = event.detail?.lang || getLanguage();
    applyEmbeddedShoppingCopy(selected);
    translateText(document.head, selected); translateText(document.body, selected); translateAttrs(selected); applyTranslations(document, selected);
    applySeoMetadata(selected); syncLocaleMetadata();
  });
  // Bridge shared language controls to pages that render their own ES/PT/EN copy.
  let syncingEmbeddedLanguage = false;
  document.addEventListener("ec:language", event => {
    if (syncingEmbeddedLanguage) return;
    const selected = String(event.detail?.lang || getLanguage()).slice(0, 2).toUpperCase();
    const candidates = [...document.querySelectorAll("button, [role='button'], a[role='button']")];
    const button = candidates.find(el => {
      if (el.matches("[data-ec-language], [data-desktop-language], #lang, [data-lang-toggle], [data-ns-lang], [data-tj-lang]")) return false;
      const onclick = el.getAttribute("onclick") || "";
      const value = String(el.dataset.lang || el.dataset.language || el.dataset.locale || el.value || el.textContent || "").trim().toUpperCase();
      const code = onclick.match(/(?:setLang|renderLang|lang)\s*\(\s*['"]?(ES|PT|EN)/i)?.[1]?.toUpperCase();
      return value === selected || code === selected;
    });
    if (button) {
      syncingEmbeddedLanguage = true;
      button.click();
      queueMicrotask(() => { syncingEmbeddedLanguage = false; });
    }
  });
  apply(getLanguage());
}
const ready = document.readyState === "loading"
  ? new Promise((resolve,reject)=>document.addEventListener("DOMContentLoaded",()=>init().then(resolve,reject),{once:true}))
  : init();
// EC preview trigger: 2026-09-29 guide-and-corporate-closing
// Force GitHub→Vercel preview: 2026-09-29T01:15 Rio
export { apply, translatePhrase, ready };
