const express = require('express');
const ds = require('fs');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const app = express();
const port = 8000;
const putanja = __dirname;
const cors = require('cors');

const webParser = require("./WebParser.js");
const webparser = new webParser();

const ApiInfoHandler = require('./ApiInfoHandler');
const handler = new ApiInfoHandler();

// Putanja do JSON datoteke s informacijama o API-ju
const apiInfoFilePath = path.join(__dirname, 'api-info2.json');
const filePath = path.join(__dirname, 'api-info3.json');

console.log(path.join(putanja, "index.html"));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/js",express.static(putanja+"/js"));

app.get("/",(zahtjev, odgovor) => {
  var pocetna = ds.readFileSync(path.join(putanja, "index.html"));
  odgovor.type("html");
  odgovor.write(pocetna);
  odgovor.send();
});

app.get("/",(zahtjev, odgovor) => {
  odgovor.redirect("/");
});

app.post("/api", async (zahtjev, odgovor) => {
  try {
    const webLink = zahtjev.body.webLink;
    const parsedText = await webparser.getText(webLink);
    //console.log(countTokens(parsedText));

    const chatPrompt = "Give me example of OpenAPI specification in JSON file";
    await handler.writeApiInfoToFile(chatPrompt, filePath);

    // const apiInfo = await readApiInfoFromFile(filePath);
    // console.log(apiInfo);

    odgovor.redirect("/api-docs");
    return;

  } catch (error) {
    console.error('Greška prilikom slanja zahtjeva:', error);
    odgovor.status(500).json({ error: 'Greška prilikom slanja zahtjeva' });
    return;
  }
});

app.use('/api-docs', swaggerUi.serve);
// Ruta za prikaz Swagger UI, koristimo asinkronu funkciju
app.get('/api-docs', async (zahtjev, odgovor) => {
  try {
    // Pročitajte JSON objekt iz datoteke api-info.json
    const apiInfo = await handler.readApiInfoFromFile(filePath);
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
