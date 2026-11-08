import { t } from './modelo.js';

export function mesa(name, area, address, category, summary, experience, advice, source, nearby) {
  return { name, area, address, category, summary: t(...summary), experience: t(...experience), advice: t(...advice), source, nearby };
}
