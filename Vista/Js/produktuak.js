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

    const minmax = `
    <div id="minmax-section">
        <span>
            <input type="number" min="${min}" max="${max}" value="${min}">
            <p>€</p>
        </span>
        <span>
            <input type="number" min="${min}" max="${max}" value="${max}">
            <p>€</p>
        </span>
    </div>
    `;
    document.getElementById('filtroa').innerHTML += minmax;
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

    minmax_input_txertatu()
    biltzailea_txertatu()

    document.querySelector("#minmax-section span input").addEventListener("change", function(e){
        // TODO Metodoa amaitu
    })  

    const cards  = document.querySelectorAll('#produktuak .card')

    document.querySelectorAll('#filtroa select')[0].addEventListener("change", function(e){
        if(e.target.value == 0){
            document.getElementById('produktuak').innerHTML = ""
            cards.forEach(card => {
                document.getElementById('produktuak').appendChild(card)
            })
        }
    
        if(e.target.value == 1){
          // TODO Txikienetik handienera ordenatu  
        }
    
        if(e.target.value == 2){
        // TODO Handienetik txikienera ordenatu
        }
    })

    })
}

produktuak_ikusi()