function produktu_id_jaso(){
    // estekaren parametroak artzen ditu
    const url = window.location.search;
    // esteka parametroak interpretatzen dituen klase bat inbokatzen du
    const urlParams = new URLSearchParams(url)
    // estekaren 'id' parametroaren balioa bueltatzen du
    return urlParams.get('id')
}

function produktua_orgara_sartu(){
    try{
        const id_produktua = produktu_id_jaso()
        const id_erabiltzailea = localStorage.getItem('id')
        fetch(`../Controlador/ProduktuaOrgaraSartu.php?id_erabiltzailea=${id_erabiltzailea}&id_produktua=${id_produktua}`)
        .then(erabiltzaile_datuak_txertatu)

        Swal.fire({
            title: "Ondo!",
            text: "Produktu hau zure orgara sartu da",
            icon: "success"
        });
    }catch(e){
        console.error(e)
        return null
    }
}

async function erabiltzaile_datuak_txertatu(){
    if(localStorage.getItem('id')){
        const id = localStorage.getItem('id')
        const datuak = await fetch_data(`../Controlador/ErabiltzaileaDatuakJaso.php?id=${id}`)

        document.getElementById('izen-abizenak').innerText = `${datuak.izena} ${datuak.abizena}`
        document.getElementById('email').innerText = datuak.email
        document.getElementById('orga-produktu-kopurua').innerText = (datuak.orga_produktuak == null) ? 0 : datuak.orga_produktuak
    }
}

function saioa_itxi(){
    localStorage.removeItem('id')
    localStorage.removeItem('admin')
    localStorage.removeItem('saioaHasita')
    location.href = '../index.html'
}

document.addEventListener('DOMContentLoaded', erabiltzaile_datuak_txertatu)

document.getElementById('orga').addEventListener('click', function(e){
    e.preventDefault()
    if(localStorage.getItem('id')){
        location.href = 'orga.html'
    }else{
        location.href = 'saioaHasi.html'
    }
}) 

async function produktu_datuak_txertatu(){
    const datuak = await fetch_data(`../Controlador/ProduktuaIkusi.php?id=${produktu_id_jaso()}`)

    document.querySelector('#datuak-container img').src = `data:image/jpeg;base64, ${datuak.argazkia}`

    document.querySelector('#produktu-datuak #izena').innerText = datuak.izena

    document.querySelectorAll('#produktu-datuak .badge')[0].innerText = datuak.eragina
    document.querySelectorAll('#produktu-datuak .badge')[1].innerText = (datuak.beherapena != 0) ? `-${datuak.beherapena}%` : ''

    document.querySelector('#produktu-prezioa-info del.produktu-prezioa p').innerText = (datuak.beherapena != 0) ? `${datuak.prezioa}€` : ''
    document.querySelector('#produktu-prezioa-info p.produktu-prezioa').innerText = (datuak.beherapena != 0) ? `${prezio_beheratua(datuak.prezioa, datuak.beherapena)}€` : `${datuak.prezioa}€`
    document.getElementById('produktu-prezioa-info').style.gap = (document.querySelector('#produktu-prezioa-info del.produktu-prezioa p').innerText != "") ? '15px' : '0px'

    const deskripzio_osoa = datuak.deskripzioa.split('---')
    const tituloa = deskripzio_osoa[0]
    const gorputza = deskripzio_osoa[1];

    document.querySelector('#deskripzioa #tituloa').innerText = tituloa.toUpperCase()
    document.querySelector('#deskripzioa #deskripzio-gorputza').innerText = gorputza

    // let urlAntigua = window.location.href;
    // const nuevaURL = `/produktuak/${datuak.eragina.toUpperCase()}-${datuak.izena}.html`;
    // history.pushState(null, null, nuevaURL);
}

document.addEventListener('DOMContentLoaded', produktu_datuak_txertatu)
document.querySelector('#produktu-datuak button').addEventListener('click', function(){
    if(localStorage.getItem('id')){
        produktua_orgara_sartu()
    }else{
        location.href = 'saioaHasi.html'
    }
})
document.getElementById('saioa').addEventListener('click', function(e){
    e.preventDefault()
    if(localStorage.getItem('id')){
        saioa_itxi()
    }else{
        location.href = "saioaHasi.html"
    }
}) 
