const path = require('path');
const ds = require('fs');
const swaggerUi = require('swagger-ui-express');
const webParser = require('./WebParser.js');
const ApiInfoHandler = require('./ApiInfoHandler');
const { time } = require('console');

const webparser = new webParser();
const handler = new ApiInfoHandler();

const filePath = path.join(__dirname, 'api_definitions/api-info.json');

const putanja = __dirname;

exports.getHome = function (zahtjev, odgovor) {
    var home = ds.readFileSync(path.join(putanja, 'html/components/index.html'));
    var header = ds.readFileSync(path.join(putanja, 'html/partials/header.html'));
    var footer = ds.readFileSync(path.join(putanja, 'html/partials/footer.html'));
    odgovor.type('html');
    odgovor.write(header + home + footer);
    odgovor.send();
}

exports.getPage404 = function (zahtjev, odgovor) {
    var page404 = ds.readFileSync(path.join(putanja, 'html/components/page404.html'));
    var header = ds.readFileSync(path.join(putanja, 'html/partials/header.html'));
    var footer = ds.readFileSync(path.join(putanja, 'html/partials/footer.html'));
    odgovor.type('html');
    odgovor.write(header + page404 + footer);
    odgovor.send();
}

exports.postApi = async function (zahtjev, odgovor) {
    try {
        const webLink = zahtjev.body.webLink;
        const response = await webparser.fetchResponse(webLink);

        if (webparser.checkIfResponseIsOk(response)) {
          const parsedText = await webparser.getText(response);
          const chatPrompt = 'Give me example of OpenAPI specification in JSON file';
          const isFileWritten = await handler.writeApiInfoToFile(chatPrompt, filePath);
          odgovor.redirect(isFileWritten ? "/api-docs" : "/page404");
        } else {
          odgovor.redirect("/page404");
        }
  
      } catch (error) {
        // console.error('Greška prilikom slanja zahtjeva:', error);
        odgovor.redirect("/page404");
        return;
      }
}

exports.getApiDocs = async function (zahtjev, odgovor) {
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
}