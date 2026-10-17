import { buziosBeachGallery } from '/assets/js/buzios-beach-gallery.js';

const HOST='https://mediumturquoise-stinkbug-270478.hostingersite.com/FOTOS/HOME/BUZIOS/PLAYAS/';

const ascii=value=>String(value||'')
  .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
  .replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-+|-+$/g,'').toLowerCase();

const human=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9]+/g,'_').replace(/^_+|_+$/g,'');

const delivery = path => HOST + path.split('/').map(encodeURIComponent).join('/');

export function candidateIds(beach,index=1){
  const slug=beach.slug;
  const plain=ascii(beach.name);
  const humanName=human(beach.name);
  const n=index;
  const suffixes=n===1?['','_1','-1','_01','-01']:[`_${n}`,`-${n}`,`_0${n}`,`-0${n}`];
  const bases=[
    slug, plain, humanName,
    `buzios/${slug}`,`buzios/${plain}`,`buzios/${humanName}`,
    `Buzios/${slug}`,`Buzios/${humanName}`,
    `buzios/playas/${slug}`,`buzios/playas/${plain}`,
    `Buzios/Playas/${slug}`,`Buzios/Playas/${humanName}`
  ];
  const ids=[];
  for(const base of bases) for(const s of suffixes) ids.push(base+s);
  return [...new Set(ids)];
}

const cache=new Map();
export function probe(url){
  if(cache.has(url)) return cache.get(url);
  const promise=new Promise(resolve=>{
    const img=new Image();
    img.onload=()=>resolve(url);
    img.onerror=()=>resolve(null);
    img.src=url;
  });
  cache.set(url,promise);
  return promise;
}

export async function findCloudPhoto(beach,index=1){
  const path=(buziosBeachGallery[beach.slug]||[])[index-1];
  return path ? {src:delivery(path),owner:true,publicId:path} : null;
}

export async function resolveBeachPhotos(beach,max=4){
  return (buziosBeachGallery[beach.slug]||[]).slice(0,max).map(path=>({src:delivery(path),owner:true,publicId:path}));
}
