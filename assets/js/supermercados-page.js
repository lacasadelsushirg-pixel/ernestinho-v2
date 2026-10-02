import { getLanguage, onLanguageChange, registerTranslations } from "./i18n.js";
import messages from "./translations/supermercados.js";
registerTranslations("supermercados", messages);
function updatePage(lang) {
  document.querySelectorAll("[data-i18n-alt]").forEach(image => {
    const text = messages[lang]?.[image.dataset.i18nAlt];
    if (text !== undefined) image.alt = text;
  });
  const element = document.querySelector('script[type="application/ld+json"]');
  if (!element) return;
  const data = JSON.parse(element.textContent);
  data.name = document.title;
  data.description = document.querySelector('meta[name="description"]').content;
  data.inLanguage = lang === "PT" ? "pt-BR" : lang.toLowerCase();
  element.textContent = JSON.stringify(data);
}
updatePage(getLanguage());
onLanguageChange(lang => queueMicrotask(() => updatePage(lang)));
