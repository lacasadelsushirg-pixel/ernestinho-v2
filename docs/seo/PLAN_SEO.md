# Plan SEO — base 8ef4bc4f, 3 octubre 2026

## Orden y alcance

Arquitectura analizada antes de cambios: sitio estático, 596 documentos HTML, 589 URLs en sitemap. Diccionarios por sección, módulos con registro de claves y renderizadores inline. Build actual inexistente. Fuente única conservada; generar HTML ES/PT/EN durante build mediante los renderizadores reales. No copiar manualmente 596 páginas ni cambiar URLs ES.

Google recomienda URLs independientes y enlaces para elegir idioma; el contenido visible determina el idioma, no basta traducir etiquetas. Fuentes primarias consultadas: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites y https://developers.google.com/search/docs/specialty/international/localized-versions .

La URL será autoritativa, con localStorage sincronizado solo como auxiliar para renderizadores antiguos. `/pt/` y `/en/` se retiran antes de determinar sección. No redirección por preferencia, IP o navegador. Selector conserva ruta/query/hash; enlaces internos conservan idioma; assets y externos no se prefijan. Alias conservan su destino equivalente; 404/noindex/redirect se excluyen de alternates y sitemap. Cada URL indexable tendrá canonical propio, alternates ES/PT-BR/EN/x-default recíprocos y metadata traducida. El build debe fallar si faltan archivos/metadata. Sitemap se construye solo con los HTML realmente generados.

## Investigación y evidencia

72 consultas web: 24 ES, 24 PT y 24 EN; 18 grupos temáticos, más 18 consultas individuales long-tail. SERP cualitativa, no Keyword Planner/volumen/KD. Los títulos observados están separados en TERMinos/TERMINOS_OBSERVADOS.csv; las expansiones de KEYWORD_URL_MAP.csv son hipótesis y NO miles de búsquedas reales demostradas. No se crean páginas basándose solo en expansión combinatoria. Fuentes y consultas íntegras en los dos archivos SEO_RESEARCH_*; informe reproducible con scripts/build_seo_research.py. Sin datos privados de Search Console/Analytics disponibles.

## Mapping, gaps y prioridades

P0 comercial: Experiencias, Full Day, Cristo/City Tour, Rocinha, partido vs visita Maracanã, Búzios, Arraial, Angra/Ilha Grande, parapente, helicóptero, lancha, transporte privado, hospedaje y Carnaval. P1: qué hacer/atracciones, guía, aeropuertos, playas, gastronomía, familia, dinero, temporada e itinerarios. P2 cultura, barrios y autoridad; P3 long-tail de fichas reales. P4 opcional no seleccionado sin evidencia adicional. Una prioridad editorial/comercial no afirma volumen medido.

A no significa excelencia demostrada por un conteo: requiere revisión editorial individual. Matriz B: página existente con intención y mejoras SEO identificables; C: intención transversal/dispersa; D: sin propietario directo confirmado; E: excluir variantes fuera de actividad/ciudad (empleos, vivienda permanente, teléfonos, noticias generales). No borrar contenido de bajo volumen.

Gaps principales para revisión, NO nuevas páginas automáticas: Petrópolis (confirmar oferta y cobertura existente); opciones gratuitas (contenido distribuido); transporte GIG→Copacabana/SDU→Copacabana (guía de aeropuertos como propietaria, no duplicar); alojamiento comparativo por barrio (guía informativa, hospedaje comercial); samba en vivo (hub vida nocturna + locales); playas con accesibilidad/estado del mar (hub + información actual). Las páginas de documentación, salud y seguridad necesitan fuentes oficiales vigentes al hacer cambios editoriales; esta fase no reescribe recomendaciones médicas/legales.

## Canibalización potencial, no ranking demostrado

1. /experiencias/cristo-city-tour/ vs /experiencias/full-day-rio/: Cristo/City Tour vs día completo Cristo+Pan de Azúcar; titles deben distinguir productos. No merge/redirect sin equivalencia comercial comprobada.
2. /experiencias/maracana-experience/ vs /experiencias/partido-maracana/: visita estadio vs partido con entradas. Mantener ambas.
3. /guia/donde-alojarse/ vs /hospedaje/: elegir barrio (informacional) vs alquiler temporal (comercial).
4. /guia/aeropuertos/ vs /transportes/transporte-privado/: cómo llegar vs contratar transfer.
5. /atracciones/ vs /experiencias/: qué visitar vs reservar tours. /hoy/ responde a decisión del día, no apropiarse de todo «qué hacer».
6. /guia/alquiler-auto/ vs /transportes/alquiler-vehiculo/: guías afines; mantener como candidatas a revisar contenido/impresiones antes de consolidar. No redirección automática.
7. /guia/seguro/ vs /consejos/seguro-viaje/: práctica de contratación vs razones/consejos; revisar medición futura.
8. /experiencias/pequena-africa/ está anunciada/próximamente: no prometer reservas, disponibilidad ni itinerario Premium. Posponer title comercial agresivo.

## Implementación controlada de este bloque

Generador multidioma + runtime por URL + sitemap + manifiesto QA. Optimizar titles/descriptions de nueve hubs y tres experiencias comerciales con distinción de intención. Cambios aplicados por manifiesto en build/runtime, sin alterar HTML editorial. OG/Twitter coherentes. Primeras palabras/H1/H2/contenido aprobado se dejan intactos y se identifican para revisión editorial cuando la intención requiera cambio sustancial. No keyword stuffing.

Schema existente WebPage/WebSite: ajustar idioma y URL al renderizado. BreadcrumbList solo con padres reales; no inventar LocalBusiness, TouristTrip, Offer, Event ni FAQ con contenido inexistente. No afirmar ratings, precios, fecha de eventos o disponibilidad. Organization/Person quedan oportunidades documentadas pendientes de verificar datos de negocio.

Enlazado: preservar vínculos existentes y resolverlos al idioma correcto. Propuestas editoriales (no insertar vínculos de forma indiscriminada): guía→aeropuertos→transfer, dónde alojarse→hospedaje, atracciones→experiencia equivalente, restaurantes/nocturna→barrio, cultura→Centro/Pequena África. Antes de añadir enlaces en copy congelado, revisar el contexto exacto; el presente bloque solo localiza navegación existente.

## Gates antes de commit/preview

Fuente HTML/CSS/fotografías intacta frente a SHA inicial. Generación sin JS: texto principal y metadata disponibles. Runtime: URL gana frente a localStorage conflictivo, selector conserva equivalencia, filtros/menús/compartir siguen operativos. Verificar enlaces locales/fragmentos, canonical, hreflang, sitemap, schema, scripts, diccionarios y retornos. Diferencias históricas A cerradas; nunca restaurar para igualar manifiesto. Publicar únicamente preview de rama. No producción, Search Console, indexación ni publicidad.
