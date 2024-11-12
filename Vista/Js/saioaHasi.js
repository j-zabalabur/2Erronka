//Elementos del DOM
const $email = document.getElementById('email');
const $pasahitza = document.getElementById('pasahitza');
const $emailMsg = document.getElementById('emailMsg');
const $passMsg = document.getElementById('passMsg');
const $form = document.querySelector('form');

fetch("../Controlador/ErabiltzaileakIkusi.php")
    .then(response => response.json())
    .then(erabiltzaile => console.log(erabiltzaile));

$form.addEventListener('submit', (e) =>{
    e.preventDefault();
    let existitzenDa = true;

    fetch("../Controlador/ErabiltzaileakIkusi.php")
    .then(response => response.json())
    .then(erabiltzaile => {
        for (let i = 0; i < erabiltzaile.length; i++){
            if ($email.value == erabiltzaile[i].email && $pasahitza.value != erabiltzaile[i].pasahitza){
                $pasahitza.classList.add('mal');
                $passMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Pasahitza ez da zuzena';
                existitzenDa = false;

                break;
            }else if ($email.value == erabiltzaile[i].email && $pasahitza.value == erabiltzaile[i].pasahitza){
                localStorage.setItem('saioaHasita', true);
                localStorage.setItem('id', erabiltzaile[i].id);
                localStorage.setItem('admin', erabiltzaile[i].administratzailea);
                existitzenDa = false;

                if (erabiltzaile[i].administratzailea == 0){
                    location.href = "../produktuak.html";
                }else{
                    location.href = "AdminDashboard.php";
                }

                break;
            }
        }

        if (existitzenDa == true){
            $email.classList.add('mal');
            $emailMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Email hori ez da existitzen';
        }else{
            $email.classList.remove('mal');
            $emailMsg.innerHTML = '';
        }
    });


});