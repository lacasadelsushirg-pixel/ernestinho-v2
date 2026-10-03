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
  const bin=path.resolve(path.dirname(entry),'../../bin');
  const dest=path.join(os.tmpdir(),'ec-seo-chromium');
  fs.mkdirSync(dest,{recursive:true});
  const executable=path.join(dest,'chromium');
  if(!fs.existsSync(path.join(dest,'.ready'))){
    await pipeline(fs.createReadStream(path.join(bin,'chromium.br')),createBrotliDecompress(),fs.createWriteStream(executable,{mode:0o700}));
    for(const [archive,folder] of [['fonts.tar.br','fonts'],['swiftshader.tar.br',''],['al2023.tar.br','al2023']]){
      const directory=path.join(dest,folder);fs.mkdirSync(directory,{recursive:true});
      await pipeline(fs.createReadStream(path.join(bin,archive)),createBrotliDecompress(),tar.extract(directory,{chown:false}));
    }
    fs.writeFileSync(path.join(dest,'.ready'),'143.0.4');
  }
  const fontConfig=path.join(dest,'fonts/fonts.conf');
  const config=fs.readFileSync(fontConfig,'utf8').replaceAll('/tmp/fonts',path.join(dest,'fonts'));
  fs.writeFileSync(fontConfig,config);
  process.env.FONTCONFIG_PATH=path.join(dest,'fonts');
  process.env.LD_LIBRARY_PATH=[path.join(dest,'al2023/lib'),dest,process.env.LD_LIBRARY_PATH].filter(Boolean).join(':');
  return {executablePath:executable,headless:true,args:bundled.args.filter(a=>a!=='--single-process')};
}
