//================DELETE FUNTZIOAK===============
function produktuaEzabatu(id) {
    Swal.fire({
        title: 'Zihur zaude erregistroa ezabatu nahi duzula?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Bai',
        cancelButtonText: 'Ez'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch("../Controlador/ProduktuaEzabatu.php", {
                method: "POST",
                body: id
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

function deskontuKodeaEzabatu(kodea) {
    Swal.fire({
        title: 'Zihur zaude erregistroa ezabatu nahi duzula?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Bai',
        cancelButtonText: 'Ez'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch("../Controlador/DeskontuKodeaEzabatu.php", {
                method: "POST",
                body: kodea
            }).then(response => response.text()).then(response => {
                if (response == "ok") {
                   deskontuKodeakIkusi();
                   okMezua();
                } else {
                   koMezua();
                }
            })
        }
    })
}
function erabiltzaileakEzabatu(id) {
    Swal.fire({
        title: 'Zihur zaude erregistroa ezabatu nahi duzula?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Bai',
        cancelButtonText: 'Ez'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch("../Controlador/ErabiltzaileaEzabatu.php", {
                method: "POST",
                body: id
            }).then(response => response.text()).then(response => {
                if (response == "ok") {
                   erabiltzaileakIkusi();
                   okMezua();
                } else {
                   koMezua();
                }
            })
        }
    })
}

function eskaerakEzabatu(id) {
    Swal.fire({
        title: 'Zihur zaude erregistroa ezabatu nahi duzula?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Bai',
        cancelButtonText: 'Ez'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch("../Controlador/EskaeraEzabatu.php", {
                method: "POST",
                body: id
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
//======================SWAL ALERT MEZUAK===========================
function okMezua(){
    Swal.fire({
        icon: 'success',
        title: 'Ezabatua',
        showConfirmButton: false,
        timer: 1500
    })
}
function koMezua(){
    Swal.fire({
        icon: 'error',
        title: "Oops...",
        text: "Zerbait gaizki atera da...",
        showConfirmButton: false,
        timer: 1500
    })
}