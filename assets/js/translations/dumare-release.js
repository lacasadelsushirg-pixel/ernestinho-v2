// Dumaré's embedded September dictionary is positional. Restore its 19
// historical paragraphs by meaning, then translate the later additions.
export default {
  forceLegacyParagraphs: true,
  legacyParagraphIndexes: [0, 1, 2, 3, 4, 5, 6, null, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, null, null, null, null, null, null, null, null, null],
  supplemental: {
    PT: {
      7: 'No Dumarê, o ambiente faz parte da experiência tanto quanto o cardápio. Antes de escolher a mesa, pergunte qual espaço está disponível e como o clima pode influenciar a visita, especialmente se preferir sentar ao ar livre. Confirme o menu do dia e eventuais condições para grupos.',
      9: 'Se pretende aproveitar a paisagem e a refeição na mesma saída, reserve tempo suficiente para curtir as duas coisas. Planeje o trajeto e a volta conforme a localização exata, sem depender de estimativas antigas de trânsito.',
      21: 'Esta síntese vem da ficha editorial recuperada do Quiosque Dumaré. Ela oferece uma orientação inicial sobre o local; não substitui o cardápio nem confirma o funcionamento atual.',
      22: 'O bairro, as categorias e a faixa de preço refletem o registro disponível e podem ter mudado. Confirme o endereço exato, os horários, o cardápio, os valores e a necessidade de reserva nos canais atuais do estabelecimento.',
      23: 'Quiosque · praia · mar',
      24: 'Frutos do mar e coquetéis no Posto 3 de Copacabana.',
      25: '← Voltar para Gastronomia',
      26: 'Planejamos seu roteiro ou acompanho você em um passeio privativo exclusivo.',
      27: '© 2026 Ernestinho Carioca. Todos os direitos reservados.',
      28: 'Criado para viajantes que querem viver o Rio de forma real e autêntica.',
      29: 'Oi! Sou o Ernestinho Carioc-IA. Ajudo você a encontrar o guia do Rio que procura. Por onde começamos?'
    },
    EN: {
      7: 'At Dumarê, the setting is as much a part of the experience as the menu. Before choosing a table, ask which area is available and how the weather may affect your visit, especially if you prefer to sit outdoors. Check the daily menu and any arrangements for groups.',
      9: 'If you plan to enjoy the view and the meal on the same outing, leave enough time for both. Plan your route and return around the exact location rather than relying on old traffic estimates.',
      21: 'This summary comes from the recovered editorial listing for Quiosque Dumaré. It offers an initial guide to the place; it does not replace the menu or confirm current operations.',
      22: 'The neighborhood, categories, and price range reflect the available listing and may have changed. Confirm the exact address, hours, menu, prices, and reservation requirements through the venue’s current channels.',
      23: 'Kiosk · beach · sea',
      24: 'Seafood and cocktails at Copacabana’s Posto 3.',
      25: '← Back to Gastronomy',
      26: 'We plan your itinerary, or I join you on an exclusive private tour.',
      27: '© 2026 Ernestinho Carioca. All rights reserved.',
      28: 'Designed for travelers who want an authentic experience of Rio.',
      29: "Hi! I'm Ernestinho Carioc-IA. I can help you find the Rio guide you need. Where should we start?"
    }
  },
  text: {
    PT: {
      'La carta y la disponibilidad pueden cambiar; conviene confirmar antes de ir.': 'O cardápio e a disponibilidade podem mudar; vale confirmar antes de ir.',
      'Contacto': 'Contato',
      'Fotografía de Quiosque Dumaré.': 'Foto do Quiosque Dumaré.',
      'Información adicional conservada de la ficha V2': 'Informações adicionais preservadas da ficha V2',
      'QUER CONHECER O RIOCOMIGO?': 'QUER CONHECER O RIO COMIGO?',
      'Guía editorial de Quiosque Dumaré: identidad, historia, recomendaciones, horarios, transporte y mapa en Río.': 'Guia editorial do Quiosque Dumaré: identidade, história, recomendações, horários, transporte e mapa no Rio.',
      'Quiosque Dumaré: guía completa | Ernestinho Carioca': 'Quiosque Dumaré: guia completo | Ernestinho Carioca',
      'Precios': 'Preços',
      'Sitio oficial': 'Site oficial',
      'Notas adicionales de la guía V2': 'Notas adicionais do guia V2'
    },
    EN: {
      'La carta y la disponibilidad pueden cambiar; conviene confirmar antes de ir.': 'The menu and availability may change; it is best to check before you go.',
      'Contacto': 'Contact',
      'Fotografía de Quiosque Dumaré.': 'Photo of Quiosque Dumaré.',
      'Información adicional conservada de la ficha V2': 'Additional information retained from the V2 listing',
      'WANT TO DISCOVER RIOWITH ME?': 'WANT TO DISCOVER RIO WITH ME?',
      'Guía editorial de Quiosque Dumaré: identidad, historia, recomendaciones, horarios, transporte y mapa en Río.': 'Editorial guide to Quiosque Dumaré: identity, history, recommendations, opening hours, transport, and map in Rio.',
      'Quiosque Dumaré: guía completa | Ernestinho Carioca': 'Quiosque Dumaré: complete guide | Ernestinho Carioca',
      'Precios': 'Prices',
      'Sitio oficial': 'Official website',
      'Notas adicionales de la guía V2': 'Additional notes from the V2 guide'
    }
  },
  attributes: {
    PT: Object.fromEntries(Array.from({ length: 6 }, (_, i) => [`Quiosque Dumaré — imagen ${i + 1}`, `Quiosque Dumaré — imagem ${i + 1}`])),
    EN: Object.fromEntries(Array.from({ length: 6 }, (_, i) => [`Quiosque Dumaré — imagen ${i + 1}`, `Quiosque Dumaré — image ${i + 1}`]))
  }
};
