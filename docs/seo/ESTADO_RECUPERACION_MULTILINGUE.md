# Estado de recuperación multilingüe

Actualizado el 13 de noviembre de 2026.

- Producción de referencia: `9426c42fc0150bdce5fbfee060396da9de518ac7`. Base de integración: PR #24, `01b90130c2a5845c4ab0bfa76309b2257e099bc7`. Diccionarios de Guía: PR #25, `859564f69ee2fd7df42f84f9ccc4588bd9764953`.
- El inventario maestro heredado registra 1.204 fuentes y el generador cuenta 1.196 indexables por idioma. `INVENTARIO_FR_INTEGRACION.csv` complementa el maestro con 203 rutas francesas únicas candidatas de los PR #24–31. Los manifiestos #25–27, #29–31 aportan 163 rutas y 9.889 unidades declaradas. Cuatro de esas rutas ya están en el piloto #24. Jojô (#28) añade una ruta candidata independiente.
- Vista previa actual: 83 rutas francesas únicas. Este bloque integra 26 rutas reutilizando los PR #25 y #26: Pix, Guarda equipaje, Río mes a mes y 23 páginas de Consejos. La Guía suma 21 rutas. El auditor comprobó 332 combinaciones de página e idioma. Chromium verificó la navegación en 1440 y 390 px, las pestañas de lluvia y calor, las seis preguntas desplegables de Guarda equipaje y la presencia de la ilustración de Pix. Los medios externos se comprobaron por URL y se bloquearon durante la prueba de navegador.
- Las vistas previas usan canonical propio y `noindex`. El sitemap del build completo se conserva, y el build dirigido carece de sitemap. La publicación y el hreflang francés quedan pendientes.
- `check_frozen_pages.py` devuelve el mismo fallo histórico en producción y en el candidato. La barrera de publicación vigente pasa (586 páginas y 10 activos protegidos). Quedan 246 diferencias históricas frente al manifiesto anterior.
- Continuación: integrar Portugués útil y Supermercados de Consejos. Ambos requieren sus datos y controles dinámicos. Seguir con Transportes (#27), Compras (#29), Cultura (#31) y Fotografía (#30). Las tarjetas de Maleta y clima y Enchufes y voltaje de la Guía remiten a las fichas de Consejos ya integradas. Cotejar Jojô (#28) con #24 antes de incorporar cambios. Las dos automatizaciones de traducción relacionadas figuraban desactivadas.

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
