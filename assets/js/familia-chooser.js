import { getLanguage, onLanguageChange } from './i18n.js';
import { translatePhrase } from './site.js';
import { FAMILIA_DATA, FAMILIA_SLUGS } from './familia-data.js';
const FAMILY_PHOTO_BASE='https://mediumturquoise-stinkbug-270478.hostingersite.com/FOTOS/HOME/FAMILIA/';
const familyPhotoUrl=(folder,file)=>FAMILY_PHOTO_BASE+folder.split('/').map(encodeURIComponent).join('/')+'/'+encodeURIComponent(file);
const FAMILY_ART_PHOTOS={
  'aquario':[{folder:'FAMILIA aquario',file:'AQUARIO (4).jpg',alt:'Visitantes recorren el túnel del tanque oceánico de AquaRio',width:4032,height:3024}],
  'parque-flamengo-familia':[{folder:'FAMILIA ATERRO DO FLAMENGO FAMILIA',file:'FAMILIA ATERRO FLAMENGO (4).jpg',alt:'Familia camina por un sendero arbolado del Aterro do Flamengo',width:1392,height:737}],
  'bioparque':[
    {folder:'FAMILIA bioparque',file:'bio parque rio familia  (7).jpg',alt:'León en el BioParque de Río',width:800,height:600},
    {folder:'FAMILIA bioparque',file:'bio parque rio familia  (8).jpg',alt:'Animal observado en uno de los recintos del BioParque',width:800,height:600}
  ],
  'feira-sao-cristovao':[{folder:'FAMILIA FERIA SAO CRISTOVAO',file:'FAMILIA FERIA SAO CRISTOVAO (1).jpg',alt:'Escultura de acordeonista frente al letrero de la Feira de São Cristóvão',width:640,height:480}],
  'lagoa-familia':[
    {folder:'FAMILIA lagoa',file:'FAMILIA LAGOA (5).jpg',alt:'Carritos familiares disponibles junto a la Lagoa Rodrigo de Freitas',width:1400,height:1050},
    {folder:'FAMILIA lagoa',file:'FAMILIA LAGOA (6).jpg',alt:'Familia disfruta un paseo junto a la Lagoa Rodrigo de Freitas',width:1400,height:1400}
  ],
  'meta-kart':[{folder:'FAMILIA meta kart',file:'metakart4.jpg',alt:'Grupo con trajes de karting en Meta Kart Indoor',width:1400,height:1050}],
  'maracana-tour':[
    {folder:'FAMILIA MARACANA',file:'FAMILIA MARACANA (1).avif',alt:'Vista aérea del estadio Maracanã',width:1600,height:1000},
    {folder:'FAMILIA MARACANA',file:'FAMILIA MARACANA (2).avif',alt:'Exposición de objetos históricos del Maracanã',width:1600,height:1000}
  ]
};
function appendFamilyGallery(anchor,id,photos){
  if(!anchor||!photos.length||document.querySelector('[data-family-photo-gallery="'+id+'"]'))return;
  const gallery=document.createElement('div');
  gallery.className='family-gallery';
  gallery.dataset.familyPhotoGallery=id;
  for(const photo of photos){
    const figure=document.createElement('figure');
    const image=document.createElement('img');
    image.src=familyPhotoUrl(photo.folder,photo.file);
    image.alt=photo.alt;
    image.loading='lazy';
    image.decoding='async';
    image.width=photo.width;
    image.height=photo.height;
    figure.append(image);
    gallery.append(figure);
  }
  anchor.insertAdjacentElement('afterend',gallery);
}
function placeFamilyEditorialPhotos(){
  const id=document.body.dataset.familyId;
  const experience=document.querySelector('.family-experience');
  if(!id||!experience)return;
  if(id==='ilha-fiscal'){
    const hero=document.querySelector('.family-hero img');
    if(hero){
      hero.src=familyPhotoUrl('FAMILIA ilha fiscal','ILHAF2.jpg');
      hero.alt='Ilha Fiscal vista desde la bahía';
      hero.width=782;
      hero.height=472;
    }
    const figures=[...document.querySelectorAll('.family-gallery figure')];
    const first=figures[0]?.querySelector('img');
    if(first){
      first.src=familyPhotoUrl('FAMILIA ilha fiscal','FB_IMG_1696133943368(1).jpg');
      first.alt='Fachada de Ilha Fiscal entre las palmeras';
      first.width=782;
      first.height=960;
    }
    figures.slice(1).forEach(figure=>figure.remove());
    return;
  }
  if(id==='jardim-botanico'){
    const hero=document.querySelector('.family-hero img');
    if(hero){
      hero.src=familyPhotoUrl('FAMILIA jadin botanico','jardim botanico.jpg');
      hero.alt='Pérgola y sendero del Jardim Botânico de Río';
      hero.width=1600;
      hero.height=1014;
    }
    const photos=[...document.querySelectorAll('.family-gallery img')];
    for(const [index,file] of ['JARDIMB2.jpg','JARDIMB3.jpg'].entries()){
      const image=photos[index];
      if(image){
        image.src=familyPhotoUrl('FAMILIA jadin botanico',file);
        image.alt=index===0?'Jardín del Jardim Botânico con el Morro Dois Irmãos al fondo':'Palmeras imperiales en el Jardim Botânico';
        image.width=720;
        image.height=480;
      }
    }
    return;
  }
  if(id==='bosque-barra'){
    const duplicate=[...document.querySelectorAll('.family-gallery img')].find(image=>image.getAttribute('src')?.includes('IMG_20230305_160207100_HDR'));
    if(duplicate){
      duplicate.src=familyPhotoUrl('FAMILIA bosque da barra','IMG_20230305_160135338_HDR(1).jpg');
      duplicate.alt='Ernestinho junto a capibaras en el Bosque da Barra';
      duplicate.width=2320;
      duplicate.height=1740;
    }
    appendFamilyGallery(experience,id,[{folder:'FAMILIA bosque da barra',file:'IMG_20230305_160226216(3).jpg',alt:'Jacaré entre nenúfares en el Bosque da Barra',width:4080,height:2296}]);
    return;
  }
  if(id==='parque-lage'){
    for(const [heic,jpeg,alt] of [
      ['PARQL2.heic','PARQL2.jpg','Parque Lage · experiencia familiar'],
      ['PARQLA1.heic','PARQLA1.jpg','Parque Lage · otra mirada de la experiencia']
    ]){
      const image=[...document.querySelectorAll('.family-gallery img')].find(item=>item.getAttribute('src')?.includes(heic));
      if(image){image.src=familyPhotoUrl('FAMILIA parque lage',jpeg);image.alt=alt;}
    }
    return;
  }
  if(id==='carnaval-experience'){
    const broken=[...document.querySelectorAll('.family-gallery img')].find(image=>image.getAttribute('src')?.includes('CARNAVALE23.heic'));
    if(broken){
      broken.src=familyPhotoUrl('FAMILIA CARNAVAL EXPERIENCE FAMILIA','CARNAVAL EXPERIENCE PARA FAMILIA.jpg');
      broken.alt='Ernestinho y visitantes en el espacio de Carnaval Experience dedicado a Zeca Pagodinho';
      const figure=broken.closest('figure');
      if(figure){const oldGallery=figure.parentElement;figure.remove();appendFamilyGallery(experience,id,[]);const gallery=document.createElement('div');gallery.className='family-gallery';gallery.dataset.familyPhotoGallery=id;gallery.append(figure);experience.insertAdjacentElement('afterend',gallery);if(oldGallery&&!oldGallery.children.length)oldGallery.remove();}
    }
    return;
  }
  appendFamilyGallery(experience,id,FAMILY_ART_PHOTOS[id]||[]);
}
placeFamilyEditorialPhotos();
const host=document.querySelector('[data-family-chooser]');
if(host){const current=document.body.dataset.familyId;const q=document.querySelector('[data-family-search]');const render=(term='')=>{host.replaceChildren();const needle=term.trim().toLocaleLowerCase('es');for(const a of FAMILIA_DATA){if(needle&&!`${a.nombre} ${a.categoria} ${translatePhrase(a.nombre, getLanguage())} ${translatePhrase(a.categoria, getLanguage())}`.toLocaleLowerCase().includes(needle))continue;const link=document.createElement('a');link.className='family-choice'+(a.id===current?' is-current':'');link.href='/familia/'+FAMILIA_SLUGS[a.id]+'/';if(a.miniatura){const img=document.createElement('img');img.src=a.miniatura;img.alt=a.nombre;img.loading='lazy';link.append(img);}const copy=document.createElement('span');copy.textContent=a.nombre;const category=document.createElement('small');category.textContent=a.categoria;link.append(copy,category);host.append(link);}};render();onLanguageChange(()=>render(q?.value || ''));q?.addEventListener('input',()=>render(q.value));}
