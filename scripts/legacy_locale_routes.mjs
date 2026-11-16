import {updatedFacts} from '../assets/js/translations/rio-restaurantes-piloto.mjs';

// Elena conserva su diccionario manual dentro del HTML fuente. El builder
// debe iniciarlo con el idioma de la ruta, no con español.
export const legacyLocaleRoutes = new Map([
  ['/gastronomia/elena/', ['setLang', 'full']],
]);

export function hideDuplicateLegacySelector(html, route) {
  if (!legacyLocaleRoutes.get(route)?.includes('full')) return html;
  return html.replace('</head>', '<style>.lang-switcher{display:none!important}</style></head>');
}

export function localizeLegacyStartup(code, route) {
  const renderers = legacyLocaleRoutes.get(route);
  if (!renderers) return code;
  const locale = '(location.pathname.match(/^\\/(pt|en)(?=\\/|$)/i)?.[1].toLowerCase() || "es")';
  const positional = renderers.includes('full') && code.includes('function full(l)');
  if (positional) {
    code = code.replace(
      "P=[...document.querySelectorAll('p')]",
      "P=[...document.querySelectorAll('p:not(.ec-q-kicker):not(article.card:not(.facts)>p:nth-of-type(n+2)):not(.v2-supplement p):not(main>section>p:nth-of-type(n+2))')]",
    );
  }
  for (const renderer of renderers) {
    const startup = new RegExp(`\\b${renderer}\\('es'\\)(?=;?(?:\\}\\)\\(\\);?)?\\s*$)`);
    code = code.replace(startup, `${renderer}(${locale})`);
    if (renderer === 'full' && positional) {
      const initialize = `full(${locale})`;
      const encodedCopy = JSON.stringify(updatedFacts[route]).replaceAll('<', '\\u003c');
      code = code.replace(initialize, `D[${locale}] && Object.assign(D[${locale}], (${encodedCopy})[${locale}]);${initialize}`);
    }
  }
  return code;
}
