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

function eskaeraEgoeraAldatu(id, egoera) {
    Swal.fire({
        title: 'Zihur zaude eskaeraren egoera aldatu nahi duzula?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Bai',
        cancelButtonText: 'Ez'
    }).then((result) => {
        if (result.isConfirmed) {
            const formData = new FormData();
                formData.append("id", id);
                formData.append("egoera", egoera);
            fetch("../Controlador/EskaeraEgoeraAldatu.php", {
                method: "POST",
                body: formData
            }).then(response => response.text()).then(response => {
                if (response == "ok") {
                   eskaerakIkusi();
                   okMezua();
                } else {
                   koMezua();
                }
            })
        }
    })
}

function produktuEgoeraAldatu(id, egoera) {
    Swal.fire({
        title: 'Zihur zaude produktuaren egoera aldatu nahi duzula?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Bai',
        cancelButtonText: 'Ez'
    }).then((result) => {
        if (result.isConfirmed) {
            const formData = new FormData();
                formData.append("id", id);
                formData.append("egoera", egoera);
            fetch("../Controlador/ProduktuEgoeraAldatu.php", {
                method: "POST",
                body: formData
            }).then(response => response.text()).then(response => {
                if (response == "ok") {
                   produktuakIkusi();
                   okMezua();
                } else {
                   koMezua();
                }
            })
        }
    })
}