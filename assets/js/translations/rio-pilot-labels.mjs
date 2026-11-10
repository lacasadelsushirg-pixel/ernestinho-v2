// Attribute and control copy left in Spanish by the approved legacy sources.
export const pilotLabels = {
  '/guia/': {
    'Guía de Río.: CONSEJOS guia completa antes del viaje': ['Guia do Rio: dicas para antes da viagem', 'Rio guide: advice before your trip'],
    'Guía de Río.: PORTADA GIIA DE RIO': ['Capa do Guia do Rio', 'Rio guide cover'],
  },
  '/guia/apps/': {
    'Aplicaciones que facilitan tu viaje: MINIATUA APPS': ['Ilustração do guia de aplicativos úteis', 'Illustration for the travel apps guide'],
  },
  '/gastronomia/carretao-ipanema/': {
    '🌐 Sitio oficial': ['🌐 Site oficial', '🌐 Official website'],
    ...Object.fromEntries(Array.from({ length: 6 }, (_, index) => {
      const number = index + 1;
      return [`Carretão Ipanema Classic Grill — imagen ${number}`, [
        `Carretão Ipanema Classic Grill — foto ${number}`,
        `Carretão Ipanema Classic Grill — photo ${number}`,
      ]];
    })),
  },
};
