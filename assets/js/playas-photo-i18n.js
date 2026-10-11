import { getLanguage, onLanguageChange } from './i18n.js';

function syncBeachLanguage() {
  const language = getLanguage().toLowerCase();
  const suffix = language === 'pt' ? 'Pt' : language === 'en' ? 'En' : 'Es';
  document.querySelectorAll('[data-ec-alt-es]').forEach((image) => {
    const translated = image.dataset[`ecAlt${suffix}`];
    if (translated) image.alt = translated;
  });
  document.querySelectorAll('[data-ec-text-es]').forEach((node) => {
    const translated = node.dataset[`ecText${suffix}`];
    if (translated) node.textContent = translated;
  });
  document.querySelectorAll('[data-ec-meta-es]').forEach((meta) => {
    const translated = meta.dataset[`ecMeta${suffix}`];
    if (translated) meta.content = translated;
  });
  document.querySelectorAll('[data-ec-aria-es]').forEach((node) => {
    const translated = node.dataset[`ecAria${suffix}`];
    if (translated) node.setAttribute('aria-label', translated);
  });
}

syncBeachLanguage();
onLanguageChange(syncBeachLanguage);
