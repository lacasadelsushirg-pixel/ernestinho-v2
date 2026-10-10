import { getLanguage } from "./i18n.js";
import { hasLocaleRoutes, localizedPath } from "./locale-routing.js";
import { findIntent, getLocalized } from "./carioc-ia-engine.js";
import { FALLBACK_LINKS, UI } from "./carioc-ia-knowledge.js";

const STORAGE_KEY = "ec-cariocia-panel-open";
const WHATSAPP = "https://wa.me/5521969946938";

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

export function mountCariocIA() {
  if (document.querySelector(".ec-cariocia")) return;
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = new URL("../css/carioc-ia.css?v=20261010-avatar", import.meta.url).href;
  css.dataset.ecCariociaStyle = "";
  document.head.appendChild(css);

  let language = getLanguage();
  let isOpen = false;
  let hasInteracted = false;
  try { isOpen = sessionStorage.getItem(STORAGE_KEY) === "true"; } catch (_) {}

  const root = makeElement("div", "ec-cariocia");
  root.setAttribute("data-widget", "ernestinho-carioc-ia");

  const launcher = makeElement("button", "ec-cariocia-launcher");
  launcher.type = "button";
  launcher.setAttribute("aria-haspopup", "dialog");
  launcher.setAttribute("aria-expanded", "false");

  const icon = makeElement("img", "ec-cariocia-avatar");
  icon.src = new URL("../brand/carioc-ia-avatar.png", import.meta.url).href;
  icon.alt = "";
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
    close.setAttribute("aria-label", words.close);
    input.placeholder = words.placeholder;
    input.setAttribute("aria-label", words.placeholder);
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
      const link = makeElement("a", "ec-cariocia-link", getLocalized(item.label, language));
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
    link.href = WHATSAPP + "?text=" + encodeURIComponent(words.whatsappMessage);
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
    if (options.suggestions) {
      const list = makeElement("div", "ec-cariocia-suggestions");
      options.suggestions.forEach(question => {
        const chip = makeElement("button", "ec-cariocia-chip", question);
        chip.type = "button";
        chip.dataset.question = question;
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

  function answerQuestion(question, source) {
    const text = String(question || "").trim().slice(0, 300);
    if (!text) return;
    hasInteracted = true;
    addMessage(text, "visitor");
    const intent = findIntent(text);
    const words = copy();
    if (!intent) {
      track("unresolved", "unknown");
      addMessage(words.fallback, "assistant", {
        title: words.fallbackTitle,
        links: FALLBACK_LINKS,
        whatsapp: true,
        topic: "unknown"
      });
      return;
    }
    track(source === "suggestion" ? "suggestion_click" : "question", intent.id);
    addMessage(getLocalized(intent.answer, language), "assistant", {
      links: intent.links,
      whatsapp: Boolean(intent.whatsapp),
      topic: intent.id
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
