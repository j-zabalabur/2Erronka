function erabiltzaileakAldatu(erab){
    window.open("./erabiltzaileaInsert.html", "_blank", "width=400,height=600,top=50,left=150");
    erabiltzailea=JSON.parse(decodeURIComponent(erab));
    console.log(erabiltzailea);









    
    // fetch("../Controlador/ErabiltzaileaAldatu.php", {
    //     method: "POST",
    //     body: 2
    // }).then(response => response.json()).then(response => {

    // })
}
