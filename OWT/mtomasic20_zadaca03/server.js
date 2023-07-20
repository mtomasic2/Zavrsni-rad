const express = require('/usr/lib/node_modules/express');
const bodyParser = require('/usr/lib/node_modules/body-parser');
const portovi = require("/var/www/OWT/2022/portovi.js");
const ds = require("fs");
const server = express();
const port = portovi.mtomasic20;
const putanja = __dirname;

server.use("/css",express.static(putanja+"/css"));
server.use("/datoteke",express.static(putanja+"/datoteke"));
server.use("/js",express.static(putanja+"/js"));
server.use("/materijali",express.static(putanja+"/materijali"));
server.use("/ostalo/kreativna",express.static(putanja+"/ostalo/kreativna.html"));
server.use("/ostalo/kreativna.html",express.static(putanja+"/ostalo/kreativna.html"));
server.use("/ostalo/o_autoru",express.static(putanja+"/ostalo/o_autoru.html"));
server.use("/ostalo/o_autoru.html",express.static(putanja+"/ostalo/o_autoru.html"));
server.use("/podaci/pregled",express.static(putanja+"/podaci/pregled.html"));
server.use("/podaci/pregled.html",express.static(putanja+"/podaci/pregled.html"));
server.use("/index",express.static(putanja+"/index.html"));
server.use("/index.html",express.static(putanja+"/index.html"));
server.use("/obrazac",express.static(putanja+"/obrazac.html"));
server.use("/obrazac.html",express.static(putanja+"/obrazac.html"));
server.use("/prijava",express.static(putanja+"/prijava.html"));
server.use("/prijava.html",express.static(putanja+"/prijava.html"));
 
server.get("/",(zahtjev, odgovor) => {
    var pocetna = ds.readFileSync('index.html');
    odgovor.type("html");
    odgovor.write(pocetna);
    odgovor.send();
});

server.get("/podaci/popis",(zahtjev, odgovor) => {
    var header = ds.readFileSync('ostalo/header_popis.html');
    var footer = ds.readFileSync('ostalo/footer_popis.html');
    odgovor.type("html");
    odgovor.write(header);
    odgovor.write(ucitajPodatke());
    odgovor.write(footer);
    odgovor.send();
});

server.get("/podaci/popis.html",(zahtjev, odgovor) => {
    var header = ds.readFileSync('ostalo/header_popis.html');
    var footer = ds.readFileSync('ostalo/footer_popis.html');
    odgovor.type("html");
    odgovor.write(header);
    odgovor.write(ucitajPodatke());
    odgovor.write(footer);
    odgovor.send();
});

server.get("/ostalo/multimedija",(zahtjev, odgovor) => {
    var header = ds.readFileSync('ostalo/header_multimedija.html');
    var footer = ds.readFileSync('ostalo/footer_multimedija.html');
    odgovor.type("html");
    odgovor.write(header);
    odgovor.write(ucitajSlike());
    odgovor.write(ucitajVideozapise());
    odgovor.write(ucitajAudio());
    odgovor.write(footer);
    odgovor.send();
});

server.get("/ostalo/multimedija.html",(zahtjev, odgovor) => {
    var header = ds.readFileSync('ostalo/header_multimedija.html');
    var footer = ds.readFileSync('ostalo/footer_multimedija.html');
    odgovor.type("html");
    odgovor.write(header);
    odgovor.write(ucitajSlike());
    odgovor.write(ucitajVideozapise());
    odgovor.write(ucitajAudio());
    odgovor.write(footer);
    odgovor.send();
});

server.use(bodyParser.urlencoded({ extended: true }));

server.listen(port, () => {
    console.log(`Server pokrenut na portu: ${port}`);
})

function ucitajPodatke(){
    var tablica = "<table class='results-table'><caption class='results-table__caption'>Rezultati ankete</caption>";
    var podaci = ds.readFileSync('datoteke/podaci.csv','utf-8');

        var redovi = podaci.split("\n");
        var red = redovi[0].split(",");
        var zadnjired = redovi.length;
        tablica += "<tr><th class='column1'>" + red[0] + "</th><th class='column2'>" + red[1] + "</th><th class='column3'>" + red[2] + "</th><th class='column4'>" + red[3] + "</th><th class='column5'>" + red[4] + "</th><th class='column6'>" + red[5] + "</th><th class='column7'>" + red[6] + "</th><th class='column8'>" + red[7] + "</th><th class='column9'>" + red[8] + "</th><th class='column10'>" + red[9] + "</th></tr>";
        for(var i = 1;i<redovi.length-1;i++){
            var red = redovi[i].split(",");
            tablica += "<tr>"
            tablica +="<td class='column1'>" + red[0] + "</td><td class='column2'>" + red[1] + "</td><td class='column3'>" + red[2] + "</td><td class='column4'>" + red[3] + "</td><td class='column5'>" + red[4] + "</td><td class='column6'>" + red[5] + "</td><td class='column7'>" + red[6] + "</td><td class='column8'>" + red[7] + "</td><td class='column9'>" + red[8] + "</td><td class='column10'>" + red[9] + "</td>";
            tablica += "</tr>"
        }
        red = redovi[redovi.length-1].split(",");
        tablica += "<tr><td colspan='5'><u><b>" + red[0] + "</b></u></td><td colspan='5'><u><b>" + red[1] + "</b></u></td></tr>"
        
    tablica += "</table>"
    return tablica;
}

function ucitajSlike(){
    var article = "<div class='multimedia__content__images'><h2>Malo iznutra i izvana - slike</h2><article id='slike'>";
    var rawPodaci = ds.readFileSync('datoteke/slike.json');
    var podaci = JSON.parse(rawPodaci);
    for(var i = 0;i<podaci.length;i++){
        article += "<figure id='" + podaci[i]["figId"] + "'><img src='" + podaci[i]["imgSrc"] + "' alt='" + podaci[i]["imgAlt"] + "'><figcaption id='" + podaci[i]["figCapId"] + "'>" + podaci[i]["figCapContent"] +"</figcaption></figure>";
    }
    article += "</article></div>";
    return article;
}

function ucitajVideozapise(){
    var article = "<div class='multimedia__content__videos'><article id='video'><h2>Malo iznutra i izvana - video</h2><div>";
    var rawPodaci = ds.readFileSync('datoteke/videozapisi.json');
    var podaci = JSON.parse(rawPodaci);
    for(var i=0;i<podaci.length;i++){
        article += "<video src='" + podaci[i]["vidSrc"] +"' controls poster='" + podaci[i]["vidPoster"] + "'></video>";
    }
    article += "</div></article></div>";
    return article;
}

function ucitajAudio(){
    var article = "<div class='multimedia__content__audio'><article id='audio'><h2>Zvuk motora Ferrarija</h2><div class='multimedia__content__audio__grid'>";
    var rawPodaci = ds.readFileSync('datoteke/audio.json');
    var podaci = JSON.parse(rawPodaci);
    for(var i=0;i<podaci.length;i++){
        article += "<div class='multimedia__content__audio__grid__element'><h3>" + podaci[i]["audioCap"] + "</h3><audio src='" + podaci[i]["audioSrc"]  +"' controls muted></audio></div>";
    }
    article += "</div></article></div>";
    return article;
}