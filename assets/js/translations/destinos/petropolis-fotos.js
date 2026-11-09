export const localPhotos = {
  "koeler": {
    "src": "/assets/images/destinos/lugares/petropolis/koeler.webp",
    "alt": "Avenida Koeler e Catedral",
    "source": "https://commons.wikimedia.org/wiki/File:Vista_da_Avenida_Koeler_e_Catedral_de_S%C3%A3o_Pedro_de_Alc%C3%A2ntara.jpg",
    "author": "Tavelini",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
  },
  "vista-trono": {
    "src": "/assets/images/destinos/lugares/petropolis/vista-trono.webp",
    "alt": "Vista de Petrópolis do Trono de Fátima",
    "source": "https://commons.wikimedia.org/wiki/File:0000_Vistas_de_Petr%C3%B3polis_(estado_do_Rio_de_Janeiro,_Brasil)_tiradas_do_Trono_de_F%C3%A1tima.JPG",
    "author": "Eugenio Hansen, OFS",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
  },
  "nogueira": {
    "src": "/assets/images/destinos/lugares/petropolis/nogueira.webp",
    "alt": "Estação Nogueira",
    "source": "https://commons.wikimedia.org/wiki/File:Estacao_Nogueira_Petropolis_RJ_Brazil.jpg",
    "author": "Albmont",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
  }
};

export function photoCredit(photo, lang) {
  if (!photo?.author) return '';
  const labels = { ES: 'Foto redimensionada', PT: 'Foto redimensionada', EN: 'Resized photo' };
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
  return `<small class="petr-photo-credit">${labels[lang]} · <a href="${escape(photo.source)}">${escape(photo.author)}</a> · <a href="${escape(photo.licenseUrl)}">${escape(photo.license)}</a></small>`;
}
