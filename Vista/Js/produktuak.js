async function denak_ikusi(){
await fetch("../../Controlador/ProduktuakIkusi.php")
.then(response => response.json())
.then(data => {
    console.log(data)
})
}

denak_ikusi()