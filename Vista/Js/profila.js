async function erabiltzaile_datuak_txertatu(){
    if(localStorage.getItem('id')){
        const id = localStorage.getItem('id')
        const datuak = await fetch_data(`../Controlador/ErabiltzaileaDatuakJaso.php?id=${id}`)

        document.getElementById('izen-abizenak').innerText = `${datuak.izena} ${datuak.abizena}`
        document.getElementById('email').innerText = datuak.email
        document.getElementById('orga-produktu-kopurua').innerText = datuak.orga_produktuak
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

document.addEventListener('DOMContentLoaded', erabiltzaile_datuak_txertatu)
document.addEventListener('DOMContentLoaded', erabiltzaile_input_informazioa_bete)
setTimeout(inputak_egiaztatu, 300)

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