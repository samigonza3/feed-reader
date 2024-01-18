const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const url = 'https://funnel.io/blog';
const outputFile = path.join(__dirname, 'funelio_results.js'); // Se utiliza path.join para obtener la ruta completa

axios.get(url)
  .then((response) => {
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      const results = [];

      $('.article-list a').each((index, element) => {
        const articleUrl = $(element).attr('href');
        const articleTitle = $(element).find('.article__content h2').text();
        const articleImage = $(element).find('.article__image img').attr('src');

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
    console.error('Error fetching the page:', error);
  });
