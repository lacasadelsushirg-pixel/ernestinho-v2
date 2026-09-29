export const lodgings = Object.freeze([
  "805","605","1008","54","702","217","1221","621","goia","venti","nata"
].map(sourceId => Object.freeze({
  id:`ec:lodging:${sourceId}`,
  sourceId,
  status:"active-in-registry",
  pricePublic:false,
  availabilityPublic:false
})));
