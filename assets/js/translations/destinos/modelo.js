export const t = (ES, PT, EN) => ({ ES, PT, EN });

export function card(title, copy, action) {
  return { title, copy, action };
}

export function section(intro, cards, tip) {
  return { intro, cards, tip };
}
