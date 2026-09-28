/**
 * Safety gates run before recommendation scoring.
 * UNKNOWN critical safety state is not equivalent to SAFE.
 */
export function evaluateSafety(candidate, signals = {}) {
  const blocks = [];
  const unknownCritical = [];

  if (candidate.currentState === "closed") blocks.push("closed");
  if (candidate.currentState === "cancelled") blocks.push("cancelled");
  if (candidate.currentState === "unavailable") blocks.push("unavailable");

  if (candidate.requiresSafeSea) {
    if (signals.seaSafety === "unsafe") blocks.push("unsafe-sea");
    else if (!signals.seaSafety || signals.seaSafety === "unknown") unknownCritical.push("sea-safety");
  }

  if (candidate.requiresSwimmableWater) {
    if (signals.waterQuality === "poor") blocks.push("poor-water-quality");
    else if (!signals.waterQuality || signals.waterQuality === "unknown") unknownCritical.push("water-quality");
  }

  if (candidate.requiresTrailOpen) {
    if (signals.trailState === "closed") blocks.push("trail-closed");
    else if (!signals.trailState || signals.trailState === "unknown") unknownCritical.push("trail-state");
  }

  if (signals.severeWeather === true && candidate.weatherExposure === "high") blocks.push("severe-weather");

  return Object.freeze({
    allowed: blocks.length === 0 && unknownCritical.length === 0,
    blocked: blocks.length > 0,
    blocks: Object.freeze(blocks),
    unknownCritical: Object.freeze(unknownCritical)
  });
}
