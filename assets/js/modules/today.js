import { getLanguage, onLanguageChange } from "../i18n.js";
import { todayItems, filterTodayItems } from "../data/today.js";

const cards = new Map([...document.querySelectorAll(".idea")].map(card => [card.dataset.id, card]));
const fields = {
  weather: document.getElementById("weather"),
  place: document.getElementById("place"),
  moment: document.getElementById("moment"),
  effort: document.getElementById("effort"),
  area: document.getElementById("area"),
  access: document.getElementById("access")
};
const count = document.getElementById("resultCount");
const empty = document.getElementById("noResults");
const noAccess = document.getElementById("noAccess");
const label = () => ({ ES: "ideas para explorar", PT: "ideias para explorar", EN: "ideas to explore" }[getLanguage()]);

function update() {
  const filters = Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, field.type === "checkbox" ? field.checked : field.value]));
  const { candidates, accessibleMatches, results } = filterTodayItems(todayItems, filters);
  const visible = new Set(results.map(item => item.id));
  for (const [id, card] of cards) card.hidden = !visible.has(id);
  count.textContent = `${results.length} ${label()}`;
  const accessHasNoMatch = filters.access && candidates.length > 0 && accessibleMatches.length === 0;
  empty.hidden = results.length > 0 || accessHasNoMatch;
  noAccess.hidden = !accessHasNoMatch;
}

Object.values(fields).forEach(field => field.addEventListener(field.type === "search" ? "input" : "change", update));
onLanguageChange(update);
update();
