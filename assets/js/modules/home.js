import { doors, experiences, shopping } from "../data.js";
const key = value => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const card = (item, cls, group) => {
  const [title, copy, route, image] = item;
  const id = key(title);
  return `<a class="${cls}" href="${route}" data-route="${route}"${image ? ` style="--card-image:url('${image}')"` : ""}><span class="arrow" aria-hidden="true">→</span><span class="card-shade" aria-hidden="true"></span><b data-i18n="${group}.${id}.title">${title}</b><span class="card-copy" data-i18n="${group}.${id}.copy">${copy}</span><small data-i18n="home.explore">EXPLORAR</small></a>`;
};
export function renderHome() {
  for (const [id, items, cls, group] of [["doorGrid", doors, "door", "door"], ["experienceGrid", experiences, "feature", "experience"], ["shoppingGrid", shopping, "feature", "shop"]]) {
    const element = document.getElementById(id);
    if (element) element.innerHTML = items.map(item => card(item, cls, group)).join("");
  }
}
