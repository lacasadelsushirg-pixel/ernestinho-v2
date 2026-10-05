import { getLanguage } from '/assets/js/i18n.js';
import { beachIndex } from '/assets/js/buzios-beach-v2-data.js';
import { beachProfiles } from '/assets/js/buzios-beaches.js';
import { beachDecisions } from '/assets/js/buzios-beach-decisions.js';
import { beachFields, beachCompletion } from '/assets/js/buzios-beach-content.js';
import { buziosPhotos } from '/assets/js/buzios-photos.js';

const language = getLanguage();
document.body.classList.add('ec-buzios-beach-v2');
const labels = {
  ES: { back: '← Volver a Playas', eyebrow: 'BÚZIOS · PLAYAS', identity: 'Cómo es y por qué ir', take: 'Mi lectura', tip: 'Dato de Ernestinho', pending: 'Foto pendiente. La ficha está lista para recibir una imagen autorizada y correspondiente a esta playa.', source: 'Fuente de la fotografía', license: 'Licencia', title: ' en Búzios', description: 'Una guía editorial de esta playa: ambiente, mar, llegada, estructura y consejos prácticos de Ernestinho Carioca.' },
  PT: { back: '← Voltar para Praias', eyebrow: 'BÚZIOS · PRAIAS', identity: 'Como é e por que ir', take: 'Minha leitura', tip: 'Dica do Ernestinho', pending: 'Foto pendente. A página está pronta para receber uma imagem autorizada e correspondente a esta praia.', source: 'Fonte da fotografia', license: 'Licença', title: ' em Búzios', description: 'Um guia editorial desta praia: ambiente, mar, chegada, estrutura e dicas práticas de Ernestinho Carioca.' },
  EN: { back: '← Back to Beaches', eyebrow: 'BÚZIOS · BEACHES', identity: 'What it is like and why go', take: 'My take', tip: 'Ernestinho’s tip', pending: 'Photo pending. This page is ready for an authorised photograph that actually shows this beach.', source: 'Photo source', license: 'License', title: ' in Búzios', description: 'An editorial guide to this beach: atmosphere, sea, access, facilities and practical tips from Ernestinho Carioca.' }
};
const L = labels[language] || labels.ES;
const prefix = location.pathname.startsWith('/pt/') ? '/pt' : location.pathname.startsWith('/en/') ? '/en' : '';
const slug = location.pathname.split('/').filter(Boolean).at(-1);
const beach = beachIndex.find(item => item.slug === slug);
const root = document.querySelector('#bz2-detail');
const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const local = value => value && typeof value === 'object' ? (value[language] || value.ES || '') : (value || '');
const setMeta = (selector, key, value) => {
  let node = document.querySelector(selector);
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(selector.startsWith('meta[property=') ? 'property' : 'name', selector.match(/"([^"]+)"/)[1]);
    document.head.append(node);
  }
  node.setAttribute(key, value);
  if (key === 'content') node.dataset.ecContent = value;
};

if (!beach || !root) {
  if (root) root.innerHTML = `<main class="bz2-wrap"><h1>${language === 'EN' ? 'Beach not found' : language === 'PT' ? 'Praia não encontrada' : 'Playa no encontrada'}</h1></main>`;
  throw new Error(`Unknown Búzios beach: ${slug}`);
}

const profile = local(beachProfiles.find(([name]) => name === beach.name)?.[1]);
const decision = local(beachDecisions[beach.name]);
const content = beachCompletion.find(([name]) => name === beach.name)?.[1] || [];
const images = [...new Set(beach.images || [])];
const leadImage = images[0];
const title = `${beach.name}${L.title} | Ernestinho Carioca`;
const description = `${beach.name}: ${L.description}`;
document.title = title;
setMeta('meta[name="description"]', 'content', description);
setMeta('meta[property="og:title"]', 'content', title);
setMeta('meta[property="og:description"]', 'content', description);
setMeta('meta[property="og:type"]', 'content', 'article');
setMeta('meta[property="og:image:alt"]', 'content', `${beach.name} · Búzios`);
if (leadImage) {
  setMeta('meta[property="og:image"]', 'content', new URL(leadImage, 'https://www.ernestinhocarioca.com.br').href);
  setMeta('meta[name="twitter:image"]', 'content', new URL(leadImage, 'https://www.ernestinhocarioca.com.br').href);
} else {
  document.querySelector('meta[property="og:image"]')?.remove();
  document.querySelector('meta[name="twitter:image"]')?.remove();
}
setMeta('meta[name="twitter:title"]', 'content', title);
setMeta('meta[name="twitter:description"]', 'content', description);
const canonical = `https://www.ernestinhocarioca.com.br${location.pathname}`;
let canonicalNode = document.querySelector('link[rel="canonical"]');
if (!canonicalNode) { canonicalNode = document.createElement('link'); canonicalNode.rel = 'canonical'; document.head.append(canonicalNode); }
canonicalNode.href = canonical;

function photoFigure(src, index) {
  const photo = Object.values(buziosPhotos).find(item => item.src === src);
  const alt = language === 'PT' ? `Praia ${beach.name} em Búzios` : language === 'EN' ? `${beach.name} beach in Búzios` : `Playa ${beach.name} en Búzios`;
  const credit = photo
    ? `${escape(photo.artist)} · <a href="${escape(photo.source)}" target="_blank" rel="noopener noreferrer">${L.source}</a> · <a href="${escape(photo.licenseUrl)}" target="_blank" rel="license noopener noreferrer">${escape(photo.license)}</a>`
    : '';
  return `<figure class="bz2-photo ${index === 0 ? 'bz2-photo-lead' : ''}"><img src="${escape(src)}" alt="${escape(alt)}" width="${photo?.width || 1200}" height="${photo?.height || 800}" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">${credit ? `<figcaption>${credit}</figcaption>` : ''}</figure>`;
}

const introPhoto = leadImage ? photoFigure(leadImage, 0) : `<div class="bz2-photo-pending" role="img" aria-label="${escape(L.pending)}"><span>${escape(L.pending)}</span></div>`;
const story = content.map((copy, index) => {
  const heading = local(beachFields[index]);
  const extraPhoto = images[index + 1] ? photoFigure(images[index + 1], index + 1) : '';
  const isTip = index === content.length - 1;
  return `${extraPhoto}<section class="bz2-story-step ${isTip ? 'bz2-story-tip' : ''}"><span class="bz2-num">${String(index + 2).padStart(2, '0')}</span><h2>${escape(heading)}</h2><p>${escape(local(copy))}</p></section>`;
}).join('');
const visualGap = !leadImage ? `<aside class="bz2-photo-reminder">${escape(L.pending)}</aside>` : '';

root.innerHTML = `<main class="bz2-shell bz2-beach-page">
  <header class="bz2-detail-intro"><div class="bz2-story-wrap"><a class="bz2-back" href="${prefix}/destinos/buzios/playas/">${L.back}</a><p class="bz2-kicker">${L.eyebrow}</p><h1>${escape(beach.name)}</h1></div></header>
  <div class="bz2-story-wrap">${introPhoto}
    <section class="bz2-story-step bz2-story-identity"><span class="bz2-num">01</span><h2>${escape(L.identity)}</h2><p>${escape(profile)}</p></section>
    <blockquote class="bz2-my-take"><span>${escape(L.take)}</span><p>${escape(decision)}</p></blockquote>
    ${visualGap}${story}
  </div>
  <footer class="bz2-detail-footer"><div class="bz2-story-wrap"><a href="${prefix}/destinos/buzios/playas/">${L.back}</a></div></footer>
</main>`;
