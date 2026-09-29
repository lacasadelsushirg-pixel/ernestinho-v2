/**
 * Freshness rules. UNKNOWN must never be silently promoted to safe/current.
 */
export const FRESHNESS = Object.freeze({
  LIVE: "live",
  SAME_DAY: "same-day",
  OFFICIAL_CYCLE: "official-cycle",
  SEMI_DYNAMIC: "semi-dynamic",
  EVERGREEN: "evergreen",
  UNKNOWN: "unknown"
});

export function isFresh({ verifiedAt, maxAgeMinutes, now = Date.now() }) {
  if (!verifiedAt || !Number.isFinite(maxAgeMinutes)) return false;
  const t = Date.parse(verifiedAt);
  if (!Number.isFinite(t)) return false;
  return now - t <= maxAgeMinutes * 60_000;
}

export function currentValueOrUnknown(record, options = {}) {
  return isFresh({ ...record, ...options }) ? record.value : "unknown";
}
