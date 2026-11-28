# Modelos locales de traducción (piloto, 26-11-2026)

Los pesos se descargan fuera del repositorio, quedan fijados por commit de Hugging Face y se cargan con `local_files_only=True`. El proceso de traducción no consulta servicios ni envía texto del sitio a terceros. `scripts/prepare_translation_models.py` compara antes de descargar la revisión y licencia publicadas por el repositorio oficial y crea `provenance.json` con SHA-256 de cada archivo. El worker rechaza carpetas sin esa procedencia exacta y toma un bloqueo exclusivo de la memoria para evitar escrituras simultáneas.

Instalación gratuita en Linux CPU: crear un entorno virtual, instalar `torch==2.6.0+cpu` desde el índice CPU oficial de PyTorch e instalar `requirements-translation.txt` desde PyPI. Después descargar los modelos fuera del checkout con `python scripts/prepare_translation_models.py /ruta/modelos --models es-en es-fr en-pt`. El worker requiere carpetas `es-en`, `es-fr` y `en-pt` preparadas; en runtime queda sin red. El piloto comprobó los tres artefactos, pero sus salidas automáticas se guardan como `machine_unreviewed` y no califican para la cobertura publicable.

| Clave | Par | Repositorio y revisión fijada | Licencia publicada | Uso comercial / atribución |
|---|---|---|---|---|
| `es-en` | ES → EN | `Helsinki-NLP/opus-mt-es-en` · `c96e2c5399ebfae4fc43d9669556b9afa74bb69d` | Apache-2.0 | Permitido; conservar licencia y atribución del modelo. |
| `es-fr` | ES → FR | `Helsinki-NLP/opus-mt-es-fr` · `f8be65b3aff01c69f3b9092a4ff81b873612140d` | Apache-2.0 | Permitido; conservar licencia y atribución del modelo. |
| `en-pt` | EN → PT-BR | `Helsinki-NLP/opus-mt-tc-big-en-pt` · `9f2863d807ecf91a374bdbecb8d01e402e90622e` | CC BY 4.0 | Permitido con atribución y enlace a la licencia. |

No se encontró un modelo `Helsinki-NLP/opus-mt-es-pt` público en la consulta al catálogo. PT-BR se genera en dos pasos (ES → EN → PT), por eso se marca como traducción automática sin revisar y no se publica hasta revisión. El mismo estado se aplica a las salidas directas ES → EN/FR.

El modelo multilingüe EN→PT exige anteponer su etiqueta de destino. Para PT-BR el worker usa `>>pob<<` (la model card enumera `pob` y `por` y muestra la sintaxis de etiqueta); se añadieron pruebas de regresión para impedir inferencias sin esa etiqueta. Fuente primaria: [model card de opus-mt-tc-big-en-pt](https://huggingface.co/Helsinki-NLP/opus-mt-tc-big-en-pt).

La licencia comprobada es la que cada model card publica para el artefacto. Esto documenta permisos y atribuciones del modelo; no reemplaza revisión de calidad lingüística ni cambios de contenido aprobados. Antes de publicar, se conservan las traducciones previamente revisadas y se excluyen las salidas `machine_unreviewed` del gate de cobertura publicable.

Para reutilizar el paquete de Inicio ya protegido por el guard editorial, ejecutar `node scripts/seed_approved_home_memory.mjs assets/js/translations/home.js /ruta/memory.json`. El importador lee los objetos ES/PT/EN/FR de `home.js`, conserva valores humanos ya revisados, sustituye solo borradores automáticos en conflicto y registra las coincidencias como `reviewed_import`. No cambia `home.js` ni HTML. El bundle actual tiene 67 claves fuente ES con correspondencia PT/EN/FR; 30 claves FR adicionales sin fuente ES no se importan automáticamente.

Fuentes primarias consultadas:

- https://huggingface.co/Helsinki-NLP/opus-mt-es-en
- https://huggingface.co/Helsinki-NLP/opus-mt-es-fr
- https://huggingface.co/Helsinki-NLP/opus-mt-tc-big-en-pt
- https://www.apache.org/licenses/LICENSE-2.0
- https://creativecommons.org/licenses/by/4.0/
