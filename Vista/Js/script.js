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
        return null;
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

function saioa_itxi(){
    localStorage.removeItem('id')
    localStorage.removeItem('admin')
    localStorage.removeItem('saioaHasita')
    location.href = 'http://localhost/2Erronka/Vista/saioaHasi.html'
}

document.addEventListener('DOMContentLoaded', erabiltzaile_datuak_txertatu)

document.addEventListener('DOMContentLoaded', function(){
    const saioa_testua = document.querySelector('#saioa span')
    if(localStorage.getItem('id')){
        saioa_testua.innerText = "Saioa Itxi"
        saioa_testua.parentNode.style.color = "red"
    }else{
        saioa_testua.innerText = "Saioa Hasi"
    }
})

document.getElementById('saioa').addEventListener('click', function(e){
    e.preventDefault()
    saioa_itxi()
})

document.getElementById('orga').addEventListener('click', function(e){
    e.preventDefault()
    if(localStorage.getItem('id')){
        location.href = 'http://localhost/2Erronka/Vista/orga.html'
    }else{
        location.href = 'http://localhost/2Erronka/Vista/saioaHasi.html'
    }
}) 