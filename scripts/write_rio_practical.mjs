// Author ES source HTML for the explicitly scoped Rio guides.
// Locale generation remains scripts/build_multilingual.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { pageMessages } from '../assets/js/translations/rio-page-messages.js';
const family = process.argv.includes('--beaches') ? 'rio-beaches' : process.argv.includes('--gastronomy') ? 'rio-gastronomy' : 'rio-practical';
const { definitions } = await import(`../assets/js/translations/${family}.js`);
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const origin = 'https://www.ernestinhocarioca.com.br';
const esc = text => String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for (const [route,page] of Object.entries(definitions)) {
  const copy = pageMessages(page).ES;
  const node = (tag,key,attributes='') => `<${tag} data-i18n="${key}"${attributes}>${esc(copy[key])}</${tag}>`;
const canonical = origin + route;
const socialImage = page.socialImage ? origin + page.socialImage : origin + '/assets/brand/ec-mark.png';
  const meta = (key,message) => `<meta ${key.includes(':')?'property':'name'}="${key}" content="${esc(copy[message])}" data-i18n-content="${message}">`;
  const schema = {'@context':'https://schema.org','@type':'WebPage',name:copy.title,description:copy.description,url:canonical,inLanguage:'es',isPartOf:{'@type':'WebSite',name:'Ernestinho Carioca',url:origin+'/'}};
  const html = `<!doctype html>
<html lang="es" data-i18n-module="rio-practical">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
${node('title','title')}${meta('description','description')}
<link rel="canonical" href="${canonical}">
<link rel="stylesheet" href="/assets/css/tokens.css"><link rel="stylesheet" href="/assets/css/app.css"><link rel="stylesheet" href="/assets/css/components.css"><link rel="stylesheet" href="/assets/css/rio-practical.css">
<meta property="og:type" content="website">${meta('og:title','title')}${meta('og:description','description')}${socialImage ? `<meta property="og:image" content="${socialImage}"><meta property="og:image:alt" content="${esc(copy.ogImageAlt)}" data-i18n-content="ogImageAlt"><meta property="og:image:width" content="512"><meta property="og:image:height" content="512"><meta name="twitter:image" content="${socialImage}">` : ''}<meta property="og:url" content="${canonical}"><meta property="og:site_name" content="Ernestinho Carioca">
<meta name="twitter:card" content="summary">${meta('twitter:title','title')}${meta('twitter:description','description')}
<link rel="icon" type="image/png" sizes="192x192" href="/assets/brand/ec-mark.png"><link rel="apple-touch-icon" href="/assets/brand/ec-mark.png">
<script type="application/ld+json">${JSON.stringify(schema)}</script></head>
<body><header class="topbar"><a class="brand" href="/" aria-label="Ernestinho Carioca"><img src="/assets/brand/ec-mark.png" alt="Ernestinho Carioca" width="44" height="44"></a><nav><a href="/guia/">Guía de Río</a><a href="/experiencias/">Experiencias</a><a href="/transportes/">Transportes</a><a href="/hospedaje/">Hospedaje</a><a href="/cafe-rio/">Café Río</a></nav></header>
<main class="rio-practical" id="contenido"><header class="rio-head"><div class="rio-wrap">${node('a','back',` class="rio-back" href="${page.backLink || '/consejos/'}"`)}${node('h1','heading')}${node('p','lead',' class="rio-lead"')}</div></header>
<div class="rio-wrap"><nav class="rio-toc" aria-label="${esc(copy.tocHeading)}" data-i18n-aria-label="tocHeading">${page.sections.map((s,n)=>node('a',`section${n}`,` href="#${s.id}"`)).join('')}</nav>
${page.mapQuery ? `<p>${node('a','openMap',` href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(page.mapQuery)}" target="_blank" rel="noopener noreferrer"`)}</p>` : ''}
${page.sections.map((s,n)=>`<section class="rio-section" id="${s.id}"><span class="rio-num">${String(n+1).padStart(2,'0')}</span>${node('h2',`section${n}`)}${s.paragraphs.map((_,p)=>node('p',`section${n}p${p}`)).join('')}</section>`).join('\n')}
<aside class="rio-tip">${node('strong','tipHeading')}${node('p','tip')}</aside>
<nav class="rio-links">${page.links.map(([href],n)=>node('a',`link${n}`,` href="${href}"`)).join('')}</nav>
<aside class="rio-sources">${node('h2','sourceHeading')}${node('p','sourceNote')}<ul>${page.sources.map(([href],n)=>`<li>${node('a',`source${n}`,` href="${esc(href)}" target="_blank" rel="noopener noreferrer"`)}</li>`).join('')}</ul></aside>
</div></main><footer><strong>ERNESTINHO CARIOCA</strong><p>Río no se visita. Se vive.</p></footer><script type="module" src="/assets/js/site.js"></script><script type="module" src="/assets/js/rio-practical-page.js"></script></body></html>\n`;
  const directory=path.join(root,route.slice(1));
  fs.mkdirSync(directory,{recursive:true});
  fs.writeFileSync(path.join(directory,'index.html'),html);
  console.log('ES source: '+route);
}
