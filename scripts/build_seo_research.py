#!/usr/bin/env python3
"""Reproducible qualitative keyword map. Never invent volume or rank data."""
import csv, gzip, json, re, unicodedata
from pathlib import Path
from html.parser import HTMLParser
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs/seo'
OUT.mkdir(exist_ok=True)
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.tag=''; self.title=''; self.h1=''; self.text=[]; self.schema=[]
    def handle_starttag(self, tag, attrs):
        self.tag=tag
    def handle_endtag(self, tag):
        self.tag=''
    def handle_data(self, s):
        if self.tag=='title': self.title+=s
        if self.tag=='h1': self.h1+=s
        if self.tag not in ('script','style'): self.text.append(s.strip())
coverage=json.loads(gzip.decompress((ROOT/'docs/COBERTURA_596_20261003.json.gz').read_bytes()))
states={r['route']:r.get('states',{}) for r in coverage['rows']}
pages={}
for p in sorted(ROOT.rglob('*.html')):
    rel=p.relative_to(ROOT)
    if any(x in rel.parts for x in ('.git','dist','node_modules','.vercel')): continue
    route='/' if str(rel)=='index.html' else '/'+str(rel.parent)+'/' if p.name=='index.html' else '/'+str(rel)
    doc=Page();doc.feed(p.read_text());pages[route]={'file':str(rel),'title':doc.title,'h1':doc.h1,'words':len(' '.join(doc.text).split())}
