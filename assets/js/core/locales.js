export const LOCALES = Object.freeze(["es","pt-BR","en"]);
export const DEFAULT_LOCALE = "es";

export function normalizeLocale(value) {
  const raw = String(value || "").toLowerCase();
  if (raw.startsWith("pt")) return "pt-BR";
  if (raw.startsWith("en")) return "en";
  return "es";
}

export function localized(content, locale, fallback = DEFAULT_LOCALE) {
  const key = normalizeLocale(locale);
  return content?.[key] ?? content?.[fallback] ?? null;
}
