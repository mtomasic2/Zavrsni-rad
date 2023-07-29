const axios = require('axios');
const { JSDOM } = require('jsdom');

class WebParser {
    // Funkcija koja dohvaća tekstualni sadržaj preko Fetch API-a
    async fetchText(file) {
        let x = await axios.get(file);
        return await x.data;
    }
    
    // Funkcija koja dohvaća sadržaj sa stranice, uklanja skripte, stilove i navigacijske elemente te vraća čisti tekstualni sadržaj tijela dokumenta.
    async getText(file) {
        let y = await this.fetchText(file);

        const doc = this.parseHTML(y);

        const elementsToDelete = ["script", "nav", "sidenav", "topnav", "pagetop", "style", "header", "changelog", "navigation", "sidebar", "footer", "toolbar"];

        this.deleteElementsByPartialName(doc, elementsToDelete);

        // console.log(doc.body);
        return doc.body.textContent;

        // const textContent = doc.body.innerHTML;
        // console.log(textContent);
        // demo.innerHTML = textContent;
        // data.innerHTML = doc.body.textContent;
    
        // // Primjer korištenja funkcije za pronalaženje elemenata s dijelom imena "navigation"
        // const navigationElements = findElementsByPartialName(doc, "navigation");
        // console.log(navigationElements);
    }
  
    // Funkcija koja pretvara HTML string u DOM elemente pomoću DOMParser-a
    parseHTML(htmlString) {
        const dom = new JSDOM(htmlString);
        return dom.window.document;
    }

    findElementsByPartialName(doc, name) {
        const htmlElements = doc.querySelectorAll(`${name}`);
        const classElements = doc.querySelectorAll(`[class*="${name}"]`);
        const idElements = doc.querySelectorAll(`[id*="${name}"]`);
        const elements = new Set([...htmlElements, ...classElements, ...idElements]);
        
        return Array.from(elements);
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