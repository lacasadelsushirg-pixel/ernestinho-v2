import { getLanguage } from "./i18n.js";
import { hasLocaleRoutes, localizedPath } from "./locale-routing.js";
import { extractConversationDetails, getContextualIntentAnswer, getLocalized, normalizeQuestion, resolveQuestion, recommendGuideLinks } from "./carioc-ia-engine.js?v=20261012-cariocia8";
import { searchSiteGuide } from "./carioc-ia-site-index.js?v=20261012-cariocia8";
import { FALLBACK_LINKS, UI } from "./carioc-ia-knowledge.js?v=20261012-cariocia8";
import { INTENT_GUIDANCE } from "./carioc-ia-library.js?v=20261012-cariocia8";
import { buildWhatsAppHref } from "./carioc-ia-whatsapp.js?v=20261012-cariocia8";

const STORAGE_KEY = "ec-cariocia-panel-open";
const mountedWidgets = new WeakSet();

function makeElement(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function track(name, topic) {
  const detail = { event: name, topic: topic || "unknown" };
  document.dispatchEvent(new CustomEvent("ec:cariocia:analytics", { detail }));
  const eventName = "ec_cariocia_" + name;
  if (typeof window.gtag === "function") window.gtag("event", eventName, { topic: detail.topic });
  else if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: eventName, topic: detail.topic });
}

function followupCopy(id, language) {
  const options = {
    ES: ["Tranquila", "Con surf", "Natural", "Para ir con niños", "Atardecer"],
    PT: ["Tranquila", "Com surfe", "Natural", "Para ir com crianças", "Pôr do sol"],
    EN: ["Quiet", "For surfing", "Natural", "Family-friendly", "Sunset"]
  };
  return id === "beach_clarify" ? options[language] || options.ES : [];
}

function menuActionCopy(language) {
  return ({ ES: "Volver al menú", PT: "Voltar ao menu", EN: "Back to menu" })[language] || "Volver al menú";
}

function bookingCopy(language) {
  const options = {
    ES: {
      add: "Añadir datos opcionales",
      skip: "Contactar ahora",
      prompt: "Si quieres, escribe la experiencia, la fecha y cuántas personas son. Es opcional; también puedes contactar ahora. Solo se añadirán al mensaje si abres WhatsApp.",
      saved: "Listo. Solo incluiré esos datos en el mensaje si decides abrir WhatsApp.",
      retry: "No pude reconocer una experiencia, fecha o cantidad de personas. Puedes intentarlo de nuevo o contactar ahora sin completar nada.",
      skipReply: "Sin problema. Puedes continuar por WhatsApp sin completar los datos."
    },
    PT: {
      add: "Adicionar dados opcionais",
      skip: "Falar agora",
      prompt: "Se quiser, escreva a experiência, a data e quantas pessoas são. É opcional; você também pode falar agora. Os dados só serão incluídos na mensagem se abrir o WhatsApp.",
      saved: "Pronto. Só vou incluir esses dados na mensagem se você decidir abrir o WhatsApp.",
      retry: "Não consegui identificar uma experiência, data ou quantidade de pessoas. Tente novamente ou fale agora sem preencher nada.",
      skipReply: "Tudo bem. Você pode continuar pelo WhatsApp sem preencher os dados."
    },
    EN: {
      add: "Add optional details",
      skip: "Contact now",
      prompt: "If you like, enter the experience, date, and number of people. This is optional; you can also contact us now. Details are added only if you open WhatsApp.",
      saved: "Done. I will include those details only if you choose to open WhatsApp.",
      retry: "I couldn't identify an experience, date, or group size. Try again or contact us now without filling anything in.",
      skipReply: "No problem. You can continue on WhatsApp without adding details."
    }
  };
  return options[language] || options.ES;
}

