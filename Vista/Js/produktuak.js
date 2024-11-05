async function denak_ikusi(){
await fetch("http://localhost/2Erronka/Controlador/ProduktuakIkusi.php")
.then(response => response.json())
.then(data => {
    console.log(data)

    data.forEach(item => {
        const img = document.createElement('img')
        img.src = `data:image/jpeg;base64, ${item.argazkia}`
        document.getElementById('produktuak').appendChild(img)
    })
})
}

denak_ikusi()