import { getLanguage, onLanguageChange, registerTranslations } from "./i18n.js";
import messages from "./translations/legal.js";
registerTranslations("legal", messages);

function updateStructuredData(lang) {
  const element = document.querySelector('script[type="application/ld+json"]');
  if (!element) return;
  const data = JSON.parse(element.textContent);
  data.name = messages[lang]["meta.title"];
  data.description = messages[lang]["meta.description"];
  data.inLanguage = lang === "PT" ? "pt-BR" : lang.toLowerCase();
  element.textContent = JSON.stringify(data);
}

updateStructuredData(getLanguage());
onLanguageChange(updateStructuredData);
