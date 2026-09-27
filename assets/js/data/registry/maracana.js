/**
 * Maracana domain split.
 * Never collapse geography, venue, tour, match occurrence or EC commercial product.
 */
export const maracana = Object.freeze({
  neighborhood: {
    id:"ec:entity:maracana-neighborhood",
    type:"entity", kind:"neighborhood", name:"Maracanã", zone:"Zona Norte"
  },
  stadium: {
    id:"ec:entity:maracana-estadio",
    type:"entity", kind:"stadium", name:"Maracanã",
    neighborhoodId:"ec:entity:maracana-neighborhood"
  },
  stadiumTour: {
    id:"ec:product:tour-maracana",
    type:"product", kind:"venue-tour",
    venueId:"ec:entity:maracana-estadio",
    commercialOwner:"external-or-direct",
    occurrenceDependent:false
  },
  matchExperience: {
    id:"ec:product:experiencia-partido-maracana",
    type:"product", kind:"ec-guided-match-experience",
    venueId:"ec:entity:maracana-estadio",
    brand:"Ernestinho Carioca",
    includes:["transport","guide-accompaniment","experience/passeio","match-ticket"],
    occurrenceDependent:true,
    publicDescriptionRule:"Describe the EC service separately from the official match/ticket inventory."
  }
});

export function maracanaMatchOccurrence({id,startAt,homeTeam,awayTeam,status="unknown",sourceIds=[]}) {
  if (!id || !startAt || !homeTeam || !awayTeam) throw new TypeError("Match requires id, startAt and teams");
  return Object.freeze({
    id, type:"occurrence", kind:"football-match",
    venueId:"ec:entity:maracana-estadio",
    startAt, homeTeam, awayTeam, status, sourceIds
  });
}

export function experienceForMatch(matchId, availability="unknown") {
  return Object.freeze({
    productId:"ec:product:experiencia-partido-maracana",
    occurrenceId:matchId,
    availability
  });
}
