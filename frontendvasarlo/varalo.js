document.addEventListener("DOMContentLoaded", function(){
    const createButton = document.getElementById("create");
    const readButton = document.getElementById("read");
    const updateButton = document.getElementById("update");    
    const selectButton = document.getElementById("select");

    createButton.addEventListener("click", async function () {
        let vasarloID = document.createElement("vasarloID").value;
        const baseUrl ="http://localhost/vasarlok/backendvasarlo/index.php?vasar/" + vasarloID;
        const formdata = new FormData(document.getElementById("vasarloForm"));
        let options = {
            method: "POST",
            mode: "cors",
            body: formdata
        };
        let response = await fetch(baseUrl, options);
        if(response.ok){
            console.log("Sikeres feltöltés");
        }else{
            console.error("Sikertelen feltöltés");
        }
        return response;
    });

    updateButton.addEventListener("click", async function(){        
        const baseUrl ="http://localhost/vasarlok/backendvasarlo/index.php?vasar/" + vasarloID;
        let object = {
            vasarloID: document.getElementById("vasarloID").value,
            nev: document.getElementById("nev").value,
            szuletett: document.getElementById("szuletett").value,
            helyseg: document.getElementById("helyseg").value,
            megyeID: document.getElementById("megyeID").value        
        };
        let body = JSON.stringify(object);
        let options = {
            method: "PUT",
            mode: "cors",            
            body: body
        };
        let response = await fetch(baseUrl, options);
        return response;
    });

    readButton.addEventListener("click", async function(){
        const baseUrl ="http://localhost/vasarlok/backendvasarlo/index.php?vasar";
        let options = {
            method: "GET",
            mode: "cors"
        }
        let response = await fetch(baseUrl, options);
        if(response.ok){
            let data = await response.json();
            vasarListazas(data);
        }else{
            console.error("Hiba a szerver válaszában");
        }
    });

    function vasarListazas(vasarlok){
        let vasarloDiv = document.getElementById("vasarlolista");
        let tablazat = vasarFejlec();
        for(let vasar of vasarlok){
            tablazat += vasarSor(vasar);
        }
        vasarloDiv.innerHTML = tablazat + "</tbody></tbody>";
        return vasarloDiv;
    };

    function vasarSor(vasar){
        let sor = `<tr>
            <td>${vasar.vasarloID}</td>
            <td>${vasar.nev}</td>
            <td>${vasar.szuletett}</td>
            <td>${vasar.helyseg}</td>
            <td>${vasar.megyeID}</td>
            <td>
                <button type="button" class="btn btn-outline-secondary" onclick="adatBetoltes(${vasar.vasarloID}, '${vasar.nev}', '${vasar.szuletett}', '${vasar.helyseg}', '${vasar.megyeID}')"><i class="fa-regular fa-hand-point-left"></i>Kiválasztás</button>
                <button type="button" class="btn btn-outline-secondary" onclick="adatTorles(${vasar.vasarloID}"><i class="fa-solid fa-trash"></i>Törlés</button>
            </td>
        </tr>`;
        return sor;
    };

    function vasarFejlec(){
        let fejlec = `<table class="table table-striped">
        <thead>
            <tr>
                <th>VasarlóID: </th>
                <th>Név: </th>
                <th>Született: </th>
                <th>Helység: </th>
                <th>MegyeID: </th>                
                <th>Művelet: </th>
            </tr>
        </thead>
        <tbody>`;
        return fejlec;
    };
    
});

function adatBetoltes(vasarloID, nev, szuletett, helyseg, megyeID){
    let baseUrl="http://localhost/vasarlok/backendvasarlo/index.php?vasar/" + vasarloID;
    let options={
        method: "GET",
        mode: "cors"
    };
    let response= fetch(baseUrl, options)
    document.getElementById("vasarloID").value=vasarloID;
    document.getElementById("nev").value=nev;
    document.getElementById("szuletett").value=szuletett;
    document.getElementById("helyseg").value=helyseg;
    document.getElementById("megyeID").value=megyeID;
    response.then(function(response){
        if(response.ok){
            let data= response.json();
        }else{
            console.error("Hiba a szerverben!");
        }
    });
}

function adatTorles(vasarloID){
    let baseUrl="http://localhost/vasarlok/backendvasarlo/index.php?vasar/" + vasarloID;
    let options={
        method: "DELETE",
        mode: "cors"
    };
    let response= fetch(baseUrl, options);
    response.then(function(response){
        if(response.ok){
            let data= response.json();
        }
        else{
            console.error("Hiba a szerverben!");
        }
    });
}