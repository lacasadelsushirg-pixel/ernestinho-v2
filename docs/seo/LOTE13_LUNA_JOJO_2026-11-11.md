# Lote 13, avance separado: Jojö Café Bistrô

**Rama de trabajo:** `audit/luna-lote13-traducciones-20261111`  
**Punto de partida:** PR #24, commit `01b90130c2a5845c4ab0bfa76309b2257e099bc7`  
**Estado:** cambios editoriales y de código preparados; **sin validación de build y sin publicar**.

## Trabajo realizado
- Se incorporó `/gastronomia/jojo/` al arranque de los diccionarios PT-BR y EN incrustados en el HTML histórico. Se conservaron sus traducciones originales.
- Se completaron en PT-BR y EN dos consejos añadidos fuera del diccionario, las referencias prácticas y los textos de la ficha V2, rótulos, avisos y fotos.
- Se incorporó la ficha al piloto FR privado de `scripts/build_fr_preview.py` y se añadió la traducción francesa de los 27 párrafos de origen, metadatos y textos específicos. La vista permanece fuera del sitemap público y con noindex.
- Se hizo una comprobación **estática** de las cadenas textuales específicas del HTML fuente frente al diccionario FR, sin claves faltantes detectadas en ese análisis. Esta comprobación no reemplaza las pruebas sobre los HTML generados.
- La corrección de rótulos geográficos FR se limita a Jojö para no cambiar las páginas de Botafogo de otros establecimientos.

## Revisión editorial pendiente (bloqueante)
La ficha fuente aún es contradictoria: el cuerpo identifica a Jojö en Rua Pacheco Leão, 812, Horto/Jardim Botânico, pero el encabezado, la etiqueta, los datos prácticos de ES y los enlaces de Google Maps, Waze y mapa incrustado remiten a Botafogo. Se mantuvo el HTML original intacto para respetar la protección de contenido aprobado. Corregir la fuente y los mapas con revisión editorial antes de clasificar esta ruta como validada.

La traducción de la ficha **no significa que los datos comerciales y horarios estén confirmados hoy**. Verificar vigencia de horarios, canal oficial y evento Happy Oyster antes de informar datos definitivos.

## Validación obligatoria antes de integrar
1. Verificar el guardián de contenido aprobado y el arranque PT-BR/EN en `/pt/gastronomia/jojo/` y `/en/gastronomia/jojo/`.
2. Generar el piloto de 44 rutas, ejecutar `scripts/audit_fr_preview.py` y revisar cada metadato y texto de `/fr/gastronomia/jojo/`.
3. Revisar a 1440 px y 390 px, selector de idioma, alt, encabezados, tipografía, fotos y mapa.
4. Ejecutar compilación incremental y comparar el sitemap de **3.588 URL**, `locale-manifest.json` y el conjunto de documentos fuera del lote.
5. Regenerar los CSV de inventario solo tras las pruebas, conservando la incidencia editorial de Jojö.

**Siguiente orden editorial:** Don Camillo y Bar do Omar; después, retomar Gastronomía pendiente por impresiones. No fusionar ni desplegar automáticamente.
