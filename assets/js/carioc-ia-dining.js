import { SITE_GUIDE_DOCUMENTS } from './carioc-ia-site-index-data.js?v=20261013-cariocia10';

const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const t = (ES,PT,EN) => ({ES,PT,EN});
const cuisines = [
  {id:'brazilian',label:t('Comida brasileña','Comida brasileira','Brazilian food'),pattern:/\b(brasilena|brasileira|brazilian|feijoada|boteco)\b/,evidence:/brasil|brasileir|feijoada|boteco/},
  {id:'meat',label:t('Carnes / churrasco','Carnes / churrasco','Steak / barbecue'),pattern:/\b(carne|carnes|churrasco|parrilla|steak|barbecue|bbq)\b/,evidence:/carne|steak|churrasc|parrilla|grill/},
  {id:'seafood',label:t('Pescados y mariscos','Peixes e frutos do mar','Fish and seafood'),pattern:/\b(pescado|pescados|marisco|mariscos|peixe|peixes|frutos do mar|fish|seafood)\b/,evidence:/pescad|marisco|peixe|frutos do mar|seafood/},
  {id:'sushi',label:t('Sushi / japonesa','Sushi / japonesa','Sushi / Japanese'),pattern:/\b(sushi|japonesa|japones|japanese)\b/,evidence:/sushi|japones|japanese/},
  {id:'vegetarian',label:t('Vegetariana','Vegetariana','Vegetarian'),pattern:/\b(vegetariana|vegetariano|vegetarian)\b/,evidence:/vegetari|vegan/},
  {id:'vegan',label:t('Vegana','Vegana','Vegan'),pattern:/\b(vegana|vegano|vegan)\b/,evidence:/vegan/},
  {id:'breakfast',label:t('Desayuno / café','Café da manhã / café','Breakfast / café'),pattern:/\b(desayuno|desayunar|cafe|cafe da manha|breakfast|bakery|padaria)\b/,evidence:/desayuno|cafeteria|padaria|cafe da manha|breakfast|bakery/},
  {id:'italian',label:t('Italiana / pizza','Italiana / pizza','Italian / pizza'),pattern:/\b(italiana|italiano|italian|pizza|massa|pasta)\b/,evidence:/italian|pizza|massa|pasta/},
  {id:'chilean',hidden:true,label:t('Comida chilena','Comida chilena','Chilean food'),pattern:/\b(chilena|chileno|chilean)\b/,evidence:/chilen|chilean/},
  {id:'peruvian',hidden:true,label:t('Comida peruana','Comida peruana','Peruvian food'),pattern:/\b(peruana|peruano|peruvian|ceviche)\b/,evidence:/peruan|peruvian/},
  {id:'mexican',hidden:true,label:t('Comida mexicana','Comida mexicana','Mexican food'),pattern:/\b(mexicana|mexicano|mexican|tacos)\b/,evidence:/mexican|tacos/}
];
const generic = /\b(?:quiero comer|quiero comida|quiero un restaurante|donde comer|donde puedo comer|busco donde comer|donde almorzar|donde puedo almorzar|quiero almorzar|donde merendar|donde puedo merendar|quiero merendar|donde tomar una merienda|tomar algo por la tarde|donde cenar|donde puedo cenar|quiero cenar|onde comer|onde posso comer|onde almocar|onde almoçar|onde posso almocar|onde posso almoçar|quero almocar|quero almoçar|onde lanchar|onde tomar um lanche|quero fazer um lanche|quero jantar|onde jantar|quero comer|quero um restaurante|where should i eat|where can i eat|where to eat|where can i have lunch|where can i get lunch|where to get lunch|where to have lunch|where can i get dinner|where can i have dinner|where to get dinner|where to have dinner|where can i get a snack|where to get a snack|where can i get an afternoon snack|where to get an afternoon snack|i want to eat|find a restaurant)\b/;
const mealFor = query => {
  if (/\b(desayun|cafe da manha|breakfast)\b/.test(query)) return 'breakfast';
  if (/\b(almorzar|almuerzo|almocar|almoco|lunch)\b/.test(query)) return 'lunch';
  if (/\b(merienda|merendar|lanche|lanchar|afternoon snack|snack|por la tarde)\b/.test(query)) return 'snack';
  if (/\b(cenar|jantar|dinner)\b/.test(query)) return 'dinner';
  return null;
};
const mealName = {breakfast:t('desayunar','tomar café da manhã','have breakfast'),lunch:t('almorzar','almoçar','have lunch'),snack:t('merendar','fazer um lanche','get an afternoon snack'),dinner:t('cenar','jantar','have dinner')};
const guide = {href:'/gastronomia/',label:t('Ver toda la gastronomía','Ver toda a gastronomia','Browse the food guide')};
const zones = ['Copacabana','Ipanema','Leblon','Botafogo','Centro'];
const displayZone = zone => String(zone || '').split(' ').map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(' ');

