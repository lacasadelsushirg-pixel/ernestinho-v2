import { getLanguage, onLanguageChange } from "./i18n.js";

// Keep browser/share metadata aligned with the currently selected language.
function update(){
  const lang=getLanguage();
  const name=document.querySelector("main h1")?.textContent?.trim()||"Barrios";
  const title=lang==="ES"?`${name} | Barrios de Río | Ernestinho Carioca`:lang==="PT"?`${name} | Bairros do Rio | Ernestinho Carioca`:`${name} | Rio Neighborhoods | Ernestinho Carioca`;
  const description=lang==="ES"?`Guía editorial de ${name}: historia, ambiente, lugares destacados, planificación y fuentes oficiales.`:lang==="PT"?`Guia editorial de ${name}: história, ambiente, destaques, planejamento e fontes oficiais.`:`An editorial guide to ${name}: history, atmosphere, highlights, planning, and official sources.`;
  document.title=title;
  for(const m of document.querySelectorAll('meta[name="description"],meta[property="og:description"],meta[name="twitter:description"]'))m.content=description;
  for(const m of document.querySelectorAll('meta[property="og:title"],meta[name="twitter:title"]'))m.content=title;
}
update();onLanguageChange(update);
