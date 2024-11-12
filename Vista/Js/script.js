async function fetch_data(url){
    try{
        const data = await fetch(url)
        .then(res => {
            if(res.ok){
                return res.json()
            }else{
                throw new Error(`${res.status}: ${res.statusText}`)
            }
        })

        return data
    }catch(e){
        console.error(e)
        return
    }
}

async function erabiltzaile_datuak_txertatu(){
    if(localStorage.getItem('id')){
        const id = localStorage.getItem('id')
        const datuak = await fetch_data(`http://localhost/2Erronka/Controlador/ErabiltzaileaDatuakJaso.php?id=${id}`)

        document.getElementById('izen-abizenak').innerText = `${datuak.izena} ${datuak.abizena}`
        document.getElementById('email').innerText = datuak.email
        document.getElementById('orga-produktu-kopurua').innerText = datuak.orga_produktuak
    }
}

function prezio_beheratua(prezioa, beherapena){
    return Math.floor((prezioa - (prezioa * beherapena) / 100) * 100) / 100
}

document.addEventListener('DOMContentLoaded', erabiltzaile_datuak_txertatu)