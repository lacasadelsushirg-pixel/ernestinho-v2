# Cierre V2 Río — comprobación final controlada

Fecha: **2026-10-04**. Rama: `revision/rendimiento-traducciones-81a904c`.

**Resultado local: APTA PARA PRODUCCIÓN dentro del alcance de integración de los Bloques 1–6, conservando los pendientes heredados expresamente aceptados.** No se autorizó ni ejecutó producción. Ernesto debe revisar el preview final y autorizar esa acción en una fase separada.

## Identificación y entrega

- SHA base exacto local/remoto verificado: `3fb4b4cf48066e9416ed8a79b6dedecda9da0ea5`.
- Preview base verificado READY y asociado al SHA base: https://ernestinho-v2-osxiimk65-lacasadelsushirg-8125.vercel.app . Target de Vercel: preview (`null`), rama correcta.
- **SHA final:** el único commit que incorpora este informe y `docs/buzios/`. Identificador exacto reproducible: `git log -1 --format=%H -- docs/seo/CIERRE_V2_PREPRODUCCION.md`. Se entrega también como SHA literal en el resumen final y se contrasta con remoto y `githubCommitSha` de Vercel.
- **Preview final de rama:** https://ernestinho-v2-git-revision-rendimi-bc0732-lacasadelsushirg-8125.vercel.app . La URL inmutable del deployment se entrega en el resumen final con estado READY y SHA contrastado.

El hash de un commit y la URL inmutable de su deployment se asignan después de guardar sus archivos. Para cumplir un único commit/push/preview, este informe identifica el commit por historial y el preview por alias de rama; no se hace un segundo commit ni amend para insertar datos posteriores. La certificación remota READY/build se completa en la entrega final, no se afirma anticipadamente aquí.

## Bloques incluidos y cambios reales

| Bloque | Resultado cerrado conservado |
| --- | --- |
| 1 | Claridad de tours principales, elección y consulta; ajuste posterior confirmado de precios en hub |
| 2 | Reserva/logística de experiencias, traslado privado y alojamiento, sin resolver contradicciones por suposición |
| 3 | Enlaces contextuales P1→P0 y equivalencias de idioma |
| 4 | Claridad de productos de valor/afiliados; corrección confirmada de Parapente Niterói y promoción octubre de 2026 |
| 5 | Documento de canibalización; no cambio web |
| 6 | Documento de53 oportunidades; no cambio web |

Inventario derivado de archivos realmente modificados por los commits de Bloques 1–4: **41 páginas fuente, 123 versiones ES/PT-BR/EN**. No se confundieron componentes/diccionarios con nuevas páginas. Después del último cambio web `66118d1`, los Bloques 5/6 modificaron únicamente cuatro documentos de SEO: no revirtieron cambios web ni integraciones.

| Grupo | Páginas fuente verificadas |
| --- | --- |
| Experiencias (15) | Hub; Full Day; Cristo City Tour; Búzios; Arraial; Angra/Ilha Grande; Rocinha; partido Maracanã; Maracanã Experience; Parapente; Helicóptero; Lancha privada; Ala Delta; Carnaval Experience; Rio Samba Bus |
| Alojamiento (12) | Hub;1008;1221;217;54;605;621;702;805;Goia;Nata;Venti |
| Guía (5) | Hub; aeropuertos; alquiler auto; Internet; seguro |
| Información/contexto (9) | Cristo Redentor; Maracanã; Pão de Açúcar; barrio Maracanã; itinerarios1–7días; Maracanã Tour familiar; Copacabana; São Conrado; transporte privado |

El listado exhaustivo por ruta aparece debajo y en el registro QA.

## Qué se comprobó

Registro: [QA_CIERRE_V2_PREPRODUCCION.json](QA_CIERRE_V2_PREPRODUCCION.json).

