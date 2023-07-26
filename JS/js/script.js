const submitLink = document.getElementById("submitLink");
const demo = document.getElementById("demo");
const data = document.getElementById("data");

submitLink.addEventListener("click", (event) => {
    event.preventDefault();

    var webLink = document.getElementById("webLink");
    const file = webLink.value;

    if(file != ""){
        getText(file);
    }
});

// Funkcija koja dohvaća sadržaj sa stranice, uklanja skripte, stilove i navigacijske elemente te vraća čisti tekstualni sadržaj tijela dokumenta.
async function getText(file) {
    let y = await fetchText(file);
  
    const doc = parseHTML(y);

    const elementsToDelete = ["script", "nav", "sidenav", "topnav", "pagetop", "style", "header", "changelog", "navigation", "sidebar", "footer", "toolbar"];

    deleteElementsByPartialName(doc, elementsToDelete);

    console.log(doc.body.textContent);

    const textContent = doc.body.innerHTML;
    // console.log(textContent);
    demo.innerHTML = textContent;
    data.innerHTML = doc.body.textContent;
  
    // // Primjer korištenja funkcije za pronalaženje elemenata s dijelom imena "navigation"
    // const navigationElements = findElementsByPartialName(doc, "navigation");
    // console.log(navigationElements);
  }
  
  // Funkcija koja dohvaća tekstualni sadržaj preko Fetch API-a
  async function fetchText(file) {
    let x = await fetch(file);
    return await x.text();
  }
  
  // Funkcija koja pretvara HTML string u DOM elemente pomoću DOMParser-a
  function parseHTML(htmlString) {
    const parser = new DOMParser();
    return parser.parseFromString(htmlString, "text/html");
  }

  function findElementsByPartialName(doc, name) {
    const htmlElements = doc.querySelectorAll(`${name}`);
    const classElements = doc.querySelectorAll(`[class*="${name}"]`);
    const idElements = doc.querySelectorAll(`[id*="${name}"]`);
    const elements = new Set([...htmlElements, ...classElements, ...idElements]);
    
    return Array.from(elements);
  }

  function deleteElementsByPartialName(doc, names) {
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