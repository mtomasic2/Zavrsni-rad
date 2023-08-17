const submitLink = document.getElementById("submitLink");

submitLink.addEventListener("click", (event) => {
    var webLink = document.getElementById("webLink");
    const file = webLink.value;

    if(file == ""){
        event.preventDefault();
    }
});