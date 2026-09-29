import { PRIMARY_NAV, navLabel } from "./navigation.js";
import { normalizeLocale } from "./locales.js";
import { applyCanonical } from "./seo.js";

function localeFromDocument(){
  return normalizeLocale(document.documentElement.lang || localStorage.getItem("ec-lang") || "es");
}

export function renderPrimaryNav(root=document.querySelector(".topbar nav"),locale=localeFromDocument()){
  if(!root)return;
  root.replaceChildren(...PRIMARY_NAV.map(item=>{
    const a=document.createElement("a");a.href=item.href;a.textContent=navLabel(item,locale);
    if(location.pathname.startsWith(item.href))a.setAttribute("aria-current","page");
    return a;
  }));
}

export function initGlobalShell(){
  applyCanonical();
  renderPrimaryNav();
  document.addEventListener("ec:language",event=>renderPrimaryNav(undefined,normalizeLocale(event.detail?.lang)));
}
