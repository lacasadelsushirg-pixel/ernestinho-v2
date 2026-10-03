// Translate standalone pages without injecting navigation, controls or layout.
import { getLanguage, onLanguageChange } from './i18n.js';
import { routeParts, hasLocaleRoutes, localeHref, localizeLinks, syncLocaleMetadata } from './locale-routing.js';

const chunks = ['common-02.js', 'metadata-01.js', 'metadata-02.js'];
if (routeParts().path.startsWith('/eventos/')) chunks.push('eventos-01.js', 'eventos-02.js');
const loaded = await Promise.all(chunks.map(file => import(`./translations/chunks/${file}`)));
const dictionary = Object.assign({}, ...loaded.map(module => module.default));
const originals = new WeakMap();
const attributeOriginals = new WeakMap();
const structuredOriginals = new WeakMap();
let selected = getLanguage();

function translated(value) {
  if (selected === 'ES') return value;
  return dictionary[value]?.[selected] ?? value;
}

function applyText(root) {
  const nodes = [];
  if (root.nodeType === Node.TEXT_NODE) nodes.push(root);
  else {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) nodes.push(node);
  }
  for (const node of nodes) {
    if (!node.parentElement || node.parentElement.closest('script,style,noscript')) continue;
    const current = node.nodeValue;
    let saved = originals.get(node);
    // React can reuse a text node for a different event, filter or calendar item.
    if (!saved || current !== saved.last) saved = { source: current, last: current };
    const key = saved.source.trim();
    const value = saved.source.replace(key, translated(key));
    saved.last = value;
    originals.set(node, saved);
    if (current !== value) node.nodeValue = value;
  }
}

function applyAttributes(root) {
  const elements = root.nodeType === Node.ELEMENT_NODE ? [root] : [];
  if (root.querySelectorAll) elements.push(...root.querySelectorAll('[alt],[title],[aria-label],[placeholder],meta[content]'));
  for (const element of elements) {
    const saved = attributeOriginals.get(element) ?? {};
    for (const name of ['alt', 'title', 'aria-label', 'placeholder', 'content']) {
      if (name === 'content' && element.tagName !== 'META') continue;
      if (!element.hasAttribute(name)) continue;
      const current = element.getAttribute(name);
      let entry = saved[name];
      if (!entry || current !== entry.last) entry = { source: current, last: current };
      const value = translated(entry.source);
      entry.last = value;
      saved[name] = entry;
      if (current !== value) element.setAttribute(name, value);
    }
    attributeOriginals.set(element, saved);
  }
}

function applyStructuredData() {
  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
    let source = structuredOriginals.get(script);
    if (!source) {
      try { source = JSON.parse(script.textContent); } catch { continue; }
      structuredOriginals.set(script, source);
    }
    function localize(value) {
      if (Array.isArray(value)) return value.map(localize);
      if (!value || typeof value !== 'object') return value;
      return Object.fromEntries(Object.entries(value).map(([key, item]) => [key,
        key === 'inLanguage' ? (selected === 'PT' ? 'pt-BR' : selected.toLowerCase()) :
        ['name', 'description', 'headline'].includes(key) && typeof item === 'string' ? translated(item) : localize(item)
      ]));
    }
    const value = JSON.stringify(localize(source));
    if (script.textContent !== value) script.textContent = value;
  }
}

function apply(language = getLanguage()) {
  selected = language;
  document.documentElement.lang = language === 'PT' ? 'pt-BR' : language.toLowerCase();
  applyText(document);
  applyAttributes(document);
  applyStructuredData();
  if (hasLocaleRoutes()) {
    localizeLinks(document, language);
    syncLocaleMetadata();
    let controls=document.querySelector('[data-ec-standalone-languages]');
    if(!controls){
      controls=document.createElement('nav');controls.dataset.ecStandaloneLanguages='';
      controls.style.cssText='display:flex;justify-content:center;gap:16px;padding:20px;background:#020719;color:#fff';
      for(const code of ['ES','PT','EN']){const a=document.createElement('a');a.dataset.ecLanguage=code;a.hreflang=code==='PT'?'pt-BR':code.toLowerCase();a.textContent=code==='PT'?'PT-BR':code;a.style.cssText='color:inherit;font-weight:700;text-decoration:none;padding:8px';controls.appendChild(a);}
      document.body.appendChild(controls);
    }
    controls.setAttribute('aria-label',language==='PT'?'Idioma':language==='EN'?'Language':'Idioma');
    controls.querySelectorAll('a').forEach(a=>{a.href=localeHref(a.dataset.ecLanguage);if(a.dataset.ecLanguage===language)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});
  }
}

const observer = new MutationObserver(records => {
  for (const record of records) {
    if (record.type === 'characterData') applyText(record.target);
    if (record.type === 'attributes') applyAttributes(record.target);
    if (record.type === 'childList') {
      for (const node of record.addedNodes) {
        applyText(node);
        if (node.nodeType === Node.ELEMENT_NODE) applyAttributes(node);
      }
    }
  }
});
apply();
observer.observe(document, { subtree: true, childList: true, characterData: true, attributes: true,
  attributeFilter: ['alt', 'title', 'aria-label', 'placeholder', 'content'] });
onLanguageChange(apply);
window.addEventListener('storage', event => { if (event.key === 'ec-lang') apply(); });
