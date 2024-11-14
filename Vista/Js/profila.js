async function erabiltzaile_datuak_txertatu(){
    if(localStorage.getItem('id')){
        const id = localStorage.getItem('id')
        const datuak = await fetch_data(`../Controlador/ErabiltzaileaDatuakJaso.php?id=${id}`)

        document.getElementById('izen-abizenak').innerText = `${datuak.izena} ${datuak.abizena}`
        document.getElementById('email').innerText = datuak.email
        document.getElementById('orga-produktu-kopurua').innerText = datuak.orga_produktuak
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