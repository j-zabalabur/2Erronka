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
const template = document.querySelector('template');
const body = document.querySelector('body');
let preziogehiketa = 0;
guztira.innerHTML = preziogehiketa + "€";

fetch(`../Controlador/orgaIkusi.php?idErabiltzaile=${idEra}`)
.then(response => response.json())
.then(produktuak => {
    console.log(produktuak);

    if (produktuak.length != 0){
        produktuPanela.innerHTML = "";
    }

    produktuak.forEach(produktua => {
        
        
        const p = document.createElement('div');
        p.classList.add('produktua');
        p.id = produktua.id_produktua;

        if (produktua.beherapena == 0){
            preziogehiketa += eval(produktua.prezioa*produktua.kopurua);
            
            p.innerHTML =
            `<img src="data:image/jpeg;base64,${produktua.argazkia}">
                <div class="d-flex flex-column justify-content-between">
                    <h3>${produktua.izena}</h3>
                    <div class="d-flex align-items-center">
                        <p id="prezioa">${produktua.prezioa}</p>
                        <p id="simboloak">€ X</p>
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
                        <del class="mr-3" id="prezioaLehen" style="margin-right:10px;">${produktua.prezioa}€</del>
                        <p id="prezioa">${prezioBeheratuta/produktua.kopurua}</p>
                        <p id="simboloak">€ X</p>
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


        guztira.textContent = preziogehiketa.toFixed(2) + "€";
        produktuPanela.appendChild(p);


    });

    const kenduBtn = document.querySelectorAll('#kendu');

    kenduBtn.forEach(btn =>{
        btn.addEventListener('click', () =>{
            const klon = template.content.cloneNode(true);
            const modala = klon.querySelector('.modalEzabatu');
            const fondo = klon.querySelector('.fondoBeltza');
            const ezbtn = klon.querySelector('#ez');
            const baibtn = klon.querySelector('#bai');

            body.appendChild(fondo);
            body.appendChild(modala);

            ezbtn.onclick = ()=>{
                body.removeChild(fondo);
                body.removeChild(modala);
            }

            baibtn.onclick = ()=>{
                body.removeChild(fondo);
                body.removeChild(modala);
                fetch(`../Controlador/OrgaEzabatu.php?idEra=${idEra}&idPro=${btn.parentNode.id}`);
                const prezioEza = btn.parentNode.querySelector('#prezioa').textContent;
                const kopuruEza = btn.parentNode.querySelector('#kopurua').textContent;
                const guzti = guztira.textContent.replace("€", "");
                
                guztira.textContent = eval(guzti - prezioEza*kopuruEza).toFixed(2) + "€";
                
                produktuPanela.removeChild(btn.parentNode);

                if (produktuPanela.childElementCount == 0){
                    produktuPanela.innerHTML = '<h5 class="text-center"><i class="bi bi-exclamation-circle"></i> Gehitu gustuko duzun zapaturen bat.</h5>';
                }
            }
        })
        
    })
});