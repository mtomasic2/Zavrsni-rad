const path = require('path');
const ds = require('fs');
const normalizeSpace = require('normalize-space');

const swaggerUi = require('swagger-ui-express');
const webParser = require('./WebParser.js');
const ApiInfoHandler = require('./ApiInfoHandler');
const pageRenderer = require('./PageRenderer');

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

        if(parsedText.length > 30 && webparser.checkIfResponseIsOk(response)){
          console.log("----------------------------------------------------------------------------");
          console.log(await webparser.returnResponseCode(response));
          const cleanedText = normalizeSpace(parsedText);
          console.log("----------------------------------------------------------------------------");
          console.log(cleanedText + '\n----------------------------------------------------------------------------');
          const chatPrompt = 'Napisi mi OpenAPI specifikaciju u JSON obliku (bez komentara) sa putanja koje se navode u sljedecem opisu: \n' + cleanedText;
          const isFileWritten = await handler.writeApiInfoToFile(chatPrompt, filePath);
          odgovor.redirect(isFileWritten ? "/api-docs" : `/errorPage?error=${responseCode}`);
        }else{
          odgovor.redirect(`/errorPage?error=409`);
        }
      } catch (error) {
        const responseCode = error.code == 'ENOTFOUND' || error.code == 'ECONNREFUSED' ? 404 : 500;
        console.log(error);
        odgovor.redirect(`/errorPage?error=${responseCode}`);
        return;
      }
}

exports.getApiDocs = async function (zahtjev, odgovor) {
    var header = ds.readFileSync(path.join(putanja, 'html/partials/header.html')) + "<div class='container'>";
    var downloadButton = "</div>" + ds.readFileSync(path.join(putanja, 'html/components/download-button.html'));
    var footer = ds.readFileSync(path.join(putanja, 'html/partials/footer.html'));

    try {
        const apiInfo = await handler.readApiInfoFromFile(filePath);
        const swaggerDocument = apiInfo;
    
        const options = {
          customCss: '.swagger-ui .topbar { display: none }',
          customSiteTitle: 'API documentation'
        }
        const swaggerUiHtml = swaggerUi.generateHTML(swaggerDocument, options);
        
        odgovor.send(header + swaggerUiHtml + downloadButton + footer);

      } catch (error) {
        console.error('Greška prilikom generiranja Swagger dokumentacije:', error);
        odgovor.redirect(`/errorPage?error=500`);
      }
}

exports.downloadApiDocs = async function (zahtjev, odgovor) {
  const openApiSpec = ds.readFileSync(filePath, 'utf8');

  odgovor.setHeader('Content-disposition', 'attachment; filename=api-info.json');
  odgovor.setHeader('Content-type', 'application/json');

  odgovor.send(openApiSpec);
}