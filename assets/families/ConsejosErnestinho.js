function ConsejosErnestinho({ onArticulo, onNavegar, onAbrirDetalle, seleccionado, setSeleccionado, lang = 'es' }) {
    const ecRef = ECUseConsejosTranslation(lang, seleccionado && seleccionado.id);
    const CT = (v) => { if (v == null) return v; const z = String(v); const dict = (window.GLOBAL_UI_TRANSLATIONS && window.GLOBAL_UI_TRANSLATIONS[lang]) || {}; return lang === 'es' ? z : (dict[z] || z); };
    const CONSEJOS_PORTADAS = {
        'art-1': 6,
        'seguro-viaje': 8,
        'semana': 9,
        'lluvia': 10,
        'dias-rio': 11,
        'caminando': 12,
        'sol': 13,
        'nadie-explica': 14,
        'trampas': 15,
        'hotel': 16,
        'souvenirs': 18,
        'supermercado': 17,
        'rodizio': 3,
        'maps': 2,
        'portugues': 1,
        'perguntas-50': 4,
        'perfiles': 5
    };
    const portadaConsejo = (n) => 'https://res.cloudinary.com/tdez3h4t/image/upload/v1789964031/PORTADAS_CONSEJO_' + n + '.png';
    if (seleccionado && seleccionado.id === 'recorridos-cuenta')
        return React.createElement("section", { className: "min-h-[70vh] bg-slate-950 text-white flex items-center justify-center px-4" },
            React.createElement("div", { className: "text-center" },
                React.createElement("h1", { className: "text-4xl sm:text-7xl font-black" }, lang === 'pt' ? 'ROTEIROS ERNESTINHO' : lang === 'en' ? 'ERNESTINHO ROUTES' : 'RECORRIDOS ERNESTINHO'),
                React.createElement("p", { className: "mt-5 text-2xl sm:text-3xl font-black text-amber-300" }, lang === 'pt' ? 'Em breve' : lang === 'en' ? 'Coming soon' : 'Próximamente')));
    if (seleccionado && ['trampas', 'souvenirs', 'perguntas-50', 'perfiles', 'maps'].includes(seleccionado.id))
        return React.createElement(GuiaCincoConsejos, { seleccionado: seleccionado, onVolver: () => setSeleccionado(null), onNavegar: onNavegar, lang: lang });
    if (seleccionado && ['supermercado', 'rodizio'].includes(seleccionado.id))
        return React.createElement(GuiaSupermercadoRodizio, { seleccionado: seleccionado, onVolver: () => setSeleccionado(null), onNavegar: onNavegar, lang: lang });
    if (seleccionado && seleccionado.id === 'caminando')
        return React.createElement(RecorridoPortuarioErnestinho, { onVolver: () => setSeleccionado(null), onNavegar: onNavegar, onAbrirDetalle: onAbrirDetalle, lang: lang });
    if (seleccionado && ['lluvia', 'presupuestos', 'sol'].includes(seleccionado.id))
        return React.createElement(ConsejoVisualCompleto, { seleccionado: seleccionado, onVolver: () => setSeleccionado(null), onNavegar: onNavegar, lang: lang });
    if (seleccionado) {
        const visual = CONSEJOS_VISUALES[seleccionado.id];
        return React.createElement("section", { ref: ecRef, className: "min-h-screen bg-amber-50 py-12" },
            React.createElement("article", { className: "max-w-4xl mx-auto px-4" },
                React.createElement("button", { onClick: () => setSeleccionado(null), className: "font-black text-amber-800" }, CT("← Volver a Consejos")),
                visual && React.createElement("div", { className: "mt-8 h-64 sm:h-96 rounded-[2rem] overflow-hidden " },
                    React.createElement("img", { src: visual.hero, alt: visual.alt, className: "w-full h-full object-cover" })),
                React.createElement("span", { className: "block text-6xl mt-9" }, seleccionado.icon),
                React.createElement("h1", { className: "text-3xl sm:text-5xl font-black mt-5" }, CT(seleccionado.titulo)),
                React.createElement("p", { className: "text-lg text-slate-600 mt-4" }, CT(seleccionado.intro)),
                seleccionado.id === 'semana' && React.createElement("div", { className: "grid md:grid-cols-2 gap-6 mt-9" }, SEMANA_RIO.map(d => React.createElement("article", { key: d.dia, className: "bg-white rounded-3xl overflow-hidden border border-amber-100 " },
                    React.createElement("img", { src: d.foto, alt: d.dia + ' en Río de Janeiro', className: "w-full h-48 object-cover" }),
                    React.createElement("div", { className: "p-6" },
                        React.createElement("span", { className: "text-amber-700 text-xs font-black uppercase" }, CT(d.tema)),
                        React.createElement("h2", { className: "text-3xl font-black mt-2" }, CT(d.dia)),
                        React.createElement("div", { className: "mt-5 space-y-3 text-sm text-slate-700" },
                            React.createElement("p", null,
                                React.createElement("b", null, "\u2600\uFE0F Ma\u00F1ana:"),
                                " ",
                                CT(d.manana)),
                            React.createElement("p", null,
                                React.createElement("b", null, "\uD83C\uDF24\uFE0F Tarde:"),
                                " ",
                                CT(d.tarde)),
                            React.createElement("p", null,
                                React.createElement("b", null, "\uD83C\uDF19 Noche:"),
                                " ",
                                CT(d.noche)),
                            React.createElement("p", { className: "bg-slate-50 rounded-xl p-3" },
                                React.createElement("b", null, CT("Plan alternativo:")),
                                " ",
                                CT(d.alternativa))),
                        React.createElement("a", { href: d.mapa, target: "_blank", rel: "noopener noreferrer", className: "block mt-5 bg-slate-900 text-white text-center rounded-xl py-3 text-xs font-black uppercase" }, "Abrir ruta del d\u00EDa \u2197"))))),
                React.createElement("div", { className: "space-y-4 mt-9" }, (seleccionado.id === 'semana' ? [] : seleccionado.tips).map((x, i) => React.createElement("div", { key: x, className: "bg-white rounded-2xl border border-amber-100 p-5 flex gap-4" },
                    React.createElement("span", { className: "w-9 h-9 shrink-0 rounded-full bg-amber-400 flex items-center justify-center font-black" }, i + 1),
                    React.createElement("p", { className: "text-sm text-slate-700 leading-relaxed pt-2" }, CT(x))))),
                seleccionado.id === 'seguro-viaje' && React.createElement(AssistCardAffiliate, { lang: lang, compact: true }),
                visual && React.createElement("div", { className: "flex flex-wrap gap-3 mt-8" }, visual.links.map(([t, s]) => React.createElement("button", { key: s, onClick: () => s.startsWith('http') ? window.open(s, '_blank') : onNavegar(s), className: "bg-teal-700 text-white rounded-full px-5 py-3 text-xs font-black uppercase" },
                    t,
                    " \u2192"))),
                seleccionado.id === 'souvenirs' && React.createElement("button", { onClick: () => onNavegar('cafe'), className: "mt-8 bg-slate-900 text-white rounded-full px-6 py-3 text-xs font-black uppercase" }, "Conocer Caf\u00E9 Ernestinho \u2192")));
    }
    ;
    return React.createElement("section", { ref: ecRef, className: "min-h-screen bg-[#071b1b] text-white pb-20" },
        React.createElement("div", { className: "bg-[#0b2a2a] border-b border-amber-400/20" },
            React.createElement("div", { className: "max-w-7xl mx-auto px-4 py-16" },
                React.createElement("span", { className: "text-xs font-black uppercase tracking-[.25em] text-amber-300" }, CT("Consejos reales y sin complicaciones")),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black uppercase mt-3" }, CT("Consejos de Ernestinho")),
                React.createElement("p", { className: "max-w-2xl text-teal-100/80 mt-5 text-lg" }, CT("Ideas para organizar cada día, ahorrar tiempo y entender cómo funciona Río.")))),
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 py-12" },
            React.createElement("h2", { className: "text-2xl font-black text-white" }, CT("Consejos esenciales")),
            React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5" },
                ARTICULOS_CONSEJOS.filter(a => a.id === 'art-1').map(a => React.createElement("button", { key: a.id, onClick: () => onArticulo(a), className: "group rounded-2xl overflow-hidden border border-white/10 bg-[#0b2a2a] text-left" },
                    React.createElement("img", { src: portadaConsejo(6), alt: CT(a.titulo), loading: "lazy", className: "w-full aspect-[3/2] object-cover transition-transform duration-300 group-hover:scale-[1.02]" }))),
                React.createElement("button", { onClick: () => onNavegar('guia'), className: "group rounded-2xl overflow-hidden border border-white/10 bg-[#0b2a2a] text-left" },
                    React.createElement("img", { src: portadaConsejo(7), alt: CT("Documentos, visado, vacunas, maleta y electricidad"), loading: "lazy", className: "w-full aspect-[3/2] object-cover transition-transform duration-300 group-hover:scale-[1.02]" }))),
            React.createElement("h2", { className: "text-2xl font-black mt-14 text-white" }, CT("Organiza y vive tu viaje")),
            React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5" }, CONSEJOS_NUEVOS.filter(x => x.id !== 'recorridos-cuenta').map(x => React.createElement("button", { key: x.id, onClick: () => setSeleccionado(x), className: "group rounded-3xl overflow-hidden border border-white/10 bg-[#0b2a2a] text-left transition" },
                React.createElement("img", { src: portadaConsejo(CONSEJOS_PORTADAS[x.id]), alt: CT(x.titulo), loading: "lazy", className: "w-full aspect-[3/2] object-cover transition-transform duration-300 group-hover:scale-[1.02]" }))))));
}
// TRANSPORTE_RIO externalizado a JSON
window.ConsejosErnestinho=ConsejosErnestinho;
