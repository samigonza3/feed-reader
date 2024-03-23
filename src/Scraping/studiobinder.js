const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const url = 'https://www.studiobinder.com/blog/';
const outputFile = path.join(__dirname, 'studiobinder_results.js'); // Ruta completa del archivo de salida

axios.get(url)
  .then((response) => {
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      const results = [];

      $('.post-wrapper').each((index, element) => {
        const articleTitle = $(element).find('.tcb-post-title a').text();
        const articleUrl = $(element).find('.tcb-post-title a').attr('href');
        const articleImage = $(element).find('.tcb-post-list-dynamic-style').css('background-image').replace('url("', '').replace('")', '');

        results.push({
          title: articleTitle,
          url: articleUrl,
          image: articleImage,
        });
      });

      // Guardar los resultados en el archivo
      const outputData = `const data = ${JSON.stringify(results, null, 2)};\n\nexport default data;`;
      fs.writeFileSync(outputFile, outputData);

      console.log(`Los resultados se han guardado en ${outputFile}`);
    }
  })
  .catch((error) => {
    console.error('Error al obtener la página:', error);
  });
