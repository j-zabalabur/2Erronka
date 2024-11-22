async function erabiltzaile_datuak_txertatu(){
    if(localStorage.getItem('id')){
        const id = localStorage.getItem('id')
        const datuak = await fetch_data(`../Controlador/ErabiltzaileaDatuakJaso.php?id=${id}`)

        document.getElementById('izen-abizenak').innerText = `${datuak.izena} ${datuak.abizena}`
        document.getElementById('email').innerText = datuak.email
        document.getElementById('orga-produktu-kopurua').innerText = (datuak.orga_produktuak == null) ? 0 : datuak.orga_produktuak
    }
}

function taula_eskaeren_produktuak_txertatu(datuak){
    const eskaera_produktuak = `
        <tr>
            <td>${datuak.izena}</td>
            <td>${datuak.eragina}</td>
            <td>${datuak.kopurua}</td>
            <td>${datuak.eskaera_lerroa_prezioa_hasieran}€</td>
            <td>${datuak.deskontua_prod}%</td>    
        </tr>
    `

    document.querySelector(`.table #produktu-taula-${datuak.id_eskaera} tbody`).innerHTML += eskaera_produktuak
}

function taula_lerroa_sortu(datuak){
    const taula_lerroa = `
    <tr data-bs-toggle="collapse" data-id="${datuak.id_eskaera}" data-bs-target="#produktu-taula-${datuak.id_eskaera}" aria-expanded="false" aria-controls="produktu-taula-${datuak.id_eskaera}">
      <th scope="row">${datuak.id_eskaera}</th>
      <td>${datuak.egoera}</td>
      <td>${datuak.deskontua_cod}%</td>
      <td>${datuak.data}</td>
    </tr>
    <td colspan="4" class="produktu-taula collapse" id="produktu-taula-${datuak.id_eskaera}">
        <table class="table table-bordered">
            <thead class="table-light">
                <tr>
                    <th>Produktu_izena</th>
                    <th>Eragina</th>
                    <th>Kopurua</th>
                    <th>Prezioa</th>
                    <th>Beherapena</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
        <strong class="totala">Totala: <span>${parseFloat(datuak.eskaera_prezioa_amaieran)}</span>€</strong>
    </td>
    `

    return taula_lerroa
}

async function taula_datuak_kargatu(){
    const taula_gorputza = document.querySelector('.table tbody')

    if(localStorage.getItem('id')){
        const id = localStorage.getItem('id')
        const datuak = await fetch_data(`../Controlador/EskaerakJasoErabiltzailearenArabera.php?id=${id}`)
        datuak.forEach(eskaera => {
            if(!taula_gorputza.querySelector(`.table tr[data-id="${eskaera.id_eskaera}"]`)){
                taula_gorputza.innerHTML += taula_lerroa_sortu(eskaera)
            }
            taula_eskaeren_produktuak_txertatu(eskaera)
        })
    }
}

