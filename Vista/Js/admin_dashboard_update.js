function erabiltzaileakAldatu(erab){
    window.open("./erabiltzaileaInsert.html", "_blank", "width=400,height=600,top=50,left=150");
    erabiltzailea=JSON.parse(decodeURIComponent(erab));
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