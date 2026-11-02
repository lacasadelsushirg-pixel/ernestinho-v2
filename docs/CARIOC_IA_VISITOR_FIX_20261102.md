# Carioc-IA: practical visitor conversations — 2026-11-02

## Scope and observed failures

Live testing on Hostinger found that bare greetings fell through to the unknown answer, samba requests ignored supplied location/music, Cristo access was generic or unresolved, transport payment questions were unresolved, and delivery and pizza requests returned generic food links. Twenty submitted turns from that live session are captured as semantic regression cases in `scripts/test_carioc_ia_visitor.mjs`.

Changes add authored ES/PT/EN visitor answers and high-confidence routing before generic ranking. Pure greetings and thanks preserve the current subject and pending food step. Social keywords are excluded from ordinary ranking so a greeting inside a longer request cannot replace the requested answer. Existing specific attraction and booking flows remain intact.

The Stalos page already describes pizza and explicitly identifies Copacabana in its practical information; its heading sits outside main. The index builder now reads that reviewed location field for this record. Pizza requests recognize alternate wording, retain cuisine/area on follow-up, and can offer a relevant listing while explicitly declining to guarantee an unverified cheap price. No unverified rodízio is invented. Special dietary questions retain their dedicated routing.

## Sources checked

- Existing source pages: `/transportes/metro/`, `/transportes/onibus/`, `/atracciones/cristo-redentor/`, `/vida-nocturna/bip-bip/`, `/vida-nocturna/rio-scenarium/`, `/gastronomia/stalos/`.
- MetrôRio contactless: https://www.metrorio.com.br/como-pagar/pagamento-por-aproximacao
- MetrôRio payment methods: https://www.metrorio.com.br/como-pagar/meios-e-tarifas
- MetrôRio FAQs: https://www.metrorio.com.br/FaleConosco/DuvidasFrequentes
- Paineiras official access: https://www.paineirascorcovado.com.br/como-chegar/
- Paineiras official FAQs: https://www.paineirascorcovado.com.br/questions/
- Jaé FAQ: https://jae.com.br/faq/duvidas-gerais/
- Jaé terms (CPF for app account): https://jae.com.br/termos-de-uso/
- Municipality payment rollout update: https://prefeitura.rio/cidade/prefeitura-adia-para-28-de-junho-fim-do-pagamento-em-dinheiro-nos-onibus-municipais/
- Stalos official delivery: https://www.stalos.com.br/

The municipal announcement updated a previously announced date, so the new answer avoids repeating the stale May date in the existing bus article. It distinguishes app top-ups, Jaé validation and bank-card rollout. App registration requirements, card approval, current bus validator support, live opening hours, prices and programmes are not guaranteed.

## Validation

- Core: 159 cases, intent schema and local routes.
- Dining and quality suites.
- Existing customer matrix: 1,440 cases (480 per language).
- Fresh evaluation: 2,000 unique questions plus 1,200 multi-turn checks.
- Existing 20,000 human-style query suite (routing checks, not model training).
- New regression suite: original 20 live turns, meaningful answer assertions, social context preservation, topic switches and PT/EN variants.
- Syntax checks and git diff whitespace check.

The samba acceptance lists in the two existing matrix suites now include the new location-specific samba intent; route requirements are retained. The nightly programme and price remain explicitly unconfirmed.

## Preservation and deployment

Base: c4076b76fd94fbb438dc8c055908a1f1ec067c24, descendant of recovery 5358bee. Source and all six existing live runtime modules were compared with Hostinger before changes; they matched. Existing Hostinger file metadata also confirmed the document-root asset paths.

`check_frozen_pages.py` already fails on 240+ historical differences in the untouched base. Its manifest is unchanged. No file listed in that manifest is modified by this fix; reverting those pages would remove later approved work. Preservation is checked against the starting commit as well as the historical manifest.

Only assistant runtime modules, its entry imports, the reviewed index record, tests and this report change. No HTML, styles, images, approved editorial pages or protected pages change. Carioc-IA modules are classified as runtime-only in the existing incremental builder so this change does not request thousands of locale page renders. Publication remains on Hostinger.
