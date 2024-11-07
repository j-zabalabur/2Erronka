function produktua_sortu(item){
    let prezioa_beheratua = 0

    if(item.beherapena != 0){
        // Gehienez 2 zenbaki dezimal egon ahal dira
        prezioa_beheratua = Math.floor((item.prezioa - (item.prezioa * item.beherapena) / 100) * 100) / 100 
    }

    const card = `
        <a href="produktua.php?id=${item.id}" class="card">
            <img src="data:image/jpeg;base64, ${item.argazkia}">
            <div class="produktu-informazioa">
                <p class="produktu-izena">${item.izena}</p>
                <span class="badge text-bg-dark eragina">${item.eragina}</span>
                
                <div class="produktu-prezioa-info">
                    ${(item.beherapena != 0) ? `<del class="produktu-prezioa"><p>${item.prezioa}€</p></del>` : ''}
                    <p class="produktu-prezioa position-relative">${(item.beherapena != 0) ? prezioa_beheratua : item.prezioa}€</p>
                    ${(item.beherapena != 0) ? `<span class="badge rounded-pill text-bg-danger">-${item.beherapena}%</span>` : ''}
                </div>
            </div>
        </a>
    `

    return card 
}

function range_input_txertatu(){
    let prezioak_textua = document.querySelectorAll('p.produktu-prezioa')
    let prezioak = []
    prezioak_textua.forEach(t => {
        const prezioa = parseFloat(t.innerText.replace('€', ''))
        prezioak.push(prezioa)
    })

    const min = Math.floor(Math.min.apply(Math, prezioak))
    const max = Math.ceil(Math.max.apply(Math, prezioak))

    const range = `
    <div id="rango-container">
        <span id="prezio-rango-container">
            <p>${min}€</p>
            <p>${max}€</p>
        </span>
        <input type="range" id="rango" value="${min}" min="${min}" max="${max}">
        <span><input type="number" min="${min} max="${max}" value="${min}"><p>€</p></span>
    </div>
    `
    document.getElementById('filtroa').innerHTML += range

    document.querySelector('#rango-container input[type="range"]').addEventListener('change', function(e){
        document.querySelector('#rango-container input[type="number"]').value = e.target.value
    })
}

function biltzailea_txertatu(){
    const biltzailea = `<input type="text" name="bilatu" id="bilatu">`
    document.getElementById('filtroa').innerHTML += biltzailea

}

async function produktuak_ikusi(){
await fetch("http://localhost/2Erronka/Controlador/ProduktuakIkusi.php")
.then(response => response.json())
.then(data => {
    console.log(data)

    data.forEach(item => {
        document.getElementById('produktuak').innerHTML += produktua_sortu(item)

        if(item.nabarmendua != null){
            banner_argazkia = `
                <div class="carousel-item ${(document.querySelector('#carouselExampleIndicators .carousel-inner').innerHTML == "") ? 'active' : null}">
                    <img src="${item.nabarmendua}" class="d-block w-100" alt="banner-argazkia">
                </div>
                `
            document.querySelector('.carousel-inner').innerHTML += banner_argazkia
        }
    })

    range_input_txertatu()
    biltzailea_txertatu()
})
}

document.querySelector('header').addEventListener('scroll', function(){
    if(window.scrollY > 5){
        document.querySelector('header').classList.add('scroll')
    }else{
        document.querySelector('header').classList.remove('scroll')
    }
})

produktuak_ikusi()