- Navegador sobre salida local `dist`:123 combinaciones desktop (41×3 idiomas) y24móviles (8×3), **147 en total**. HTTP200, lengua de documento, title/description/H1, OG esencial, canonical y tres hreflang equivalentes.
- Navegación ES→PT→EN→ES mediante los selectores reales, desktop y muestra móvil. El único retorno ES oculto observado es el heredado de Partido Maracanã; permanece sin corrección.
- Enlaces del contenido principal de páginas afectadas: destinos internos presentes y sin cruces de idioma detectados. Navegación JS/components ejecutada con bibliotecas aprobadas; no se dedujo orfandad de HTML estático.
- CTA de reserva de tours y formularios: datos ficticios QA y apertura de WhatsApp interceptada; **ninguna solicitud enviada**. El enlace directo sin texto prellenado del traslado es un contacto válido, no un error nuevo. CTA principal preparado por idioma conservado.
- Precios publicados de Full Day R$430; City Tour R$230/R$250; Búzios R$230; Arraial R$200; Angra landing R$200; valores y condiciones conservados, sin consulta de vigencia a operadores. La diferencia del hub Angra R$180 no se corrigió por estar expresamente congelada.
- Parapente ES/PT-BR/EN: Parque da Cidade, Niterói; **R$299 efectivo/PIX exclusivamente octubre de 2026 y R$399 tarjeta, valor normal**. Landing sin São Conrado como ubicación. Enlace desde São Conrado conserva presentación como alternativa. No nuevas inclusiones/requisitos/precios.
- Ausencia de errores JS de página y overflow en las147 combinaciones. Sintaxis de build/site y chunks de traducción pertinentes validada. No refactor, cambio de CSS, diseño, header/footer o fotografías.
- Responsive solo en páginas con riesgo de presentación: hub Experiencias, Parapente, Lancha, hub Hospedaje,805, traslado, itinerarios e Internet. Inspección de seis capturas (Parapente/Internet/Hospedaje, desktop+móvil): geometría y textos coherentes. Imágenes/widgets externos bloqueados en ese harness: no se certifica su renderizado de red mediante esas capturas.
- Integraciones Airalo/Rentcars/Assist Card, Carnaval Experience y Rio Samba Bus: fuentes comparadas byte por byte con base, fingerprints registrados. IDs, tokens, widgets, banners, URLs y códigos intactos. No compra ni atribución de afiliación certificada. Rentcars conserva la limitación403 de automatización documentada en Bloque 4; no se presenta como una conversión funcional comprobada.
- `check_frozen_pages.py`: exit1 por las **mismas586 diferencias heredadas**; salida idéntica al registro anterior `frozen-before.txt`. No se regeneró manifiesto ni se analizó/corrigió ese conjunto.
- Web, sitemap, canonical/hreflang, configuración y activos: sin modificaciones durante este cierre. La compilación final completa la realiza el único preview de Vercel, antes de declarar READY en la entrega.

## Errores y correcciones

**Errores nuevos atribuibles a Bloques 1–4:0. Correcciones de código/contenido aprobados:0.** No se cambió la web porque no se probó una regresión nueva. Los entregables de esta sesión son documentación/datos internos.

No se reabrieron investigación SEO Río, las53 oportunidades Bloque 6, canibalización Bloque 5, catálogo, Gastronomía, auditoría596/589/1767rutas, orfandad general o diferencias congeladas. El análisis Búzios es nuevo y separado; no se implementó.

Pendientes heredados conocidos, sin intervención:586 diferencias; casosD/E Bloque 5; alias Feira Noturna/Nocturna; selector ES Partido; imagen externa Maracanã Tour; contradicciones805/605/Venti; discrepancia Angra; estudio-1-1 y los demás pendientes de informes previos. El selector y los precios Angra aparecieron en el alcance; no se dedicó otra auditoría a sus causas. La imagen externa no se recertificó con el harness que bloquea imágenes; consta como fallo heredado antes/después en QA anterior.

## REQUIERE ERNESTO

Los datos Búzios y Petrópolis se centralizan en [../buzios/REQUIERE_ERNESTO.md](../buzios/REQUIERE_ERNESTO.md). Fichas/operadores/precios/condiciones de cinco grupos comerciales, inventario real de apartamentos, fotos/derechos, transfers y responsables de mantenimiento. No bloquearon este estudio, pero bloquean publicar la oferta correspondiente.

Para Río: decidir heredados en fases específicas, mantener vigencia comercial tras octubre de 2026 y **revisar/autorizar producción después del preview**. No se inventó política automática de caducidad, disponibilidad o vigencia externa. APTA se refiere al cierre controlado de integración sobre pendientes ya aceptados; no significa que esos pendientes estén resueltos.

## Inventario exhaustivo de rutas fuente

```text
/atracciones/cristo-redentor/
/atracciones/maracana/
/atracciones/pao-de-acucar/
/barrios/maracana/
/consejos/rio-1-a-7-dias/
/experiencias/
/experiencias/ala-delta/
/experiencias/angra-ilha-grande/
/experiencias/arraial-do-cabo/
/experiencias/buzios/
/experiencias/carnaval-experience/
/experiencias/cristo-city-tour/
/experiencias/full-day-rio/
/experiencias/helicoptero/
/experiencias/lancha-privada/
/experiencias/maracana-experience/
/experiencias/partido-maracana/
/experiencias/rio-samba-bus/
/experiencias/rocinha/
/experiencias/vuelo-en-parapente/
/familia/maracana-tour/
/guia/
/guia/aeropuertos/
/guia/alquiler-auto/
/guia/internet/
/guia/seguro/
/hospedaje/
/hospedaje/1008/
/hospedaje/1221/
/hospedaje/217/
/hospedaje/54/
/hospedaje/605/
/hospedaje/621/
/hospedaje/702/
/hospedaje/805/
/hospedaje/goia/
/hospedaje/nata/
/hospedaje/venti/
/playas/copacabana/
/playas/sao-conrado/
/transportes/transporte-privado/
```

## Límite de publicación

Un único commit al terminar documentación/QA/diff, un único push a la rama autorizada y un único preview. Detenerse tras READY y coincidencia de SHA remoto/deployment. **0 páginas públicas Búzios;0 rutas;0 cambios de sitemap;0 afiliados modificados;0 producción;0 merge a main.**
