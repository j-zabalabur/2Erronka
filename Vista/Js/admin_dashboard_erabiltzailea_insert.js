import { erabiltzaileakIkusi } from "admin_dashboard_ikusi.js";

function erabiltzaileaInsertPopUp(){
    window.open("./erabiltzaileaInsert.html", "_blank", "width=400,height=600,top=50,left=150");
}
    //Elementos del DOM
const $form = document.querySelector('form');
const $izena = document.getElementById('izena');
const $abizena = document.getElementById('abizena');
const $helbidea = document.getElementById('helbidea');
const $email = document.getElementById('email');
const $pasahitza = document.getElementById('pasahitza');
const $pasahitzaErr = document.getElementById('pasahitzaE');

const $izenaMsg = document.getElementById('izenaMsg');
const $abizenaMsg = document.getElementById('abizenaMsg');
const $helbideaMsg = document.getElementById('helbideaMsg');
const $emailMsg = document.getElementById('emailMsg');
const $pasahitzaMsg = document.getElementById('pasahitzaMsg');
const $pasahitzaErrMsg = document.getElementById('pasahitzaEMsg');

let izenaOndo, abizenaOndo, helbideaOndo, emailOndo, pasahitzaOndo, pasahitzaErrOndo;

$izena.addEventListener('blur', ()=>{
    if ($izena.value.trim() == ""){
        $izena.classList.add('mal');
        $izenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin duzu eremu hau hutsik utzi';
        $izena.value = $izena.value.trim();
        izenaOndo = false;
    }else if (/[^a-zA-Z]/.test($izena.value)){
        $izena.classList.add('mal');
        $izenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Letrak bakarrik egon daitezke eta hutsunerik gabe';
        izenaOndo = false;
    }else if ($izena.value.length > 15){
        $izena.classList.add('mal');
        $izenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Izenak 15 karaktere izan ditzake soilik';
        izenaOndo = false
    }else{
        $izena.classList.remove('mal');
        $izenaMsg.textContent = "";
        izenaOndo = true;
    }
});

$abizena.addEventListener('blur', ()=>{
    if ($abizena.value.trim() == ""){
        $abizena.classList.add('mal');
        $abizenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin duzu eremu hau hutsik utzi';
        $abizena.value = $abizena.value.trim();
        abizenaOndo = false;
    }else if (/[^a-zA-Z]/.test($abizena.value)){
        $abizena.classList.add('mal');
        $abizenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Letrak bakarrik egon daitezke eta hutsunerik gabe';
        abizenaOndo = false;
    }else if ($abizena.value.length > 15){
        $abizena.classList.add('mal');
        $abizenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Abizenak 15 karaktere izan ditzake soilik';
        abizenaOndo = false;
    }else{
        $abizena.classList.remove('mal');
        $abizenaMsg.textContent = "";
        abizenaOndo = true;
    }
});

$helbidea.addEventListener('blur', ()=>{
    if ($helbidea.value.trim() == ""){
        $helbidea.classList.add('mal');
        $helbideaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin duzu eremu hau hutsik utzi';
        $helbidea.value = $helbidea.value.trim();
        helbideaOndo = false;
    }else if (/[^a-zA-Z0-9-.,/\\\s]/.test($helbidea.value)){
        $helbidea.classList.add('mal');
        $helbideaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Formatua txarto dago';
        helbideaOndo = false;
    }else{
        $helbidea.classList.remove('mal');
        $helbideaMsg.textContent = "";
        helbideaOndo = true;
    }
});

$email.addEventListener('blur', ()=>{
    if ($email.value.trim() == ""){
        $email.classList.add('mal');
        $emailMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin duzu eremu hau hutsik utzi';
        $email.value = $email.value.trim();
        emailOndo = false;
    }else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($email.value)){
        $email.classList.remove('mal');
        $emailMsg.innerHTML = "";
        emailOndo = true;
    }else{
        $email.classList.add('mal');
        $emailMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Sartu baliozko email bat';
        emailOndo = false;
    }
});
console.log(helbidea.value);
$pasahitza.addEventListener('blur', ()=>{
    if ($pasahitza.value.trim() == ""){
        $pasahitza.classList.add('mal');
        $pasahitzaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin duzu eremu hau hutsik utzi';
        $pasahitza.value = $pasahitza.value.trim();
        pasahitzaOndo = false;
    }else if(/[\s]/.test($pasahitza.value)){
        $pasahitza.classList.add('mal');
        $pasahitzaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin dira hutsuneak utzi';
        pasahitzaOndo = false;
    }else{
        $pasahitza.classList.remove('mal');
        $pasahitzaMsg.innerHTML = '';
        pasahitzaOndo = true;
    }
});

$form.addEventListener('submit', (e) =>{
    e.preventDefault();

    fetch("../Controlador/ErabiltzaileakIkusi.php")
    .then(response => response.json())
    .then(erabiltzaile => {
        for (let i = 0; i < erabiltzaile.length; i++){
            if ($email.value == erabiltzaile[i].email){
                $email.classList.add('mal');
                $emailMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Email hori erregistratuta dago';
                emailOndo = false;
            }
        }
    });

    if ($pasahitzaErr.value != $pasahitza.value){
        $pasahitzaErr.classList.add('mal');
        $pasahitzaErrMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Pasahitzak ez dira berdinak';
        pasahitzaErrOndo = false;
    }else{
        $pasahitzaErr.classList.remove('mal');
        $pasahitzaErrMsg.innerHTML = '';
        pasahitzaErrOndo = true;
    }
    if (izenaOndo && abizenaOndo && helbideaOndo && emailOndo && pasahitzaOndo && pasahitzaErrOndo){
        fetch(`../Controlador/insertErabiltzailea.php?email=${$email.value}&izena=${$izena.value}&abizena=${$abizena.value}&pasahitza=${$pasahitza.value}&admin=0&helbidea=${$helbidea.value}`);
        erabiltzaileakIkusi();
        window.close();

    }
});


