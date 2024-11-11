       //cSaioa itxi eta Adminaren izena, abizena eta email-a erakutsi===========
       const izenaAdmin = document.getElementById('izen-abizenak');
       const emailAdmin = document.getElementById('email');
       const saioaItxiBtn = document.getElementById('saioaItxi');

       fetch("../Controlador/ErabiltzaileakIkusi.php")
        .then(response => response.json())
        .then(erabiltzaile => {
            for (let i = 0; i <  erabiltzaile.length; i++){
                if (localStorage.getItem('id') == erabiltzaile[i].id){
                    izenaAdmin.textContent = erabiltzaile[i].izena + " " + erabiltzaile[i].abizena;
                    emailAdmin.textContent = erabiltzaile[i].email;
                }
            }
        });

        saioaItxiBtn.onclick = () =>{
            localStorage.removeItem('id');
            localStorage.removeItem('saioaHasita');
            localStorage.removeItem('admin');
        }
       
