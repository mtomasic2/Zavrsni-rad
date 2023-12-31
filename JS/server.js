const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const RouteHandler = require('./RouteHandler.js');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 8000;
const putanja = __dirname;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

prepareResources();
preparePaths();

app.listen(port, () => {
  console.log(`Server pokrenut na http://localhost:${port}`);
});

function prepareResources(){
  app.use('/js', express.static(putanja + '/js'));
}

function preparePaths(){
  app.get('/', RouteHandler.getHome);
  app.get('/errorPage', RouteHandler.getErrorPage);
  app.post('/api', RouteHandler.postApi);
  app.use('/api-docs', swaggerUi.serve);
  app.get('/api-docs', RouteHandler.getApiDocs);
  app.get('/api-docs/download', RouteHandler.downloadApiDocs);
};
