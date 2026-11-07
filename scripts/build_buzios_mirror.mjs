import fs from'node:fs';import path from'node:path';import{fileURLToPath}from'node:url';
import{root,pre,reviewedPhotos}from'./buzios_mirror_core.mjs';
import{visualMirrorRoutes,renderBuziosVisualMirror}from'./build_buzios_visual_mirror.mjs';
import{guideMirrorRoutes,renderBuziosGuideMirror}from'./build_buzios_guide_mirror.mjs';
import{transportMirrorRoutes,renderBuziosTransportMirror}from'./build_buzios_transport_mirror.mjs';
import{eventRoutes,renderBuziosEvents}from'./build_buzios_events.mjs';
import{thingsParityRoutes,renderBuziosThingsParity}from'./build_buzios_things_parity.mjs';
import{detailMirrorRoutes,renderBuziosDetailMirror}from'./build_buzios_detail_mirror.mjs';
import{diningMirrorRoutes,renderBuziosDiningMirror}from'./build_buzios_dining_mirror.mjs';
import{nightMirrorRoutes,renderBuziosNightMirror}from'./build_buzios_night_mirror.mjs';
import{tipsMirrorRoutes,renderBuziosTipsMirror}from'./build_buzios_tips_mirror.mjs';
import { preserveApprovedBlocks } from './buzios_approved_blocks.mjs';
const groups=[[diningMirrorRoutes,renderBuziosDiningMirror],[nightMirrorRoutes,renderBuziosNightMirror],[tipsMirrorRoutes,renderBuziosTipsMirror],[detailMirrorRoutes,renderBuziosDetailMirror],[visualMirrorRoutes,renderBuziosVisualMirror],[guideMirrorRoutes,renderBuziosGuideMirror],[transportMirrorRoutes,renderBuziosTransportMirror],[eventRoutes,renderBuziosEvents],[thingsParityRoutes,renderBuziosThingsParity]];
export const mirrorRoutes=[...new Set(groups.flatMap(([r])=>r))];
export function renderBuziosMirror(route,l){for(const[r,render]of groups)if(r.includes(route))return reviewedPhotos(preserveApprovedBlocks(render(route,l),route,l));throw Error('Unmapped Búzios mirror '+route)}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){const stage=process.argv.find(x=>x.startsWith('--stage='))?.slice(8);for(const route of mirrorRoutes)for(const l of stage?['ES','PT','EN']:['ES']){const p=path.join(stage||root,pre(l),route,'index.html');fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,renderBuziosMirror(route,l))}console.log('Generated '+mirrorRoutes.length+' Búzios routes'+(stage?' in ES/PT/EN':''))}
