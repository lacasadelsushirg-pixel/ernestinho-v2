# Ernestinho Carioca V2

Reconstrucción limpia y modular del sitio Ernestinho Carioca.

- Producción anterior permanece intacta.
- Arquitectura por módulos; no volver a un app.js monolítico.
- ADN visual: fondos oscuros, verde petróleo, ámbar, composición editorial, tarjetas y sombras.
- Runtime común para ES / PT / EN; la cobertura editorial se incorpora por módulo y no se considera completa hasta traducir y validar cada sección.
- La V2 se valida en un proyecto de preview independiente antes de migrar el dominio principal.

## Primera base
Home shell, navegación, 15 puertas en el orden definido, Aquí · Ahora, Experiencias y Compras.


## Deployment discipline

Work in large staging branches. Vercel production is connected to `main`; therefore V2 changes are accumulated and validated before a single batch promotion to `main`. Do not use one commit per tiny production change.

## Architecture rule

V2 is multi-page-first, not a fragile SPA. Category and detail routes must work by direct URL, browser back/forward and refresh. JavaScript enhances the page; it must not be required to display primary content.


## Validation and sitemap

Run `python3 scripts/audit_static.py` to check HTML routes, metadata, local links, fragments, image alt text, and the 250 KB file limit. Run `node --check` on JavaScript modules and inline scripts before accepting a giant pass.

The V2 repository must not publish a sitemap that points at the old production domain. Generate `sitemap.xml` only after the staging HTTPS origin is known: `SITE_ORIGIN=https://your-v2-preview.example python3 scripts/build_sitemap.py`. The generator derives URLs from the actual HTML tree and excludes the 404 page.
