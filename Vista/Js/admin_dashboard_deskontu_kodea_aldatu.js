window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);

    document.getElementById("kodea").value = urlParams.get("kodea");
    document.getElementById("deskontua").value = urlParams.get("deskontua");

}
const $form = document.querySelector('form');

const $kodea = document.getElementById('kodea');
const $deskontua = document.getElementById('deskontua');

const $kodeaMsg = document.getElementById('kodeaMsg');
const $deskontuaMsg = document.getElementById('deskontuaMsg');

let kodeaOndo=true, deskontuaOndo=true;

$deskontua.addEventListener('blur', ()=>{
    if ($deskontua.value.trim() == ""){
        $deskontua.classList.add('mal');
        $deskontuaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin duzu eremu hau hutsik utzi';
        $deskontua.value = $deskontua.value.trim();
        deskontuaOndo = false;
    }else if ($deskontua.value> 99 || $deskontua.value< 1){
        $deskontua.classList.add('mal');
        $deskontuaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Deskontua 1 eta 99 artean izan behar da';
        deskontuaOndo = false
    }else{
        $deskontua.classList.remove('mal');
        $deskontuaMsg.textContent = "";
        deskontuaOndo = true;
    }
});

$form.addEventListener('submit', (e) =>{
    e.preventDefault();

    if (kodeaOndo && deskontuaOndo){
        fetch(`../Controlador/DeskontuKodeaUpdate.php?kodea=${$kodea.value}&deskontua=${$deskontua.value}`)
        .then(() => {
        window.opener.deskontuKodeakIkusi(); 
        window.opener.okMezua(); 
        window.close();
    });
    }
});

