// Only libraries already used by approved source pages. Build-time cache.
import fs from 'node:fs';
import {gunzipSync} from 'node:zlib';
export async function loadBuildLibraries() {
  const libraries = [
    ['https://cdn.tailwindcss.com','ec-tailwind.js','tailwind-3.4.17.js.gz','https://cdn.tailwindcss.com/3.4.17'],
    ['https://unpkg.com/react@18/umd/react.production.min.js','ec-react.js','react-18.3.1.js.gz','https://unpkg.com/react@18.3.1/umd/react.production.min.js'],
    ['https://unpkg.com/react-dom@18/umd/react-dom.production.min.js','ec-react-dom.js','react-dom-18.3.1.js.gz','https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js']
  ];
  const entries=await Promise.all(libraries.map(async([url,file,vendor,pinned])=>{
    const cache=process.env.EC_BUILD_LIBRARY_CACHE;
    const data=cache&&fs.existsSync(cache+'/'+file)?fs.readFileSync(cache+'/'+file):gunzipSync(fs.readFileSync(new URL('./vendor/'+vendor,import.meta.url)));
    return [[new URL(url).href,data],[new URL(pinned).href,data]];
  }));
  return new Map(entries.flat());
}
