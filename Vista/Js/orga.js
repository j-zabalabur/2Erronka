const idEra = localStorage.getItem('id');

const izenaAdmin = document.getElementById('izen-abizenak');
const emailAdmin = document.getElementById('email');
const saioaItxiBtn = document.getElementById('saioaItxi');

fetch("../Controlador/ErabiltzaileakIkusi.php")
.then(response => response.json())
.then(erabiltzaile => {
    for (let i = 0; i <  erabiltzaile.length; i++){
        if (localStorage.getItem('id') == erabiltzaile[i].id){
            izenaAdmin.textContent = erabiltzaile[i].izena + " " + erabiltzaile[i].abizena;
            emailAdmin.textContent = erabiltzaile[i].email;
        }
    }
});

saioaItxiBtn.onclick = () =>{
    localStorage.removeItem('id');
    localStorage.removeItem('saioaHasita');
    localStorage.removeItem('admin');
}

let arrayKodeak = new Array();
//Deskontu kodeak array batean gorde
fetch("../Controlador/DeskontuKodeakIkusi.php")
.then(response => response.json())
.then(data => {
    data.forEach(item => {
        const k = {
            KODEA: item.kodea,
            BEHERAPENA: item.deskontua
        }

        arrayKodeak.push(k);
    });
});

const produktuPanela = document.getElementById('produktuak');
const guztira = document.getElementById('guztira');
let preziogehiketa = 0;

fetch(`../Controlador/orgaIkusi.php?idErabiltzaile=${idEra}`)
.then(response => response.json())
.then(produktuak => {
    console.log(produktuak);

    produktuak.forEach(produktua => {
        
        
        const p = document.createElement('div');
        p.classList.add('produktua');

        if (produktua.beherapena == 0){
            preziogehiketa += eval(produktua.prezioa*produktua.kopurua);
            
            p.innerHTML =
            `<img src="data:image/jpeg;base64,${produktua.argazkia}">
                <div class="d-flex flex-column justify-content-between">
                    <h3>${produktua.izena}</h3>
                    <div class="d-flex align-items-center">
                        <p id="prezioa">${produktua.prezioa}€ X</p>
                        <p id="kopurua">${produktua.kopurua}</p>
                        <div class="d-flex flex-column geziak">
                            <button id="gehitu"><i class="bi bi-chevron-compact-up"></i></button>
                            <button id="murriztu"><i class="bi bi-chevron-compact-down"></i></button>
                        </div>
                    </div>
                </div>
            <p id="kendu">x</p>
            `;
        }else{
            let prezioBeheratuta = ((produktua.prezioa - (produktua.prezioa*produktua.beherapena/100)) * produktua.kopurua).toFixed(2);
            preziogehiketa += eval(prezioBeheratuta);
            
            p.innerHTML =
            `<img src="data:image/jpeg;base64,${produktua.argazkia}">
                <div class="d-flex flex-column justify-content-between">
                    <h3>${produktua.izena}</h3>
                    <div class="d-flex align-items-center flex-wrap">
                        <del class="mr-3" id="prezioa" style="margin-right:10px;">${produktua.prezioa}€</del>
                        <p id="prezioa">${prezioBeheratuta/produktua.kopurua}€ X</p>
                        <p id="kopurua">${produktua.kopurua}</p>
                        <div class="d-flex flex-column geziak">
                            <button id="gehitu"><i class="bi bi-chevron-compact-up"></i></button>
                            <button id="murriztu"><i class="bi bi-chevron-compact-down"></i></button>
                        </div>
                    </div>
                </div>
            <p id="kendu">x</p>
            `;
        }

        
        
        guztira.textContent = preziogehiketa + "€";
        produktuPanela.appendChild(p);
    });
});