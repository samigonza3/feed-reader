const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

// URL de la página a scrapear
const url = "https://www.technologyreview.es/";

// Realizar la solicitud a la página
axios.get(url)
    .then(response => {
        // Cargar el contenido HTML con Cheerio
        const $ = cheerio.load(response.data);

        // Encontrar todos los elementos de la lista de posts
        const posts = $('.hp-daily--tz');

        // Array para almacenar los resultados
        const results = [];

        // Iterar sobre cada post y extraer la información deseada
        posts.each((index, element) => {
            // Título
            const title = $(element).find('.hp-daily__tz__title').text().trim();

            // Enlace
            const link = $(element).find('.hp-daily__tz__story-link').attr('href');

            // Imagen
            const image = $(element).find('.hp-daily__tz__image img').attr('src');

            // Agregar resultados al array
            results.push({
                title,
                link,
                image,
            });
        });

        // Convertir el array a formato de código JavaScript
        const jsCode = `const data = ${JSON.stringify(results, null, 2)};`;

        // Escribir los resultados en un archivo
        fs.writeFileSync('resultados.js', jsCode, 'utf-8');

        console.log('Resultados guardados en resultados.js');
    })
    .catch(error => {
        console.error(`Error: ${error.message}`);
    });
