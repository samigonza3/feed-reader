const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Script 1: Funnel.io Blog
const url1 = 'https://funnel.io/blog';
const outputFile1 = path.join(__dirname, 'funelio_results.js');
axios.get(url1)
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
      const outputData = `const data = ${JSON.stringify(results, null, 2)};\n\nexport default data;`;
      fs.writeFileSync(outputFile1, outputData);
      console.log(`Los resultados se han guardado en ${outputFile1}`);
    }
  })
  .catch((error) => {
    console.error('Error fetching the page:', error);
  });

// Script 2: Mintic Convocatorias
const url2 = 'https://mintic.gov.co/portal/inicio/Sala-de-prensa/Convocatorias/';
const outputFile2 = path.join(__dirname, 'mintic_results.js'); // Cambio en la ruta del archivo de resultados
axios.get(url2)
  .then(response => {
    const $ = cheerio.load(response.data);
    const resultados = [];
    $('.recuadro').each((index, element) => {
      const titulo = $(element).find('.titulo a').text();
      const urlArticulo = $(element).find('.titulo a').attr('href');
      const urlImagenRelative = $(element).find('.figure img').attr('src');
      const urlImagen = `https://mintic.gov.co/portal/715/${urlImagenRelative}`;
      resultados.push({
        title: titulo,
        link: `https://mintic.gov.co${urlArticulo}`,
        image: urlImagen,
      });
    });
    const resultadosJS = `const MinTIC = ${JSON.stringify(resultados, null, 2)};\n\nexport default MinTIC;`;
    fs.writeFileSync(outputFile2, resultadosJS);
    console.log(`Los resultados han sido guardados en ${outputFile2}`);
  })
  .catch(error => {
    console.error('Error al hacer la solicitud:', error);
  });

// Script 3: Technology Review
const url3 = "https://www.technologyreview.es/";
const filePath = path.join(__dirname, 'mit_results.js');
axios.get(url3)
    .then(response => {
        const $ = cheerio.load(response.data);
        const posts = $('.hp-daily--tz');
        const results = [];
        posts.each((index, element) => {
            const title = $(element).find('.hp-daily__tz__title').text().trim();
            const link = $(element).find('.hp-daily__tz__story-link').attr('href');
            const image = $(element).find('.hp-daily__tz__image img').attr('src');
            results.push({
                title,
                link,
                image,
            });
        });
        const jsCode = `const data = ${JSON.stringify(results, null, 2)};\n\nexport default data;`;
        fs.writeFileSync(filePath, jsCode, 'utf-8');
        console.log(`Resultados guardados en ${filePath}`);
    })
    .catch(error => {
        console.error(`Error: ${error.message}`);
    });

// Script 4: StudioBinder

    const url4 = 'https://www.studiobinder.com/blog/';
    const outputFile = path.join(__dirname, 'studiobinder_results.js'); // Ruta completa del archivo de salida
    
    axios.get(url4)
      .then((response) => {
        if (response.status === 200) {
          const $ = cheerio.load(response.data);
    const posts = $('.post-wrapper');
    const results = [];
    
    posts.each((index, element) => {
      const title = $(element).find('.tcb-post-thumbnail').attr('title');
      const link = $(element).find('.tcb-post-thumbnail').attr('href');
      const image = $(element).find('.tcb-post-thumbnail img').attr('data-lazy-src');

 
            results.push({
              title: title,
              url: link,
              image: image,
            });
          });
    
          const outputData = `const data = ${JSON.stringify(results, null, 2)};\n\nexport default data;`;
          fs.writeFileSync(outputFile, outputData);
    
          console.log(`Los resultados se han guardado en ${outputFile}`);
        }
      })
      .catch((error) => {
        console.error('Error al obtener la página:', error);
      });
    