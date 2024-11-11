function ezabatu(id) {
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
                   Swal.fire({
                       icon: 'success',
                       title: 'Ezabatua',
                       showConfirmButton: false,
                       timer: 1500
                   })
                }
                
            })
            
        }
    })
}