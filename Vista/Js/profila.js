async function erabiltzaile_datuak_txertatu(){
    if(localStorage.getItem('id')){
        const id = localStorage.getItem('id')
        const datuak = await fetch_data(`../Controlador/ErabiltzaileaDatuakJaso.php?id=${id}`)

        document.getElementById('izen-abizenak').innerText = `${datuak.izena} ${datuak.abizena}`
        document.getElementById('email').innerText = datuak.email
        document.getElementById('orga-produktu-kopurua').innerText = datuak.orga_produktuak
    }
}



function arazoak_bilatu(){
    const input_izena = document.getElementById('input_izena')
    const input_abizena = document.getElementById('input_abizena')
    const input_pasahitza = document.getElementById('input_pasahitza')
    const input_helbidea = document.getElementById('input_helbidea')
    const aldatu_botoia = document.querySelector('form button') 

    const $izenaMsg = document.getElementById('izenaMsg');
    const $abizenaMsg = document.getElementById('abizenaMsg');
    const $helbideaMsg = document.getElementById('helbideaMsg');
    const $pasahitzaMsg = document.getElementById('pasahitzaMsg');

    let izena_ondo = false, abizena_ondo = false, pasahitza_ondo = false, helbidea_ondo = false

    input_izena.addEventListener('input', ()=>{
        if (input_izena.value.trim() == ""){
            input_izena.classList.add('mal');
            $izenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin duzu eremu hau hutsik utzi';
            input_izena.value = input_izena.value.trim();
            izena_ondo = false
        }else if (/[^a-zA-Z]/.test(input_izena.value)){
            input_izena.classList.add('mal');
            $izenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Letrak bakarrik egon daitezke eta hutsunerik gabe';
            izena_ondo = false;
        }else if (input_izena.value.length > 15){
            input_izena.classList.add('mal');
            $izenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Izenak 15 karaktere izan ditzake soilik';
            izena_ondo = false
        }else{
            input_izena.classList.remove('mal');
            $izenaMsg.textContent = "";
            izena_ondo = true;
        }
    });
    
    input_abizena.addEventListener('input', ()=>{
        if (input_abizena.value.trim() == ""){
            input_abizena.classList.add('mal');
            $abizenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin duzu eremu hau hutsik utzi';
            input_abizena.value = input_abizena.value.trim();
            abizena_ondo = false;
        }else if (/[^a-zA-Z]/.test(input_abizena.value)){
            input_abizena.classList.add('mal');
            $abizenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Letrak bakarrik egon daitezke eta hutsunerik gabe';
            abizena_ondo = false;
        }else if (input_abizena.value.length > 15){
            input_abizena.classList.add('mal');
            $abizenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Abizenak 15 karaktere izan ditzake soilik';
            abizena_ondo = false;
        }else{
            input_abizena.classList.remove('mal');
            $abizenaMsg.textContent = "";
            abizena_ondo = true;
        }
    });

    input_pasahitza.addEventListener('input', ()=>{
        if (input_pasahitza.value.trim() == ""){
            input_pasahitza.classList.add('mal');
            $pasahitzaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin duzu eremu hau hutsik utzi';
            input_pasahitza.value = input_pasahitza.value.trim();
            pasahitza_ondo = false;
        }else if(/[\s]/.test(input_pasahitza.value)){
            input_pasahitza.classList.add('mal');
            $pasahitzaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin dira hutsuneak utzi';
            pasahitza_ondo = false;
        }else{
            input_pasahitza.classList.remove('mal');
            $pasahitzaMsg.innerHTML = '';
            pasahitza_ondo = true;
        }
    });
    
    input_helbidea.addEventListener('input', ()=>{
        if (input_helbidea.value.trim() == ""){
            input_helbidea.classList.add('mal');
            $helbideaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin duzu eremu hau hutsik utzi';
            input_helbidea.value = input_helbidea.value.trim();
            helbidea_ondo = false;
        }else if (/[^a-zA-Z0-9-.,/\\\s]/.test(input_helbidea.value)){
            input_helbidea.classList.add('mal');
            $helbideaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Formatua txarto dago';
            helbidea_ondo = false;
        }else{
            input_helbidea.classList.remove('mal');
            $helbideaMsg.textContent = "";
            helbidea_ondo = true;
        }
    });

    if(izena_ondo && abizena_ondo && pasahitza_ondo && helbidea_ondo){

    }
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
document.addEventListener('DOMContentLoaded', arazoak_bilatu)