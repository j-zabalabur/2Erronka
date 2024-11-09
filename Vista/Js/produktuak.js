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

    bannera_txertatu(item)
    return card 
}

function minmax_input_txertatu(){
    let prezioak_textua = document.querySelectorAll('p.produktu-prezioa')
    let prezioak = []
    prezioak_textua.forEach(t => {
        const prezioa = parseFloat(t.innerText.replace('€', ''))
        prezioak.push(prezioa)
    })
    // Prezio txikiena eta prezio handiena borobiltzen dira
    const min = Math.floor(Math.min.apply(Math, prezioak))
    const max = Math.ceil(Math.max.apply(Math, prezioak))

    const minmax = 
    `<div id="minmax-section">
        <span>
            <input type="number" min="${min}" max="${max}" value="${min}">
            <p>€</p>
        </span>
        <span>
            <input type="number" min="${min}" max="${max}" value="${max}">
            <p>€</p>
        </span>
    </div>`
    
    document.getElementById('filtroa').innerHTML += minmax
}

function biltzailea_txertatu(){
    const biltzailea = 
        `<div id="bilatzailea">
            <input type="text" placeholder="Bilatu..." class="styled-input" id="search-input">
            <span id="testua-ezabatu">×</span>
        </div>`
    
    document.getElementById('filtroa').innerHTML += biltzailea

    document.querySelector('#bilatzailea input').addEventListener('input', function(e){
        if(e.target.value != ""){
            document.getElementById('testua-ezabatu').style.display = "block"
        }

        document.querySelectorAll('.produktu-informazioa .produktu-izena').forEach(izena => {
            if(!izena.innerText.includes(e.target.value.toUpperCase())){
                izena.parentNode.parentNode.style.display="none"
            }else{
                izena.parentNode.parentNode.style.display="flex"
            }
        })
    })

    document.getElementById('testua-ezabatu').addEventListener('click', function(){
        document.querySelector('#bilatzailea input').value = ""
        document.getElementById('testua-ezabatu').style.display = "none"
        document.querySelectorAll('#produktuak .card').forEach(card => {
            card.style.display = "flex"
        })
    })
}

async function fetch_data(url) {
    const response = await fetch(url)
    return await response.json()
}

function produktuak_ezabatu() {
    const container = document.getElementById('produktuak')
    if (container.innerHTML !== "") {
        container.innerHTML = ""
    }
}

function produktua_txertatu(item) {
    const productsContainer = document.getElementById('produktuak')
    productsContainer.innerHTML += produktua_sortu(item)
}

function bannera_txertatu(item) {
    if (item.nabarmendua != null) {
        const banner = `
            <div class="carousel-item ${(document.querySelector('#carouselExampleIndicators .carousel-inner').innerHTML == "") ? 'active' : ''}">
                <img src="${item.nabarmendua}" class="d-block w-100" alt="banner-argazkia">
            </div>
        `
        document.querySelector('.carousel-inner').innerHTML += banner
    }
}

function orden_filtroa_txertatu() {
    const cards = document.querySelectorAll('#produktuak .card')
    
    document.querySelectorAll('#filtroa select')[0].addEventListener("change", function(e) {
        const productsContainer = document.getElementById('produktuak')

        switch (e.target.value) {
            case '0':
                productsContainer.innerHTML = ""
                cards.forEach(card => productsContainer.appendChild(card))
                break
            case '1':
                produktuak_ikusi_txikienetik_handienera()
                break
            case '2':
                produktuak_ikusi_handienetik_txikienera()
                break
        }
    })
}

async function produktuak_ikusi() {
    const data = await fetch_data("http://localhost/2Erronka/Controlador/ProduktuakIkusi.php")

    produktuak_ezabatu()
    
    data.forEach(item => {
        produktua_txertatu(item)
    })

    minmax_input_txertatu()
    biltzailea_txertatu()

    orden_filtroa_txertatu()
}

async function produktuak_ikusi_txikienetik_handienera(){
    const data = await fetch_data("http://localhost/2Erronka/Controlador/ProduktuakIkusiTxikienetikHandienera.php")

    produktuak_ezabatu()
    
    data.forEach(item => {
        produktua_txertatu(item)
    })
}

async function produktuak_ikusi_handienetik_txikienera(){
    const data = await fetch_data("http://localhost/2Erronka/Controlador/ProduktuakIkusiHandienetikTxikienera.php")

    produktuak_ezabatu()
    
    data.forEach(item => {
        produktua_txertatu(item)
    })
}

produktuak_ikusi()
