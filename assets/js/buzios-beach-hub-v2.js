import { getLanguage } from '/assets/js/i18n.js';
import { beachIndex } from '/assets/js/buzios-beach-v2-data.js';
import { buziosPhotos } from '/assets/js/buzios-photos.js';
import { resolveBeachPhotos } from '/assets/js/buzios-cloudinary.js';

const language = getLanguage();
document.body.classList.add('ec-buzios-beach-v2','ec-buzios-page');
const prefix = location.pathname.startsWith('/pt/') ? '/pt' : location.pathname.startsWith('/en/') ? '/en' : '';
const copy = {
  ES: { title: '23 playas. Elige la que combina contigo.', description: 'Playas de Búzios: compara el mar, el ambiente y el acceso. Cada playa tiene su propia guía editorial.', lead: 'Elige una playa para abrir su guía completa.', note: 'Las condiciones del mar y los accesos pueden cambiar; revisa la información para el día de tu visita.', open: 'Descubrir', photoMissing: 'Descubrir', kicker: 'GUÍA DE PLAYAS · BÚZIOS', source: 'Fuente', license: 'Licencia', beaches: 'Playas de Búzios', footer: '23 playas · condiciones y accesos pueden cambiar; verifica el día de tu visita.' },
  PT: { title: '23 praias. Escolha a que combina com você.', description: 'Praias de Búzios: compare o mar, o ambiente e o acesso. Cada praia tem seu próprio guia editorial.', lead: 'Escolha uma praia para abrir o guia completo.', note: 'As condições do mar e os acessos podem mudar; confira as informações para o dia da visita.', open: 'Descobrir', photoMissing: 'Descobrir', kicker: 'GUIA DE PRAIAS · BÚZIOS', source: 'Fonte', license: 'Licença', beaches: 'Praias de Búzios', footer: '23 praias · condições e acessos podem mudar; confira no dia da visita.' },
  EN: { title: '23 beaches. Find the one that suits your trip.', description: 'Búzios beaches: compare the sea, atmosphere and access. Each beach has its own editorial guide.', lead: 'Choose a beach to open its full guide.', note: 'Sea conditions and access can change; check information for the day of your visit.', open: 'Discover', photoMissing: 'Discover', kicker: 'BEACH GUIDE · BÚZIOS', source: 'Source', license: 'Licence', beaches: 'Búzios beaches', footer: '23 beaches · conditions and access can change; check on the day of your visit.' }
};
const L = copy[language] || copy.ES;
const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const heroLabels = { ES: ['Panorama de la costa de Búzios; no identifica una playa concreta.', 'Panorama costero de Búzios'], PT: ['Panorama do litoral de Búzios; não identifica uma praia específica.', 'Panorama do litoral de Búzios'], EN: ['A panorama of the Búzios coast; it does not identify a specific beach.', 'Búzios coastal panorama'] };
const heroPhoto = buziosPhotos['Paisaje de Búzios'];
const photoAlt = heroLabels[language] || heroLabels.ES;

document.title = `${L.beaches} | Ernestinho Carioca`;
const metaDescription = document.querySelector('meta[name="description"]');
if (metaDescription) { metaDescription.content = L.description; metaDescription.dataset.ecContent = L.description; }
const canonical = document.querySelector('link[rel="canonical"]');
if (canonical) canonical.href = `https://www.ernestinhocarioca.com.br${location.pathname}`;
for (const [selector, content] of [['meta[property="og:title"]', document.title], ['meta[property="og:description"]', L.description], ['meta[property="og:image"]', `https://www.ernestinhocarioca.com.br${heroPhoto.src}`], ['meta[property="og:image:alt"]', photoAlt[0]]]) {
  let node = document.querySelector(selector);
  if (!node) { node = document.createElement('meta'); node.setAttribute('property', selector.match(/"([^"]+)"/)[1]); document.head.append(node); }
  node.content = content;
  if (selector.includes('description') || selector.includes('title')) node.dataset.ecContent = content;
}

const h1 = document.querySelector('.bz2-hero h1');
const lead = document.querySelector('.bz2-hero p:not(.bz2-kicker)');
const kicker = document.querySelector('.bz2-hero .bz2-kicker');
if (h1) h1.textContent = L.title;
if (lead) lead.textContent = L.lead;
if (kicker) kicker.textContent = L.kicker;
if (heroPhoto && !document.querySelector('.bz2-hub-panorama')) {
  const figure = document.createElement('figure');
  figure.className = 'bz2-hub-panorama';
  figure.innerHTML = `<img src="${escape(heroPhoto.src)}" alt="${escape(photoAlt[0])}" width="${heroPhoto.width}" height="${heroPhoto.height}" fetchpriority="high" decoding="async"><figcaption>${escape(heroPhoto.name)} · ${escape(heroPhoto.artist)} · <a href="${escape(heroPhoto.source)}" target="_blank" rel="noopener noreferrer">${L.source}</a> · <a href="${escape(heroPhoto.licenseUrl)}" target="_blank" rel="license noopener noreferrer">${escape(heroPhoto.license)}</a></figcaption>`;
  document.querySelector('.bz2-hero .bz2-wrap')?.append(figure);
}

const grid = document.querySelector('#bz2-grid');
grid?.replaceChildren();
document.querySelector('.bz2-hub-footnote')?.remove();
const photoAltFor = name => language === 'PT' ? `Praia ${name} em Búzios` : language === 'EN' ? `${name} beach in Búzios` : `Playa ${name} en Búzios`;
for (const beach of beachIndex) {
  const href = `${prefix}/destinos/buzios/playas/${beach.slug}/`;
  const card = document.createElement('article');
  card.className = 'ec-beach-card ec-beach-card--compact bz2-card';
  card.setAttribute('aria-label', `${beach.name} — ${L.open}`);

  const media = document.createElement('a');
  media.className = 'ec-beach-photo-cover';
  media.href = href;
  media.setAttribute('aria-label', `${L.open} ${beach.name}`);
  const image = document.createElement('img');
  image.alt = photoAltFor(beach.name);
  image.loading = 'lazy';
  image.decoding = 'async';
  image.width = 800;
  image.height = 500;
  media.append(image);

  const body = document.createElement('div');
  body.className = 'ec-beach-mini-content';
  const name = document.createElement('h2');
  name.textContent = beach.name;
  const action = document.createElement('a');
  action.className = 'ec-beach-discover';
  action.href = href;
  action.textContent = `${L.open} →`;
  body.append(name, action);
  card.append(media, body);
  grid?.append(card);

  resolveBeachPhotos(beach,1).then(([photo])=>{
    if(!photo) return;
    image.src=photo.src;
    if(photo.owner) card.dataset.ecPhoto='own';
  });
}
