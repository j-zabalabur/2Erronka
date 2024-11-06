async function produktuak_ikusi(){
await fetch("http://localhost/2Erronka/Controlador/ProduktuakIkusi.php")
.then(response => response.json())
.then(data => {
    console.log(data)

    data.forEach(item => {
        let prezioa_beheratua = 0

        if(item.beherapena != 0){
            prezioa_beheratua = item.prezioa - (item.prezioa * item.beherapena) / 100
        }

        const card = `
            <div class="card">
                <img src="data:image/jpeg;base64, ${item.argazkia}">
                <div class="produktu-informazioa">
                    <a href="produktua.php?id=${item.id}" class="produktu-izena">${item.izena}</a>
                    <div class="produktu-prezioa-info">
                        <del class="produktu-prezioa ${(item.beherapena != 0) ? "d-flex" : "d-none"}"><p>${item.prezioa}€</p></del>
                        <p class="produktu-prezioa position-relative">${(item.beherapena != 0) ? prezioa_beheratua : item.prezioa}€</p>
                        <span class="badge rounded-pill text-bg-danger ${(item.beherapena != 0) ? "d-flex" : "d-none"}">-${item.beherapena}%</span>
                    </div>
                </div>
                
            </div>
        `
        document.getElementById('produktuak').innerHTML += card

        if(item.nabarmendua != null){
            banner_argazkia = `
                <div class="carousel-item ${(document.querySelector('#carouselExampleIndicators .carousel-inner').innerHTML == "") ? 'active' : null}">
                    <img src="${item.nabarmendua}" class="d-block w-100" alt="banner-argazkia">
                </div>
                `
            document.querySelector('.carousel-inner').innerHTML += banner_argazkia
        }
    })
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