(OUT/'INVENTARIO_URLS.json').write_text(json.dumps(pages,ensure_ascii=False,indent=2))
# primary intent owners; informational/commercial intents are deliberately split.
# ES, PT-BR, EN, route, priority, gap class, recommended action.
clusters=[
 ('general','qué hacer en Río de Janeiro|qué visitar en Río|lugares turísticos de Río|qué ver en Río|turismo Río de Janeiro','o que fazer no Rio de Janeiro|o que visitar no Rio|pontos turísticos do Rio|o que conhecer no Rio|turismo Rio de Janeiro','things to do in Rio de Janeiro|what to see in Rio|Rio tourist attractions|places to visit in Rio|Rio travel guide','/atracciones/','P1','B','OPTIMIZE'),
 ('tours','tours en Río de Janeiro|paseos en Río de Janeiro|excursiones en Río|city tour Río|tours Río en español|guía en español Río|tour privado Río','passeios no Rio de Janeiro|excursões no Rio|city tour Rio|tour privado Rio|guia turístico Rio','Rio de Janeiro tours|Rio excursions|Rio city tour|private tours Rio|Spanish speaking guide Rio','/experiencias/','P0','B','OPTIMIZE'),
 ('playas','mejores playas de Río|playas de Río con niños|playas seguras de Río|playas para surf Río|quioscos de playa Río','melhores praias do Rio|praias do Rio com crianças|praias seguras Rio|praias para surfar Rio|quiosques Rio','best beaches in Rio|Rio beaches with kids|safe beaches Rio|surfing beaches Rio|Rio beach kiosks','/playas/','P1','B','OPTIMIZE'),
 ('seguridad','es seguro Río de Janeiro|seguridad en Río para turistas|qué evitar en Río|robos de celular Río|estafas en Río','Rio de Janeiro é seguro|segurança no Rio para turistas|o que evitar no Rio|furto de celular Rio|golpes turistas Rio','is Rio de Janeiro safe|Rio tourist safety|what to avoid in Rio|phone theft Rio|Rio tourist scams','/guia/emergencias/','P1','C','OPTIMIZE'),
 ('transporte','cómo moverse en Río|transporte público Río|metro Río de Janeiro|Uber Río|VLT Río','como se locomover no Rio|transporte público Rio|metrô Rio de Janeiro|Uber Rio|VLT Rio','getting around Rio|Rio public transport|Rio metro|Uber Rio|Rio VLT','/transportes/','P1','B','OPTIMIZE'),
 ('dinero','cuánto dinero llevar a Río|presupuesto viaje Río|tarjetas o efectivo Brasil|cambio real brasileño|propinas Río','quanto dinheiro levar ao Rio|orçamento viagem Rio|cartão ou dinheiro Brasil|câmbio Rio|gorjeta Rio','Rio travel budget|how much money to bring to Rio|cash or card Brazil|currency exchange Rio|tipping Rio','/guia/dinero/','P1','B','OPTIMIZE'),
 ('documentos','documentos para viajar a Brasil|pasaporte para Brasil|visa Brasil turistas|viajar Brasil con menores','documentos para viajar ao Brasil|passaporte Brasil turista|visto Brasil turista|viajar Brasil com menores','Brazil entry requirements|Brazil tourist visa|Brazil passport requirements|Brazil travel with children','/guia/documentos/','P1','B','OPTIMIZE'),
 ('alojamiento','dónde alojarse en Río|mejor barrio para alojarse Río|Copacabana o Ipanema|hotel Río familias','onde ficar no Rio|melhor bairro para ficar Rio|Copacabana ou Ipanema|hotel Rio família','where to stay in Rio|best area to stay in Rio|Copacabana or Ipanema|family hotels Rio','/guia/donde-alojarse/','P1','B','OPTIMIZE'),
 ('alquiler','apartamentos en Copacabana|alquiler temporal Copacabana|departamentos Río familias|alojamiento Río grupos','apartamentos em Copacabana|aluguel temporada Copacabana|apartamento Rio família|hospedagem Rio grupos','Copacabana vacation apartments|Copacabana short term rentals|Rio family apartments|Rio group accommodation','/hospedaje/','P0','B','OPTIMIZE'),
 ('gastronomia','dónde comer en Río|restaurantes Río de Janeiro|comida brasileña Río|comer barato Río|feijoada Río|desayuno Río','onde comer no Rio|restaurantes Rio de Janeiro|comida brasileira Rio|comer barato Rio|feijoada Rio|café da manhã Rio','where to eat in Rio|Rio restaurants|Brazilian food Rio|cheap eats Rio|feijoada Rio|breakfast Rio','/gastronomia/','P1','B','OPTIMIZE'),
 ('noche','qué hacer de noche en Río|bares Río|samba en vivo Río|discotecas Río|rooftops Río','o que fazer à noite no Rio|bares Rio|samba ao vivo Rio|baladas Rio|rooftops Rio','Rio nightlife|Rio bars|live samba Rio|Rio nightclubs|Rio rooftops','/vida-nocturna/','P1','B','OPTIMIZE'),
 ('cultura','museos de Río|teatros Río|bibliotecas Río|fortalezas Río|arquitectura Río|cultura afrobrasileña Río','museus do Rio|teatros Rio|bibliotecas Rio|fortalezas Rio|arquitetura Rio|cultura afro brasileira Rio','Rio museums|Rio theatres|Rio libraries|Rio forts|Rio architecture|Afro Brazilian culture Rio','/cultura/','P2','B','OPTIMIZE'),
 ('familia','Río con niños|qué hacer con niños en Río|parques infantiles Río|actividades familiares Río','Rio com crianças|o que fazer com crianças no Rio|parques infantis Rio|passeios em família Rio','Rio with kids|things to do in Rio with children|Rio playgrounds|Rio family activities','/familia/','P1','B','OPTIMIZE'),
 ('clima','mejor época viajar Río|clima Río mes a mes|Río en enero|Río en febrero|lluvia Río','melhor época visitar Rio|clima Rio mês a mês|Rio em janeiro|Rio em fevereiro|chuva Rio','best time to visit Rio|Rio weather by month|Rio in January|Rio in February|Rio rainfall','/guia/mes-a-mes/','P1','B','OPTIMIZE'),
 ('carnaval','Carnaval Río entradas|Sambódromo Río|blocos Río|ensayos escuelas samba|Carnaval Experience','Carnaval Rio ingressos|Sambódromo Rio|blocos Rio|ensaios escolas samba|Carnaval Experience','Rio Carnival tickets|Rio Sambadrome|Rio blocos|samba school rehearsals|Carnival Experience Rio','/eventos/carnaval/','P0','C','OPTIMIZE'),
 ('itinerarios','Río en {n} días|itinerario Río {n} días|qué hacer Río {n} días','Rio em {n} dias|roteiro Rio {n} dias|o que fazer Rio {n} dias','Rio {n} day itinerary|Rio in {n} days|what to do Rio {n} days','/consejos/rio-1-a-7-dias/','P1','B','OPTIMIZE'),
 ('lluvia','qué hacer en Río cuando llueve|Río con lluvia|actividades bajo techo Río','o que fazer no Rio com chuva|Rio em dia de chuva|passeios cobertos Rio','things to do in Rio when it rains|rainy day Rio|indoor activities Rio','/consejos/lluvia/','P3','B','OPTIMIZE'),
 ('gratis','qué hacer gratis en Río|atracciones gratuitas Río|Río sin gastar','o que fazer de graça no Rio|atrações gratuitas Rio|Rio sem gastar','free things to do in Rio|free attractions Rio|Rio on a budget','/atracciones/','P3','C','EXPAND'),
]
special=[
 ('cristo','tour Cristo Redentor','passeio Cristo Redentor','Christ the Redeemer tour','/experiencias/cristo-city-tour/','P0'),
 ('full-day','tour Cristo y Pan de Azúcar','passeio Cristo e Pão de Açúcar','Christ and Sugarloaf full day tour','/experiencias/full-day-rio/','P0'),
 ('rocinha','tour Rocinha','passeio Rocinha','Rocinha favela tour','/experiencias/rocinha/','P0'),
 ('maracana-juego','entradas partido Maracaná','ingressos jogo Maracanã','Maracana football match tickets','/experiencias/partido-maracana/','P0'),
 ('maracana-visita','tour estadio Maracaná','tour estádio Maracanã','Maracana stadium tour','/experiencias/maracana-experience/','P0'),
 ('buzios','excursión Búzios desde Río','passeio Búzios saindo do Rio','Buzios day trip from Rio','/experiencias/buzios/','P0'),
 ('arraial','excursión Arraial do Cabo desde Río','passeio Arraial do Cabo saindo do Rio','Arraial do Cabo day trip from Rio','/experiencias/arraial-do-cabo/','P0'),
 ('angra','excursión Angra Ilha Grande desde Río','passeio Angra Ilha Grande saindo do Rio','Angra Ilha Grande day trip from Rio','/experiencias/angra-ilha-grande/','P0'),
 ('petropolis','Petrópolis desde Río','Petrópolis saindo do Rio','Petropolis day trip from Rio','','P2'),
 ('parapente','parapente Río de Janeiro','parapente Rio de Janeiro','Rio de Janeiro paragliding','/experiencias/vuelo-en-parapente/','P0'),
 ('helicoptero','helicóptero Río de Janeiro','helicóptero Rio de Janeiro','Rio de Janeiro helicopter tour','/experiencias/helicoptero/','P0'),
 ('lancha','lancha privada Río de Janeiro','lancha privativa Rio de Janeiro','Rio private boat tour','/experiencias/lancha-privada/','P0'),
 ('transfer','transfer aeropuerto Río Copacabana','transfer aeroporto Rio Copacabana','Rio airport transfer Copacabana','/transportes/transporte-privado/','P0'),
 ('gig','cómo ir de GIG a Copacabana','como ir do Galeão a Copacabana','how to get from GIG to Copacabana','/guia/aeropuertos/','P1'),
 ('pix','PIX turistas extranjeros Brasil','Pix para estrangeiros Brasil','PIX for foreigners Brazil','/guia/pix/','P1'),
 ('cpf','CPF turistas extranjeros','CPF para turistas estrangeiros','CPF for foreign tourists','/guia/cpf/','P2'),
 ('seguro','seguro viaje Río de Janeiro','seguro viagem Rio de Janeiro','Rio travel insurance','/guia/seguro/','P0'),
 ('internet','eSIM chip Río de Janeiro','eSIM chip Rio de Janeiro','Rio eSIM SIM card','/guia/internet/','P0'),
 ('samba','dónde ver samba en Río','onde ver samba no Rio','where to see samba in Rio','/vida-nocturna/','P1'),
 ('portuaria','tour centro histórico zona portuaria Río','passeio centro histórico zona portuária Rio','Rio historic centre port district tour','/consejos/recorrido-zona-portuaria/','P0'),
 ('pequena-africa','tour Pequena África','passeio Pequena África','Little Africa Rio tour','/experiencias/pequena-africa/','P2'),
]
for c,es,pt,en,url,p in special:
    clusters.append((c,es,pt,en,url,p,'D' if not url else 'B','CREATE' if not url else 'OPTIMIZE'))
