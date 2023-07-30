const submitLink = document.getElementById("submitLink");
const demo = document.getElementById("demo");
const data = document.getElementById("data");

submitLink.addEventListener("click", (event) => {
    var webLink = document.getElementById("webLink");
    const file = webLink.value;

    if(file == ""){
        event.preventDefault();
    }
});