function produktua_sortu(item){
    let prezioa_beheratua = 0

    if(item.beherapena != 0){
        // Gehienez 2 zenbaki dezimal egon ahal dira
        prezioa_beheratua = prezio_beheratua(item.prezioa, item.beherapena)
    }

    const card = `
        <a href="Vista/produktua.html?id=${item.id}" class="card">
            <img src="data:image/jpeg;base64, ${item.argazkia}">
            <div class="produktu-informazioa">
                <p class="produktu-izena">${item.izena}</p>
                <span>
                    <span class="badge text-bg-dark eragina">${item.eragina}</span>
                    ${(item.beherapena != 0) ? `<span class="badge rounded-pill text-bg-danger">-${item.beherapena}%</span>` : ''}
                </span>
                <div class="produktu-prezioa-info">
                    ${(item.beherapena != 0) ? `<del class="produktu-prezioa"><p>${item.prezioa}€</p></del>` : ''}
                    <p class="produktu-prezioa position-relative">${(item.beherapena != 0) ? prezioa_beheratua : item.prezioa}€</p>
                </div>
            </div>
        </a>
    `

    bannera_txertatu(item)
    return card 
}

async function eraginak_txertatu(){
    const eragin_filtroa = document.querySelectorAll('#filtroa select')[1]
    const data = await fetch_data('Controlador/eraginakJaso.php')

    data.forEach(item => {
        const eragina = `
            <option value="${item.eragina}">${item.eragina}</option>
        `
        eragin_filtroa.innerHTML += eragina
    })
}

function produktua_txertatu(item) {
    const productsContainer = document.getElementById('produktuak')
    productsContainer.innerHTML += produktua_sortu(item)
}

function bannera_txertatu(item) {
    if (item.nabarmendua != null) {
        const banner = `
            <div class="carousel-item ${(document.querySelector('#carousel .carousel-inner').innerHTML == "") ? 'active' : ''}">
                <img src="${item.nabarmendua}" class="d-block w-100" alt="banner-argazkia">
            </div>
        `
        document.querySelector('.carousel-inner').innerHTML += banner
    }
}

async function produktuak_ikusi(produktuak) {
    document.getElementById('produktuak').innerHTML = ""
    if(produktuak == null){
        produktuak = await fetch_data('Controlador/ProduktuakIkusi.php')
    }
    produktuak.forEach(item => {
        produktua_txertatu(item);
    });
}

function saioa_itxi(){
    localStorage.removeItem('id')
    localStorage.removeItem('admin')
    localStorage.removeItem('saioaHasita')
    location.href = 'index.html'
}

async function erabiltzaile_datuak_txertatu(){
    if(localStorage.getItem('id')){
        const id = localStorage.getItem('id')
        const datuak = await fetch_data(`Controlador/ErabiltzaileaDatuakJaso.php?id=${id}`)

        document.getElementById('izen-abizenak').innerText = `${datuak.izena} ${datuak.abizena}`
        document.getElementById('email').innerText = datuak.email
        document.getElementById('orga-produktu-kopurua').innerText = (datuak.orga_produktuak == null) ? 0 : datuak.orga_produktuak
    }
}

document.getElementById('orga').addEventListener('click', function(e){
    e.preventDefault()
    if(localStorage.getItem('id')){
        location.href = 'Vista/orga.html'
    }else{
        location.href = 'Vista/saioaHasi.html'
    }
})

async function filtroak_aplikatu(){
    let produktuak_filtratuta = await fetch_data('Controlador/ProduktuakIkusi.php')

    // Bilatzaile filtroa
    const bilatzaile_balioa = document.querySelector('#bilatzailea input').value.toLowerCase();
    if(bilatzaile_balioa){
        produktuak_filtratuta = produktuak_filtratuta.filter(produktua => {
          // Convert both values to lowercase for case-insensitive comparison
          return produktua.izena.toLowerCase().includes(bilatzaile_balioa.toLowerCase());
      });
  }

    // Orden filtroa
    const orden_filtroa = document.querySelectorAll('#filtroa select')[0].value
    if(orden_filtroa == 1){
        produktuak_filtratuta = produktuak_filtratuta.sort((a, b) => prezio_beheratua(a.prezioa, a.beherapena) - prezio_beheratua(b.prezioa, b.beherapena))
    }else if(orden_filtroa == 2){
        produktuak_filtratuta = produktuak_filtratuta.sort((a, b) => prezio_beheratua(b.prezioa, b.beherapena) - prezio_beheratua(a.prezioa, a.beherapena))
    }

    // Eragin filtroa
    const eragin_filtroa = document.querySelectorAll('#filtroa select')[1].value
    if(eragin_filtroa){
        produktuak_filtratuta = produktuak_filtratuta.filter(produktua =>
            produktua.eragina === eragin_filtroa
          );
    }
    produktuak_ikusi(produktuak_filtratuta)
}

eraginak_txertatu()

document.querySelector('#bilatzailea input').addEventListener('input', filtroak_aplikatu)
document.querySelectorAll('#filtroa select')[0].addEventListener('change', filtroak_aplikatu)
document.querySelectorAll('#filtroa select')[1].addEventListener('change', filtroak_aplikatu)

produktuak_ikusi()

document.addEventListener('DOMContentLoaded', erabiltzaile_datuak_txertatu)
document.getElementById('saioa').addEventListener('click', function(e){
    e.preventDefault()
    if(localStorage.getItem('id')){
        saioa_itxi()
    }else{
        location.href = "Vista/saioaHasi.html"
    }
}) 