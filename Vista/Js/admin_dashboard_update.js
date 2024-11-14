function erabiltzaileakAldatu(erab){
    const erabiltzailea = JSON.parse(decodeURIComponent(erab));
    
    const params = new URLSearchParams({
        id: erabiltzailea.id,
        izena: erabiltzailea.izena,
        prezioa: erabiltzailea.prezioa,
        marka: erabiltzailea.eragina,
        beherapena: erabiltzailea.beherapena,
        deskripzioa: erabiltzailea.deskripzioa
    }).toString();
    
    window.open(`./ErabiltzaileaAldatu.html?${params}`, "_blank", "width=400,height=600,top=50,left=150");
}
function produktuakAldatu(prod) {
    const produktua = JSON.parse(decodeURIComponent(prod));
    
    const params = new URLSearchParams({
        id: produktua.id,
        izena: produktua.izena,
        prezioa: produktua.prezioa,
        marka: produktua.eragina,
        beherapena: produktua.beherapena,
        deskripzioa: produktua.deskripzioa
    }).toString();
    
    window.open(`./ProduktuaAldatu.html?${params}`, "_blank", "width=400,height=600,top=50,left=150");
}