# Add entity-specific search families mapped to their existing authoritative page.
for section,kind in [('playas','beach'),('atracciones','attraction'),('transportes','transport'),('gastronomia','restaurant'),('cultura','culture'),('vida-nocturna','nightlife'),('barrios','neighborhood')]:
    for route,page in pages.items():
        if not route.startswith('/'+section+'/') or route.count('/')!=3: continue
        name=page['title'].split('|')[0].split('—')[0].strip()
        if not name: continue
        localized=[states.get(route,{}).get(l,{}).get('meta',{}).get('title',name).split('|')[0].split('—')[0].strip() for l in ['ES','PT','EN']]
        # Existing presence doesn't prove editorial excellence (A); classify B.
        clusters.append((section+':'+route.split('/')[2],*localized,route,'P3' if kind!='culture' else 'P2','B','KEEP'))
evidence=json.loads(gzip.decompress((ROOT/'docs/SEO_RESEARCH_SOURCES_20261003.json.gz').read_bytes()))
source_clusters={}
observed_titles=[]
for group in evidence['groups']:
    text='\n'.join(c.get('text','') for c in group['result'].get('content',[]) if c.get('type')=='text')
    sources=re.findall(r'^(.+) \((https?://[^\s]+)\)$',text,re.M)
    source_clusters[group['cluster']]=[u for _,u in sources]
    observed_titles.extend({'cluster':group['cluster'],'wording':t,'url':u,'type':'TÍTULO OBSERVADO EN SERP, NO VOLUMEN'} for t,u in sources)
