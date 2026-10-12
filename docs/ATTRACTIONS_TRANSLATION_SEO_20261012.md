# Attractions: translations, booking and SEO

Base: `108d3afb8af240364810d43751b743599264a542`, current production branch `revision/rendimiento-traducciones-81a904c`.

## Scope

- Attractions index, nine encyclopedia guides, canonical BioParque family guide, and six linked experience pages.
- 17 page dictionaries, 1,162 page-specific entries with Portuguese and English copy, including existing reusable translations and newly translated encyclopedia chapters, advice, FAQs, captions, alternative text and accessible photo labels.
- Load only the current page's encyclopedia dictionary. Restore missing Experiencias section dictionary loading.
- Preserve the Spanish editorial body on 16 pages and all image markup on every page. On Maracanã, replace a raw Markdown comparison and editing instructions with readable, linked tour/match choices in Ernestinho's voice.
- Localise enquiries on six experience pages and the guide/experience footer contact, including the page being read. Preserve Full Day form data and use actual newline characters in messages. Full Day remains R$430; Cristo City retains R$230/R$250 lunch options, Maracanã tour R$250, AquaRio R$240, BioParque consult only.
- Unique informational versus transactional titles/descriptions in ES/PT/EN; static source metadata and page structured data agree. Add missing The Maze URL to sitemap. Keep BioParque's canonical family page.

## Validation

`node scripts/check_attraction_locales.mjs` passed: 17 pages, 34 PT/EN render checks, return to Spanish, chapter anchors, image URL preservation, photo/accessibility translations, structured-data language, and no main-content horizontal overflow at 390px. Actual booking controls were checked in three languages; the existing Full Day modal was submitted locally with window opening intercepted. No WhatsApp message was sent.

The existing multilingual builder also passed a three-page pilot (Cristo, BioParque and Full Day), producing nine ES/PT/EN HTML files. Visible mobile language controls were exercised in the locale render audit.

`node --check` and `git diff --check` passed. Public HTML/JS/JSON search found no Full Day R$410 price. Static body and image preservation assertions passed.

Mandatory `python3 scripts/check_frozen_pages.py` was run before edits and again before publication. The September manifest already reports 562 changed pages on the clean production base; final output is byte-for-byte identical to that baseline. The manifest was not regenerated. Current explicitly authorised SEO metadata and Maracanã conversion changes do not add any newly failing page.

## Deployment limits

The current Hostinger source deployment uses one URL with client-side language switching. This change does not advertise absent `/pt/` or `/en/` URLs or add unsupported alternate-language links. The existing full multilingual build can produce separate language URLs, but deploying that complete output is a separate hosting integration. Translation coverage here is these 17 pages, not a claim that every site section has been completed.

Production verification found cached old shared modules despite updated HTML. The 17 entry scripts and SEO module import have a release query parameter; the multilingual builder recognises versioned script URLs.
