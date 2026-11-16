import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const sandbox=fs.mkdtempSync(path.join(os.tmpdir(),'ec-incremental-qa-'));
const live=path.join(sandbox,'public_html');
const dist=path.join(sandbox,'dist');
fs.mkdirSync(live,{recursive:true});
fs.mkdirSync(dist,{recursive:true});

const run=liveRoot=>spawnSync(process.execPath,['scripts/build_multilingual.mjs','--plan-only'],{
 cwd:root,
 encoding:'utf8',
 env:{...process.env,EC_LIVE_ROOT:liveRoot,EC_DIST_ROOT:dist}
});

try{
 fs.writeFileSync(path.join(live,'index.html'),'<!doctype html><title>published fixture</title>');
 fs.writeFileSync(path.join(live,'sitemap.xml'),'<urlset/>');
 const routes=[
  {route:'/',indexable:true},
  {route:'/pt/',indexable:true},
  {route:'/en/',indexable:true}
 ];
 for(let index=0;index<3585;index++)routes.push({route:`/fixture-${index}/`,indexable:true});
 fs.writeFileSync(path.join(live,'locale-manifest.json'),JSON.stringify({
  sourceCommit:'13281f87fb16ba57be07f230c00d877657ba7bdf',
  routes
 }));

 const planned=run(live);
 if(planned.status!==0)throw Error('valid incremental plan failed:\n'+planned.stdout+'\n'+planned.stderr);
 const jsonLine=planned.stdout.trim().split('\n').find(line=>line.startsWith('{"mode"'));
 const plan=JSON.parse(jsonLine||'null');
 if(plan?.mode!=='incremental'||JSON.stringify(plan.selectedRoutes)!=='["/"]'||JSON.stringify(plan.targets)!=='["/","/pt/","/en/"]'){
  throw Error('unexpected incremental plan: '+jsonLine);
 }

 const missing=path.join(sandbox,'missing-public-html');
 fs.mkdirSync(missing);
 const sentinel=path.join(dist,'SAFE_ABORT_SENTINEL');
 fs.writeFileSync(sentinel,'keep-me');
 const refused=run(missing);
 if(refused.status===0)throw Error('missing manifest did not abort');
 if(fs.readFileSync(sentinel,'utf8')!=='keep-me')throw Error('safe abort modified dist');
 if(!refused.stderr.includes('SAFE ABORT: a verified published manifest is required')){
  throw Error('missing manifest did not report the safe-abort reason');
 }

 console.log('HOSTINGER INCREMENTAL QA PASS: selected /, /pt/, /en/ only; missing manifest aborts before dist changes.');
}finally{
 fs.rmSync(sandbox,{recursive:true,force:true});
}
