import { getLanguage, onLanguageChange } from "../i18n.js";
import { todayItems } from "../data/today.js";
const cards=new Map([...document.querySelectorAll(".idea")].map(card=>[card.dataset.id,card]));
const fields={weather:document.getElementById("weather"),place:document.getElementById("place"),moment:document.getElementById("moment"),effort:document.getElementById("effort"),area:document.getElementById("area"),access:document.getElementById("access")};
const count=document.getElementById("resultCount"),empty=document.getElementById("noResults"),noAccess=document.getElementById("noAccess");
const label=()=>({ES:"ideas para explorar",PT:"ideias para explorar",EN:"ideas to explore"}[getLanguage()]);
function update(){let visible=0;const area=fields.area.value.trim().toLocaleLowerCase();
 for(const item of todayItems){const card=cards.get(item.id);if(!card)continue;const matchWeather=fields.weather.value==="any"||item.weatherFit.includes(fields.weather.value);const matchPlace=fields.place.value==="any"||item.indoorOutdoor===fields.place.value;const matchMoment=fields.moment.value==="any"||item.recommendedMoments.includes(fields.moment.value);const matchEffort=fields.effort.value==="any"||item.effort==="low"||fields.effort.value==="medium"&&item.effort==="medium";const searchable=`${item.neighborhood} ${item.zone} ${item.category} ${item.subcategory}`.toLocaleLowerCase();const matchArea=!area||searchable.includes(area);const matchAccess=!fields.access.checked||item.accessibilityStatus==="verified";const show=matchWeather&&matchPlace&&matchMoment&&matchEffort&&matchArea&&matchAccess;card.hidden=!show;if(show)visible++}
 count.textContent=`${visible} ${label()}`;empty.hidden=visible>0||fields.access.checked;noAccess.hidden=visible>0||!fields.access.checked;
}
Object.values(fields).forEach(field=>field.addEventListener(field.type==="search"?"input":"change",update));
onLanguageChange(update);update();
