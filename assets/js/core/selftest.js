import { registry } from "../data/registry/index.js";
import { validateRegistry } from "./validator.js";
import { evaluateSafety } from "./safety.js";

export function runCoreSelfTest() {
  const registryResult = validateRegistry(registry);
  const unknownSea = evaluateSafety({id:"test-beach",requiresSafeSea:true},{seaSafety:"unknown"});
  const unsafeSea = evaluateSafety({id:"test-beach",requiresSafeSea:true},{seaSafety:"unsafe"});
  const safeSea = evaluateSafety({id:"test-beach",requiresSafeSea:true},{seaSafety:"safe"});

  const checks = {
    registryValid: registryResult.ok,
    unknownSeaBlocked: unknownSea.allowed === false && unknownSea.unknownCritical.includes("sea-safety"),
    unsafeSeaBlocked: unsafeSea.blocked === true,
    safeSeaAllowed: safeSea.allowed === true,
    noRemovedStudio: !registry.lodgings.some(x=>x.sourceId==="estudio-1-1"),
    oneAquarioEntity: registry.entities.filter(x=>x.slug==="aquario").length===1
  };
  return Object.freeze({ok:Object.values(checks).every(Boolean),checks:Object.freeze(checks),registry:registryResult});
}
