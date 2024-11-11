function produktu_id_jaso(){
    const url = window.location.search;
    const urlParams = new URLSearchParams(url)
    return urlParams.get('id')
}

async function produktu_datuak_jaso(){
    const id = produktu_id_jaso()
    await fetch(`http://localhost/2Erronka/Controlador/ProduktuaIkusi.php?id=${id}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
}

produktu_datuak_jaso()