with (OUT/'TERMINOS_OBSERVADOS.csv').open('w') as f:
    w=csv.DictWriter(f,fieldnames=['cluster','wording','url','type']);w.writeheader();w.writerows(observed_titles)
rows=[];seen=set()
for c,es,pt,en,url,priority,gap,action in clusters:
    if url and url not in pages:
        # No invented target URLs: locate actual existing Carnaval or related page.
        if c=='carnaval': url=next((r for r in pages if 'carnaval' in r and r.startswith('/eventos/')),'/eventos/')
        else: url='';gap='D';action='CREATE'
    for lang,phrases in [('ES',es),('PT-BR',pt),('EN',en)]:
        bases=phrases.split('|')
        if '{n}' in phrases: bases=[b.format(n=n) for b in bases for n in range(1,8)]
        # Expansion is explicit: these are candidates, not measured searches.
        variants=list(bases)
        if ':' in c or c in [x[0] for x in special]:
            mods={'ES':['precio','cómo llegar','horarios','vale la pena','con niños','entradas'], 'PT-BR':['preço','como chegar','horários','vale a pena','com crianças','ingressos'], 'EN':['price','how to get there','opening hours','is it worth it','with kids','tickets']}[lang]
            if c.startswith(('gastronomia:','vida-nocturna:')): mods={'ES':['precios','cómo llegar','horarios','menú','reservas','opiniones'], 'PT-BR':['preços','como chegar','horários','cardápio','reservas','avaliações'], 'EN':['prices','how to get there','opening hours','menu','reservations','reviews']}[lang]
            elif c.startswith(('playas:','barrios:')): mods={'ES':['cómo llegar','seguridad','con niños','qué hacer','dónde comer','atardecer'], 'PT-BR':['como chegar','segurança','com crianças','o que fazer','onde comer','pôr do sol'], 'EN':['how to get there','safety','with kids','things to do','where to eat','sunset']}[lang]
            elif c.startswith('transportes:'): mods={'ES':['precio','cómo usar','horarios','ruta','turistas','aeropuerto'], 'PT-BR':['preço','como usar','horários','trajeto','turistas','aeroporto'], 'EN':['price','how to use','timetable','route','tourists','airport']}[lang]
            variants += [bases[0]+' '+m for m in mods]
        for i,keyword in enumerate(variants):
            key=(lang,keyword.casefold())
            if key in seen: continue
            seen.add(key)
            target=url if lang=='ES' or not url else '/'+('pt' if lang=='PT-BR' else 'en')+url
            commercial=c in [x[0] for x in special[:13]] or c in ('tours','alquiler','carnaval','seguro','internet')
            intent='COMERCIAL' if commercial else 'INFORMATIVA'
            # Tickets for informational entities should map to a real experience if one exists.
            recommended=action
            rows.append({'keyword':keyword,'idioma':lang,'intencion':intent,'cluster':c,'volumen':'NO DISPONIBLE','competencia':'NO DISPONIBLE','popularidad':'SIN MEDICIÓN','url_ec_actual':url,'url_idioma_propuesta':target,'cobertura_actual':gap if url else 'D','accion':recommended,'prioridad':priority,'evidencia':'EXPANSIÓN PROPUESTA, NO DEMANDA CERTIFICADA','fuentes_cluster':' | '.join(source_clusters.get(c.split(':')[0],[])[:4]),'nota':'Validar volumen y SERP individual antes de ampliar editorial; no exponer rutas Premium.'})
fields=list(rows[0])
with (OUT/'KEYWORD_URL_MAP.csv').open('w') as f:
    w=csv.DictWriter(f,fieldnames=fields);w.writeheader();w.writerows(rows)
summary={'consultas_web_ejecutadas':72,'consultas_por_idioma':{'ES':24,'PT-BR':24,'EN':24},'titulos_serp_observados':len(observed_titles),'candidatos_unicos':len(rows),'candidatos_por_idioma':{l:sum(r['idioma']==l for r in rows) for l in ['ES','PT-BR','EN']},'clusters':len(set(r['cluster'] for r in rows)),'urls_fuente':len(pages),'volumen':'No disponible; no se infiere de resultados SERP','prioridades':{p:sum(r['prioridad']==p for r in rows) for p in ['P0','P1','P2','P3','P4']}}
(OUT/'RESEARCH_SUMMARY.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2));print(json.dumps(summary,ensure_ascii=False,indent=2))
