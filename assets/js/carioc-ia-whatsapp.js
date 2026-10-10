export const WHATSAPP_BASE = "https://wa.me/5521969946938";

const DETAIL_LABELS = {
  ES: { experience: "Experiencia", date: "Fecha", people: "Personas" },
  PT: { experience: "Experiência", date: "Data", people: "Pessoas" },
  EN: { experience: "Experience", date: "Date", people: "People" }
};

export function buildWhatsAppHref({ language = "ES", baseMessage = "", experience = "", date = "", people = "" } = {}) {
  const lang = DETAIL_LABELS[language] ? language : "ES";
  const labels = DETAIL_LABELS[lang];
  const details = [
    experience && [labels.experience, experience],
    date && [labels.date, date],
    people && [labels.people, people]
  ].filter(Boolean).map(([label, value]) => `${label}: ${String(value).replace(/[\r\n\u0000-\u001f]/g, " ").slice(0, 80)}`);
  const message = [baseMessage, ...details].filter(Boolean).join("\n");
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}
