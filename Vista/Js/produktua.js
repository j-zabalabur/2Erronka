function produktu_id_jaso(){
    const url = window.location.search;
    const urlParams = new URLSearchParams(url)
    return urlParams.get('id')
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
        return e
    }
}

async function produktu_datuak_txertatu(){
    const datuak = await fetch_data(`http://localhost/2Erronka/Controlador/ProduktuaIkusi.php?id=${produktu_id_jaso()}`)
    console.log(datuak.izena)
}

produktu_datuak_txertatu()