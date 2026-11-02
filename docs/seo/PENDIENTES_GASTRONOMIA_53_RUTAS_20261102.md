# Cierre de la revisión fuente de 53 fichas gastronómicas — 2 de noviembre de 2026

**Rama:** `seo/traducciones-continuacion-lote2-20261102` · PR #13, basado en la rama del PR SEO #12.

## Resultado al cierre del lote de código fuente

La auditoría editorial partió de **53 fichas gastronómicas** de Río incluidas en las variantes pendientes detectadas por Work. Ahora:

- **49 fichas gastronómicas** tienen claves ES→PT/EN de sus bloques largos en el diccionario residual, combinadas con las claves existentes y renderizadores por página cuando corresponde.
- Las **4 fichas restantes** (`arp-bar`, `classico-leme`, `quiteria`, `cosmopolita`) usan sus propios diccionarios incrustados PT/EN y se corrigió directamente su HTML español. **No se añadieron claves residuales a estos cuatro porque ya tenían su mecanismo PT/EN.**
- **Majórica** se corrigió por dos frentes: dos párrafos portugueses de HTML fuente se convirtieron a ES y se incorporaron 10 nuevas claves bilingües para el contenido largo restante.
- **Cosmopolita** fue reescrito como ficha histórica de la antigua casa de Lapa (Travessa do Mosqueira 4), con advertencia de que **no hay restaurante actual confirmado**, porque antes la guía la enviaba equivocadamente a Glória/Santa Teresa. Se corrigieron 20 párrafos en tres idiomas, título, metadatos y enlaces de mapa. La identidad de las fotografías archivadas sigue por verificar.

**No quedan fichas sin intervención de traducción/corrección de sus bloques largos entre las 53 fuentes señaladas.** Este resultado es de **fuente GitHub** y NO demuestra todavía una publicación correcta en Hostinger ni resuelve por sí mismo las 82 variantes URL originales.

## Cobertura / método

La rama añade en total **528 claves bilingües nuevas**: 55 del área Compras y 473 del área Gastronomía. Se verifican con `scripts/audit_editorial_translations.mjs`. Para las páginas con diccionarios dentro del HTML se utiliza además `scripts/verify_embedded_locale_pages.mjs`. La prueba de generación selectiva en GitHub Actions incluye 56 rutas de Río (52 de diccionario compartido, 4 internas) y Madame Bardot de Búzios: **57 rutas x 3 idiomas**. Hay que consultar el resultado de la última ejecución antes de considerarla aprobada.

Un conteo de claves, bloques o rutas NO verifica otros textos breves, atributos, textos alternativos de las imágenes, metadatos de los tres idiomas, contenido generado dinámicamente, traducciones alternativas o enlaces de cada ficha. Tampoco garantiza indexación.

## Pendientes reales (no confundidos con más traducciones de párrafos)

1. Confirmar QA de las 57 rutas generadas en ES/PT/EN y corregir cualquier error de la prueba de doce páginas con diccionarios internos.
2. Hacer revisión editorial y visual en navegador real, especialmente las traducciones alternativas propias de cada ficha, H1/títulos breves, meta description, ALT, mapas y enlaces.
3. Validar fuentes actuales y fotografías de Cosmopolita, y revisar que su ficha se presente como patrimonio histórico, nunca restaurante reservable. Tampoco asignar una apertura sin evidencia fiable.
4. Reconciliar cambios concurrentes y dependencias del PR #12 y de la rama publicada; no sobrescribir trabajo de Carioc-IA.
5. Publicar de forma **incremental** solo archivos necesarios, conservar el manifiesto multilingüe y el sitemap global, sin ejecutar una reconstrucción completa de más de 2.500 páginas.
6. Verificar después de publicar HTTP 200, canonical, hreflang, sitemap, contenido PT/EN servido en producción y cobertura de Google Search Console. **Mantener las 82 variantes originalmente reportadas como pendientes hasta que exista evidencia en cada URL.**

**Sin merge / sin despliegue:** no se ha modificado Hostinger, Search Console, Carioc-IA, fotos, CSS, sitemap ni robots.
