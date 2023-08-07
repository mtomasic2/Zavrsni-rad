const axios = require('axios');
const { JSDOM } = require('jsdom');

class WebParser {
    // Funkcija koja dohvaća tekstualni sadržaj preko Fetch API-a
    async fetchText(response) {
        if(response.status == 200)
            return await response.data;
        return null
    }

    async fetchResponse(file){
        return await axios.get(file);
    }

    async checkIfResponseIsOk(response){
        return response.status == 200;
    }
    
    // Funkcija koja dohvaća sadržaj sa stranice, uklanja skripte, stilove i navigacijske elemente te vraća čisti tekstualni sadržaj tijela dokumenta.
    async getText(response) {
        let y = await this.fetchText(response);
        const doc = this.parseHTML(y);

        const elementsToDelete = ["script", "nav", "sidenav", "topnav", "pagetop", "style", "header", "changelog", "navigation", "sidebar", "footer", "toolbar", "aside", "banner", "donations"];
        // kasnije dodano: aside, banner, donations
        this.deleteElementsByPartialName(doc, elementsToDelete);

        return doc.body.textContent;
    }
  
    // Funkcija koja pretvara HTML string u DOM elemente pomoću DOMParser-a
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