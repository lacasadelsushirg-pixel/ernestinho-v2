import { registerTranslations, getLanguage, onLanguageChange, applyTranslations } from './i18n.js';
import { routeParts } from './locale-routing.js';
import { ready as navigationReady } from './site.js';

const route = routeParts().path;
const family = route.startsWith('/playas/') ? 'rio-beaches' : route.startsWith('/gastronomia/') ? 'rio-gastronomy' : 'rio-practical';
const { default: messages } = await import(`./translations/${family}.js`);
const page = messages[route];
if (page) registerTranslations('rio-practical', page);
export function apply(language = getLanguage()) {
  if (!page) return;
  applyTranslations(document, language);
  const copy = page[language];
  document.title = copy.title;
  for (const [key, value] of [['description', copy.description], ['og:title', copy.title], ['og:description', copy.description], ['twitter:title', copy.title], ['twitter:description', copy.description]]) {
    const node = document.querySelector(`meta[name="${key}"],meta[property="${key}"]`);
    if (node) node.content = value;
  }
}
onLanguageChange(apply);
export const ready = navigationReady.then(() => apply());
