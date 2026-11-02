# SEO: inventario de fichas gastronómicas pendientes de traducción

Revisión del 2 de noviembre de 2026, sobre la rama `seo/traducciones-continuacion-lote2-20261102`, basada en el informe del PR #12.

## Criterio de esta auditoría

- Se leyeron los HTML fuente de **53 rutas gastronómicas** presentes en el reporte original de Work y se compararon con las claves exactas del diccionario residual de Gastronomía.
- Tras las correcciones del PR #13, **48 rutas gastronómicas** tienen cobertura de los bloques largos visibles examinados; siguen **5 rutas** con **53 bloques visibles de más de 100 caracteres sin traducción PT/EN en ese diccionario**.
- Estos 389 bloques NO son el número de variantes URL sin indexar ni un conteo de todos los elementos sin traducir; los títulos breves, elementos compuestos, metadatos y contenido JavaScript dinámico quedan fuera del alcance del patrón.
- El informe Work de 82 variantes pendientes sigue vigente hasta que se compruebe el contenido real de las URL publicadas. **No confundir trabajo de fuente con indexación.**

## Rutas pendientes según conteo de bloques HTML largos

| Ruta gastronómica | Bloques largos sin cobertura residual |
|---|---:|
| `/gastronomia/classico-leme/` | 12 |
| `/gastronomia/arp-bar/` | 11 |
| `/gastronomia/quiteria/` | 11 |
| `/gastronomia/majorica/` | 10 |
| `/gastronomia/cosmopolita/` | 9 |
| **Total: 5 rutas** | **53** |

## Casos especiales de idioma de origen

Las fichas `/gastronomia/arp-bar/`, `/gastronomia/classico-leme/` y `/gastronomia/quiteria/` contienen bloques de prosa originales en **portugués**, aunque la ruta de origen es la española. No basta con agregar traducciones PT/EN en el diccionario, ya que ello podría dejar el texto en portugués para visitantes que navegan en español. Revisar estos casos en una intervención separada, preservando su estructura y sentido.

## Avance del lote ampliado

Diez fichas pasaron a cobertura de bloques largos PT/EN en código: Confeitaria Manon, Café do Alto, Casa Porto, Ferro e Farinha Botafogo, Gurumê, Nova Capela, Jobi, Aipo & Aipim 920, Arab Leblon y Churrascaria Palace. Se incorporaron **92 entradas** bilingües nuevas; otras seis claves de estas diez fichas ya existían. La publicación y la revisión real de idiomas no se infieren de este avance.

## Estado tras el lote de 23 fichas (sin publicación)

Se completaron las traducciones de los bloques largos de otras **23 fichas** con **237 claves ES→PT/EN nuevas**, manteniendo entradas que ya existían. La cobertura acumulada alcanza 48 fichas gastronómicas de las 53 originales de Work. Continúan cinco fichas **de naturaleza distinta**: `arp-bar`, `classico-leme` y `quiteria` presentan prosa en portugués dentro del archivo fuente que debería ser español; `majorica` tiene también bloques fuente en portugués; `cosmopolita` presenta referencias de barrios/localización contradictorias y requiere verificar el establecimiento antes de traducir. Una mera clave PT/EN no corrige el texto español ni la información ambigua.

Se configuraron acciones de QA para las **51 fichas de Río** cubiertas (incluyendo Compras) y Madame Bardot; el resultado de ejecución debe revisarse antes de integrar. **No se ha tocado Hostinger, el sitemap público ni Carioc-IA.**

## Próximos lotes seguros

1. Continuar por rutas donde tanto contenido como fuente son claramente españoles y elaborar traducciones naturales exactas de todos sus bloques. Priorizar por impacto/editorial: Confeitaria Manon, Gurumê, Nova Capela, Sushi Leblon, Ferro e Farinha, Jóbi, Oro y otras.
2. Distinguir los casos de origen portugués y planificar ES/PT/EN de origen, no solo una cobertura estadística.
3. Probar en navegador ES, PT-BR e EN y en el HTML inicial; revisar títulos, ALT y metadatos además de párrafos.
4. Compilar solo rutas explícitas con estado previo seguro del manifiesto y publicar incrementalmente sin tocar Carioc-IA.
5. Verificar después de publicar HTTP 200, canonical, hreflang y sitemap por URL, y rastreo de Google cuando proceda.

**No se ha publicado ni hecho merge en esta auditoría.** Los hallazgos son un inventario fuente para evitar conclusiones erróneas sobre el estado de la web pública.
