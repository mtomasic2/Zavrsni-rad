const { Configuration, OpenAIApi } = require("openai");

const express = require('express');
const ds = require('fs');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8000;
const putanja = __dirname;
const cors = require('cors');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Putanja do JSON datoteke s informacijama o API-ju
const apiInfoFilePath = path.join(__dirname, 'api-info2.json');

// Funkcija za čitanje JSON datoteke
async function readApiInfoFromFile() {
  try {
    const rawData = await fs.promises.readFile(apiInfoFilePath);
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Greška prilikom čitanja JSON datoteke:', error);
    return null;
  }
}

async function generateSwaggerDocument(apiInfo) {
  return {
    openapi: '3.0.0',
    info: {
      title: apiInfo.apiName,
      description: apiInfo.description,
      version: '1.0.0'
    },
    paths: generatePaths(apiInfo.endpoints),
    servers: apiInfo.servers.map(url => ({ url }))
    
    // Dodajte ostale dijelove Swagger dokumentacije prema potrebi
  };
}

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
console.log(path.join(putanja, "index.html"));

app.use(cors());

app.use("/js",express.static(putanja+"/js"));

app.get("/",(zahtjev, odgovor) => {
  var pocetna = ds.readFileSync(path.join(putanja, "index.html"));
  odgovor.type("html");
  odgovor.write(pocetna);
  odgovor.send();
});

app.get("/api", async (zahtjev, odgovor) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "system", content: "You are a helpful assistant."}, {role: "user", content: "Hello world"}],
  });
  console.log(completion.data.choices[0].message);
});

app.use('/api-docs', swaggerUi.serve);
// Ruta za prikaz Swagger UI, koristimo asinkronu funkciju
app.get('/api-docs', async (zahtjev, odgovor) => {
  try {
    // Pročitajte JSON objekt iz datoteke api-info.json
    const apiInfo = await readApiInfoFromFile();

    // Generirajte Swagger dokumentaciju iz pročitanog JSON objekta
    // const swaggerDocument = await generateSwaggerDocument(apiInfo);

    const swaggerDocument = apiInfo;
    // console.log(apiInfo);

    // Prikaz Swagger UI pomoću pročitanog Swagger dokumenta
    swaggerUi.setup(swaggerDocument)(zahtjev, odgovor);
  } catch (error) {
    console.error('Greška prilikom generiranja Swagger dokumentacije:', error);
    odgovor.status(500).send('Greška prilikom generiranja Swagger dokumentacije.');
  }
});

// Pokretanje servera
app.listen(port, () => {
  console.log(`Server pokrenut na http://localhost:${port}`);
});
