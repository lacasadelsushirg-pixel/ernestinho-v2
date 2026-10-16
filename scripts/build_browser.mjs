// Portable build browser. Extract with current ownership, including in containers.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {createRequire} from 'node:module';
import {createBrotliDecompress} from 'node:zlib';
import {pipeline} from 'node:stream/promises';
const require=createRequire(import.meta.url);
export async function buildBrowserOptions() {
  if(process.env.EC_CHROME_PATH)return {executablePath:process.env.EC_CHROME_PATH,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']};
  const entry=require.resolve('@sparticuz/chromium');
  const bundled=require('@sparticuz/chromium');
  const tar=createRequire(entry)('tar-fs');
  const bin=path.resolve(path.dirname(entry),'../bin');
  // Vercel's Linux image needs the package's AL2023 libraries; Hostinger's
  // older glibc requires AL2. Select per build host instead of sharing cache.
  const platformArchive=process.env.VERCEL?'al2023':'al2';
  const cacheMarker=`133.0.0-${platformArchive}`;
  // Some managed build containers mount /tmp with noexec. Keep the extracted
  // browser in the user's writable home cache unless an explicit path is set.
  const dest=process.env.EC_CHROMIUM_CACHE||path.join(os.homedir(),'.cache','ec-seo-chromium');
  fs.mkdirSync(dest,{recursive:true});
  const executable=path.join(dest,'chromium');
  const ready=path.join(dest,'.ready');
  // Hostinger's shared Node.js host has an older glibc. The AL2023 support
  // archive requires GLIBC_2.30+, while the package's AL2 archive runs there.
  // Keep the cache marker specific so an incompatible AL2023 cache is rebuilt.
  if(!fs.existsSync(ready)||fs.readFileSync(ready,'utf8')!==cacheMarker){
    await pipeline(fs.createReadStream(path.join(bin,'chromium.br')),createBrotliDecompress(),fs.createWriteStream(executable,{mode:0o700}));
    for(const [archive,folder] of [['fonts.tar.br','fonts'],['swiftshader.tar.br',''],[`${platformArchive}.tar.br`,platformArchive]]){
      const directory=path.join(dest,folder);fs.mkdirSync(directory,{recursive:true});
      await pipeline(fs.createReadStream(path.join(bin,archive)),createBrotliDecompress(),tar.extract(directory,{chown:false}));
    }
    fs.writeFileSync(ready,cacheMarker);
  }
  const fontConfig=path.join(dest,'fonts/fonts.conf');
  const config=fs.readFileSync(fontConfig,'utf8').replaceAll('/tmp/fonts',path.join(dest,'fonts'));
  fs.writeFileSync(fontConfig,config);
  process.env.FONTCONFIG_PATH=path.join(dest,'fonts');
  process.env.LD_LIBRARY_PATH=[path.join(dest,platformArchive,'lib'),dest,process.env.LD_LIBRARY_PATH].filter(Boolean).join(':');
  return {executablePath:executable,headless:true,args:bundled.args.filter(a=>a!=='--single-process')};
}
