export const PRIMARY_NAV=Object.freeze([
{id:"guia",href:"/guia/",label:{es:"Guía de Río","pt-BR":"Guia do Rio",en:"Rio Guide"}},
{id:"experiencias",href:"/experiencias/",label:{es:"Experiencias","pt-BR":"Experiências",en:"Experiences"}},
{id:"transportes",href:"/transportes/",label:{es:"Transportes","pt-BR":"Transportes",en:"Transport"}},
{id:"hospedaje",href:"/hospedaje/",label:{es:"Hospedaje","pt-BR":"Hospedagem",en:"Stay"}},
{id:"compras",href:"/compras/",label:{es:"Compras","pt-BR":"Compras",en:"Shopping"}},
{id:"cafe-rio",href:"/cafe-rio/",label:{es:"Café Río","pt-BR":"Café Rio",en:"Rio Coffee"}}
]);
export const HOME_DOORS=Object.freeze(["guia","transportes","hospedaje","fotografia","compras","barrios","eventos","experiencias","playas","vida-nocturna","gastronomia","atracciones","familia","cafe-rio","consejos"]);
export function navLabel(item,locale="es"){const key=String(locale).toLowerCase().startsWith("pt")?"pt-BR":String(locale).toLowerCase().startsWith("en")?"en":"es";return item.label[key]||item.label.es;}