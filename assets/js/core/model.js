/**
 * Ernestinho Carioca — canonical domain model.
 * Pure data contracts: no DOM, no network, no presentation.
 */
export const EC_TYPES = Object.freeze({
  ENTITY: "entity",
  OCCURRENCE: "occurrence",
  SIGNAL: "signal",
  GUIDE: "guide",
  PRODUCT: "product",
  LODGING: "lodging"
});

export const QUALITY = Object.freeze({
  VERIFIED: "verified",
  EDITORIAL_REVIEWED: "editorial-reviewed",
  NEEDS_REVIEW: "needs-review",
  UNKNOWN: "unknown"
});

export const CURRENT_STATE = Object.freeze({
  OPEN: "open",
  CLOSED: "closed",
  CANCELLED: "cancelled",
  POSTPONED: "postponed",
  AVAILABLE: "available",
  UNAVAILABLE: "unavailable",
  UNKNOWN: "unknown"
});

export function canonicalId(type, slug) {
  if (!Object.values(EC_TYPES).includes(type)) throw new TypeError("Invalid EC type");
  const safe = String(slug || "").trim().toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (!safe) throw new TypeError("Canonical slug required");
  return `ec:${type}:${safe}`;
}

export function baseRecord({ id, type, slug, qualityStatus = QUALITY.UNKNOWN, sources = [] }) {
  if (!id || !type || !slug) throw new TypeError("id, type and slug are required");
  return Object.freeze({
    id, type, slug,
    qualityStatus,
    sources: Object.freeze([...sources])
  });
}
