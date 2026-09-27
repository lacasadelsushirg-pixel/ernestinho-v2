/**
 * Source/provenance helpers. Field-level provenance can be layered without
 * duplicating the editorial entity.
 */
export function sourceRef({ url, authority = "unknown", checkedAt = null, fields = [] }) {
  if (!url) throw new TypeError("source url required");
  return Object.freeze({
    url,
    authority,
    checkedAt,
    fields: Object.freeze([...fields])
  });
}

export function chooseFieldValue(candidates = []) {
  const rank = { official: 4, institutional: 3, editorial: 2, community: 1, unknown: 0 };
  return [...candidates]
    .filter(x => x && x.value !== undefined)
    .sort((a,b) => (rank[b.authority] || 0) - (rank[a.authority] || 0))[0] || null;
}
