import supplementaryCopy from '../assets/js/translations/rio-restaurantes-piloto.mjs';

// These reviewed pages already have localized inline renderers. Initialize
// them from the URL in built HTML, including when scripts run on a live visit.
export const legacyLocaleRoutes = new Map([
  ['/compras/feira-nocturna-copacabana/', ['setLang']],
  ['/gastronomia/carretao-ipanema/', ['setLang', 'full']],
  ['/gastronomia/ct-boucherie/', ['setLang', 'full']],
]);

export function hideDuplicateLegacySelector(html, route) {
  if (!supplementaryCopy[route]) return html;
  // These inline renderers still attach their own floating language selector.
  // The generated pages already have the shared selector for all viewport sizes.
  return html.replace('</head>', '<style>.lang-switcher{display:none!important}</style></head>');
}

export function localizeLegacyStartup(code, route) {
  const renderers = legacyLocaleRoutes.get(route);
  if (!renderers) return code;
  const supplement = supplementaryCopy[route];
  const positional = supplement && code.includes('function full(l)');
  if (positional) {
    // This dictionary predates the practical summary and the supplemental
    // paragraphs. Keep its original paragraph order; those additions have
    // their own translations in the practical renderer and section chunk.
    code = code.replace("P=[...document.querySelectorAll('p')]",
      "P=[...document.querySelectorAll('p:not(.ec-q-kicker):not(article.card:not(.facts)>p:nth-of-type(n+2))')]");
  }
  const locale = '(location.pathname.match(/^\\/(pt|en)(?=\\/|$)/i)?.[1].toLowerCase() || "es")';
  for (const renderer of renderers) {
    // Match the final initialization in a script, never a language button.
    const startup = new RegExp(`\\b${renderer}\\('es'\\)(?=;?(?:\\}\\)\\(\\);?)?\\s*$)`);
    code = code.replace(startup, `${renderer}(${locale})`);
    if (renderer === 'full' && positional) {
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