export function resolveDining(query, context = {}) {
  const active = String(context.pending || '').startsWith('dining_');
  if (!generic.test(query) && !active) return null;
  // Keep specific one-turn requests on their dedicated intents (families, dietary needs,
  // allergies, delivery, opening hours, or budget) instead of restarting the preference flow.
  if (!active && /\b(ninos|ninas|crianca|criancas|children|child|kids|vegetariano|vegetariana|vegetarian|vegano|vegana|vegan|gluten|alergia|allergy|delivery|entrega|open now|aberto agora|aberta agora|barato|barata|economico|economica|budget|cheap|precio|preco|price|valor|valores)\b/.test(query)) return null;
  // Preserve the existing authored answers for a specific dish or landmark on a fresh request.
  if (!active && /\b(feijoada|cristo|corcovado|sugarloaf|pao de acucar|pan de azucar|maracana|aquario)\b/.test(query)) return null;
  const selected = cuisines.find(c=>c.pattern.test(query));
  const meal = mealFor(query) || context.diningMeal || null;
  // A new topic must leave the food flow rather than being mistaken for a cuisine or district.
  if (active && /\b(tour|tours|passeio|passeios|experience|experiencias|experiences|traslado|transfer|airport|aeroporto|aeropuerto|maletas?|equipajes?|luggages?|bagagem|malas?|cristo|christ|redeemer|playas?|praias?|beach(?:es)?|lluvia|llueve|rain|rains|rainy|chuva|chover|weather|clima|hotel|hospedaje|hostel|museum|museo|museu|shopping|compras|nightlife|samba|metro|subway|uber|taxi|transport|transporte|check in|internet|wifi|wi fi|esim|e sim|sim card|roaming|chip|alquilar|alquiler|rentar|rent|hire|alugar|locacao|locação)\b/.test(query) && !selected) return null;
  const cuisine = selected || cuisines.find(c=>c.id === context.diningCuisine);
  let location = context.location || '';
  if (!location && context.pending === 'dining_location' && !selected && !generic.test(query) && /^[a-z]+(?: [a-z]+){0,3}$/.test(query) && !/\b(otra|outro|other|barato|economico|budget|cheap|somos|we|quiero|quero|necesito)\b/.test(query)) location=query;
  const isChoice=selected && Object.values(selected.label).some(label=>normalize(label)===query);
  const dish=query.match(/\b(feijoada|pizza|ceviche)\b/)?.[1];
  const requestedDish=isChoice ? null : dish || (selected ? null : context.diningDish || null);
  const foodLabel=requestedDish ? t(displayZone(requestedDish),displayZone(requestedDish),displayZone(requestedDish)) : cuisine?.label;
  const label = displayZone(location);
  let answer, followups, links=[guide], stage;
  if (!cuisine) {
    answer=t(
      `${label ? 'En '+label+', ' : 'Claro. '}${meal ? 'para '+mealName[meal].ES : ''}${meal ? ', ¿qué tipo de comida te apetece y en qué barrio? ' : '¿Qué te gustaría comer? Elige un tipo de comida o cuéntame lo que buscas. '}También puedes abrir mi guía de gastronomía.`,
      `${label ? 'Em '+label+', ' : 'Claro. '}${meal ? 'para '+mealName[meal].PT : ''}${meal ? ', que tipo de comida você prefere e em qual bairro? ' : 'O que você gostaria de comer? Escolha um tipo de comida ou conte o que procura. '}Você também pode abrir meu guia gastronômico.`,
      `${label ? 'In '+label+', ' : 'Of course. '}${meal ? 'for '+mealName[meal].EN : ''}${meal ? ', what kind of food would you like, and in which neighborhood? ' : 'What would you like to eat? Choose a type of food or tell me what you are looking for. '}You can also browse my food guide.`);
    followups=cuisines.filter(c=>!c.hidden).map(c=>c.label);stage='dining_cuisine';
  } else if (!location) {
      answer=t(`Perfecto${meal ? ', buscamos dónde '+mealName[meal].ES : ''}, con ${foodLabel.ES.toLowerCase()}. ¿En qué barrio estás o quieres comer? Puedes elegir una zona o escribir otra.`,`Perfeito${meal ? ', vamos procurar um lugar para '+mealName[meal].PT : ''}, com ${foodLabel.PT.toLowerCase()}. Em qual bairro você está ou quer comer? Escolha uma região ou escreva outra.`,`Great${meal ? ', let us find a place to '+mealName[meal].EN : ''}, with ${foodLabel.EN.toLowerCase()}. Which neighbourhood are you in or would you like to eat in? Choose an area or type another.`);
    followups=zones;stage='dining_location';
  } else {
    const veganOnly=cuisine.id === 'vegan' || (selected?.id !== 'vegetarian' && context.diningVegan === true);
    const records=context.budget === 'budget' ? [] : SITE_GUIDE_DOCUMENTS.filter(item=>item.category==='gastronomia' && normalize(item.neighborhood)===normalize(location) && cuisine.evidence.test(normalize([item.title,...item.tags].join(' '))) && (!requestedDish || normalize([item.title,...item.tags].join(' ')).includes(requestedDish)) && (!veganOnly || /vegan/.test(normalize(item.tags.join(' '))))).slice(0,3);
    const available=records.length>0;
    answer=t(
      available ? `Para ${foodLabel.ES.toLowerCase()} en ${label}, estas fichas de mi guía coinciden con el tipo de comida y la zona. Revisa cada una y confirma menú, precios y horarios con el local.` : `No encuentro una ficha que confirme ${foodLabel.ES.toLowerCase()} en ${label}. Prefiero decirte eso antes que recomendarte otro tipo de comida o un local de otra zona. Puedes explorar la guía o cambiar tu elección.`,
      available ? `Para ${foodLabel.PT.toLowerCase()} em ${label}, estas fichas do meu guia correspondem à comida e à região. Confira cada uma e confirme cardápio, preços e horários com o local.` : `Não encontro uma ficha que confirme ${foodLabel.PT.toLowerCase()} em ${label}. Prefiro explicar isso a indicar outra comida ou um local de outra região. Você pode explorar o guia ou mudar sua escolha.`,
      available ? `For ${foodLabel.EN.toLowerCase()} in ${label}, these guide listings match the food and area. Read each listing and confirm the menu, prices and opening hours with the venue.` : `I cannot find a listing confirming ${foodLabel.EN.toLowerCase()} in ${label}. I would rather tell you than suggest different food or a place in another area. You can explore the guide or change your choice.`);
    if (context.budget === 'budget') answer=t(`Buscamos ${foodLabel.ES.toLowerCase()} en ${label}, pero no tengo precios actuales confirmados para filtrar por presupuesto. Abre la guía para comparar menús y consulta el valor con cada local.`,`Procuramos ${foodLabel.PT.toLowerCase()} em ${label}, mas não tenho preços atuais confirmados para filtrar pelo orçamento. Abra o guia para comparar cardápios e confirme os valores com cada local.`,`We are looking for ${foodLabel.EN.toLowerCase()} in ${label}, but I do not have confirmed current prices to filter by budget. Browse the guide to compare menus and confirm prices with each venue.`);
    links=[...records.map(item=>({href:item.href,label:t(item.title,item.title,item.title),image:item.image,neighborhood:item.neighborhood})),guide];
    followups=cuisines.filter(c=>!c.hidden).map(c=>c.label);stage='dining_refine';
  }
  if (context.budget === 'budget') {
    answer.ES += ' Tendré en cuenta tu presupuesto, pero no voy a asegurar precios que no estén confirmados.';
    answer.PT += ' Vou considerar seu orçamento, sem garantir preços não confirmados.';
    answer.EN += ' I will keep your budget in mind without claiming unverified prices.';
  }
  return {intent:{id:'daily_food',category:'gastronomy',answer,links,followups,pending:stage,directAnswer:true,suppressRecommendations:true},candidates:[],contextUpdate:{pending:stage,category:'gastronomy',lastEverydayId:null,diningCuisine:cuisine?.id || null,diningDish:requestedDish,diningVegan: cuisine?.id === 'vegan' || (selected?.id !== 'vegetarian' && Boolean(context.diningVegan)),diningMeal:meal,...(context.budget?{budget:context.budget}:{}),...(location?{location}:{})}};
}
