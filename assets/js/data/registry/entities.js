import { baseRecord, canonicalId } from "../../core/model.js";
const seed=[
["place","aquario","AquaRio","/atracciones/aquario/",{entityType:"attraction",neighborhood:"Gamboa",zone:"Centro / Zona Portuária"}],
["culture","museu-do-amanha","Museu do Amanhã",null,{entityType:"museum",neighborhood:"Centro",zone:"Centro / Zona Portuária"}],
["venue","maracana","Maracanã","/atracciones/maracana/",{entityType:"stadium",neighborhood:"Maracanã",zone:"Zona Norte"}],
["nature","jardim-botanico","Jardim Botânico do Rio de Janeiro",null,{entityType:"garden",neighborhood:"Jardim Botânico",zone:"Zona Sul"}],
["shopping","cadeg","CADEG","/compras/cadeg/",{entityType:"market-complex",neighborhood:"Benfica",zone:"Zona Norte"}],
["neighborhood","copacabana","Copacabana","/barrios/copacabana/",{entityType:"neighborhood",zone:"Zona Sul"}],
["beach","copacabana","Praia de Copacabana","/playas/copacabana/",{entityType:"beach",neighborhood:"Copacabana",zone:"Zona Sul"}],
["culture","parque-lage","Parque Lage",null,{entityType:"cultural-park",neighborhood:"Jardim Botânico",zone:"Zona Sul"}],
["nightlife","bip-bip","Bip Bip","/vida-nocturna/bip-bip/",{entityType:"venue",neighborhood:"Copacabana",zone:"Zona Sul"}],
["nightlife","armazem-do-senado","Armazém do Senado","/vida-nocturna/armazem-do-senado/",{entityType:"venue",neighborhood:"Centro",zone:"Centro"}],
["neighborhood","maracana","Maracanã",null,{entityType:"neighborhood",zone:"Zona Norte"}]
];
export const entities=Object.freeze(seed.map(([kind,slug,name,canonicalPath,extra])=>baseRecord({id:canonicalId(kind,slug),kind,slug,name,canonicalPath,status:"needsReview",implementationStatus:canonicalPath?"REAL_PAGE":"DATA_ONLY",...extra})));