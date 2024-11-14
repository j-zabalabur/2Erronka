async function fetch_data(url){
    try{
        const data = await fetch(url)
        .then(res => {
            if(res.ok){
                return res.json()
            }
        })

        return data
    }catch(e){
        console.error(e)
        return null;
    }
}

function prezio_beheratua(prezioa, beherapena){
    return Math.floor((prezioa - (prezioa * beherapena) / 100) * 100) / 100
}

document.addEventListener('DOMContentLoaded', function(){
    const saioa_testua = document.querySelector('#saioa span')
    if(localStorage.getItem('id')){
        saioa_testua.innerText = "Saioa Itxi"
        saioa_testua.parentNode.style.color = "red"
    }else{
        saioa_testua.innerText = "Saioa Hasi"
    }
})