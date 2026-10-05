const CLOUD='tdez3h4t';
const transform='f_auto,q_auto:good,c_limit,w_1800';

const ascii=value=>String(value||'')
  .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
  .replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-+|-+$/g,'').toLowerCase();

const human=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9]+/g,'_').replace(/^_+|_+$/g,'');

function delivery(id){
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${transform}/${id}`;
}

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
  for(const id of candidateIds(beach,index)){
    const url=delivery(id);
    if(await probe(url)) return {src:url,owner:true,publicId:id};
  }
  return null;
}

export async function resolveBeachPhotos(beach,max=4){
  const found=[];
  for(let i=1;i<=max;i++){
    const hit=await findCloudPhoto(beach,i);
    if(hit && !found.some(x=>x.src===hit.src)) found.push(hit);
  }
  for(const src of (beach.images||[])){
    if(found.length>=max) break;
    if(src && !found.some(x=>x.src===src)) found.push({src,owner:false});
  }
  return found.slice(0,max);
}
