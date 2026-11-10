// These reviewed pages already have localized inline renderers. Initialize
// them from the URL in built HTML, including when scripts run on a live visit.
export const legacyLocaleRoutes = new Map([
  ['/compras/feira-nocturna-copacabana/', ['setLang']],
  ['/gastronomia/carretao-ipanema/', ['setLang', 'full']],
]);

export function localizeLegacyStartup(code, route) {
  const renderers = legacyLocaleRoutes.get(route);
  if (!renderers) return code;
  if (route === '/gastronomia/carretao-ipanema/' && code.includes('function full(l)')) {
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
  }
  return code;
}
