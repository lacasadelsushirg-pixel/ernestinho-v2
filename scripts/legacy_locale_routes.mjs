import lemeParagraphs from '../assets/js/translations/belmonte-leme-legacy.mjs';
import supplementaryCopy, {updatedFacts} from '../assets/js/translations/rio-restaurantes-piloto.mjs';

// These reviewed pages already have localized inline renderers. Initialize
// them from the URL in built HTML, including when scripts run on a live visit.
export const legacyLocaleRoutes = new Map([
  ['/compras/feira-nocturna-copacabana/', ['setLang']],
  ['/gastronomia/carretao-ipanema/', ['setLang', 'full']],
  ['/gastronomia/ct-boucherie/', ['setLang', 'full']],
  ['/gastronomia/belmonte-copa/', ['setLang', 'full']],
  ['/gastronomia/belmonte-ipanema/', ['setLang', 'full']],
  ['/gastronomia/polvo-marisqueria/', ['setLang', 'full']],
  ['/gastronomia/labuta-bar/', ['setLang', 'full']],
  ['/gastronomia/casa-201/', ['setLang', 'full']],
  ['/gastronomia/angu-do-gomes/', ['setLang', 'full']],
]);

export function hideDuplicateLegacySelector(html, route) {
  if (!legacyLocaleRoutes.get(route)?.includes('full')) return html;
  // These inline renderers still attach their own floating language selector.
  // The generated pages already have the shared selector for all viewport sizes.
  return html.replace('</head>', '<style>.lang-switcher{display:none!important}</style></head>');
}

export function localizeLegacyStartup(code, route) {
  const renderers = legacyLocaleRoutes.get(route);
  if (!renderers) return code;
  const supplement = supplementaryCopy[route];
  const positional = renderers.includes('full') && code.includes('function full(l)');
  const replacements = route === '/gastronomia/belmonte-copa/' ? lemeParagraphs : updatedFacts[route];
  if (positional) {
    // This dictionary predates the practical summary and the supplemental
    // paragraphs. Keep its original paragraph order; those additions have
    // their own translations in the practical renderer and section chunk.
    const extraSections = ['/gastronomia/polvo-marisqueria/', '/gastronomia/labuta-bar/'].includes(route) ? ':not(.v2-supplement p)' : '';
    code = code.replace("P=[...document.querySelectorAll('p')]",
      `P=[...document.querySelectorAll('p:not(.ec-q-kicker):not(article.card:not(.facts)>p:nth-of-type(n+2))${extraSections}')]`);
  }
  const locale = '(location.pathname.match(/^\\/(pt|en)(?=\\/|$)/i)?.[1].toLowerCase() || "es")';
  if (route === '/gastronomia/angu-do-gomes/') {
    // The approved title is already a proper name followed by the brand.
    code = code.replace('document.title=tr(title,lang);', 'document.title=title;');
  }
  for (const renderer of renderers) {
    // Match the final initialization in a script, never a language button.
    const startup = new RegExp(`\\b${renderer}\\('es'\\)(?=;?(?:\\}\\)\\(\\);?)?\\s*$)`);
    code = code.replace(startup, `${renderer}(${locale})`);
    if (renderer === 'full' && positional && replacements) {
      const initialize = `full(${locale})`;
      const encodedCopy = JSON.stringify(replacements).replaceAll('<', '\\u003c');
      code = code.replace(initialize, `D[${locale}] && Object.assign(D[${locale}], (${encodedCopy})[${locale}]);${initialize}`);
    }
    if (renderer === 'full' && positional && route === '/gastronomia/polvo-marisqueria/') {
      const initialize = `full(${locale})`;
      // The historical facts use plain-text separators. Keep the approved
      // strong label and line break when applying those translations.
      code = code.replace(initialize, `{
        const facts = D[${locale}];
        if (facts) for (const index of [8,9,10,11,12,13,14,15,16]) {
          facts[index] = facts[index].replace(/^(\\S+) (.+?) \\| (.+)$/, '$1 <strong>$2</strong><br>$3');
        }
      }${initialize}`);
    }
    if (renderer === 'full' && positional && supplement) {
      const initialize = `full(${locale})`;
      const encodedCopy = JSON.stringify(supplement).replaceAll('<', '\\u003c');
      code = code.replace(initialize, `${initialize};{
        const localizedCopy = ${encodedCopy};
        const activeLocale = ${locale};
        for (const paragraph of document.querySelectorAll('article.card:not(.facts)>p:nth-of-type(n+2)')) {
          const value = localizedCopy[paragraph.textContent.trim()]?.[activeLocale];
          if (value) paragraph.textContent = value;
        }
      }`);
    }
  }
  return code;
}
