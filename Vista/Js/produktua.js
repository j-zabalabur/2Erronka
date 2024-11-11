function produktu_id_jaso(){
    // estekaren parametroak artzen ditu
    const url = window.location.search;
    // esteka parametroak interpretatzen dituen klase bat inbokatzen du
    const urlParams = new URLSearchParams(url)
    // estekaren 'id' parametroaren balioa bueltatzen du
    return urlParams.get('id')
}

function prezio_beheratua(prezioa, beherapena){
    return Math.floor((prezioa - (prezioa * beherapena) / 100) * 100) / 100
}

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

async function produktu_datuak_txertatu(){
    const datuak = await fetch_data(`http://localhost/2Erronka/Controlador/ProduktuaIkusi.php?id=${produktu_id_jaso()}`)

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
}

document.addEventListener('DOMContentLoaded', produktu_datuak_txertatu)