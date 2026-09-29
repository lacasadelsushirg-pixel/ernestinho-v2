import { entities } from "./entities.js";import { guides } from "./guides.js";import { lodgings } from "./lodgings.js";import { relations } from "./relations.js";import { products } from "./products.js";import { occurrences,signals } from "./dynamic.js";import { aliases } from "./aliases.js";import { sources } from "./sources.js";import { taxonomy } from "./taxonomies.js";import { content } from "./content.js";import { buildPathRegistry } from "./paths.js";
const records=Object.freeze([...entities,...guides,...lodgings,...products,...occurrences,...signals]);
export const pathRegistry=buildPathRegistry(records,aliases);
export const registry=Object.freeze({entities,guides,lodgings,products,occurrences,signals,relations,aliases,sources,taxonomy,content,pathRegistry});
export function allRecords(){return [...records];}
export function findRecord(id){return allRecords().find(record=>record.id===id)||null;}
export function guidesForEntity(entityId){return guides.filter(guide=>(guide.relatedEntityIds||[]).includes(entityId));}