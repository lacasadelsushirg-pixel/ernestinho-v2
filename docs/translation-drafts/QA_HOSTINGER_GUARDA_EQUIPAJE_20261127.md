# QA del piloto de traducción — 27-11-2026

## Hallazgo de fuente

La ficha viva de Hostinger `/guia/guarda-equipaje/index.html` fue leída desde la raíz pública del dominio mediante la API de archivos de Hostinger. Hostinger informa 35.454 bytes (35.455 contando el salto final); SHA-256 del volcado: `1be033d2c6e95f72bc7594ca3003fd6eb495686fe2afcd845720d610038af0d9`.

La copia local de Git tiene 3.093 bytes y SHA-256 `04d6327d1628751f0cd0ae2dc2e76eb064bc8e0533147549f6f2684dcda47b03`. No son la misma fuente. No usar la copia local para reemplazar la ficha de producción ni para declarar el piloto listo.

## Cobertura observada de la copia viva

El inventario de la página servida detecta 111 unidades visibles y 3 scripts en línea. En la memoria del piloto anterior solo había, para cada idioma destino, 6 unidades revisadas/importadas, 4 automáticas sin revisar y 101 sin traducción. Esa memoria no basta para producir una versión completa.

## Motor y gates

Los modelos fijados localmente son gratuitos y se verifican contra revisiones, licencias y hashes; las salidas siguen siendo `machine_unreviewed`. El entorno Python aislado es temporal y no persistió; una corrida de seguimiento quedó incompleta, por lo que no se conserva ni se considera resultado el candidato de esta fecha.

Pruebas locales vigentes en la rama de trabajo: `test_translation_model_registry.py` 8/8; `test_translation_inventory.py` 2/2; `test_seed_approved_home_memory.mjs` PASS; `git diff --check` PASS. Estas pruebas no equivalen a QA visual ni publicación.

## Estado y siguiente paso

- HTML nuevo publicado en Hostinger en esta ejecución: 0.
- HTML candidato de esta ficha validado y retenido: 0.
- El PR #71 de infraestructura sigue separado del sitio; no se fusionó ni desplegó.
- Siguiente paso: regenerar inventario y memoria en un entorno local; inferir solo desde el HTML de 35 KB recuperado de Hostinger; mantener las traducciones automáticas sin aprobación; validar scripts, atributos de idioma, metadatos, canonical/hreflang, imágenes y enlaces antes de proponer un lote de publicación.
