#!/usr/bin/env node
// Import only strings from the hash-protected, owner-reviewed Home locale bundle.
// Existing human-reviewed values win; reviewed Home strings replace machine drafts.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const LANGS={PT:'pt',EN:'en',FR:'fr'};

export function extractLocaleObjects(source){
 const objects={};
 for(const locale of ['ES',...Object.keys(LANGS)]){
  const match=new RegExp('const\\s+'+locale+'\\s*=\\s*\\{').exec(source);
  if(!match)throw new Error('Missing locale object '+locale);
  const open=match.index+match[0].lastIndexOf('{');
  let depth=0,quote='',escaped=false,end=-1;
  for(let i=open;i<source.length;i++){
   const char=source[i];
   if(quote){if(escaped)escaped=false;else if(char==='\\\\')escaped=true;else if(char===quote)quote='';continue;}
   if(char==='"'||char==="'"){quote=char;continue;}
   if(char==='{')depth++;
   else if(char==='}'&&--depth===0){end=i+1;break;}
  }
  if(end<0)throw new Error('Unclosed locale object '+locale);
  const object=vm.runInNewContext('('+source.slice(open,end)+')',Object.create(null),{timeout:250});
  if(!object||typeof object!=='object'||Array.isArray(object)||Object.prototype.toString.call(object)!=='[object Object]')throw new Error('Invalid locale object '+locale);
  for(const [key,value] of Object.entries(object))if(typeof key!=='string'||typeof value!=='string')throw new Error('Non-string translation value in '+locale+': '+key);
  objects[locale]=object;
 }
 return objects;
}

export function mergeReviewedHome(memory,objects){
 if(!memory||Array.isArray(memory)||typeof memory!=='object')throw new Error('Translation memory must be a JSON object');
 const result=structuredClone(memory);let added=0,replacedDrafts=0,conflicts=0;
 for(const [key,source] of Object.entries(objects.ES)){
  if(!source.trim())continue;
  const digest=crypto.createHash('sha256').update(source,'utf8').digest('hex');
  const row=result[digest]??={};
  for(const [locale,lang] of Object.entries(LANGS)){
   const text=objects[locale][key];if(!text?.trim())continue;
   const current=row[lang];
   if(current&&['reviewed','reviewed_import'].includes(current.status)){
    if(current.text!==text)conflicts++;
    continue;
   }
   if(current)replacedDrafts++;
   else added++;
   row[lang]={text,status:'reviewed_import',source:'assets/js/translations/home.js',source_key:key};
  }
 }
 return {memory:result,added,replacedDrafts,conflicts,sourceLocaleKeys:Object.keys(objects.ES).length};
}

function atomicWrite(destination,data){
 const dir=path.dirname(destination);fs.mkdirSync(dir,{recursive:true});
 const lock=destination+'.lock';let lockFd;
 try{lockFd=fs.openSync(lock,'wx');}catch(error){if(error.code==='EEXIST')throw new Error('Translation memory is already being updated: '+destination);throw error;}
 const temporary=destination+'.'+process.pid+'.'+crypto.randomUUID()+'.tmp';
 try{fs.writeFileSync(temporary,JSON.stringify(data,null,2)+'\n',{encoding:'utf8',flag:'wx'});fs.renameSync(temporary,destination);}
 finally{try{fs.closeSync(lockFd);}finally{try{fs.unlinkSync(temporary);}catch{}try{fs.unlinkSync(lock);}catch{}}}
}

if(process.argv[1]&&fileURLToPath(import.meta.url)===path.resolve(process.argv[1])){
 const [, , bundleArg, memoryArg]=process.argv;
 if(!bundleArg||!memoryArg){console.error('Usage: node scripts/seed_approved_home_memory.mjs assets/js/translations/home.js memory.json');process.exit(2);}
 const bundle=fs.readFileSync(bundleArg,'utf8');
 const objects=extractLocaleObjects(bundle);
 const memory=fs.existsSync(memoryArg)?JSON.parse(fs.readFileSync(memoryArg,'utf8')):{};
 const result=mergeReviewedHome(memory,objects);
 atomicWrite(memoryArg,result.memory);
 console.log(JSON.stringify({source:'assets/js/translations/home.js',sourceLocaleKeys:result.sourceLocaleKeys,added:result.added,replacedMachineDrafts:result.replacedDrafts,reviewedConflictsPreserved:result.conflicts,publication_approved:false}));
}
