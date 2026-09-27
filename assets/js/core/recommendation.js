import { evaluateSafety } from "./safety.js";

export function evaluateCandidate(candidate, context = {}, signals = {}) {
  const safety = evaluateSafety(candidate, signals);
  if (!safety.allowed) return Object.freeze({candidateId:candidate.id,eligible:false,safety,score:null,reasons:[]});

  let score = 0;
  const reasons = [];
  if (context.zone && candidate.zone === context.zone) { score += 25; reasons.push("same-zone"); }
  if (context.moment && candidate.recommendedMoments?.includes(context.moment)) { score += 20; reasons.push("time-fit"); }
  if (context.indoorOutdoor && candidate.indoorOutdoor === context.indoorOutdoor) { score += 15; reasons.push("place-fit"); }
  if (context.effort && candidate.effort === context.effort) { score += 10; reasons.push("effort-fit"); }
  return Object.freeze({candidateId:candidate.id,eligible:true,safety,score,reasons:Object.freeze(reasons)});
}

export function rankCandidates(candidates, context, signalsById = {}) {
  return candidates.map(c => evaluateCandidate(c,context,signalsById[c.id]||{}))
    .filter(x=>x.eligible)
    .sort((a,b)=>b.score-a.score);
}