export function mountCariocIA() {
  const prerendered = document.querySelector(".ec-cariocia");
  if (prerendered && mountedWidgets.has(prerendered)) return;
  // The multilingual build may serialize the widget into HTML; replace that inert markup before wiring events.
  prerendered?.remove();
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = new URL("../css/carioc-ia.css?v=20261012-cariocia8", import.meta.url).href;
  css.dataset.ecCariociaStyle = "";
  document.head.appendChild(css);
  const controlsStyle = document.createElement("style");
  controlsStyle.dataset.ecCariociaControls = "";
  controlsStyle.textContent = "@media(max-width:600px){body.ec-cariocia-open .ec-global-actions{visibility:hidden!important;pointer-events:none!important}}";
  document.head.appendChild(controlsStyle);

  let language = getLanguage();
  let isOpen = false;
  let hasInteracted = false;
  let conversationContext = { pending: null, category: null };
  const bookingContext = { experience: "", date: "", people: "" };
  try { isOpen = sessionStorage.getItem(STORAGE_KEY) === "true"; } catch (_) {}

  const root = makeElement("div", "ec-cariocia");
  root.setAttribute("data-widget", "ernestinho-carioc-ia");
  mountedWidgets.add(root);

  const launcher = makeElement("button", "ec-cariocia-launcher");
  launcher.type = "button";
  launcher.setAttribute("aria-haspopup", "dialog");
  launcher.setAttribute("aria-expanded", "false");

  const icon = makeElement("img", "ec-cariocia-avatar");
  icon.src = new URL("../brand/carioc-ia-avatar.png", import.meta.url).href;
  icon.alt = "";
  icon.style.objectFit = "cover";
  icon.style.objectPosition = "center 12%";
  icon.style.transform = "scale(1.55)";
  icon.style.transformOrigin = "center 20%";
  icon.width = 64;
  icon.height = 64;
  icon.decoding = "async";
  launcher.append(icon);

  const panel = makeElement("section", "ec-cariocia-panel");
  panel.id = "ec-cariocia-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "false");
  launcher.setAttribute("aria-controls", panel.id);
  panel.setAttribute("aria-labelledby", "ec-cariocia-title");

  const header = makeElement("header", "ec-cariocia-header");
  const headerAvatar = makeElement("img", "ec-cariocia-header-avatar");
  headerAvatar.src = new URL("../brand/carioc-ia-avatar.png", import.meta.url).href;
  headerAvatar.alt = "";
  headerAvatar.style.objectFit = "cover";
  headerAvatar.style.objectPosition = "center 12%";
  headerAvatar.style.transform = "scale(1.5)";
  headerAvatar.style.transformOrigin = "center 20%";
  headerAvatar.width = 48;
  headerAvatar.height = 48;
  headerAvatar.decoding = "async";
  const identity = makeElement("div", "ec-cariocia-identity");
  const title = makeElement("strong", "", "");
  title.id = "ec-cariocia-title";
  const subtitle = makeElement("span", "ec-cariocia-subtitle");
  const close = makeElement("button", "ec-cariocia-close", "×");
  close.type = "button";
  close.setAttribute("aria-label", "Cerrar asistente");
  identity.append(title, subtitle);
  header.append(headerAvatar, identity, close);

  const messages = makeElement("div", "ec-cariocia-messages");
  messages.setAttribute("role", "log");
  messages.setAttribute("aria-live", "polite");
  messages.setAttribute("aria-relevant", "additions text");

  const composer = makeElement("form", "ec-cariocia-composer");
  const input = makeElement("input", "ec-cariocia-input");
  input.type = "text";
  input.name = "question";
  input.autocomplete = "off";
  input.maxLength = 300;
  input.setAttribute("aria-label", "Pregunta a Ernestinho Carioc-IA");
  const send = makeElement("button", "ec-cariocia-send");
  send.type = "submit";
  composer.append(input, send);

  const privacy = makeElement("small", "ec-cariocia-note");
  panel.append(header, messages, composer, privacy);
  root.append(launcher, panel);
  document.body.appendChild(root);

  function copy() { return UI[language] || UI.ES; }

  function updateLabels() {
    const words = copy();
    title.textContent = words.name;
    subtitle.textContent = words.subtitle;
    launcher.setAttribute("aria-label", words.open);
    launcher.dataset.ecAriaLabel = words.open;
    close.setAttribute("aria-label", words.close);
    close.dataset.ecAriaLabel = words.close;
    input.placeholder = words.placeholder;
    input.setAttribute("aria-label", words.placeholder);
    input.dataset.ecPlaceholder = words.placeholder;
    input.dataset.ecAriaLabel = words.placeholder;
    send.textContent = words.send;
    privacy.textContent = words.privacy;
  }

  function localizedHref(href) {
    return hasLocaleRoutes() ? localizedPath(href, language) : href;
  }

  function addLinkList(container, links, topic) {
    if (!links || !links.length) return;
    const list = makeElement("div", "ec-cariocia-links");
    for (const item of links.slice(0, 4)) {
      const link = makeElement("a", "ec-cariocia-link");
      const image = item.image ? makeElement("img", "ec-cariocia-card-image") : null;
      if (image) { image.src = item.image; image.alt = ""; image.loading = "lazy"; image.decoding = "async"; link.appendChild(image); }
      const body = makeElement("span", "ec-cariocia-card-body");
      body.appendChild(makeElement("strong", "ec-cariocia-card-title", getLocalized(item.label, language)));
      const summary = language === "ES" ? (getLocalized(item.summary, language) || "") : "";
      if (summary) body.appendChild(makeElement("span", "ec-cariocia-card-summary", summary));
      if (item.neighborhood) body.appendChild(makeElement("span", "ec-cariocia-card-place", item.neighborhood));
      link.appendChild(body);
      link.href = localizedHref(item.href);
      link.dataset.topic = topic || "recommendation";
      if (item.href.startsWith("http")) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      list.appendChild(link);
    }
    container.appendChild(list);
  }

  function whatsappLink(words, topic) {
    const link = makeElement("a", "ec-cariocia-whatsapp", words.whatsapp);
    link.href = buildWhatsAppHref({ language, baseMessage: words.whatsappMessage, ...bookingContext });
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.dataset.topic = topic || "whatsapp";
    link.addEventListener("click", () => track("whatsapp_click", topic));
    return link;
  }

  function addMessage(text, kind, options = {}) {
    const message = makeElement("article", "ec-cariocia-message ec-cariocia-" + kind);
    const paragraph = makeElement("p", "ec-cariocia-copy", text);
    message.appendChild(paragraph);
    if (options.title) message.appendChild(makeElement("strong", "ec-cariocia-link-heading", options.title));
    addLinkList(message, options.links, options.topic);
    if (options.whatsapp) message.appendChild(whatsappLink(copy(), options.topic));
    if (options.suggestions || (kind === "assistant" && options.topic !== "welcome")) {
      const list = makeElement("div", "ec-cariocia-suggestions");
      const suggestions = [...(options.suggestions || [])];
      if (kind === "assistant" && options.topic !== "welcome") suggestions.push(menuActionCopy(language));
      suggestions.forEach(question => {
        const label = getLocalized(question, language) || String(question);
        const chip = makeElement("button", "ec-cariocia-chip", label);
        chip.type = "button";
        chip.dataset.question = label;
        list.appendChild(chip);
      });
      message.appendChild(list);
    }
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
    return message;
  }

  function setOpen(next, focus) {
    const wasOpen = isOpen;
    isOpen = Boolean(next);
    document.body.classList.toggle("ec-cariocia-open", isOpen);
    panel.getAnimations().forEach(animation => animation.cancel());
    if (isOpen) {
      panel.hidden = false;
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        panel.animate(
          [{ opacity: 0, transform: "translateY(10px) scale(.985)" }, { opacity: 1, transform: "translateY(0) scale(1)" }],
          { duration: 180, easing: "ease-out" }
        );
      }
    } else if (!panel.hidden) {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const animation = panel.animate(
          [{ opacity: 1, transform: "translateY(0) scale(1)" }, { opacity: 0, transform: "translateY(8px) scale(.985)" }],
          { duration: 140, easing: "ease-in" }
        );
        animation.onfinish = () => { if (!isOpen) panel.hidden = true; };
      } else panel.hidden = true;
    }
    launcher.setAttribute("aria-expanded", String(isOpen));
    launcher.classList.toggle("is-open", isOpen);
    try { sessionStorage.setItem(STORAGE_KEY, String(isOpen)); } catch (_) {}
    if (isOpen && focus) window.setTimeout(() => input.focus(), 50);
    if (wasOpen !== isOpen) track(isOpen ? "open" : "close", "widget");
  }

  function clearBookingContext() {
    bookingContext.experience = "";
    bookingContext.date = "";
    bookingContext.people = "";
  }

  function localizedWeekday(value) {
    const index={sunday:0,monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6}[value];
    if(index===undefined)return value;
    const labels={ES:["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],PT:["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],EN:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]};
    return labels[language]?.[index] || labels.ES[index];
  }

  function rememberOptionalBookingDetails(question, allowBareExperience = false) {
    const text = normalizeQuestion(question);
    const party = text.match(/\b(?:somos|vamos|viajamos|we are|party of|group of|somos|estamos em)\s*(\d{1,2})\s*(?:personas|pax|people|travelers|travellers|pessoas)?\b/);
    const anyParty = text.match(/\b(\d{1,2})\s*(?:personas|pax|people|travelers|travellers|pessoas)\b/);
    const date = String(question || "").match(/\b(?:\d{1,2}[/-]\d{1,2}(?:[/-]\d{2,4})?|\d{4}-\d{2}-\d{2})\b/);
    if (party || anyParty) bookingContext.people = (party || anyParty)[1];
    if (date) bookingContext.date = date[0];
    const detail = extractConversationDetails(question, conversationContext);
    if (detail.partySize) bookingContext.people = detail.partySize;
    if (detail.date || detail.weekday) bookingContext.date = detail.date || localizedWeekday(detail.weekday);
    const normalized = text;
    const experiences = [
      ["Angra + Ilha Grande", /\b(angra|ilha grande|isla grande)\b/],
      ["Arraial do Cabo", /\b(arraial|arraial do cabo)\b/],
      ["Búzios", /\bbuzios\b/],
      ["Cristo + City Tour", /\b(cristo|corcovado)\b/],
      ["tour privado", /\b(privado|privada|private)\b/]
    ];
    const selected = experiences.find(([, pattern]) => pattern.test(normalized));
    if (selected && (allowBareExperience || /\b(tour|reserva|reservar|experiencia|passeio|booking|book)\b/.test(normalized))) bookingContext.experience = selected[0];
    return Boolean(party || anyParty || date || bookingContext.experience);
  }

  function answerQuestion(question, source) {
    const text = String(question || "").trim().slice(0, 300);
    if (!text) return;
    hasInteracted = true;
    addMessage(text, "visitor");
    const words = copy();
    const normalized = normalizeQuestion(text);
    const bookingWords = bookingCopy(language);
    if (conversationContext.pending === "booking_details") {
      if ([normalizeQuestion(bookingWords.skip), "ahora no", "no gracias", "skip", "not now"].includes(normalized)) {
        conversationContext.pending = null;
        clearBookingContext();
        addMessage(bookingWords.skipReply, "assistant", { whatsapp: true, topic: "booking" });
        return;
      }
      const captured = rememberOptionalBookingDetails(text, true);
      if (captured) {
        conversationContext.pending = null;
        addMessage(bookingWords.saved, "assistant", { whatsapp: true, topic: "booking" });
        return;
      }
      const possibleTopicChange = resolveQuestion(text);
      if (!possibleTopicChange.intent) {
        addMessage(bookingWords.retry, "assistant", { suggestions: [bookingWords.skip], whatsapp: true, topic: "booking" });
        return;
      }
      conversationContext.pending = null;
      clearBookingContext();
    }
    if ([normalizeQuestion(bookingWords.add), "add booking details", "add optional details"].includes(normalized)) {
      conversationContext.pending = "booking_details";
      bookingContext.date = "";
      bookingContext.people = "";
      addMessage(bookingWords.prompt, "assistant", { suggestions: [bookingWords.skip], topic: "booking_details" });
      return;
    }
    const previousContext = conversationContext;
    const turnDetails = extractConversationDetails(text, conversationContext);
    const result = resolveQuestion(text, { ...conversationContext, ...turnDetails });
    const nextCategory = result.contextUpdate?.category || result.intent?.category || conversationContext.category;
    const changedTopic = Boolean(conversationContext.category && nextCategory && conversationContext.category !== nextCategory);
    const activeDetails = changedTopic ? extractConversationDetails(text, {}) : turnDetails;
    conversationContext = { ...(changedTopic ? { pending: null, category: null } : conversationContext), ...activeDetails };
    if (result.contextUpdate) conversationContext = { ...conversationContext, ...result.contextUpdate };
    if (result.intent && result.intent.id !== "menu") conversationContext.lastIntentId = result.intent.id;
    if (changedTopic) clearBookingContext();
    if (activeDetails.location) bookingContext.origin = activeDetails.location;
    if (activeDetails.partySize) bookingContext.people = activeDetails.partySize;
    if (activeDetails.date || activeDetails.weekday) bookingContext.date = activeDetails.date || localizedWeekday(activeDetails.weekday);
    if (activeDetails.experience) bookingContext.experience = activeDetails.experience;
    if (result.clarification) {
      track("clarification", result.candidates?.[0]?.category || conversationContext.category || "ambiguous");
      addMessage(getLocalized(result.clarification, language), "assistant", {
        suggestions: result.suggestions?.length ? result.suggestions.map(label => getLocalized(label, language) || label) : followupCopy("beach_clarify", language),
        topic: "clarification"
      });
      return;
    }
    const intent = result.intent;
    if (!intent) {
      track("unresolved", "unknown");
      addMessage(getLocalized(INTENT_GUIDANCE.outOfScope, language) || words.fallback, "assistant", {
        title: words.fallbackTitle,
        links: FALLBACK_LINKS,
        whatsapp: true,
        topic: "unknown"
      });
      return;
    }
    const explicitBooking = intent.id === "booking" || intent.id === "christ_booking"
      || /\b(reservar|reserva|book|booking|comprar ingresso|buy tickets|comprar entrada)\b/.test(normalized);
    if (explicitBooking) {
      clearBookingContext();
      rememberOptionalBookingDetails(text);
    } else if (intent.id !== "contact" && !result.contextUpdate?.detailRefinement) clearBookingContext();
    if (activeDetails.experience) bookingContext.experience = activeDetails.experience;
    if (activeDetails.partySize) bookingContext.people = activeDetails.partySize;
    if (activeDetails.date || activeDetails.weekday) bookingContext.date = activeDetails.date || localizedWeekday(activeDetails.weekday);
    if (intent.id === "menu") {
      hasInteracted = false;
      conversationContext = { pending: null, category: null };
      clearBookingContext();
      messages.replaceChildren();
      addMessage(words.greeting, "assistant", { suggestions: words.suggestions, topic: "welcome" });
      return;
    }
    if (intent.id === "beach_clarify") conversationContext = { pending: "beach_style", category: "beaches", lastEverydayId: null };
    else if (result.contextUpdate && Object.prototype.hasOwnProperty.call(result.contextUpdate, "pending")) {
      conversationContext = { ...conversationContext, ...result.contextUpdate };
    } else if (intent.category) conversationContext = { ...conversationContext, pending: null, category: intent.category, lastEverydayId: null };
    track(source === "suggestion" ? "suggestion_click" : "question", intent.id);
    const isCommercial = intent.category === "commercial" || intent.category === "comparisons" || intent.category === "experiences" || intent.id === "booking";
    const bookingOffer = explicitBooking || /^experience_(angra|arraial|buzios)$/.test(intent.id);
    const suggestions = bookingOffer
      ? [bookingWords.add]
      : intent.id === "beach_clarify" ? followupCopy(intent.id, language) : intent.followups;
    const remaining = Math.max(0, 3 - (intent.links || []).length);
    const indexedLinks = searchSiteGuide(text, intent.category, (intent.links || []).map(item => item.href), remaining, conversationContext);
    const additionalLinks = [...indexedLinks, ...recommendGuideLinks(intent, text, Math.max(0, remaining - indexedLinks.length))]
      .filter((link, i, all) => all.findIndex(item => item.href === link.href) === i).slice(0, remaining);
    addMessage(getContextualIntentAnswer(intent, conversationContext, language), "assistant", {
      links: [...(intent.links || []), ...additionalLinks],
      whatsapp: Boolean(intent.whatsapp || isCommercial),
      topic: intent.id,
      suggestions
    });
  }

  launcher.addEventListener("click", () => setOpen(!isOpen, !isOpen));
  close.addEventListener("click", () => setOpen(false, false));
  composer.addEventListener("submit", event => {
    event.preventDefault();
    answerQuestion(input.value, "typed");
    input.value = "";
    input.focus();
  });
  messages.addEventListener("click", event => {
    const chip = event.target.closest("[data-question]");
    if (!chip) return;
    answerQuestion(chip.dataset.question, "suggestion");
  });
  messages.addEventListener("click", event => {
    const link = event.target.closest("a[data-topic]");
    if (link && !link.classList.contains("ec-cariocia-whatsapp")) track("recommendation_click", link.dataset.topic);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && isOpen) {
      setOpen(false, false);
      launcher.focus();
    }
  });
  document.addEventListener("ec:language", event => {
    language = event.detail?.lang || getLanguage();
    updateLabels();
    if (!hasInteracted) {
      messages.replaceChildren();
      addMessage(copy().greeting, "assistant", { suggestions: copy().suggestions, topic: "welcome" });
    }
  });

  updateLabels();
  panel.hidden = true;
  addMessage(copy().greeting, "assistant", { suggestions: copy().suggestions, topic: "welcome" });
  if (isOpen) setOpen(true, false);
  else launcher.setAttribute("aria-expanded", "false");
}
