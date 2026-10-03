import { routeParts, hasLocaleRoutes, localeHref } from './locale-routing.js';
export const LANGS = Object.freeze(["ES", "PT", "EN"]);
const STORAGE_KEY = "ec-lang";
const dictionaries = new Map();
const listeners = new Set();

export function normalizeLanguage(value) {
  const normalized = String(value || "").trim().toUpperCase();
  return LANGS.includes(normalized) ? normalized : "ES";
}

export function getLanguage() {
  if (hasLocaleRoutes()) return routeParts().language;
  try {
    return normalizeLanguage(localStorage.getItem(STORAGE_KEY));
  } catch {
    return "ES";
  }
}

export function cycleLanguage(current = getLanguage()) {
  const index = LANGS.indexOf(normalizeLanguage(current));
  return LANGS[(index + 1) % LANGS.length];
}

export function registerTranslations(moduleName, messages) {
  if (!moduleName || !messages || typeof messages !== "object") return () => {};
  dictionaries.set(moduleName, messages);
  applyTranslations(document);
  return () => dictionaries.delete(moduleName);
}

export function translate(key, lang = getLanguage(), moduleName) {
  const selected = normalizeLanguage(lang);
  const moduleMessages = moduleName ? dictionaries.get(moduleName) : null;
  return moduleMessages?.[selected]?.[key] ?? moduleMessages?.ES?.[key];
}

export function applyTranslations(root = document, lang = getLanguage()) {
  const selected = normalizeLanguage(lang);
  const elements = [];
  if (root instanceof Element && root.matches("[data-i18n], [data-i18n-placeholder], [data-i18n-aria-label], [data-i18n-title], [data-i18n-content]")) elements.push(root);
  root.querySelectorAll?.("[data-i18n], [data-i18n-placeholder], [data-i18n-aria-label], [data-i18n-title], [data-i18n-content]").forEach(el => elements.push(el));
  for (const el of elements) {
    const moduleName = el.dataset.i18nModule || root.documentElement?.dataset.i18nModule || document.documentElement.dataset.i18nModule;
    for (const [attribute, keyName] of [["textContent", "i18n"], ["placeholder", "i18nPlaceholder"], ["aria-label", "i18nAriaLabel"], ["title", "i18nTitle"], ["content", "i18nContent"]]) {
      const key = el.dataset[keyName];
      if (!key) continue;
      const value = translate(key, selected, moduleName);
      if (value === undefined) continue;
      if (attribute === "textContent") el.textContent = value;
      else el.setAttribute(attribute, value);
    }
  }
  document.documentElement.lang = selected === "ES" ? "es" : selected === "PT" ? "pt-BR" : "en";
  return selected;
}

export function setLanguage(language) {
  const selected = normalizeLanguage(language);
  if (hasLocaleRoutes() && selected !== routeParts().language) {
    location.assign(localeHref(selected));
    return routeParts().language;
  }
  try { localStorage.setItem(STORAGE_KEY, selected); } catch { /* Storage may be disabled. */ }
  applyTranslations(document, selected);
  const languageLabels = {
    ES: `Idioma actual: ${selected}. Cambiar idioma`,
    PT: `Idioma atual: ${selected}. Alterar idioma`,
    EN: `Current language: ${selected}. Change language`
  };
  document.querySelectorAll("#lang, [data-lang-toggle], [data-ec-desktop-language-group]").forEach(control => {
    const isGroup = control.matches("[data-lang-toggle], [data-ec-desktop-language-group]") && (control.getAttribute("role")==="group" || control.querySelector("[data-desktop-language]"));
    if (!isGroup) control.textContent = selected;
    control.setAttribute("aria-label", languageLabels[selected]);
  });
  document.querySelectorAll("[data-desktop-language]").forEach(button => {
    const active = button.dataset.desktopLanguage === selected;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.dispatchEvent(new CustomEvent("ec:language", { detail: { lang: selected } }));
  for (const listener of listeners) listener(selected);
  return selected;
}

export function onLanguageChange(listener) {
  if (typeof listener !== "function") return () => {};
  listeners.add(listener);
  return () => listeners.delete(listener);
}
