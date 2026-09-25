import { getLanguage, onLanguageChange, registerTranslations } from "./i18n.js";
import { STAYS } from "./data/lodging.js";

const UI = {
  ES: {
    "index.title":"Hospedaje Ernestinho | Apartamentos en Río",
    "index.description":"Apartamentos seleccionados en Copacabana e Ilha da Gigóia, con atención directa de Ernestinho Carioca.",
    "index.kicker":"HOSPEDAJE ERNESTINHO",
    "index.title1":"Tu departamento","index.title2":"en Río.",
    "index.lead":"Ubicaciones seleccionadas, atención por WhatsApp y opciones para parejas, familias y grupos. No publico precios ni disponibilidad; primero vemos qué encaja mejor con tu viaje.",
    "index.region":"COPACABANA · ILHA DA GIGÓIA","index.section":"Elige tu base en Río.",
    "index.editorial":"Quiero que el hospedaje sea parte del viaje y no solamente el lugar donde dejas las maletas.",
    "index.cta":"VER HOSPEDAJE","index.footer":"Atención por WhatsApp.","stay.footer":"Atención por WhatsApp.",
    "stay.guests":"huéspedes","stay.rooms":"habitaciones","stay.beds":"camas","stay.baths":"baños",
    "stay.amenities":"Lo que ofrece","stay.gallery":"Galería de fotos",
    "stay.note":"No publico tarifas ni calendarios abiertos. Cuéntame las fechas y cuántas personas viajan y confirmo directamente las opciones y condiciones vigentes.",
    "stay.cta":"CONSULTAR POR WHATSAPP →","stay.back":"← Volver a Hospedaje",
    "gallery.previous":"Foto anterior","gallery.next":"Foto siguiente",
    "gallery.alt":"Foto del alojamiento","gallery.counter":"Foto"
  },
  PT: {
    "index.title":"Hospedagem Ernestinho | Apartamentos no Rio",
    "index.description":"Apartamentos selecionados em Copacabana e na Ilha da Gigóia, com atendimento direto de Ernestinho Carioca.",
    "index.kicker":"HOSPEDAGEM ERNESTINHO",
    "index.title1":"Seu apartamento","index.title2":"no Rio.",
    "index.lead":"Localizações selecionadas, atendimento pelo WhatsApp e opções para casais, famílias e grupos. Não publico preços nem disponibilidade; primeiro vemos o que combina melhor com a sua viagem.",
    "index.region":"COPACABANA · ILHA DA GIGÓIA","index.section":"Escolha sua base no Rio.",
    "index.editorial":"Quero que a hospedagem faça parte da viagem, e não seja apenas o lugar onde você deixa as malas.",
    "index.cta":"VER HOSPEDAGEM","index.footer":"Atendimento pelo WhatsApp.","stay.footer":"Atendimento pelo WhatsApp.",
    "stay.guests":"hóspedes","stay.rooms":"quartos","stay.beds":"camas","stay.baths":"banheiros",
    "stay.amenities":"O que oferece","stay.gallery":"Galeria de fotos",
    "stay.note":"Não publico tarifas nem calendários abertos. Conte as datas e quantas pessoas viajam e confirmo diretamente as opções e condições atuais.",
    "stay.cta":"CONSULTAR PELO WHATSAPP →","stay.back":"← Voltar para Hospedagem",
    "gallery.previous":"Foto anterior","gallery.next":"Próxima foto",
    "gallery.alt":"Foto da hospedagem","gallery.counter":"Foto"
  },
  EN: {
    "index.title":"Ernestinho Stays | Rio apartments",
    "index.description":"Selected apartments in Copacabana and Ilha da Gigóia, with direct assistance from Ernestinho Carioca.",
    "index.kicker":"ERNESTINHO STAYS",
    "index.title1":"Your place","index.title2":"in Rio.",
    "index.lead":"Selected locations, WhatsApp assistance and options for couples, families and groups. I do not publish prices or availability; first, we find what fits your trip.",
    "index.region":"COPACABANA · ILHA DA GIGÓIA","index.section":"Choose your base in Rio.",
    "index.editorial":"I want your stay to be part of the trip, not just the place where you leave your bags.",
    "index.cta":"VIEW STAY","index.footer":"WhatsApp assistance.","stay.footer":"WhatsApp assistance.",
    "stay.guests":"guests","stay.rooms":"bedrooms","stay.beds":"beds","stay.baths":"bathrooms",
    "stay.amenities":"What this place offers","stay.gallery":"Photo gallery",
    "stay.note":"I do not publish rates or open calendars. Send your dates and group size and I will confirm current options and conditions directly.",
    "stay.cta":"ASK ON WHATSAPP →","stay.back":"← Back to stays",
    "gallery.previous":"Previous photo","gallery.next":"Next photo",
    "gallery.alt":"Photo of the accommodation","gallery.counter":"Photo"
  }
};
const addressTranslations = {
  "Rua Bolívar 54 · A 70 m de la playa":{PT:"Rua Bolívar 54 · A 70 m da praia",EN:"Rua Bolívar 54 · 70 m from the beach"},
  "Djalma Ulrich 110 · A 50 m de la playa":{PT:"Djalma Ulrich 110 · A 50 m da praia",EN:"Djalma Ulrich 110 · 50 m from the beach"},
  "Av. Nossa Senhora de Copacabana · A 100 m de la playa":{PT:"Av. Nossa Senhora de Copacabana · A 100 m da praia",EN:"Av. Nossa Senhora de Copacabana · 100 m from the beach"},
  "Av. Nossa Senhora de Copacabana 610 · A 100 m de la playa":{PT:"Av. Nossa Senhora de Copacabana 610 · A 100 m da praia",EN:"Av. Nossa Senhora de Copacabana 610 · 100 m from the beach"},
  "A 100 m de la playa":{PT:"A 100 m da praia",EN:"100 m from the beach"},
  "Un rincón verde y tranquilo de Río":{PT:"Um recanto verde e tranquilo do Rio",EN:"A peaceful green corner of Rio"},
  "Casa térrea, sin escaleras":{PT:"Casa térrea, sem escadas",EN:"Single-storey home, no stairs"},
  "Acceso al lago y kayak":{PT:"Acesso à lagoa e caiaque",EN:"Lake access and kayak"}
};
const dictionary={ES:{...UI.ES},PT:{...UI.PT},EN:{...UI.EN}};
for(const [id,stay] of Object.entries(STAYS)){
  for(const lang of ["ES","PT","EN"]){
    const short=lang.toLowerCase();
    dictionary[lang]["stay.title."+id]=lang==="ES"?stay.name+" | Hospedaje Ernestinho":lang==="PT"?stay.name+" | Hospedagem Ernestinho":stay.name+" | Ernestinho Stays";
    dictionary[lang]["stay.meta."+id]=stay.name+": "+stay.desc[short];
    dictionary[lang]["stay.description."+id]=stay.desc[short];
    dictionary[lang]["stay.place."+id]=stay.place;
    dictionary[lang]["stay.address."+id]=lang==="ES"?stay.address:(addressTranslations[stay.address]?.[lang]||stay.address);
    const limit=lang==="ES"?" huéspedes":lang==="PT"?" hóspedes":" guests";
    dictionary[lang]["listing.card."+id]=stay.place+" · "+stay.guests+limit+" · "+stay.desc[short];
  }
}
dictionary.ES["listing.card.605"]="Copacabana · 4 huéspedes · 1 cama matrimonial y colchón de 2 plazas.";
dictionary.PT["listing.card.605"]="Copacabana · 4 hóspedes · 1 cama de casal e colchão de casal.";
dictionary.EN["listing.card.605"]="Copacabana · 4 guests · 1 double bed and a double mattress.";
dictionary.ES["listing.card.studio"]="Copacabana · Para 2 personas.";
dictionary.PT["listing.card.studio"]="Copacabana · Para 2 pessoas.";
dictionary.EN["listing.card.studio"]="Copacabana · For 2 guests.";
registerTranslations("lodging",dictionary);

