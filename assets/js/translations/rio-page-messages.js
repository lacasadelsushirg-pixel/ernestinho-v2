const shared = {
  openMap: ['Ubicar la playa en el mapa ↗', 'Localizar a praia no mapa ↗', 'Find the beach on the map ↗'],
  back: ['← Volver a Consejos', '← Voltar às Dicas', '← Back to Tips'],
  tipHeading: ['Consejo de Ernestinho', 'Dica do Ernestinho', 'Ernestinho’s advice'],
  sourceHeading: ['Para verificar antes de salir', 'Para conferir antes de sair', 'Check before setting out'],
  sourceNote: ['Fuentes consultadas el 5 de octubre de 2026. Las reglas operativas y la disponibilidad deben comprobarse para tu fecha.', 'Fontes consultadas em 5 de outubro de 2026. Regras operacionais e disponibilidade devem ser conferidas para sua data.', 'Sources checked on 5 October 2026. Check operating rules and availability for your travel date.'],
  tocHeading: ['Elige lo que necesitas resolver', 'Escolha o que precisa resolver', 'Choose what you need to resolve']
  ,ogImageAlt: ['Ernestinho Carioca — Río en tu mano', 'Ernestinho Carioca — Rio na sua mão', 'Ernestinho Carioca — Rio in your hand']
};
export function pageMessages(page) {
  return Object.fromEntries(['ES','PT','EN'].map((language,index) => {
    const result = {};
    for (const [key,values] of Object.entries(shared)) result[key]=(page[key] || values)[index];
    for (const key of ['title','description','heading','lead','tip']) result[key]=page[key][index];
    page.sections.forEach((section,n) => {
      result[`section${n}`]=section.heading[index];
      section.paragraphs.forEach((text,p)=>result[`section${n}p${p}`]=text[index]);
    });
    page.links.forEach(([,text],n)=>result[`link${n}`]=text[index]);
    page.sources.forEach(([,text],n)=>result[`source${n}`]=text[index]);
    return [language,result];
  }));
}
