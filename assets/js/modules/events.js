export function eventIsCurrent(endDate, today) {
  return /^\d{4}-\d{2}-\d{2}$/.test(endDate || "") && endDate >= today;
}

export function filterCurrentEvents(cards, today) {
  let count = 0;
  for (const card of cards) {
    const current = eventIsCurrent(card.dataset.endDate, today);
    card.hidden = !current;
    if (current) count += 1;
  }
  return count;
}

const cards = [...document.querySelectorAll(".event[data-end-date]")];
const parts = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Sao_Paulo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}).formatToParts(new Date());
const today = ["year", "month", "day"].map(type => parts.find(part => part.type === type)?.value).join("-");
const count = filterCurrentEvents(cards, today);
const empty = document.getElementById("noCurrentEvents");
if (empty) empty.hidden = count > 0;
