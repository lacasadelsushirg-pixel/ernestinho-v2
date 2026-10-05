import { getLanguage, onLanguageChange } from "/assets/js/i18n.js";

const root = document.querySelector("[data-portugues-app]");
if (!root) throw new Error("Português útil: falta [data-portugues-app]");

const dataUrl = root.dataset.dataUrl || "/assets/data/portugues-util.json";
const status = root.querySelector("[data-audio-status]");
const filters = root.querySelector("[data-category-filters]");
const grid = root.querySelector("[data-phrase-grid]");
const falseFriends = root.querySelector("[data-false-friends]");
let data;
let activeCategory = "all";
let currentAudio = null;

function langKey() {
  const lang = getLanguage();
  return lang === "PT" ? "pt" : lang === "EN" ? "en" : "es";
}

function cleanPhrase(value) {
  return String(value || "")
    .replace(/[.?!,:;]+$/g, "")
    .trim();
}

function ascii(value) {
  return cleanPhrase(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]+/g, "")
    .trim();
}

function cloudUrl(publicId) {
  const encoded = publicId.split("/").map(encodeURIComponent).join("/");
  return `https://res.cloudinary.com/${data.cloudName}/video/upload/${encoded}.mp3`;
}

function audioCandidates(item) {
  if (item.audioUrl) return [item.audioUrl];

  const phrase = cleanPhrase(item.pt);
  const phraseAscii = ascii(phrase);
  const names = [
    item.audioPublicId,
    item.id,
    phrase,
    phraseAscii,
    phrase.replace(/\s+/g, "_"),
    phraseAscii.replace(/\s+/g, "_"),
    phrase.replace(/\s+/g, "-"),
    phraseAscii.replace(/\s+/g, "-"),
    phrase.toLowerCase(),
    phraseAscii.toLowerCase(),
    phraseAscii.toLowerCase().replace(/\s+/g, "_"),
    phraseAscii.toLowerCase().replace(/\s+/g, "-")
  ].filter(Boolean);

  const bases = [
    data.audioBase,
    "ernestinho/portugues-util/audio",
    "portugues-util/audio",
    "audio",
    ""
  ];

  const out = [];
  for (const name of names) {
    for (const base of bases) {
      const publicId = base ? `${base}/${name}` : name;
      const url = cloudUrl(publicId);
      if (!out.includes(url)) out.push(url);
    }
  }
  return out;
}

function stopAudio() {
  if (!currentAudio) return;
  currentAudio.pause();
  currentAudio.currentTime = 0;
  currentAudio = null;
  document.querySelectorAll("[data-audio-button].is-playing").forEach(btn => {
    btn.classList.remove("is-playing");
    btn.setAttribute("aria-pressed","false");
  });
}

function play(item, button, rate = 1) {
  stopAudio();
  if (status) status.textContent = "";

  const candidates = audioCandidates(item);
  let index = 0;

  const tryNext = () => {
    if (index >= candidates.length) {
      button.classList.remove("is-playing");
      button.setAttribute("aria-pressed","false");
      currentAudio = null;
      if (status) status.textContent = "No encontré el audio de esta frase en Cloudinary.";
      return;
    }

    const audio = new Audio(candidates[index++]);
    audio.preload = "none";
    audio.playbackRate = rate;
    currentAudio = audio;
    button.classList.add("is-playing");
    button.setAttribute("aria-pressed","true");

    audio.addEventListener("ended", () => {
      button.classList.remove("is-playing");
      button.setAttribute("aria-pressed","false");
      currentAudio = null;
    }, { once:true });

    audio.addEventListener("error", () => {
      if (currentAudio === audio) tryNext();
    }, { once:true });

    audio.play().catch(() => {
      if (currentAudio === audio) tryNext();
    });
  };

  tryNext();
}

function renderFilters() {
  const key = langKey();
  filters.innerHTML = "";
  const allLabel = key === "pt" ? "Todas" : key === "en" ? "All" : "Todas";
  const items = [{id:"all",icon:"✨",es:allLabel,pt:allLabel,en:allLabel}, ...data.categories];
  items.forEach(cat => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pt-filter";
    button.dataset.category = cat.id;
    button.setAttribute("aria-pressed", String(cat.id === activeCategory));
    button.textContent = `${cat.icon || ""} ${cat[key] || cat.es || cat.id}`.trim();
    button.addEventListener("click", () => {
      activeCategory = cat.id;
      stopAudio();
      render();
    });
    filters.appendChild(button);
  });
}

function renderGrid() {
  const key = langKey();
  const rows = activeCategory === "all" ? data.phrases : data.phrases.filter(x => x.category === activeCategory);
  grid.innerHTML = "";
  rows.forEach((item,index) => {
    const card = document.createElement("article");
    card.className = "pt-phrase-card";
    const meaning = key === "pt" ? item.es : (item[key] || item.es);
    card.innerHTML = `
      <span class="pt-number">${String(index+1).padStart(2,"0")}</span>
      <p class="pt-target" lang="pt-BR">${item.pt}</p>
      <p class="pt-meaning">${meaning}</p>
      <div class="pt-audio-actions">
        <button type="button" data-audio-button aria-pressed="false">🔊 ${key==="pt"?"Ouvir":key==="en"?"Listen":"Escuchar"}</button>
        <button type="button" data-slow-button>🐢 ${key==="pt"?"Devagar":key==="en"?"Slow":"Lento"}</button>
      </div>`;
    card.querySelector("[data-audio-button]").addEventListener("click", e => play(item,e.currentTarget,1));
    card.querySelector("[data-slow-button]").addEventListener("click", e => play(item,e.currentTarget,0.82));
    grid.appendChild(card);
  });
}

function renderFalseFriends() {
  if (!falseFriends) return;
  falseFriends.innerHTML = "";
  data.falseFriends.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<strong lang="pt-BR">${item.pt}</strong> → ${item.es}<small>${item.note}</small>`;
    falseFriends.appendChild(li);
  });
}

function render() {
  renderFilters();
  renderGrid();
  renderFalseFriends();
}

fetch(dataUrl)
  .then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  })
  .then(json => {
    data = json;
    render();
    onLanguageChange(() => {
      stopAudio();
      render();
    });
  })
  .catch(err => {
    if (status) status.textContent = "No se pudo cargar la guía de portugués.";
    console.error(err);
  });
