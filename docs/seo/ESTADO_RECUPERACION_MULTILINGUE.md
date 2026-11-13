# Estado de recuperación multilingüe

Actualizado el 13 de noviembre de 2026.

- Producción de referencia: `9426c42fc0150bdce5fbfee060396da9de518ac7`. Base de integración: PR #24, `01b90130c2a5845c4ab0bfa76309b2257e099bc7`. Diccionarios de Guía: PR #25, `859564f69ee2fd7df42f84f9ccc4588bd9764953`.
- El inventario maestro heredado registra 1.204 fuentes y el generador cuenta 1.196 indexables por idioma. `INVENTARIO_FR_INTEGRACION.csv` complementa el maestro con 203 rutas francesas únicas candidatas de los PR #24–31. Los manifiestos #25–27, #29–31 aportan 163 rutas y 9.889 unidades declaradas. Cuatro de esas rutas ya están en el piloto #24. Jojô (#28) añade una ruta candidata independiente.
- Vista previa intermedia: 176 rutas francesas únicas. El bloque integró 81 rutas reutilizando los PR #26, #29, #30 y #31: Portugués útil, Supermercados, 70 páginas de Cultura, la portada de Fotografía y ocho páginas de Compras. Portugués conserva 80 frases, 10 categorías, 8 falsos amigos, filtrado y los controles de audio. Chromium comprobó el disparo de la solicitud de audio; el audio externo no se reprodujo en el entorno aislado. Supermercados coteja las 196 claves del módulo original. Cultura añade etiquetas francesas de galería donde faltaban y conserva las URLs. El auditor comprobó 704 combinaciones de ruta e idioma y Chromium validó navegación a 1440 y 390 px.
- Tanda posterior: 191 rutas francesas únicas en la vista previa, con 15 artículos de Compras añadidos al conjunto anterior. En esta continuación se completaron 50 y 45 claves dinámicas de Uruguaiana y Mercado São Pedro; las fichas ya estaban dentro de las 191 rutas. Las traducciones de bloques generados por scripts se aplican a la salida prerenderizada. Se preservaron los destinos de medios y enlaces y se probaron las 23 rutas de Compras a 1440 y 390 px. Se detectaron párrafos en español heredados en 22 versiones de PT-BR/EN (11 páginas de origen), pendientes de recuperación. En las pruebas aisladas los scripts heredados de PT-BR/EN emiten errores de Tailwind cuando se bloquea su CDN.
- Las vistas previas usan canonical propio y `noindex`. El sitemap del build completo se conserva, y el build dirigido carece de sitemap. La publicación y el hreflang francés quedan pendientes.
- `check_frozen_pages.py` devuelve el mismo fallo histórico en producción y en el candidato. La barrera de publicación vigente pasa (586 páginas y 10 activos protegidos). Quedan 246 diferencias históricas frente al manifiesto anterior.
- Continuación: revisar e integrar de forma segura los 10 artículos preparados restantes de Compras (#29), incluidos los que dividen párrafos entre etiquetas y los que mezclan contenido fuente y módulos dinámicos; después ampliar a las siguientes secciones francesas. Prueba de avance de Shopping Leblon detenida: el diccionario de 83 claves no cubre el HTML prerenderizado completo (faltan introducción, fichas, servicios, transporte y horarios); sigue fuera de la vista previa y del sitemap. Transporte privado (#27) queda fuera de la vista previa francesa mientras se adapten los cálculos y WhatsApp y se revisen las tarifas que vencieron el 31 de octubre de 2026 y las imágenes con texto. Cotejar Jojô (#28) con #24 antes de incorporar cambios. Las dos automatizaciones de traducción relacionadas figuraban desactivadas.

## Reproducción de la vista previa de Guía

Ejecutar el build dirigido en un checkout de trabajo nuevo.

```sh
npm ci
routes=$(python3 -c "import sys; sys.path.insert(0, 'scripts'); from build_fr_preview import ROUTES; print(','.join(r for r in ROUTES if r.startswith('/guia/')))")
npm run build -- --routes="$routes"
python3 scripts/build_fr_preview.py --dist dist --out ../preview-guia --guide-only
python3 scripts/audit_fr_preview.py --dist dist --preview ../preview-guia
node scripts/test_fr_preview.mjs ../preview-guia ../capturas-guia
```
