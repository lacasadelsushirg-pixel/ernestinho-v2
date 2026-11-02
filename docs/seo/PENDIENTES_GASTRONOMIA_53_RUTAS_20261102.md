# SEO: inventario de fichas gastronómicas pendientes de traducción

Revisión del 2 de noviembre de 2026, sobre la rama `seo/traducciones-continuacion-lote2-20261102`, basada en el informe del PR #12.

## Criterio de esta auditoría

- Se leyeron los HTML fuente de **53 rutas gastronómicas** presentes en el reporte original de Work y se compararon con las claves exactas del diccionario residual de Gastronomía.
- Tras las correcciones del PR #13, **15 rutas gastronómicas** tienen cobertura de los bloques largos visibles examinados; siguen **38 rutas** con **389 bloques visibles de más de 100 caracteres sin traducción PT/EN en ese diccionario**.
- Estos 389 bloques NO son el número de variantes URL sin indexar ni un conteo de todos los elementos sin traducir; los títulos breves, elementos compuestos, metadatos y contenido JavaScript dinámico quedan fuera del alcance del patrón.
- El informe Work de 82 variantes pendientes sigue vigente hasta que se compruebe el contenido real de las URL publicadas. **No confundir trabajo de fuente con indexación.**

## Rutas pendientes según conteo de bloques HTML largos

| Ruta gastronómica | Bloques largos sin cobertura residual |
|---|---:|
| `/gastronomia/oro/` | 14 |
| `/gastronomia/polis-sucos/` | 13 |
| `/gastronomia/sushi-leblon/` | 13 |
| `/gastronomia/don-pascual/` | 13 |
| `/gastronomia/classico-leme/` | 12 |
| `/gastronomia/arp-bar/` | 11 |
| `/gastronomia/joaquina/` | 11 |
| `/gastronomia/prana/` | 11 |
| `/gastronomia/quiteria/` | 11 |
| `/gastronomia/spesso/` | 11 |
| `/gastronomia/delirio/` | 11 |
| `/gastronomia/eclipse/` | 11 |
| `/gastronomia/sabor-das-aguas/` | 11 |
| `/gastronomia/nova-capela/` | 10 |
| `/gastronomia/point-de-grumari/` | 10 |
| `/gastronomia/temperarte-posto6/` | 10 |
| `/gastronomia/xian/` | 10 |
| `/gastronomia/arab-leblon/` | 10 |
| `/gastronomia/bira-de-guaratiba/` | 10 |
| `/gastronomia/kilograma-centro/` | 10 |
| `/gastronomia/lasai/` | 10 |
| `/gastronomia/majorica/` | 10 |
| `/gastronomia/nido-ristorante/` | 10 |
| `/gastronomia/rufino-parrilla/` | 10 |
| `/gastronomia/shiso/` | 10 |
| `/gastronomia/confeitaria-manon/` | 9 |
| `/gastronomia/cosmopolita/` | 9 |
| `/gastronomia/ferro-e-farinha/` | 9 |
| `/gastronomia/gurume/` | 9 |
| `/gastronomia/pesqueiro/` | 9 |
| `/gastronomia/aipo-aipim-920/` | 9 |
| `/gastronomia/cabanna/` | 9 |
| `/gastronomia/cafe-do-alto/` | 9 |
| `/gastronomia/casa-porto/` | 9 |
| `/gastronomia/churrascaria-palace/` | 9 |
| `/gastronomia/coisas-de-bamba/` | 9 |
| `/gastronomia/jobi/` | 9 |
| `/gastronomia/pilograma-prime-grill/` | 8 |
| **Total: 38 rutas** | **389** |

## Casos especiales de idioma de origen

Las fichas `/gastronomia/arp-bar/`, `/gastronomia/classico-leme/` y `/gastronomia/quiteria/` contienen bloques de prosa originales en **portugués**, aunque la ruta de origen es la española. No basta con agregar traducciones PT/EN en el diccionario, ya que ello podría dejar el texto en portugués para visitantes que navegan en español. Revisar estos casos en una intervención separada, preservando su estructura y sentido.

## Próximos lotes seguros

1. Continuar por rutas donde tanto contenido como fuente son claramente españoles y elaborar traducciones naturales exactas de todos sus bloques. Priorizar por impacto/editorial: Confeitaria Manon, Gurumê, Nova Capela, Sushi Leblon, Ferro e Farinha, Jóbi, Oro y otras.
2. Distinguir los casos de origen portugués y planificar ES/PT/EN de origen, no solo una cobertura estadística.
3. Probar en navegador ES, PT-BR e EN y en el HTML inicial; revisar títulos, ALT y metadatos además de párrafos.
4. Compilar solo rutas explícitas con estado previo seguro del manifiesto y publicar incrementalmente sin tocar Carioc-IA.
5. Verificar después de publicar HTTP 200, canonical, hreflang y sitemap por URL, y rastreo de Google cuando proceda.

**No se ha publicado ni hecho merge en esta auditoría.** Los hallazgos son un inventario fuente para evitar conclusiones erróneas sobre el estado de la web pública.
