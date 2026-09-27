export const occurrences = Object.freeze([]);
export const signals = Object.freeze([]);

export function occurrence(input) {
  if (!input?.id || !input?.startAt) throw new TypeError("Occurrence requires id and startAt");
  return Object.freeze({
    status:"unknown",
    verifiedAt:null,
    sourceIds:[],
    ...input
  });
}

export function signal(input) {
  if (!input?.id || !input?.kind) throw new TypeError("Signal requires id and kind");
  return Object.freeze({
    value:"unknown",
    verifiedAt:null,
    freshness:"unknown",
    sourceIds:[],
    ...input
  });
}
