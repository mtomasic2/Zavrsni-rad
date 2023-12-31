const axios = require('axios');
const { JSDOM } = require('jsdom');

class WebParser {
    async fetchText(response) {
        return await this.checkIfResponseIsOk(response) ? response.data : null;
    }

    async fetchResponse(file){
        return await axios.get(file);
    }

    async checkIfResponseIsOk(response){
        return await this.returnResponseCode(response) == 200;
    }
    
    async parseText(response) {
        let rawData = await this.fetchText(response);
        const doc = this.parseHTML(rawData);

        const elementsToDelete = [
            "script", "nav", "sidenav", "topnav", "pagetop", "style", 
            "header", "changelog", "navigation", "sidebar", "footer", "toolbar", 
            "aside", "banner", "donations"
        ];
        this.deleteElementsByPartialName(doc, elementsToDelete);

        return doc.body.textContent;
    }

    async returnResponseCode(response){
        return response.status;
    }
  
    parseHTML(htmlString) {
        const dom = new JSDOM(htmlString);
        return dom.window.document;
    }

    deleteElementsByPartialName(doc, names) {
        names.forEach(name => {
            const htmlElements = doc.querySelectorAll(`${name}`);
            const classElements = doc.querySelectorAll(`[class*="${name}"]`);
            const idElements = doc.querySelectorAll(`[id*="${name}"]`);
            const elements = new Set([...htmlElements, ...classElements, ...idElements]);
    
            elements.forEach(element => {
                element.remove();
            });
        });
    }
}

module.exports = WebParser;