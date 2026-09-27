export const relations = Object.freeze([
  {from:"ec:entity:aquario",type:"sameZone",to:"ec:entity:museu-do-amanha"},
  {from:"ec:entity:copacabana-neighborhood",type:"sameNeighborhood",to:"ec:entity:copacabana-beach"},
  {from:"ec:entity:bip-bip",type:"sameNeighborhood",to:"ec:entity:copacabana-neighborhood"},
  {from:"ec:entity:parque-lage",type:"nearby",to:"ec:entity:jardim-botanico-poi"},
  {from:"ec:guide:familia-aquario",type:"alternativeTo",to:"ec:guide:atracciones-aquario",meta:{meaning:"editorial-view-only-not-factual-duplicate"}}
]);
