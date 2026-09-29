import { baseRecord, canonicalId } from "../../core/model.js";
const rows=[
["barrios-copacabana","barrios","/barrios/copacabana/",["ec:neighborhood:copacabana"]],
["atracciones-aquario","atracciones","/atracciones/aquario/",["ec:place:aquario"]],
["familia-aquario","familia","/familia/aquario/",["ec:place:aquario"]],
["atracciones-maracana","atracciones","/atracciones/maracana/",["ec:venue:maracana"]],
["compras-cadeg","compras","/compras/cadeg/",["ec:shopping:cadeg"]],
["barrios-cadeg-legacy-view","barrios","/barrios/cadeg/",["ec:shopping:cadeg"]]
];
export const guides=Object.freeze(rows.map(([slug,family,canonicalPath,relatedEntityIds])=>baseRecord({id:canonicalId("guide",slug),kind:"guide",slug,name:slug,family,guideType:"editorial",canonicalPath,relatedEntityIds:Object.freeze(relatedEntityIds),entityIds:Object.freeze(relatedEntityIds),implementationStatus:"EDITORIAL_GUIDE",premiumBoundary:"public-context-no-step-by-step-premium-route"})));