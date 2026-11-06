# Búzios Events — 5 November 2026

Replaces the generic Events page with Río Events components and nine substantial guides: Literary Festival, City Anniversary, Degusta, Jazz & Blues, Wine in Búzios, Sailing Week, Sant’Anna, Carnival and New Year. Static ES, pt-BR and EN pages preserve content without depending on React or the Tailwind CDN.

The index uses the user's Events photograph. Official municipal and organiser images retain their original pixels; posters are displayed whole. Individual guides credit their image source. Sailing imagery is specifically captioned July 2026; the New Year image is captioned as a bay at sunset, not as a promised show.

The agenda distinguishes an event announcement from the municipal planning calendar. Past editions disappear from the upcoming view according to America/Sao_Paulo dates. Annual reference dates and evergreen travel guides remain explicitly identified. Anniversary venue names conflict within the municipal announcement; the guide identifies Rasa and explains how to check the precise entrance.

## Source and regeneration

- Editorial translations: assets/js/translations/chunks/buzios-events.js
- Renderer: scripts/build_buzios_events.mjs
- Runtime filters and local-date expiry: assets/js/buzios-events.js
- CSS source/config: assets/css/buzios-events-source.css and scripts/buzios-events-tailwind.config.cjs
- Regenerate ES: node scripts/build_buzios_events.mjs
- Build the three languages into a scoped directory: node scripts/build_buzios_events.mjs --stage=ABSOLUTE_DIRECTORY
- The normal multilingual build calls this renderer; data/renderer edits select these routes for incremental builds.

## Validation

60 local browser cases (10 routes × 3 languages × 2 widths: 1440 and 390). No broken main images, JavaScript errors, horizontal document overflow, missing canonical/hreflang, duplicate destination bars or missing corporate footer. Category, monthly, year/upcoming and empty-state filters exercised in every language and width. Sao Paulo midnight and inclusive edition expiry checked. Measured Río index component properties match at both widths.

check_frozen_pages.py still reports the same pre-existing protected-page differences as the baseline captured before this work. No Río content, protected manifest or unrelated section was changed. Publication is scoped to 30 HTML pages, 9 images, Events CSS/JS and an additive sitemap update retaining all 2,601 existing URLs and adding 27.

The exported header language links are also generated for the current Events route, so the static HTML retains the event when switching locale. All 90 static language destinations are checked before publication; runtime language destinations are included in the final browser audit.
