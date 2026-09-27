export const RELATIONS = Object.freeze([
  "nearby","sameNeighborhood","sameZone","sameMetro","sameTransport",
  "combineWith","before","after","alternativeTo","ifRain","ifClosed",
  "ifCrowded","ifSeaUnsafe","ifWaterQualityPoor","ifHot","ifLate",
  "accessibleAlternative","lowerEffortAlternative","familyAlternative",
  "quietAlternative","foodNearby","cultureNearby","natureNearby",
  "sunsetAlternative","eventImpact"
]);

export function relation(from, type, to, meta = {}) {
  if (!RELATIONS.includes(type)) throw new TypeError(`Unknown relation: ${type}`);
  if (!from || !to) throw new TypeError("Relation endpoints required");
  return Object.freeze({ from, type, to, ...meta });
}
