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
                <span">
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

    return card 
}

function range_input_txertatu(){
    let prezioak_textua = document.querySelectorAll('p.produktu-prezioa')
    let prezioak = []
    prezioak_textua.forEach(t => {
        const prezioa = parseFloat(t.innerText.replace('€', ''))
        prezioak.push(prezioa)
    })
    // Prezio txikiena eta prezio handiena borobiltzen dira
    const min = Math.floor(Math.min.apply(Math, prezioak))
    const max = Math.ceil(Math.max.apply(Math, prezioak))

    const range = `
    <div id="slider-section">
        <div id="prezioak-label">
            <span class="prezioa-label">${min}€</span>
            <span class="prezioa-label">${max}€</span>
        </div>
        <input type="range" min="${min}" max="${max}" value="${min}" id="prezioa-range">
        <div id="prezioa-zenbakia-container">
            <input type="number" min="${min}" max="${max}" value="${min}" id="prezioa-number">
            <span class="currency-symbol">€</span>
        </div>
    </div>
    `
    document.getElementById('filtroa').innerHTML += range
    
    document.getElementById('prezioa-range').addEventListener('change', function(e){
        document.getElementById('prezioa-range').value = e.target.value
    })
}

function biltzailea_txertatu(){
    const biltzailea = `
        <div id="bilatzailea">
            <input type="text" placeholder="Bilatu..." class="styled-input" id="search-input">
            <span id="testua-ezabatu">×</span>
        </div>
    `
    document.getElementById('filtroa').innerHTML += biltzailea

    document.querySelector('#bilatzailea input').addEventListener('input', function(e){
        if(e.target.value != ""){
            document.getElementById('testua-ezabatu').style.display = "block"
        }
    })

    document.getElementById('testua-ezabatu').addEventListener('click', function(){
        document.querySelector('#bilatzailea input').value = ""
        document.getElementById('testua-ezabatu').style.display = "none"
    })
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

produktuak_ikusi()