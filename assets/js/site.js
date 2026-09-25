import { LANGS, getLanguage, cycleLanguage, setLanguage, applyTranslations } from "./i18n.js";
const common={"Guía de Río":{PT:"Guia do Rio",EN:"Rio Guide"},"Experiencias":{PT:"Experiências",EN:"Experiences"},"Transportes":{PT:"Transportes",EN:"Transport"},"Eventos":{PT:"Eventos",EN:"Events"},"Hospedaje":{PT:"Hospedagem",EN:"Stay"},"Compras":{PT:"Compras",EN:"Shopping"},"Barrios":{PT:"Bairros",EN:"Neighborhoods"},"Gastronomía":{PT:"Gastronomia",EN:"Food"},"Consejos":{PT:"Dicas",EN:"Tips"},"Playas":{PT:"Praias",EN:"Beaches"},"Vida Nocturna":{PT:"Vida Noturna",EN:"Nightlife"},"Familia":{PT:"Família",EN:"Family"},"Atracciones":{PT:"Atrações",EN:"Attractions"},"Fotografía":{PT:"Fotografia",EN:"Photography"},"Río no se visita. Se vive.":{PT:"O Rio não se visita. Se vive.",EN:"Rio isn't just visited. It's lived."},"ABRIR GUÍA →":{PT:"ABRIR GUIA →",EN:"OPEN GUIDE →"},"DESCUBRIR →":{PT:"DESCOBRIR →",EN:"DISCOVER →"},"EXPLORAR →":{PT:"EXPLORAR →",EN:"EXPLORE →"},"VER FICHA →":{PT:"VER FICHA →",EN:"VIEW GUIDE →"},"Volver a Gastronomía":{PT:"Voltar à Gastronomia",EN:"Back to Food"},"Antes de ir":{PT:"Antes de ir",EN:"Before you go"},"Mi lectura":{PT:"Minha leitura",EN:"My take"},"Buscar por nombre, barrio o estilo…":{PT:"Buscar por nome, bairro ou estilo…",EN:"Search by name, neighborhood or style…"},"TODOS":{PT:"TODOS",EN:"ALL"},"PESCADOS / MAR":{PT:"PEIXES / MAR",EN:"SEAFOOD"},"ASIÁTICA":{PT:"ASIÁTICA",EN:"ASIAN"},"ALMUERZO / BUFFET":{PT:"ALMOÇO / BUFFET",EN:"LUNCH / BUFFET"},"VEGETARIANA":{PT:"VEGETARIANA",EN:"VEGETARIAN"},"QUIOSQUES":{PT:"QUIOSQUES",EN:"KIOSKS"},"EXPERIENCIAS":{PT:"EXPERIÊNCIAS",EN:"EXPERIENCES"}};
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
    if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName) || parent.closest("[data-i18n]")) continue;
    if (!original.has(node)) original.set(node, node.nodeValue);
    const base = original.get(node), trimmed = base.trim(), hit = common[trimmed];
    node.nodeValue = hit && lang !== "ES" ? base.replace(trimmed, hit[lang] || trimmed) : base;
  }
}
function ensureTools() {
  const bar = document.querySelector(".topbar");
  let tools = bar?.querySelector(".tools");
  if (!tools && bar) { tools = document.createElement("div"); tools.className = "tools"; bar.appendChild(tools); }
  if (!tools) {
    const host = document.querySelector("nav.back, .back") || document.body;
    tools = document.createElement("div");
    tools.className = "ec-language-tools";
    tools.setAttribute("role", "group");
    tools.setAttribute("aria-label", "Language selection");
    host.appendChild(tools);
    const style = document.createElement("style");
    style.textContent = ".ec-language-tools{display:flex;justify-content:flex-end;margin:8px auto;max-width:1200px;padding:0 20px}.ec-language-tools button{border:1px solid #c9a65a;background:#123b3b;color:#f6f0e6;border-radius:999px;padding:9px 14px;font:700 12px Arial,sans-serif;cursor:pointer}.ec-language-tools button:focus-visible{outline:3px solid #e7b85c;outline-offset:3px}";
    document.head.appendChild(style);
  }
  if (!tools.querySelector('a[href*="wa.me"]')) {
    const link = document.createElement("a"); link.href = "https://wa.me/5521969946938"; link.className = "wa"; link.textContent = "WhatsApp"; tools.prepend(link);
  }
  let button = tools.querySelector("#lang, [data-lang-toggle]");
  if (!button) { button = document.createElement("button"); button.type = "button"; button.dataset.langToggle = ""; tools.appendChild(button); }
  button.type = "button";
  button.setAttribute("aria-label", "Change language");
  return button;
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
}
async function init() {
  const button = ensureTools();
  if (!button) return;
  await loadSectionTranslations();
  apply(getLanguage());
  if (button.dataset.ecLanguageBound !== "true") {
    button.dataset.ecLanguageBound = "true";
    button.addEventListener("click", () => apply(cycleLanguage(getLanguage())));
  }
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
