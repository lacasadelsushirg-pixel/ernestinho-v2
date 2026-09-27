import { entities } from "./entities.js";
import { guides } from "./guides.js";
import { lodgings } from "./lodgings.js";
import { relations } from "./relations.js";

export const registry = Object.freeze({ entities, guides, lodgings, relations });

export function findRecord(id) {
  return [...entities, ...guides, ...lodgings].find(record => record.id === id) || null;
}

export function guidesForEntity(entityId) {
  return guides.filter(guide => guide.entityIds.includes(entityId));
}
