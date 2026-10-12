# CariocIA: five initial questions

Base: `6201413ad959d879ae0d06cb862403d3ae0d6963` on the production branch.

The latest requested welcome menu has five needs: a tour, a private transfer, food, luggage storage and getting around Rio. Production still displayed the older eight-question menu; this was confirmed by opening the assistant on the home page before editing.

## Changes

- ES: Quiero un tour; Necesito un traslado; ¿Dónde puedo comer?; ¿Dónde puedo guardar mi maleta?; ¿Cómo me muevo por Río?
- Matching PT-BR and EN menus, in the same order.
- Map singular tour requests explicitly to the authored experience answer: Spanish and English previously had no recognised intent. Keep earlier question aliases for typed requests.
- Returning to the menu resets the interaction flag, so changing language then translates all five initial questions. Existing conversation text is preserved when switching language during a conversation.
- Use consistent `cariocia8` versions for widget, engine, knowledge, library and site index imports. Refresh home and the 17 recently edited page entry scripts. The editorial HTML, images, design and styles are preserved.

## Validation

- `node scripts/test_carioc_ia.mjs`: 138 engine scenarios pass, plus assertions that all 15 welcome labels resolve to the five expected intents.
- `node scripts/audit_carioc_ia_v2_120.mjs`: all 120 audit queries recognised. Recognition is not a claim that every changing fact in every possible answer is verified.
- `node scripts/check_carioc_ia_welcome.mjs`: 45 real button flows across ES/PT/EN at 320, 390 and 1365px. Check answers, existing guide links, private/public transport separation, return to menu, language changes after returning, luggage follow-up for Copacabana, panel/composer fit, close behaviour and zero CariocIA runtime errors. Inspect WhatsApp destinations without opening or sending messages.
- Syntax and whitespace checks pass.
- Mandatory frozen-page audit output is unchanged from the clean production baseline: the pre-existing 562-page drift remains, without adding a failing page or regenerating the manifest.
