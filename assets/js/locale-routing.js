// Public locale URLs. Source pages retain their existing in-place preview mode.
export const PUBLIC_ORIGIN = 'https://www.ernestinhocarioca.com.br';
export function routeParts(pathname = location.pathname) {
  const match = pathname.match(/^\/(pt|en)(?=\/|$)/i);
  return { language: match ? match[1].toUpperCase() : 'ES', path: match ? pathname.slice(match[0].length) || '/' : pathname };
}
export function localizedPath(pathname, language) {
  const {path} = routeParts(pathname);
  return language === 'PT' ? '/pt' + path : language === 'EN' ? '/en' + path : path;
}
export function hasLocaleRoutes() {
  return document.documentElement.dataset.ecLocaleRoutes === 'true';
}
export function localeHref(language) {
  return localizedPath(location.pathname, language) + location.search + location.hash;
}
export function localizeLinks(root = document, language = routeParts().language) {
  if (!hasLocaleRoutes()) return;
  const links = [...(root.matches?.('a[href]') ? [root] : []), ...root.querySelectorAll?.('a[href]') || []];
  for (const link of links) {
    if (link.matches('[data-ec-language], [data-desktop-language], [hreflang]') || link.hasAttribute('download')) continue;
    const raw = link.getAttribute('href');
    if (!raw || raw.startsWith('#') || /^(?:mailto:|tel:|javascript:|data:)/i.test(raw)) continue;
    const url = new URL(raw, location.href);
    if (![location.origin, PUBLIC_ORIGIN].includes(url.origin)) continue;
    const path = routeParts(url.pathname).path;
    if (/^\/(?:assets|api|\.well-known)(?:\/|$)/.test(path) || /\.(?:png|jpe?g|webp|svg|gif|pdf|xml|txt|js|css|json|mp4|zip)$/i.test(path)) continue;
    link.setAttribute('href', localizedPath(path, language) + url.search + url.hash);
  }
}
export function syncLocaleMetadata() {
  if (!hasLocaleRoutes()) return;
  const {language} = routeParts();
  const canonical = document.querySelector('link[rel="canonical"]');
  const current = PUBLIC_ORIGIN + location.pathname;
  if (canonical) canonical.href = current;
  const og = document.querySelector('meta[property="og:url"]');
  if (og) { og.content = current; og.dataset.ecContent = current; }
  document.documentElement.lang = language === 'PT' ? 'pt-BR' : language.toLowerCase();
}
