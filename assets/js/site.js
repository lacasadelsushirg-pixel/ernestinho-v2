import { LANGS, getLanguage, cycleLanguage, setLanguage, applyTranslations } from "./i18n.js";
const common={"Guía de Río":{PT:"Guia do Rio",EN:"Rio Guide"},"Experiencias":{PT:"Experiências",EN:"Experiences"},"Transportes":{PT:"Transportes",EN:"Transport"},"Eventos":{PT:"Eventos",EN:"Events"},"Hospedaje":{PT:"Hospedagem",EN:"Stay"},"Compras":{PT:"Compras",EN:"Shopping"},"Barrios":{PT:"Bairros",EN:"Neighborhoods"},"Gastronomía":{PT:"Gastronomia",EN:"Food"},"Consejos":{PT:"Dicas",EN:"Tips"},"Playas":{PT:"Praias",EN:"Beaches"},"Vida Nocturna":{PT:"Vida Noturna",EN:"Nightlife"},"Familia":{PT:"Família",EN:"Family"},"Atracciones":{PT:"Atrações",EN:"Attractions"},"Fotografía":{PT:"Fotografia",EN:"Photography"},"Río no se visita. Se vive.":{PT:"O Rio não se visita. Se vive.",EN:"Rio isn't just visited. It's lived."},"ABRIR GUÍA →":{PT:"ABRIR GUIA →",EN:"OPEN GUIDE →"},"DESCUBRIR →":{PT:"DESCOBRIR →",EN:"DISCOVER →"},"EXPLORAR →":{PT:"EXPLORAR →",EN:"EXPLORE →"},"VER FICHA →":{PT:"VER FICHA →",EN:"VIEW GUIDE →"},"Volver a Gastronomía":{PT:"Voltar à Gastronomia",EN:"Back to Food"},"Antes de ir":{PT:"Antes de ir",EN:"Before you go"},"Mi lectura":{PT:"Minha leitura",EN:"My take"},"Buscar por nombre, barrio o estilo…":{PT:"Buscar por nome, bairro ou estilo…",EN:"Search by name, neighborhood or style…"},"TODOS":{PT:"TODOS",EN:"ALL"},"PESCADOS / MAR":{PT:"PEIXES / MAR",EN:"SEAFOOD"},"ASIÁTICA":{PT:"ASIÁTICA",EN:"ASIAN"},"ALMUERZO / BUFFET":{PT:"ALMOÇO / BUFFET",EN:"LUNCH / BUFFET"},"VEGETARIANA":{PT:"VEGETARIANA",EN:"VEGETARIAN"},"QUIOSQUES":{PT:"QUIOSQUES",EN:"KIOSKS"},"EXPERIENCIAS":{PT:"EXPERIÊNCIAS",EN:"EXPERIENCES"}};
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
  if (!bar) return null;
  let tools = bar.querySelector(".tools");
  if (!tools) { tools = document.createElement("div"); tools.className = "tools"; bar.appendChild(tools); }
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
  document.querySelectorAll("[placeholder]").forEach(el => {
    if (!el.dataset.ecPlaceholder) el.dataset.ecPlaceholder = el.getAttribute("placeholder");
    const base = el.dataset.ecPlaceholder, hit = common[base];
    el.setAttribute("placeholder", hit && lang !== "ES" ? hit[lang] || base : base);
  });
}
function apply(lang) {
  const selected = setLanguage(lang);
  translateText(document.body, selected);
  translateAttrs(selected);
  applyTranslations(document, selected);
  document.querySelectorAll("#lang, [data-lang-toggle]").forEach(button => { button.textContent = selected; });
}
function init() {
  const button = ensureTools();
  if (!button) return;
  apply(getLanguage());
  if (button.dataset.ecLanguageBound !== "true") {
    button.dataset.ecLanguageBound = "true";
    button.addEventListener("click", () => apply(cycleLanguage(getLanguage())));
  }
  const observer = new MutationObserver(records => {
    const added = records.flatMap(record => [...record.addedNodes]).filter(node => node.nodeType === Node.ELEMENT_NODE);
    if (added.length) for (const node of added) { translateText(node, getLanguage()); applyTranslations(node, getLanguage()); }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  document.addEventListener("ec:language", event => {
    const selected = event.detail?.lang || getLanguage();
    translateText(document.body, selected); translateAttrs(selected); applyTranslations(document, selected);
  });
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init, { once: true }) : init();
export { apply };
