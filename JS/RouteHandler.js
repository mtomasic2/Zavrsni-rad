const path = require('path');
const ds = require('fs');
const normalizeSpace = require('normalize-space');

const swaggerUi = require('swagger-ui-express');
const webParser = require('./WebParser.js');
const ApiInfoHandler = require('./ApiInfoHandler');
const pageRenderer = require('./PageRenderer');
const { time } = require('console');

const webparser = new webParser();
const handler = new ApiInfoHandler();
const pagerenderer = new pageRenderer();

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

exports.getErrorPage = function (zahtjev, odgovor) {
    var header = ds.readFileSync(path.join(putanja, 'html/partials/header.html'));
    var footer = ds.readFileSync(path.join(putanja, 'html/partials/footer.html'));
    const errorCode = zahtjev.query.error;
    const errorObject = pagerenderer.getErrorObject(errorCode);
    odgovor.type('html');
    if(errorObject != null){
      var pageError = pagerenderer.getErrorPage(errorObject);
      odgovor.write(header + pageError + footer);
      odgovor.send();
    }else{
      odgovor.redirect("/");
    }
}

exports.postApi = async function (zahtjev, odgovor) {
    try {
        const webLink = zahtjev.body.webLink;
        const response = await webparser.fetchResponse(webLink);

        const responseCode = await webparser.returnResponseCode(response);
        const parsedText = responseCode == 200 ? await webparser.getText(response) : '';

        if (webparser.checkIfResponseIsOk(response)) {
          console.log("---------------------------------------");
          console.log(await webparser.returnResponseCode(response));
          console.log("---------------------------------------");
          const parsedText = await webparser.getText(response);
          const cleanedText = normalizeSpace(parsedText);
          console.log(cleanedText + '\n---------------------------------------');
          // const chatPrompt = 'Napisi mi openapi specifikaciju u json obliku (bez komentara) sa ovim putanja koje se navode u sljedecem opisu: \n' + cleanedText;
          // const isFileWritten = await handler.writeApiInfoToFile(chatPrompt, filePath);
          odgovor.redirect(isFileWritten ? "/api-docs" : "/errorPage?error=404");
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