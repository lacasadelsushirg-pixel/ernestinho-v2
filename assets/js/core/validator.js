import { RELATIONS } from "./relations.js";

const DUPLICATE_OK = new Set();

export function validateRegistry(registry) {
  const errors = [], warnings = [];
  const all = [...registry.entities, ...registry.guides, ...registry.lodgings];
  const ids = new Set();

  for (const record of all) {
    if (!record.id) errors.push("record-without-id");
    else if (ids.has(record.id) && !DUPLICATE_OK.has(record.id)) errors.push(`duplicate-id:${record.id}`);
    else ids.add(record.id);
  }

  for (const guide of registry.guides) {
    for (const entityId of guide.entityIds || []) {
      if (!ids.has(entityId)) errors.push(`missing-guide-entity:${guide.id}->${entityId}`);
    }
  }

  for (const rel of registry.relations) {
    if (!RELATIONS.includes(rel.type)) errors.push(`invalid-relation:${rel.type}`);
    if (!ids.has(rel.from)) errors.push(`missing-relation-from:${rel.from}`);
    if (!ids.has(rel.to)) errors.push(`missing-relation-to:${rel.to}`);
  }

  if (registry.lodgings.some(x => x.sourceId === "estudio-1-1")) errors.push("removed-lodging-present:estudio-1-1");
  if (registry.entities.filter(x => x.slug === "aquario").length > 1) errors.push("duplicate-physical-entity:aquario");

  return Object.freeze({ok:errors.length===0,errors:Object.freeze(errors),warnings:Object.freeze(warnings),counts:Object.freeze({
    entities:registry.entities.length,guides:registry.guides.length,lodgings:registry.lodgings.length,relations:registry.relations.length
  })});
}
