const HOST = "https://mediumturquoise-stinkbug-270478.hostingersite.com/FOTOS/HOME/transportes";

const encodedPath = (path) => path.split("/").map(encodeURIComponent).join("/");

function makeFigure({ path, alt, className = "transport-photo", contain = false }) {
  const figure = document.createElement("figure");
  figure.className = className;
  figure.dataset.transportPhotoReference = path;
  const image = document.createElement("img");
  image.src = `${HOST}/${encodedPath(path)}`;
  image.alt = alt;
  image.loading = "lazy";
  image.decoding = "async";
  if (contain) {
    image.style.objectFit = "contain";
    image.style.background = "#fff";
  }
  figure.append(image);
  return figure;
}

function insertAfter(anchor, figures) {
  if (!anchor?.parentNode) return;
  let cursor = anchor;
  for (const item of figures) {
    const url = `${HOST}/${encodedPath(item.path)}`;
    const alreadyReferenced = [...document.images].some((image) => image.src === url);
    if (alreadyReferenced) continue;
    const figure = makeFigure(item);
    cursor.insertAdjacentElement("afterend", figure);
    cursor = figure;
  }
}

function addBondeGallery() {
  const cards = document.querySelector("main > section.content .cards");
  if (!cards || document.querySelector("[data-bonde-photo-gallery]")) return;
  const gallery = document.createElement("div");
  gallery.className = "cards";
  gallery.dataset.bondePhotoGallery = "";
  const photos = [
    { path: "bondin.jpg", alt: "Bonde de Santa Teresa" },
    { path: "BONDINHO/BONDINHO 2.jpg", alt: "Bonde de Santa Teresa en Río de Janeiro" },
    { path: "BONDINHO/BONDINHO MAPA.jpg", alt: "Mapa del Bonde de Santa Teresa", contain: true },
    { path: "BONDINHO/BONDINHO ERNESTINHO.jpg", alt: "Ernestinho junto al Bonde de Santa Teresa" },
    { path: "BONDINHO/BONDINHO 3.jpg", alt: "Bonde de Santa Teresa" },
  ];
  for (const item of photos) gallery.append(makeFigure({ ...item, className: "photo" }));
  cards.insertAdjacentElement("afterend", gallery);
}

export function addTransportPhotoReferences() {
  const path = window.location.pathname.replace(/\/+$/, "");
  if (path.endsWith("/transportes/barcas")) {
    insertAfter(document.querySelector(".guide-layout .guide-copy > .transport-photo"), [
      { path: "BARCA/BARCAS3.jpg", alt: "Barcas Rio en la Bahía de Guanabara" },
    ]);
  } else if (path.endsWith("/transportes/bonde-santa-teresa")) {
    addBondeGallery();
  } else if (path.endsWith("/transportes/brt")) {
    insertAfter(document.querySelector(".guide-layout .guide-copy > .transport-photo"), [
      { path: "BRT/MAPA BRT.jpg", alt: "Mapa del sistema BRT Rio" },
      { path: "BRT/Rio_de_Janeiro4_BRT_system_smart_cities_Optibus_PR_rt.jpg", alt: "Sistema BRT de Río de Janeiro" },
    ]);
  } else if (path.endsWith("/transportes/metro")) {
    const generalMap = document.querySelector("main.transit-guide > .guide-intro > .metro-map");
    insertAfter(generalMap, [
      { path: "METRO/METRORIO MAPA2.jpg", alt: "Mapa de MetrôRio", className: "metro-map", contain: true },
      { path: "METRO/DIAGRAMA METRO.jpg", alt: "Diagrama de las líneas del Metro de Río", className: "metro-map", contain: true },
    ]);
    const lineTwo = [...document.querySelectorAll(".guide-copy .metro-map")]
      .find((figure) => figure.querySelector("img")?.alt.includes("Línea 2"));
    insertAfter(lineTwo, [
      { path: "METRO/METRORIO LINHA 2 VERDE.png", alt: "Mapa de la Línea 2 verde de MetrôRio", className: "metro-map", contain: true },
    ]);
  } else if (path.endsWith("/transportes/vlt")) {
    insertAfter(document.querySelector(".guide-layout .guide-copy > .transport-photo"), [
      { path: "VLT/mapa-vlt.jpg", alt: "Mapa de las líneas del VLT Carioca", contain: true },
    ]);
  } else if (path.endsWith("/transportes/onibus")) {
    const hero = document.querySelector("main.transit-guide > img.hero-image");
    if (hero) hero.src = `${HOST}/${encodedPath("ONIBUS/transporte micro.jpg")}`;
  } else if (path.endsWith("/transportes/trenes")) {
    const hero = document.querySelector("main.transit-guide > img.hero-image");
    if (hero) hero.src = `${HOST}/${encodedPath("supervia.jpg")}`;
  }
}