const labels={ES:[["huésped","huéspedes"],["habitación","habitaciones"],["cama","camas"],["baño","baños"]],PT:[["hóspede","hóspedes"],["quarto","quartos"],["cama","camas"],["banheiro","banheiros"]],EN:[["guest","guests"],["bedroom","bedrooms"],["bed","beds"],["bathroom","bathrooms"]]};
const body=document.body,stayId=body.dataset.stayId,stay=stayId?STAYS[stayId]:null;
let photoIndex=0;
function renderFacts(lang){
  const host=document.querySelector("[data-lodging-facts]");if(!host||!stay)return;
  const words=labels[lang]||labels.ES,values=[stay.guests,stay.rooms,stay.beds,stay.baths];
  host.innerHTML=values.map((n,i)=>'<div class="stay-fact"><strong>'+n+'</strong><span>'+words[i][n===1?0:1]+'</span></div>').join("");
}
function renderAmenities(lang){
  const host=document.querySelector("[data-lodging-amenities]");if(!host||!stay)return;
  const items=stay.amenities[lang.toLowerCase()]||stay.amenities.es;
  host.innerHTML=items.map(item=>'<li>'+item+'</li>').join("");
}
function renderGallery(lang){
  const gallery=document.querySelector("[data-photo-gallery]");if(!gallery||!stay||!stay.photos?.length)return;
  const image=gallery.querySelector("img"),counter=gallery.querySelector("[data-photo-counter]");
  const total=stay.photos.length;photoIndex=(photoIndex+total)%total;
  image.src=stay.photos[photoIndex];
  image.alt=dictionary[lang]["gallery.alt"]+" · "+stay.name+" · "+(photoIndex+1)+" / "+total;
  counter.textContent=dictionary[lang]["gallery.counter"]+" "+(photoIndex+1)+" / "+total;
  gallery.querySelector("[data-photo-prev]").setAttribute("aria-label",dictionary[lang]["gallery.previous"]);
  gallery.querySelector("[data-photo-next]").setAttribute("aria-label",dictionary[lang]["gallery.next"]);
  gallery.hidden=false;
}
if(stay){
  const render=()=>{const lang=getLanguage();renderFacts(lang);renderAmenities(lang);renderGallery(lang);};
  render();onLanguageChange(render);
  document.querySelector("[data-photo-prev]")?.addEventListener("click",()=>{photoIndex--;renderGallery(getLanguage());});
  document.querySelector("[data-photo-next]")?.addEventListener("click",()=>{photoIndex++;renderGallery(getLanguage());});
}
