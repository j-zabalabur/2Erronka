async function erabiltzaile_datuak_txertatu(){
    if(localStorage.getItem('id')){
        const id = localStorage.getItem('id')
        const datuak = await fetch_data(`../Controlador/ErabiltzaileaDatuakJaso.php?id=${id}`)

        document.getElementById('izen-abizenak').innerText = `${datuak.izena} ${datuak.abizena}`
        document.getElementById('email').innerText = datuak.email
        document.getElementById('orga-produktu-kopurua').innerText = datuak.orga_produktuak
    }
}

// async function erabiltzaile_input_informazioa_bete(){
//     if(localStorage.getItem('id')){
//         const id = localStorage.getItem('id')
//         const datuak = await fetch_data(``)
//     }
// }

document.addEventListener('DOMContentLoaded', erabiltzaile_datuak_txertatu)