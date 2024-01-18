const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://mintic.gov.co/portal/inicio/Sala-de-prensa/Convocatorias/';
const outputFile = 'mintic_results.js';

axios.get(url)
  .then(response => {
    const $ = cheerio.load(response.data);

    // Crea un array para almacenar los resultados
    const resultados = [];

    // Itera sobre cada recuadro
    $('.recuadro').each((index, element) => {
      const titulo = $(element).find('.titulo a').text();
      const urlArticulo = $(element).find('.titulo a').attr('href');
      const urlImagenRelative = $(element).find('.figure img').attr('src');

      // Genera la URL completa de la imagen
      const urlImagen = `https://mintic.gov.co/portal/715/${urlImagenRelative}`;

      // Agrega los resultados al array
      resultados.push({
        title: titulo,
        link: `https://mintic.gov.co${urlArticulo}`, // Agrega la URL base
        image: urlImagen,
      });
    });

    // Convierte los resultados a formato de archivo JavaScript
    const resultadosJS = `const MinTIC = ${JSON.stringify(resultados, null, 2)};\n\nexport default MinTIC;`;

    // Escribe los resultados en el archivo JS
    fs.writeFileSync(outputFile, resultadosJS);

    console.log(`Los resultados han sido guardados en ${outputFile}`);
  })
  .catch(error => {
    console.error('Error al hacer la solicitud:', error);
  });
