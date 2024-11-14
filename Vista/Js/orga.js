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

const produktuPanela = document.getElementById('produktuak');
const guztira = document.getElementById('guztira');
const template = document.querySelector('template');
const body = document.querySelector('body');
let preziogehiketa = 0;
guztira.innerHTML = preziogehiketa + "€";

//Erabiltzailearen orga lortu eta bistaratu.
fetch(`../Controlador/orgaIkusi.php?idErabiltzaile=${idEra}`)
.then(response => response.json())
.then(produktuak => {

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

const deskontuInput = document.getElementById('deskontua');
const deskontuPanela = document.getElementById('deskontuPanela');
const deskontuBotoia = document.createElement('button');
deskontuBotoia.classList.add("deskontuBotoia");
deskontuBotoia.innerHTML = "Aplikatu";
let idatzi = true;

deskontuInput.addEventListener('input', () =>{
    deskontuBotoia.classList.remove("joan");
    if(idatzi){
        deskontuPanela.appendChild(deskontuBotoia);
        idatzi = false;
    }

    if(deskontuInput.value == ""){
        deskontuBotoia.classList.add("joan");
        setTimeout(()=>{
            deskontuPanela.removeChild(deskontuBotoia);
        },550);
        idatzi = true;
    }

    if(deskontuInput.value.includes(" ")){
        deskontuInput.value = deskontuInput.value.trim();
    }
});

let deskontuErabilita = false;
let erabilitakoDeskontua;
const deskontuAkatza = document.getElementById('deskontuAkatza');
const deskontuAplikatuta = document.getElementById('deskontuAplikatuta');

deskontuBotoia.onclick = () =>{
    if (deskontuErabilita){
        deskontuInput.value = "";
        deskontuAkatza.style.display = "block";
        deskontuAkatza.innerHTML = '<i class="bi bi-exclamation-circle"></i> Deskonturen bat erabilita dago';
        setTimeout(()=>{
            deskontuAkatza.innerHTML = "";
            deskontuAkatza.style.display = "none";
        }, 4000);
        deskontuBotoia.classList.add("joan");
        setTimeout(()=>{
            deskontuPanela.removeChild(deskontuBotoia);
        },550);
        idatzi = true;
    }else{
        for (let i = 0; i < arrayKodeak.length; i++){
            if (deskontuInput.value == arrayKodeak[i].KODEA){
                erabilitakoDeskontua = arrayKodeak[i].BEHERAPENA / 100;                
                guztira.innerHTML = eval(guztira.textContent.replace("€","")) - (guztira.textContent.replace("€","") * (arrayKodeak[i].BEHERAPENA/100)).toFixed(2) + "€";
                deskontuErabilita = true;
                deskontuInput.value = "";
                deskontuBotoia.classList.add("joan");
                setTimeout(()=>{
                    deskontuPanela.removeChild(deskontuBotoia);
                },550);
                idatzi = true;
                const desk = document.createElement('span');
                desk.id = 'beherapena';
                desk.innerHTML = "-" + arrayKodeak[i].BEHERAPENA + "%";

                guztira.insertAdjacentElement('beforebegin', desk);
                deskontuAplikatuta.style.display = "block";
                deskontuAplikatuta.innerHTML = '<i class="bi bi-check2"></i> "' + arrayKodeak[i].KODEA + '" deskontua aplikatu da';
                setTimeout(()=>{
                    deskontuAplikatuta.innerHTML = "";
                    deskontuAplikatuta.style.display = "none";
                }, 4000);
                break;
            }
        }

        if (!deskontuErabilita){
            deskontuAkatza.style.display = "block";
            deskontuAkatza.innerHTML = '<i class="bi bi-exclamation-circle"></i> Hori ez da deskontu kode bat';
            setTimeout(()=>{
                deskontuAkatza.innerHTML = "";
                deskontuAkatza.style.display = "none";
            }, 4000);
        }
    }
    
}


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
                
                if(deskontuErabilita){
                    guztira.textContent = eval(guzti - (prezioEza*kopuruEza - (prezioEza*kopuruEza) * erabilitakoDeskontua)).toFixed(2) + "€";
                }else{
                    guztira.textContent = eval(guzti - prezioEza*kopuruEza).toFixed(2) + "€";
                }
                
                produktuPanela.removeChild(btn.parentNode);

                if (produktuPanela.childElementCount == 0){
                    produktuPanela.innerHTML = '<h5 class="text-center"><i class="bi bi-exclamation-circle"></i> Gehitu gustuko duzun zapaturen bat.</h5>';
                }
            }
        });  
    });

    const gehituGeziak = document.querySelectorAll("#gehitu");
    const murriztuGeziak = document.querySelectorAll("#murriztu");

    gehituGeziak.forEach(gehitu =>{
        gehitu.addEventListener('click', () =>{
            const prod = gehitu.parentNode.parentNode.parentNode.parentNode;
            const kop = gehitu.parentNode.parentNode.querySelector('#kopurua');
            const pre = gehitu.parentNode.parentNode.querySelector('#prezioa');
            
            if(kop.textContent < 99 && !deskontuErabilita){
                kop.textContent = eval(kop.textContent)+1;
                guztira.textContent = (eval(guztira.textContent.replace("€","")) + eval(pre.textContent)).toFixed(2) + "€";
                fetch(`../Controlador/OrgaAldatu.php?kop=${kop.textContent}&idEra=${idEra}&idPro=${prod.id}`);              
            }else if(kop.textContent < 99 && deskontuErabilita){
                kop.textContent = eval(kop.textContent)+1;
                guztira.textContent = (eval(guztira.textContent.replace("€","")) + (eval(pre.textContent) - eval(pre.textContent) * erabilitakoDeskontua)).toFixed(2) + "€";
                fetch(`../Controlador/OrgaAldatu.php?kop=${kop.textContent}&idEra=${idEra}&idPro=${prod.id}`);        
            }
            
        });
    });

    murriztuGeziak.forEach(murriztu =>{
        murriztu.addEventListener('click', () =>{
            const prod = murriztu.parentNode.parentNode.parentNode.parentNode;
            const kop = murriztu.parentNode.parentNode.querySelector('#kopurua');
            const pre = murriztu.parentNode.parentNode.querySelector('#prezioa');
            
            if(kop.textContent > 1 && !deskontuErabilita){
                kop.textContent = eval(kop.textContent)-1;
                guztira.textContent = (eval(guztira.textContent.replace("€","")) - eval(pre.textContent)).toFixed(2) + "€";
                fetch(`../Controlador/OrgaAldatu.php?kop=${kop.textContent}&idEra=${idEra}&idPro=${prod.id}`);           
            }else if (kop.textContent > 1 && deskontuErabilita){
                kop.textContent = eval(kop.textContent)-1;
                guztira.textContent = (eval(guztira.textContent.replace("€","")) - (eval(pre.textContent) - eval(pre.textContent) * erabilitakoDeskontua)).toFixed(2) + "€";
                fetch(`../Controlador/OrgaAldatu.php?kop=${kop.textContent}&idEra=${idEra}&idPro=${prod.id}`);           
            }
            
        });
    });
});

