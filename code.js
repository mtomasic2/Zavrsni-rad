

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
  