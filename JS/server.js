const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8000;

// Putanja do JSON datoteke s informacijama o API-ju
const apiInfoFilePath = path.join(__dirname, 'api-info.json');

// Funkcija za čitanje JSON datoteke
function readApiInfoFromFile() {
  const rawData = fs.readFileSync(apiInfoFilePath);
  return JSON.parse(rawData);
}

// Generiranje Swagger dokumentacije iz JSON objekta
const apiInfo = readApiInfoFromFile();

// Generiranje Swagger dokumentacije iz JSON objekta
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: apiInfo.apiName,
    description: apiInfo.description,
    version: '1.0.0'
  },
  paths: generatePaths(apiInfo.routes),
  servers: [
    {
      url: `http://localhost:${port}`,
    },
  ],
  // Dodajte ostale dijelove Swagger dokumentacije prema potrebi
};

// Funkcija za generiranje dijela "paths" Swagger dokumentacije
function generatePaths(routes) {
    const paths = {};
  
    for (const route of routes) {
      const pathObj = {
        [route.method.toLowerCase()]: {
          summary: route.description,
          // Dodajte druge dijelove ruta prema potrebi
        }
      };
  
      if (route.parameters && route.parameters.length > 0) {
        pathObj[route.method.toLowerCase()].parameters = route.parameters;
      }

      if (route.responses && Object.keys(route.responses).length > 0) {
        pathObj[route.method.toLowerCase()].responses = route.responses;
      }
  
      paths[route.path] = pathObj;
    }
  
    return paths;
}
  

// Ruta za prikaz Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Pokretanje servera
app.listen(port, () => {
  console.log(`Server pokrenut na http://localhost:${port}`);
});
