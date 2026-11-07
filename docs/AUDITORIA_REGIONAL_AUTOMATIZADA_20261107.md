# Auditoría operativa regional — 2026-11-07

## Alcance y evidencia
Rama: `revision/rendimiento-traducciones-81a904c`. Esta revisión se limita a lectura de archivos GitHub mediante conector; **no** constituye prueba de build, navegador, publicación Hostinger ni inspección de fotografías.

Archivos inspeccionados:
- `scripts/build_regional_destinations.mjs`: generador de Petrópolis, Angra/Ilha Grande, Cabo Frio, Arraial do Cabo y Paraty; 13 secciones de portada por destino; idiomas ES/PT/EN; acepta `--stage` para generación aislada.
- `assets/data/regional-destination-photos.json`: manifiesto de fotos por destino, con ruta local, autor, archivo de origen y licencia.
- `assets/js/translations/destinos/arraial-do-cabo.js` y `paraty.js`: contenidos trilingües con fichas, guías, referencias a mapas y algunas URL externas.
- `package.json`: no declara comando dedicado de verificación regional.

## Hallazgos confirmados
1. El generador importa cinco destinos, pero la existencia del generador no prueba que sus páginas estén publicadas.
2. Arraial y Paraty contienen información editorial específica y tres idiomas; no son simples páginas vacías de plantilla.
3. Ambas traducciones incorporan referencias `{ map: '...'}` y `{ url: '...'}`. **Pendiente:** inspeccionar cómo se renderizan. El requisito del propietario es evitar enlaces salientes a guías turísticas; las fuentes institucionales y transacciones oficiales se deben tratar de forma diferenciada.
4. Las rutas fotográficas locales y sus metadatos están declarados, pero no se verificó que existan los archivos ni que las licencias y atribuciones estén correctamente implementadas.
5. No se comprobó paridad visual real con Río a 1440/390 px, ni cabecera persistente, ni enlaces internos ni publicación.

## Plan de ejecución con criterios de aceptación
**P0 — No pisar trabajo paralelo.** Antes de editar, leer el estado actual de la rama y los últimos commits; si Work está modificando el mismo módulo, coordinar por archivos o esperar.

**P1 — Petrópolis, Arraial, Cabo Frio, Paraty.** Para cada destino, comparar cada sección contra la equivalente de Río y crear matriz `sección / portada / interiores / fotos / mapa / ES-PT-EN / desktop / mobile / estado`. Igualar estructura y ADN aprobado, sin inventar diseños alternativos.

**P2 — Fotografías.** Comprobar existencia de cada archivo referenciado, que represente el lugar correcto, ausencia de texto añadido y licencias. Mantener atribución obligatoria de forma discreta y legal. No usar fotografías falsas.

**P3 — Mapas.** No enlazar a otras guías turísticas. Incorporar mapas internos basados en datos cartográficos licenciados; cada marcador abre ficha interna. Documentar proveedor de teselas, atribución y límites de uso.

**P4 — Contenido y transporte.** Información local concreta sobre cómo llegar y moverse dentro de cada destino y hacia ciudades cercanas, con advertencias cuando horarios/precios no estén verificados. Ninguna página debe delegar la explicación principal a una web externa.

**P5 — QA.** Generar a carpeta temporal con `node scripts/build_regional_destinations.mjs --stage=<directorio>` y verificar rutas en ES/PT/EN. Comprobar enlaces, imágenes, consola, contraste, H1, canonical, navegación y responsive 1440/390. No publicar si falla.

**P6 — Publicación.** Sólo incremental y sólo tras prueba y confirmación de acceso seguro a Hostinger. Reportar URLs realmente publicadas y commits; nunca confundir generación local con despliegue.

## Después del cierre regional
Fase 1: inventario único de lugares y coordenadas; Fase 2: mapas interactivos propios; Fase 3: buscador/filtros; Fase 4: itinerarios; Fase 5: agenda; Fase 6: movilidad; Fase 7: accesibilidad; Fase 8: favoritos/PWA; Fase 9: Carioc-IA y expansión. Preservar ES/PT/EN, identidad de Río y publicación incremental.

## Estado
**Auditoría inicial documentada.** No se ejecutó build, no se añadieron fotografías y no se desplegó contenido en esta revisión. El siguiente trabajo debe ser ejecución y QA reales, no declarar estos puntos resueltos.
