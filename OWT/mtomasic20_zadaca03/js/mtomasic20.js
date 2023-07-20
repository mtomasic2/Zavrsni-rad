window.addEventListener("load",function(){
    var kreativna = document.getElementById("kreativna");
    var multimedia = document.getElementById("multimedia");
    var oAutoru = document.getElementById("o-autoru");
    var obrazac = document.getElementById("obrazac");
    var podaci = document.getElementById("podaci");

    var naslovStranice = document.title;
    
    if(kreativna){
        kreativna.addEventListener("click",function(event){
            if(naslovStranice != "Kreativna"){
                if(confirm("Želimo li napustiti stranicu?") == true){
                }else{
                    alert("Ostajemo na stranici: " + naslovStranice);
                    event.preventDefault();
                }
            }else{
                alert("Već se nalazite na stranici: " + naslovStranice);
            }
        })
    }
    
    if(multimedia){
        multimedia.addEventListener("click",function(event){
            if(naslovStranice != "Multimedija"){
                if(confirm("Želimo li napustiti stranicu?") == true){
                }else{
                    alert("Ostajemo na stranici: " + naslovStranice);
                    event.preventDefault();
                }
            }else{
                alert("Već se nalazite na stranici: " + naslovStranice);
            }
        })
    }
    
    if(oAutoru){
        oAutoru.addEventListener("click",function(event){
            if(naslovStranice != "O autoru"){
                if(confirm("Želimo li napustiti stranicu?") == true){
                }else{
                    alert("Ostajemo na stranici: " + naslovStranice);
                    event.preventDefault();
                }
            }else{
                alert("Već se nalazite na stranici: " + naslovStranice);
            }
        })
    }
    
    if(obrazac){
    obrazac.addEventListener("click",function(event){
        if(naslovStranice != "Obrazac"){
            if(confirm("Želimo li napustiti stranicu?") == true){
            }else{
                alert("Ostajemo na stranici: " + naslovStranice);
                event.preventDefault();
            }
        }else{
            alert("Već se nalazite na stranici: " + naslovStranice);
        }
    })
    }

    if(podaci){
        podaci.addEventListener("click",function(event){
            if(naslovStranice != "Prikaz podataka"){
                if(confirm("Želimo li napustiti stranicu?") == true){
                }else{
                    alert("Ostajemo na stranici: " + naslovStranice);
                    event.preventDefault();
                }
            }else{
                alert("Već se nalazite na stranici: " + naslovStranice);
            }
        })
    }

    var posalji = document.getElementById("posalji");
    var reset = document.getElementById("reset");
    

    var fieldsetSpol = document.getElementById("fieldset-spol");
    var fieldsetOsobnePreferencije = document.getElementById("fieldset-osobne-preferencije");
    var fieldsetContact = document.getElementById("fieldset-contact");
    var fieldsetOstalo = document.getElementById("fieldset-ostalo");

    var textIme = document.getElementById("text_ime");
    var labelIme = document.getElementById("label-text_ime");
    var textPrezime = document.getElementById("text_prezime");
    var labelPrezime = document.getElementById("label-text_prezime");
    var numberGodine = document.getElementById("godine");
    var labelGodine = document.getElementById("label-godine");
    var radioBezSkole = document.getElementById("radio_bezSkole");
    var radioOSkola = document.getElementById("radio_OSkola");
    var radioSSkola = document.getElementById("radio_SSkola");
    var radioFaks = document.getElementById("radio_Faks");
    var labelObrazovanje = document.getElementById("label-obrazovanje");

    var radioMusko = document.getElementById("radio_musko");
    var radioZensko = document.getElementById("radio_zen");
    var radioOstalo = document.getElementById("radio_ostalo");
    var labelSpol = document.getElementById("label-spol");

    var labelFerrari = document.getElementById("label-najdrazi-ferari");
    var selectFerrari = document.getElementById("dropdown_n-m-a");

    var emailAddress = document.getElementById("email_address");
    var labelEmail = document.getElementById("label-email");
    var telBroj = document.getElementById("tel_broj");
    var labelTelBroj = document.getElementById("label-broj-tel");
    var urlURL = document.getElementById("urlURL");

    var dateTime = document.getElementById("datetime-local_datumIVrijeme");
    var labelDateTime = document.getElementById("label-date-time");
    var motivacija = document.getElementById("textarea_motivacija");
    var labelMotivacija = document.getElementById("label-motivacija");

    if(naslovStranice == "Obrazac"){   
        posalji.addEventListener("click",function(event){
            var steps = 0;

            var provjeraSkole = radioBezSkole.checked || radioOSkola.checked || radioSSkola.checked || radioFaks.checked;
            var provjeraSpola = radioMusko.checked || radioZensko.checked || radioOstalo.checked;

            var odabraniAuti = document.querySelectorAll('#dropdown_n-m-a option:checked');
            var odabraniAutiNiz = Array.from(odabraniAuti).map(el => el.value);
            var odabraniAutiNizProvjera = odabraniAutiNiz.length >= 2;

            var predlozakImePrezime = /^[A-Z][a-z]*\b$/;
            var predlozakGodine = /^[1-9][0-9]?$|^100$/;
            var predlozakDatumVrijeme = /^([1-9]|([012][0-9])|(3[01]))\.([0]{0,1}[1-9]|1[012])\.\d\d\d\d (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/;
            var predlozakMotivacija = /^.{100,1000}$/;
            var reImePrezime = new RegExp(predlozakImePrezime);
            var reGodine = new RegExp(predlozakGodine);
            var reDatumVrijeme = new RegExp(predlozakDatumVrijeme);
            var reMotivacija = new RegExp(predlozakMotivacija);
            var tocnoImePrezime = reImePrezime.test(textIme.value)
            var tocnoGodine = reGodine.test(numberGodine.value);
            var tocnoDatumVrijeme = reDatumVrijeme.test(dateTime.value);
            var tocnoMotivacija = reMotivacija.test(motivacija.value);

            if(!tocnoImePrezime){
                labelIme.textContent = "Ime:*";
                textIme.classList.add("wrong");
            }else{
                labelIme.textContent = "Ime:";
                textIme.classList.remove("wrong");
                steps++;
            }

            tocnoImePrezime = reImePrezime.test(textPrezime.value)
            if(!tocnoImePrezime){
                labelPrezime.textContent = "Prezime:*";
                textPrezime.classList.add("wrong");
            }else{
                labelPrezime.textContent = "Prezime:";
                textPrezime.classList.remove("wrong");
                steps++;
            }

            if(!tocnoGodine){
                labelGodine.textContent = "Godine:*";
                numberGodine.classList.add("wrong");
            }else{
                labelGodine.textContent = "Godine:";
                numberGodine.classList.remove("wrong");
                steps++;
            }
            
            if(!provjeraSkole){
                labelObrazovanje.textContent = "Obrazovanje:*";
            }else{
                labelObrazovanje.textContent = "Obrazovanje:";
                steps++;
            }
            
            if(fieldsetSpol.style.display = "none" && steps == 4){
                fieldsetSpol.style.display = "block";
            }
            
            if(!provjeraSpola){
                labelSpol.textContent = "Spol:*";
            }else{
                labelSpol.textContent = "Spol:";
                steps++;
            }
            
            if(fieldsetSpol.style.display = "none" && steps == 5){
                fieldsetOsobnePreferencije.style.display = "block";
            }

            if(!odabraniAutiNizProvjera){
                labelFerrari.textContent = "Najdrazi Ferrari:*";
                selectFerrari.classList.add("wrong");
            }else{
                labelFerrari.textContent = "Najdrazi Ferrari:";
                selectFerrari.classList.remove("wrong");
                steps++;
            }

            if(fieldsetContact.style.display = "none" && steps == 6){
                fieldsetContact.style.display = "block";
            }
            
            var predlozakEmail = '@';
            var zastaviceEmail = "i";
            var re = new RegExp(predlozakEmail,zastaviceEmail);
            var ok = re.test(emailAddress.value);

            if(!ok){
                labelEmail.textContent = "E-Mail adresa:*";
                emailAddress.classList.add("wrong");
            }else{
                labelEmail.textContent = "E-Mail adresa:";
                emailAddress.classList.remove("wrong");
                steps++;
            }

            if(steps > 6){
                var urlArray =  urlURL.value.split("?");
                if(urlArray.length > 1){
                    telBroj.classList.add("wrong");
                    var parametriURL = urlArray[1].split("&");
                    var paramVrijednostURL = [];
                    var alertURL = "";
                    for(var i = 0;i<parametriURL.length;i++){
                        paramVrijednostURL[i*2] = parametriURL[i].split("=")[0];
                        paramVrijednostURL[(i*2)+1] = parametriURL[i].split("=")[1];
                        alertURL += "GET parametar " + paramVrijednostURL[i*2] + " i vrijednost " + paramVrijednostURL[(i*2)+1] + " nije dozvoljen na ovoj stranici \n";
                    }
                    alert(alertURL);
                }else{
                    telBroj.classList.remove("wrong");
                    steps++;
                }
            }

            if(telBroj.value == "" && telBroj.type == "text"){
                labelTelBroj.textContent = "Broj telefona:*";
                telBroj.classList.add("wrong");
            }else{
                labelTelBroj.textContent = "Broj telefona:";
                telBroj.classList.remove("wrong");
                steps++;
            }

            if(fieldsetOstalo.style.display = "none" && steps == 9){
                fieldsetOstalo.style.display = "block";
            }

            if(!tocnoDatumVrijeme){
                labelDateTime.textContent = "Datum ispunjavanja:*";
                dateTime.classList.add("wrong");
            }else{
                labelDateTime.textContent = "Datum ispunjavanja:";
                dateTime.classList.remove("wrong");
                steps++;
            }

            if(!tocnoMotivacija){
                labelMotivacija.textContent = "Motivacija:*";
                motivacija.classList.add("wrong");
            }else{
                labelMotivacija.textContent = "Motivacija:";
                motivacija.classList.remove("wrong");
                steps++;
            }

            if(steps!=11){
                event.preventDefault();
            }
        })

        reset.addEventListener("click",function(event){
            fieldsetSpol.style.display = "none";
            fieldsetOsobnePreferencije.style.display = "none";
            fieldsetContact.style.display = "none";
            fieldsetOstalo.style.display = "none";
        })
    }

    if(naslovStranice == "Multimedija"){
        var multimediaImgs = document.querySelectorAll(".multimedia__content__images img");
        var multimediaFirstImg = multimediaImgs[0];
        var multimediaSecondImg = multimediaImgs[1];
        var multimediaThirdImg = multimediaImgs[2];
        var multimediaFirstFigureCaption = document.getElementById("multimediaFirstFigureCaption");
        var multimediaThirdFigureCaption = document.getElementById("multimediaThirdFigureCaption");
        multimediaFirstImg.addEventListener("mouseover",function(){
            this.classList.add("bigger");
            multimediaFirstFigureCaption.classList.add("removingBorder");
        })
        multimediaFirstImg.addEventListener("mouseout",function(){
            this.classList.remove("bigger");
            multimediaFirstFigureCaption.classList.remove("removingBorder");
        })
        multimediaSecondImg.addEventListener("mouseover",function(){
            this.classList.add("rotation");
        })
        multimediaSecondImg.addEventListener("mouseout",function(){
            this.classList.remove("rotation");
        })
        multimediaThirdImg.addEventListener("mouseover",function(){
            this.classList.add("bigger");
            multimediaThirdFigureCaption.classList.add("removingBorder");
        })
        multimediaThirdImg.addEventListener("mouseout",function(){
            this.classList.remove("bigger");
            multimediaThirdFigureCaption.classList.remove("removingBorder");
        })
    }
    
    var btnPrijava = document.getElementById("btnPrijava");
    var btnOdjava = document.getElementById("btnOdjava");
    var btnPrijaviSe = document.getElementById("btnPrijaviSe");
    var textKorIme = document.getElementById("textKorIme");
    var textExpiryDate = document.getElementById("textExpiryDate");
    var cookiePrijavaArray = document.cookie.split(";");
    if(cookiePrijavaArray[1] != null && textKorIme && textExpiryDate){
        var printKorIme = cookiePrijavaArray[0].slice(7).split(";");
        var printExpiryDate = cookiePrijavaArray[1].slice(10).split(";");
        textKorIme.textContent = printKorIme;
        textExpiryDate.textContent = printExpiryDate;
        btnPrijava.style.display="none";
    }else{
        if(btnOdjava){
            btnOdjava.style.display="none";
        }
    }
    if(btnPrijaviSe){
        btnPrijaviSe.addEventListener("click",function(event){
            var korime = document.getElementById("korime").value;
            var korloz = document.getElementById("korloz").value;
            if(korime && korloz){
                cookiePrijavaArray[0] = "korime";
                var today = new Date();
                var expiryDate = new Date();
                expiryDate.setTime(today.getTime() + 1000 * 60 * 10);
                document.cookie = "korime=" + korime + ";expires=" + expiryDate.toGMTString() + ";SameSite=None; Path=/";
                document.cookie = "trajanje= " + expiryDate.toGMTString() + ";expires=" + expiryDate.toGMTString() + ";SameSite=None; Path=/";
            }else{
                event.preventDefault();
            }
        });
    }
    if(btnOdjava){
        btnOdjava.addEventListener("click",function(){
            document.cookie = cookiePrijavaArray[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=None; Path=/";
            document.cookie = "trajanje=;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=None; Path=/";
        })
    }

    var siteInDirectory = naslovStranice == "Kreativna" || naslovStranice == "Multimedija" || naslovStranice == "O autoru" || naslovStranice == "Prikaz podataka";
    var siteOutsideDirectory = naslovStranice == "Ferrari" || naslovStranice == "Obrazac";
    if(naslovStranice== "Prijava"){
        document.cookie = cookiePrijavaArray[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=None; Path=/";
        document.cookie = "trajanje=;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=None; Path=/";
    }
    if(!cookiePrijavaArray[1] && siteInDirectory){
        window.location = "../prijava.html";
    }else if(!cookiePrijavaArray[1] && siteOutsideDirectory){
        window.location = "prijava.html";
    }

    var btnEditPage = document.getElementById("btnEditPage");
    if(btnEditPage){
        btnEditPage.addEventListener("click",function(){
            document.write("<div>            <h1>Editaj stranicu</h1>            <form action=''>                <p>Odaberi font family:</p>                <input type='radio' id='radioCursive' value='00' name='ffamily'>                <label for='radioCursive'>Cursive</label><br>                <input type='radio' id='radioFantasy' value='01' name='ffamily'>                <label for='radioFantasy'>Fantasy</label><br>                <input type='radio' id='radioMonospace' value='02' name='ffamily'>                <label for='radioMonospace'>Monospace</label><br>                <input type='radio' id='radioSantSerif' value='03' name='ffamily'>                <label for='radioSantSerif'>Sant-Serif</label><br><br>                <p>Odaberi boju slova:</p>                <input type='radio' id='radioRed' value='11' name='txtcolor'>                <label for='radioRed'>Crvena</label><br>                <input type='radio' id='radioDarkRed' value='12' name='txtcolor'>                <label for='radioDarkRed'>Tamna crvena</label><br>                <input type='radio' id='radioGray' value='13' name='txtcolor'>                <label for='radioGray'>Siva</label><br>                <input type='radio' id='radioLightGray' value='14' name='txtcolor'>                <label for='radioLightGray'>Svjetlo siva</label><br><br>                <p>Odaberi debljinu slova:</p>                <input type='radio' id='radioVeryLight' value='21' name='fweight'>                <label for='radioVeryLight'>Jako tanka</label><br>                <input type='radio' id='radioLight' value='22' name='fweight'>                <label for='radioLight'>Tanka</label><br>                <input type='radio' id='radioHeavy' value='23' name='fweight'>                <label for='radioHeavy'>Debela</label><br>                <input type='radio' id='radioVeryHeavy' value='24' name='fweight'>                <label for='radioVeryHeavy'>Jako debela</label><br><br>                <p>Odaberi boju pozadine</p>                <input type='radio' id='radioLightPinkBag' value='31' name='bbackground'>                <label for='radioLightPinkBag'>Svijetlo roza</label><br>                <input type='radio' id='radioLightGreenBag' value='32' name='bbackground'>                <label for='radioLightGreenBag'>Svijetlo zelena</label><br>                <input type='radio' id='radioLightBlueBag' value='33' name='bbackground'>                <label for='radioLightBlueBag'>Svijetlo plava</label><br>                <input type='radio' id='radioLightGrayBag' value='34' name='bbackground'>                <label for='radioLightGrayBag'>Svijetlo siva</label><br><br>                <p>Italic (da/ne)</p>                <input type='radio' id='radioItalicYes' value='41' name='heading'>                <label for='radioItalicYes'>Da</label><br>                <input type='radio' id='radioItalicNo' value='42' name='heading'>                <label for='radioItalicNo'>Ne</label><br>                <input type='submit' value='Promijeni' id='btnPromjeni'>            </form>        </div>");
            document.body.style.background="#181818";
            document.body.style.color="white";
            document.getElementsByTagName("input")[18].style.marginTop = "20px";
            var btnPromjeni = document.getElementById("btnPromjeni");
            btnPromjeni.addEventListener("click",function(event){
                var ffamily = document.getElementsByName("ffamily");
                var selectedFfamily;
                var txtcolor = document.getElementsByName("txtcolor");
                var selectedTxtcolor;
                var fweight = document.getElementsByName("fweight");
                var selectedFweight;
                var bbackground = document.getElementsByName("bbackground");
                var selectedBbackground;
                var heading = document.getElementsByName("heading");
                var selectedHeading;
                for(var i = 0; i < ffamily.length; i++) {
                    if(ffamily[i].checked)
                    selectedFfamily = ffamily[i].value;
                }
                for(var i = 0; i < txtcolor.length; i++) {
                    if(txtcolor[i].checked)
                    selectedTxtcolor = txtcolor[i].value;
                }
                for(var i = 0; i < fweight.length; i++) {
                    if(fweight[i].checked)
                    selectedFweight = fweight[i].value;
                }
                for(var i = 0; i < bbackground.length; i++) {
                    if(bbackground[i].checked)
                    selectedBbackground = bbackground[i].value;
                }
                for(var i = 0; i < heading.length; i++) {
                    if(heading[i].checked)
                    selectedHeading = heading[i].value;
                }
                if(selectedFfamily && selectedTxtcolor && selectedFweight && selectedBbackground && selectedHeading){
                    document.cookie = "promjena=" + selectedFfamily + selectedTxtcolor + selectedFweight + selectedBbackground + selectedHeading + ";expires=" + cookiePrijavaArray[1].slice(10).split(";") + ";SameSite=None; Path=/";
                }else{
                    event.preventDefault();
                }
                
            })
        })
    }
    if(cookiePrijavaArray[2]){
        switch(cookiePrijavaArray[2].slice(10,12)){
            case "00": document.body.style.fontFamily = "cursive"; break;
            case "01": document.body.style.fontFamily = "fantasy"; break;
            case "02": document.body.style.fontFamily = "monospace"; break;
            case "03": document.body.style.fontFamily = "sans-serif"; break;
        }
        switch(cookiePrijavaArray[2].slice(12,14)){
            case "11": document.body.style.color = "red"; break;
            case "12": document.body.style.color = "#340303"; break;
            case "13": document.body.style.color = "#a59191"; break;
            case "14": document.body.style.color = "#0c0b0b"; break;
        }
        switch(cookiePrijavaArray[2].slice(14,16)){
            case "21": document.body.style.fontWeight = "200"; break;
            case "22": document.body.style.fontWeight = "300"; break;
            case "23": document.body.style.fontWeight = "700"; break;
            case "24": document.body.style.fontWeight = "900"; break;
        }
        switch(cookiePrijavaArray[2].slice(16,18)){
            case "31": document.body.style.background = "#d9adb5"; break;
            case "32": document.body.style.background = "#97bd97"; break;
            case "33": document.body.style.background = "#8f8fbb"; break;
            case "34": document.body.style.background = "#b5a5a5"; break;
        }
        switch(cookiePrijavaArray[2].slice(18,20)){
            case "41": document.body.style.fontStyle = "italic"; break;
            case "42": document.body.style.fontStyle = "none"; break;
        }
    }

    var btnPrikaziGraf = document.getElementById("btnPrikaziGraf");
    if(btnPrikaziGraf){
        btnPrikaziGraf.addEventListener("click",function(event){
            var graphForm = document.getElementById("graph__form");
            if(document.getElementById("textGraphValue1").value && document.getElementById("textGraphValue2").value && document.getElementById("textGraphValue3").value && document.getElementById("textGraphValue4").value){
            var textGraphValue1 = (10-parseInt(document.getElementById("textGraphValue1").value))*10;
            var textGraphValue2 = (10-parseInt(document.getElementById("textGraphValue2").value))*10;
            var textGraphValue3 = (10-parseInt(document.getElementById("textGraphValue3").value))*10;
            var textGraphValue4 = (10-parseInt(document.getElementById("textGraphValue4").value))*10;
                graphForm.style.display = "none";
                btnPrikaziGraf.style.display = "none";
                var canvas = document.getElementsByTagName("canvas")[0];
                var ctx = canvas.getContext("2d");
                var rectWidth = 80;
                var startPoint = 80;
                var gap = 80;
                ctx.beginPath();
                ctx.rect(0, textGraphValue1, gap, startPoint-textGraphValue1);
                ctx.fillStyle = 'green';
                ctx.fillRect(0, textGraphValue1, gap, startPoint-textGraphValue1);
                ctx.rect(startPoint, textGraphValue2, gap, startPoint-textGraphValue2);
                ctx.fillStyle = 'red';
                ctx.fillRect(startPoint, textGraphValue2, gap, startPoint-textGraphValue2);
                ctx.rect(startPoint*2, textGraphValue3, gap, startPoint-textGraphValue3);
                ctx.fillStyle = 'blue';
                ctx.fillRect(startPoint*2, textGraphValue3, gap, startPoint-textGraphValue3);
                ctx.rect(startPoint*3, textGraphValue4, gap, startPoint-textGraphValue4);
                ctx.fillStyle = 'orange';
                ctx.fillRect(startPoint*3, textGraphValue4, gap, startPoint-textGraphValue4);
                ctx.stroke();
            }else{
                event.preventDefault();
            }
        })
    }
})



