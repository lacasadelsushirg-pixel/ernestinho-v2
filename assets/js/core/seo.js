import { EC_CONFIG, canonicalUrl } from "./config.js";

function upsertMeta(selector, attrs) {
  let el=document.head.querySelector(selector);
  if(!el){el=document.createElement("meta");document.head.appendChild(el);}
  for(const [k,v] of Object.entries(attrs)) el.setAttribute(k,v);
  return el;
}

export function applyCanonical(pathname=location.pathname) {
  const href=canonicalUrl(pathname);
  let link=document.head.querySelector('link[rel="canonical"]');
  if(!link){link=document.createElement("link");link.rel="canonical";document.head.appendChild(link);}
  link.href=href;
  upsertMeta('meta[property="og:url"]',{property:"og:url",content:href});
  return href;
}

export function applyPageSeo({title,description,pathname=location.pathname,locale="es",type="website"}={}) {
  const canonical=applyCanonical(pathname);
  if(title){document.title=title;upsertMeta('meta[property="og:title"]',{property:"og:title",content:title});upsertMeta('meta[name="twitter:title"]',{name:"twitter:title",content:title});}
  if(description){upsertMeta('meta[name="description"]',{name:"description",content:description});upsertMeta('meta[property="og:description"]',{property:"og:description",content:description});upsertMeta('meta[name="twitter:description"]',{name:"twitter:description",content:description});}
  upsertMeta('meta[property="og:type"]',{property:"og:type",content:type});
  upsertMeta('meta[property="og:site_name"]',{property:"og:site_name",content:EC_CONFIG.siteName});
  document.documentElement.lang=locale;
  return canonical;
}
