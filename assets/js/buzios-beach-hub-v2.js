import { getLanguage } from '/assets/js/i18n.js';
import { beachIndex } from '/assets/js/buzios-beach-v2-data.js';
import { beachProfiles } from '/assets/js/buzios-beaches.js';
import { beachCompletion, beachFields } from '/assets/js/buzios-beach-content.js';
import { buziosPhotos } from '/assets/js/buzios-photos.js';

const language = getLanguage();
document.body.classList.add('ec-buzios-beach-v2');
const prefix = location.pathname.startsWith('/pt/') ? '/pt' : location.pathname.startsWith('/en/') ? '/en' : '';
const copy = {
  ES: { title: '23 playas. Elige la que combina contigo.', description: 'Playas de Búzios: compara el mar, el ambiente y el acceso. Cada playa tiene su propia guía editorial.', lead: 'Mira las playas por separado. Entra en cada guía para conocer el acceso, el mar, el ambiente y mi lectura del lugar.', note: 'Las fotografías identifican únicamente el lugar que muestran. Si una playa aún no tiene una imagen autorizada, la dejamos pendiente.', open: 'Abrir playa', photoMissing: 'Foto pendiente', kicker: 'GUÍA DE PLAYAS · BÚZIOS', source: 'Fuente', license: 'Licencia', beaches: 'Playas de Búzios', footer: '23 playas · condiciones y accesos pueden cambiar; verifica el día de tu visita.' },
  PT: { title: '23 praias. Escolha a que combina com você.', description: 'Praias de Búzios: compare o mar, o ambiente e o acesso. Cada praia tem seu próprio guia editorial.', lead: 'Veja cada praia separadamente. Abra o guia para conhecer acesso, mar, ambiente e minha leitura do lugar.', note: 'As fotos identificam somente o lugar que mostram. Se uma praia ainda não tem imagem autorizada, deixamos pendente.', open: 'Abrir praia', photoMissing: 'Foto pendente', kicker: 'GUIA DE PRAIAS · BÚZIOS', source: 'Fonte', license: 'Licença', beaches: 'Praias de Búzios', footer: '23 praias · condições e acessos podem mudar; confira no dia da visita.' },
  EN: { title: '23 beaches. Find the one that suits your trip.', description: 'Búzios beaches: compare the sea, atmosphere and access. Each beach has its own editorial guide.', lead: 'Browse beaches one by one. Open each guide for access, sea conditions, atmosphere and my take on the place.', note: 'Each photograph identifies only the place it actually shows. Where an authorised image is unavailable, we leave it pending.', open: 'Open beach', photoMissing: 'Photo pending', kicker: 'BEACH GUIDE · BÚZIOS', source: 'Source', license: 'Licence', beaches: 'Búzios beaches', footer: '23 beaches · conditions and access can change; check on the day of your visit.' }
};
const L = copy[language] || copy.ES;
const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const local = value => value && typeof value === 'object' ? (value[language] || value.ES || '') : (value || '');
const excerpt = (text, max = 128) => {
  const first = String(text || '').trim().split(/(?<=[.!?])\s+/)[0] || '';
  if (first.length <= max) return first;
  const cut = first.slice(0, max - 1).replace(/\s+\S*$/, '');
  return `${cut}…`;
};
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
const note = document.querySelector('.bz2-note');
if (note) note.textContent = L.note;

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
  const identity = local(beachProfiles.find(([name]) => name === beach.name)?.[1]);
  const content = beachCompletion.find(([name]) => name === beach.name)?.[1] || [];
  const photo = [...new Set(beach.images || [])][0];
  const sea = local(content[0]);
  const access = local(content[2]);
  const card = document.createElement('a');
  card.className = 'bz2-card';
  card.href = `${prefix}/destinos/buzios/playas/${beach.slug}/`;
  card.setAttribute('aria-label', `${beach.name} — ${L.open}`);

  const media = document.createElement('div');
  media.className = `bz2-thumb${photo ? '' : ' empty'}`;
  if (photo) {
    const img = document.createElement('img');
    img.src = photo;
    img.alt = photoAltFor(beach.name);
    img.loading = 'lazy';
    img.decoding = 'async';
    media.append(img);
  } else {
    const label = document.createElement('span');
    label.textContent = L.photoMissing;
    media.append(label);
  }

  const body = document.createElement('div');
  body.className = 'bz2-card-copy';
  const name = document.createElement('h2');
  name.textContent = beach.name;
  const summary = document.createElement('p');
  summary.textContent = excerpt(identity, 142);
  const tags = document.createElement('ul');
  tags.className = 'bz2-card-facts';
  for (const [label, value] of [[language === 'PT' ? 'Mar' : language === 'EN' ? 'Sea' : 'Mar', sea], [language === 'PT' ? 'Acesso' : language === 'EN' ? 'Access' : 'Acceso', access]]) {
    const item = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = `${label} · `;
    item.append(strong, document.createTextNode(excerpt(value, 64)));
    tags.append(item);
  }
  const action = document.createElement('span');
  action.className = 'bz2-open';
  action.textContent = `${L.open} →`;
  body.append(name, summary, tags, action);
  card.append(media, body);
  grid?.append(card);
}

const footer = document.createElement('p');
footer.className = 'bz2-hub-footnote';
footer.textContent = L.footer;
grid?.after(footer);
