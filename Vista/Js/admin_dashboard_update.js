function erabiltzaileakAldatu(erab){
    const erabiltzailea = JSON.parse(decodeURIComponent(erab));
    
    const params = new URLSearchParams({
        id: erabiltzailea.id,
        izena: erabiltzailea.izena,
        abizena: erabiltzailea.abizena,
        pasahitza: erabiltzailea.pasahitza,
        admin: erabiltzailea.admin,
        helbidea: erabiltzailea.helbidea
    }).toString();
    window.open(`./erabiltzaileaAldatu.html?${params}`, "_blank", "width=400,height=600,top=50,left=150");
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
    
    window.open(`./produktuaAldatu.html?${params}`, "_blank", "width=400,height=600,top=50,left=150");
}

function deskontuKodeaAldatu(kodea) {
    const deskontuKodea = JSON.parse(decodeURIComponent(kodea));
    
    const params = new URLSearchParams({
        kodea: deskontuKodea.kodea,
        deskontua: deskontuKodea.deskontua,

    }).toString();
    
    window.open(`./deskontuKodeaAldatu.html?${params}`, "_blank", "width=400,height=600,top=50,left=150");
}