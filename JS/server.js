const express = require('express');
const ds = require('fs');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8000;
const putanja = __dirname;
const cors = require('cors');

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const {encode, decode} = require('gpt-3-encoder')
const webParser = require("./webParser.js");

// Putanja do JSON datoteke s informacijama o API-ju
const apiInfoFilePath = path.join(__dirname, 'api-info2.json');
const filePath = path.join(__dirname, 'api-info3.json');

// Funkcija za čitanje JSON datoteke
async function readApiInfoFromFile(filePath) {
  try {
    const rawData = await fs.promises.readFile(filePath);
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Greška prilikom čitanja JSON datoteke:', error);
    return null;
  }
}

// Funkcija za pisanje stringa u datoteku
function writeToFile(filePath, content) {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error('Greška prilikom pisanja u datoteku:', err);
    } else {
      console.log('String je uspješno zapisan u datoteku.');
    }
  });
}
function countTokens(text) {
  const encoded = encode(text)
  return encoded.length;
}

async function getChatCompletionResponse(chatPrompt) {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: `${chatPrompt}` }],
    });

    // Dohvatite odgovor od API-ja
    const odgovorApi = completion.data.choices[0].message.content;

    return odgovorApi;
  } catch (error) {
    console.error('Greška prilikom slanja zahtjeva:', error);
    throw error;
  }
}

function extractJsonFromString(inputString) {
  const startIdx = inputString.indexOf('{');
  const endIdx = inputString.lastIndexOf('}');
  
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    throw new Error('Invalid JSON string');
  }
  
  const jsonString = inputString.slice(startIdx, endIdx + 1);
  
  try {
    const jsonObject = JSON.parse(jsonString);
    return jsonObject;
  } catch (error) {
    throw new Error('Failed to parse JSON object');
  }
}

async function writeApiInfoToFile(chatPrompt) {
  const chatResponse = await getChatCompletionResponse(chatPrompt);
  console.log(chatResponse);
  const extractedJson = extractJsonFromString(chatResponse);
  console.log(extractedJson);
  writeToFile(filePath, JSON.stringify(extractedJson));
}

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

    const webparser = new webParser();
    const parsedText = await webparser.getText(webLink);
    //console.log(countTokens(parsedText));

    const chatPrompt = "Give me example of OpenAPI specification in JSON file";
    await writeApiInfoToFile(chatPrompt);

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
    const apiInfo = await readApiInfoFromFile(filePath);
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
