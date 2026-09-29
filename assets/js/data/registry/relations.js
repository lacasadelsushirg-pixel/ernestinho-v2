import { relation } from "../../core/relations.js";
const rows=[
["aquario-amanha","ec:place:aquario","sameZone","ec:culture:museu-do-amanha"],
["copa-beach","ec:neighborhood:copacabana","sameNeighborhood","ec:beach:copacabana"],
["bip-copa","ec:nightlife:bip-bip","sameNeighborhood","ec:neighborhood:copacabana"],
["lage-jb","ec:culture:parque-lage","nearby","ec:nature:jardim-botanico"],
["aquario-views","ec:guide:familia-aquario","alternativeTo","ec:guide:atracciones-aquario"]
];
export const relations=Object.freeze(rows.map(([slug,fromId,type,toId])=>relation({id:`ec:relation:${slug}`,fromId,type,toId,editorialNote:slug==="aquario-views"?"editorial-view-only-not-factual-duplicate":""})));