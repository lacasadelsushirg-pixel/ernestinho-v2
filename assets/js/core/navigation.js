export const PRIMARY_NAV = Object.freeze([
  {id:"guia",href:"/guia/",label:{es:"Guía de Río",pt:"Guia do Rio",en:"Rio Guide"}},
  {id:"experiencias",href:"/experiencias/",label:{es:"Experiencias",pt:"Experiências",en:"Experiences"}},
  {id:"transportes",href:"/transportes/",label:{es:"Transportes",pt:"Transportes",en:"Transport"}},
  {id:"eventos",href:"/eventos/",label:{es:"Eventos",pt:"Eventos",en:"Events"}},
  {id:"hospedaje",href:"/hospedaje/",label:{es:"Hospedaje",pt:"Hospedagem",en:"Stay"}},
  {id:"compras",href:"/compras/",label:{es:"Compras",pt:"Compras",en:"Shopping"}}
]);

export const HOME_DOORS = Object.freeze([
 "guia","transportes","hospedaje","fotografia","compras","barrios","eventos","experiencias",
 "playas","vida-nocturna","gastronomia","atracciones","familia","cafe-rio","consejos"
]);

export function navLabel(item, locale="es") {
  const key=locale.startsWith("pt")?"pt":locale.startsWith("en")?"en":"es";
  return item.label[key] || item.label.es;
}
