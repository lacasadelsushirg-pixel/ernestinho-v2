import { entities } from "./entities.js";
import { guides } from "./guides.js";
import { lodgings } from "./lodgings.js";
import { relations } from "./relations.js";
import { products } from "./products.js";
import { maracana } from "./maracana.js";

const entityMap = new Map(entities.map(x => [x.id, x]));
if (!entityMap.has(maracana.neighborhood.id)) entityMap.set(maracana.neighborhood.id, maracana.neighborhood);
entityMap.set(maracana.stadium.id, { ...entityMap.get(maracana.stadium.id), ...maracana.stadium });

export const registry = Object.freeze({
  entities:Object.freeze([...entityMap.values()]),
  guides,
  lodgings,
  products,
  relations
});

export function findRecord(id) {
  return [...registry.entities, ...guides, ...lodgings, ...products].find(record => record.id === id) || null;
}

export function guidesForEntity(entityId) {
  return guides.filter(guide => guide.entityIds.includes(entityId));
}