function inputak_egiaztatu() {
    const input_izena = document.getElementById('input_izena');
    const input_abizena = document.getElementById('input_abizena');
    const input_pasahitza = document.getElementById('input_pasahitza');
    const input_helbidea = document.getElementById('input_helbidea');

    const $izenaMsg = document.getElementById('izenaMsg');
    const $abizenaMsg = document.getElementById('abizenaMsg');
    const $helbideaMsg = document.getElementById('helbideaMsg');
    const $pasahitzaMsg = document.getElementById('pasahitzaMsg');

    let izena_ondo = true, abizena_ondo = true, pasahitza_ondo = true, helbidea_ondo = true;

    function izena_egiaztatu() {
        if (input_izena.value.trim() === "") {
            input_izena.classList.add('mal');
            $izenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin duzu eremu hau hutsik utzi';
            izena_ondo = false;
        } else if (/[^a-zA-Z]/.test(input_izena.value)) {
            input_izena.classList.add('mal');
            $izenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Letrak bakarrik egon daitezke eta hutsunerik gabe';
            izena_ondo = false;
        } else if (input_izena.value.length > 15) {
            input_izena.classList.add('mal');
            $izenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Izenak 15 karaktere izan ditzake soilik';
            izena_ondo = false;
        } else {
            input_izena.classList.remove('mal');
            $izenaMsg.textContent = "";
            izena_ondo = true;
        }
    }

    function abizena_egiaztatu() {
        if (input_abizena.value.trim() === "") {
            input_abizena.classList.add('mal');
            $abizenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin duzu eremu hau hutsik utzi';
            abizena_ondo = false;
        } else if (/[^a-zA-Z]/.test(input_abizena.value)) {
            input_abizena.classList.add('mal');
            $abizenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Letrak bakarrik egon daitezke eta hutsunerik gabe';
            abizena_ondo = false;
        } else if (input_abizena.value.length > 15) {
            input_abizena.classList.add('mal');
            $abizenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Abizenak 15 karaktere izan ditzake soilik';
            abizena_ondo = false;
        } else {
            input_abizena.classList.remove('mal');
            $abizenaMsg.textContent = "";
            abizena_ondo = true;
        }
    }

    function pasahitza_egiaztatu() {
        if (input_pasahitza.value.trim() === "") {
            input_pasahitza.classList.add('mal');
            $pasahitzaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin duzu eremu hau hutsik utzi';
            pasahitza_ondo = false;
        } else if (/[\s]/.test(input_pasahitza.value)) {
            input_pasahitza.classList.add('mal');
            $pasahitzaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin dira hutsuneak utzi';
            pasahitza_ondo = false;
        } else {
            input_pasahitza.classList.remove('mal');
            $pasahitzaMsg.innerHTML = '';
            pasahitza_ondo = true;
        }
    }

    function helbidea_egiaztatu() {
        if (input_helbidea.value.trim() === "") {
            input_helbidea.classList.add('mal');
            $helbideaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin duzu eremu hau hutsik utzi';
            helbidea_ondo = false;
        } else if (/[^a-zA-Z0-9-.,/\\\s]/.test(input_helbidea.value)) {
            input_helbidea.classList.add('mal');
            $helbideaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Formatua txarto dago';
            helbidea_ondo = false;
        } else {
            input_helbidea.classList.remove('mal');
            $helbideaMsg.textContent = "";
            helbidea_ondo = true;
        }
    }

    izena_egiaztatu();
    abizena_egiaztatu();
    pasahitza_egiaztatu();
    helbidea_egiaztatu();
    
    input_izena.addEventListener('input', izena_egiaztatu);
    input_abizena.addEventListener('input', abizena_egiaztatu);
    input_pasahitza.addEventListener('input', pasahitza_egiaztatu);
    input_helbidea.addEventListener('input', helbidea_egiaztatu);

    // Retornamos el resultado de todas las validaciones
    return izena_ondo && abizena_ondo && pasahitza_ondo && helbidea_ondo;
}


async function erabiltzaile_input_informazioa_bete(){
    if(localStorage.getItem('id')){
        const id = localStorage.getItem('id')
        const datuak = await fetch_data(`../Controlador/GetErabiltzailea.php?id=${id}`)

        document.getElementById('input_izena').value = datuak.izena
        document.getElementById('input_abizena').value = datuak.abizena
        document.getElementById('input_email').value = datuak.email
        document.getElementById('input_pasahitza').value = datuak.pasahitza
        document.getElementById('input_helbidea').value = datuak.helbidea
    }
}

document.querySelector('form').addEventListener('submit', async function(e){
    e.preventDefault()

    const formularioa = e.target
    const input_datuak = new FormData(formularioa)
    input_datuak.append('id', localStorage.getItem('id'))

    if(inputak_egiaztatu()){
        Swal.fire({
            title: "Ziur zaude?",
            text: "Zure erabiltzailearen datuak aldatuko dira",
            showCancelButton: true,
            confirmButtonText: "Bai",
            cancelButtonText: "Ez"
          }).then(async (result) => {
            if (result.isConfirmed) {
                await fetch('../Controlador/ErabiltzaileaProfilaDatuakAldatu.php', {
                    method: "POST",
                    body: input_datuak
                })
                .then(res => res.json())
                .then(res => {
                    if(res.status){
                        Swal.fire("Ondo!", res.msg, "success")
                        erabiltzaile_datuak_txertatu()
                    }else{
                        errore_mezua(res.msg)
                    }
                })
            }
          });
    }else{
        errore_mezua("Eguneratu nahi izan diren datuak ez dute formatu zuzena. Mesedez, saiatu berriro")
    }
})

function saioa_itxi(){
    localStorage.removeItem('id')
    localStorage.removeItem('admin')
    localStorage.removeItem('saioaHasita')
    location.href = '../index.html'
}

document.getElementById('saioa').addEventListener('click', function(e){
    e.preventDefault()
    if(localStorage.getItem('id')){
        saioa_itxi()
    }else{
        location.href = "saioaHasi.html"
    }
})

document.addEventListener('DOMContentLoaded', erabiltzaile_datuak_txertatu)
document.addEventListener('DOMContentLoaded', erabiltzaile_input_informazioa_bete)
document.addEventListener('DOMContentLoaded', taula_datuak_kargatu)
setTimeout(inputak_egiaztatu, 1000)