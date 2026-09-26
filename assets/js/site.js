import { LANGS, getLanguage, cycleLanguage, setLanguage, applyTranslations } from "./i18n.js";
if (!document.querySelector('link[href*="components.css"]') && !document.querySelector("[data-ec-brand-type]")) { const fontSheet=document.createElement("link"); fontSheet.rel="stylesheet"; fontSheet.href=new URL("../css/type.css",import.meta.url).href; fontSheet.dataset.ecBrandType=""; document.head.append(fontSheet); }
const common={"Guía de Río":{"PT":"Guia do Rio","EN":"Rio Guide"},"Experiencias":{"PT":"Experiências","EN":"Experiences"},"Transportes":{"PT":"Transportes","EN":"Transport"},"Eventos":{"PT":"Eventos","EN":"Events"},"Hospedaje":{"PT":"Hospedagem","EN":"Stay"},"Compras":{"PT":"Compras","EN":"Shopping"},"Barrios":{"PT":"Bairros","EN":"Neighborhoods"},"Gastronomía":{"PT":"Gastronomia","EN":"Food"},"Consejos":{"PT":"Dicas","EN":"Tips"},"Playas":{"PT":"Praias","EN":"Beaches"},"Vida Nocturna":{"PT":"Vida Noturna","EN":"Nightlife"},"Familia":{"PT":"Família","EN":"Family"},"Atracciones":{"PT":"Atrações","EN":"Attractions"},"Fotografía":{"PT":"Fotografia","EN":"Photography"},"Río no se visita. Se vive.":{"PT":"O Rio não se visita. Se vive.","EN":"Rio isn't just visited. It's lived."},"ABRIR GUÍA →":{"PT":"ABRIR GUIA →","EN":"OPEN GUIDE →"},"DESCUBRIR →":{"PT":"DESCOBRIR →","EN":"DISCOVER →"},"EXPLORAR →":{"PT":"EXPLORAR →","EN":"EXPLORE →"},"VER FICHA →":{"PT":"VER FICHA →","EN":"VIEW GUIDE →"},"Volver a Gastronomía":{"PT":"Voltar à Gastronomia","EN":"Back to Food"},"Antes de ir":{"PT":"Antes de ir","EN":"Before you go"},"Mi lectura":{"PT":"Minha leitura","EN":"My take"},"Buscar por nombre, barrio o estilo…":{"PT":"Buscar por nome, bairro ou estilo…","EN":"Search by name, neighborhood or style…"},"TODOS":{"PT":"TODOS","EN":"ALL"},"PESCADOS / MAR":{"PT":"PEIXES / MAR","EN":"SEAFOOD"},"ASIÁTICA":{"PT":"ASIÁTICA","EN":"ASIAN"},"ALMUERZO / BUFFET":{"PT":"ALMOÇO / BUFFET","EN":"LUNCH / BUFFET"},"VEGETARIANA":{"PT":"VEGETARIANA","EN":"VEGETARIAN"},"QUIOSQUES":{"PT":"QUIOSQUES","EN":"KIOSKS"},"EXPERIENCIAS":{"PT":"EXPERIÊNCIAS","EN":"EXPERIENCES"},"Ficha rápida":{"PT":"Informações rápidas","EN":"Quick facts"},"Barrio mostrado":{"PT":"Bairro","EN":"Neighborhood"},"Clasificación de la ficha":{"PT":"Categoria","EN":"Category"},"Estado de la información":{"PT":"Estado das informações","EN":"Information status"},"Verificación necesaria":{"PT":"Precisa confirmar","EN":"Please confirm"},"Lo que consta en las fuentes":{"PT":"O que consta nas fontes","EN":"What the sources say"},"Café Río":{"PT":"Café Rio","EN":"Rio Coffee"},"Sitio anterior":{"PT":"Site anterior","EN":"Previous site"},"Compartir":{"PT":"Compartilhar","EN":"Share"},"Compartir esta página":{"PT":"Compartilhe esta página","EN":"Share this page"},"Compartir en WhatsApp":{"PT":"Compartilhar no WhatsApp","EN":"Share on WhatsApp"},"Compartir en Instagram":{"PT":"Compartilhar no Instagram","EN":"Share on Instagram"},"Compartir en Facebook":{"PT":"Compartilhar no Facebook","EN":"Share on Facebook"},"Más aplicaciones":{"PT":"Mais aplicativos","EN":"More apps"},"Enlace copiado. Puedes pegarlo en Instagram.":{"PT":"Link copiado. Você pode colá-lo no Instagram.","EN":"Link copied. You can paste it into Instagram."},"Enlace copiado.":{"PT":"Link copiado.","EN":"Link copied."},"No se pudo copiar el enlace.":{"PT":"Não foi possível copiar o link.","EN":"Could not copy the link."},"Abrir TikTok":{"PT":"Abrir TikTok","EN":"Open TikTok"},"Abrir Instagram":{"PT":"Abrir Instagram","EN":"Open Instagram"},"Contactar por WhatsApp":{"PT":"Falar pelo WhatsApp","EN":"Contact on WhatsApp"},"Cambiar idioma":{"PT":"Mudar idioma","EN":"Change language"},"Español":{"PT":"Espanhol","EN":"Spanish"},"Português":{"PT":"Português","EN":"Portuguese"},"English":{"PT":"Inglês","EN":"English"}};
const sectionChunks = {
  "atracciones": ["atracciones-01.js"],
  "barrios": ["barrios-01.js"],
  "cafe-rio": ["cafe-rio-01.js"],
  "compras": ["compras-01.js"],
  "consejos": ["consejos-01.js"],
  "eventos": ["eventos-01.js"],
  "experiencias": ["experiencias-01.js"],
  "familia": ["familia-01.js"],
  "fotografia": ["fotografia-01.js"],
  "gastronomia": ["gastronomia-01.js"],
  "guia": ["guia-01.js"],
  "home": ["home-01.js"],
  "hospedaje": ["hospedaje-01.js"],
  "hoy": ["hoy-01.js"],
  "playas": ["playas-01.js"],
  "quiero": ["quiero-01.js"],
  "transportes": ["transportes-01.js"],
  "vida-nocturna": ["vida-nocturna-01.js"],
};
async function loadSectionTranslations() {
  const section = location.pathname.split("/").filter(Boolean)[0] || "home";
  const chunks = sectionChunks[section] || [];
  const loaded = await Promise.allSettled(chunks.map(file => import(`./translations/chunks/${file}`)));
  for (const result of loaded) if (result.status === "fulfilled") Object.assign(common, result.value.default);
}
const original = new WeakMap();
function translateText(root, lang) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) continue;
    if (!original.has(node)) original.set(node, node.nodeValue);
    const base = original.get(node), trimmed = base.trim(), hit = common[trimmed];
    node.nodeValue = hit && lang !== "ES" ? base.replace(trimmed, hit[lang] || trimmed) : base;
  }
}
function ensureTopbarNav() {
  const bar=document.querySelector(".topbar");
  if(!bar)return;
  let nav=bar.querySelector(":scope > nav");
  if(!nav){nav=document.createElement("nav");bar.appendChild(nav);}
  nav.classList.add("ec-primary-nav");
  nav.setAttribute("aria-label","Navegación principal");
  const links=[["Guía de Río","/guia/"],["Experiencias","/experiencias/"],["Transportes","/transportes/"],["Hospedaje","/hospedaje/"],["Compras","/compras/"],["Café Río","/cafe-rio/"]];
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
  if(document.querySelector(".ec-mobile-language-row"))return;
  const bar=document.querySelector(".topbar");
  const row=document.createElement("div");
  row.className="ec-mobile-language-row";
  row.setAttribute("role","group");
  row.setAttribute("aria-label","Cambiar idioma");
  const options=[["ES","🇪🇸","Español"],["PT","🇧🇷","Português"],["EN","🇺🇸","English"]];
  for(const [code,flag,label] of options){
    const b=document.createElement("button");b.type="button";b.className="ec-language-choice";b.dataset.ecLanguage=code;b.setAttribute("aria-label",label);b.setAttribute("aria-pressed","false");b.innerHTML="<span aria-hidden='true'>"+flag+"</span><span>"+code+"</span>";
    b.addEventListener("click",()=>apply(code));
    row.appendChild(b);
  }
  if(bar&&bar.parentNode)bar.parentNode.insertBefore(row,bar.nextSibling);else document.body.prepend(row);
}
function ensureGlobalStyles() {
  if(document.getElementById("ec-global-controls-style"))return;
  const style=document.createElement("style");
  style.id="ec-global-controls-style";
  style.textContent=`.ec-social-links{display:flex;align-items:center;gap:7px}.ec-social-link{display:grid;place-items:center;width:34px;height:34px;border:1px solid rgba(215,164,59,.45);border-radius:50%;color:#e8c36c;transition:background .18s ease,color .18s ease}.ec-social-link:hover{background:#d7a43b;color:#061817}.ec-social-link svg{width:17px;height:17px;display:block}.ec-mobile-language-row{display:none}.ec-global-actions{position:fixed;right:18px;bottom:18px;z-index:9998;display:flex;flex-direction:column;align-items:flex-end;gap:8px;font-family:ui-sans-serif,system-ui,sans-serif}.ec-float-btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:44px;padding:10px 14px;border:1px solid #d7a43b;border-radius:999px;background:#092522;color:#fff;font-size:13px;font-weight:700;line-height:1;box-shadow:0 8px 24px rgba(0,0,0,.24);cursor:pointer;text-decoration:none}.ec-float-btn:hover{background:#123d39}.ec-share-panel{position:absolute;right:0;bottom:54px;width:216px;padding:12px;border:1px solid rgba(215,164,59,.55);border-radius:16px;background:#092522;color:#fff;box-shadow:0 14px 38px rgba(0,0,0,.32)}.ec-share-panel[hidden]{display:none!important}.ec-share-panel strong{display:block;padding:5px 7px 9px;color:#e8c36c;font-size:13px}.ec-share-option{display:flex;width:100%;margin:3px 0;padding:10px 9px;border:0;border-radius:10px;background:transparent;color:#fff;text-align:left;font:600 14px ui-sans-serif,system-ui,sans-serif;cursor:pointer}.ec-share-option:hover,.ec-share-option:focus-visible{background:#123d39}.ec-share-status{max-width:260px;padding:8px 11px;border-radius:10px;background:#f7f2e8;color:#061817;font-size:13px;box-shadow:0 5px 20px rgba(0,0,0,.2)}.ec-share-status[hidden]{display:none!important}.ec-language-choice:focus-visible,.ec-social-link:focus-visible,.ec-float-btn:focus-visible,.ec-share-option:focus-visible{outline:3px solid #e8c36c;outline-offset:3px}@media(max-width:900px){.topbar{display:grid!important;grid-template-columns:auto 1fr;grid-template-areas:'brand social' 'nav nav';align-items:center;gap:7px 10px;height:auto!important;min-height:0;padding:8px 4vw!important}.topbar .brand{grid-area:brand}.topbar nav{grid-area:nav;display:flex!important;flex:0 0 100%;width:100%;gap:18px;overflow-x:auto;overscroll-behavior-x:contain;white-space:nowrap;padding:6px 0 4px;scrollbar-width:none}.topbar nav::-webkit-scrollbar{display:none}.topbar nav a{flex:0 0 auto;padding:4px 0;font-size:10px}.topbar .ec-social-links{grid-area:social;justify-self:end}.topbar .tools{display:none!important}.ec-mobile-language-row{display:flex;justify-content:center;gap:9px;padding:8px 12px;background:#f7f2e8;border-bottom:1px solid rgba(6,24,23,.12)}.ec-language-choice{display:flex;align-items:center;gap:5px;min-height:38px;padding:7px 11px;border:1px solid #9c8b68;border-radius:999px;background:#fff;color:#092522;font:700 12px ui-sans-serif,system-ui,sans-serif;cursor:pointer}.ec-language-choice.is-active{background:#123d39;color:#fff;border-color:#d7a43b}.ec-global-actions{right:12px;bottom:calc(env(safe-area-inset-bottom,0px) + 88px);gap:7px}.ec-float-btn{min-height:44px;padding:10px 12px;font-size:12px}.ec-share-panel{bottom:52px}}`;
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
  let button=tools.querySelector("#lang,[data-lang-toggle]");
  if(!button){button=document.createElement("button");button.type="button";button.dataset.langToggle="";tools.appendChild(button);}
  button.type="button";button.setAttribute("aria-label","Cambiar idioma");
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
  if(status){status.textContent=copied?message:"No se pudo copiar el enlace.";status.hidden=false;clearTimeout(status._hideTimer);status._hideTimer=setTimeout(()=>{status.hidden=true;},4200);}
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
  const back=document.createElement("a");back.className="ec-float-btn ec-return-link";back.href="https://www.ernestinhocarioca.com.br/";back.target="_blank";back.rel="noopener noreferrer";back.setAttribute("aria-label","Volver al sitio anterior");back.innerHTML="<span aria-hidden='true'>↶</span><span>Sitio anterior</span>";
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
  document.querySelectorAll('[placeholder], [aria-label]:not(#lang):not([data-lang-toggle]), [title], img[alt], meta[name=description], meta[name^="twitter:"], meta[property^="og:"]').forEach(el => {
    for (const [attr, originalKey, translationKey] of attrs) {
      if (!el.hasAttribute(attr) || (translationKey && el.hasAttribute(`data-${translationKey.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}`))) continue;
      if (attr === "content" && !(el.tagName === "META")) continue;
      if (!el.dataset[originalKey]) el.dataset[originalKey] = el.getAttribute(attr);
      const base = el.dataset[originalKey], hit = common[base];
      el.setAttribute(attr, hit && lang !== "ES" ? hit[lang] || base : base);
    }
  });
}
function apply(lang) {
  const selected = setLanguage(lang);
  translateText(document.head, selected);
  translateText(document.body, selected);
  translateAttrs(selected);
  applyTranslations(document, selected);
  document.querySelectorAll("#lang, [data-lang-toggle]").forEach(button => { button.textContent = selected; });
  document.querySelectorAll("[data-ec-language]").forEach(button => { const active=button.dataset.ecLanguage===selected; button.classList.toggle("is-active",active); button.setAttribute("aria-pressed",String(active)); });
}
async function init() {
  ensureGlobalStyles();
  ensureTopbarNav();
  ensureSocialLinks();
  ensureMobileLanguageRow();
  ensureGlobalActions();
  const button = ensureTools();
  if (!button) return;
  apply(getLanguage());
  if (button.dataset.ecLanguageBound !== "true") {
    button.dataset.ecLanguageBound = "true";
    button.addEventListener("click", () => apply(cycleLanguage(getLanguage())));
  }
  await loadSectionTranslations();
  apply(getLanguage());
  const observer = new MutationObserver(records => {
    const added = records.flatMap(record => [...record.addedNodes]).filter(node => node.nodeType === Node.ELEMENT_NODE);
    if (added.length) for (const node of added) { translateText(node, getLanguage()); translateAttrs(getLanguage()); applyTranslations(node, getLanguage()); }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  document.addEventListener("ec:language", event => {
    const selected = event.detail?.lang || getLanguage();
    translateText(document.head, selected); translateText(document.body, selected); translateAttrs(selected); applyTranslations(document, selected);
  });
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init, { once: true }) : init();
export { apply };
