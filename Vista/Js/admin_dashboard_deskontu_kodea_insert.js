const $form = document.querySelector('form');

const $kodea = document.getElementById('kodea');
const $deskontua = document.getElementById('deskontua');

const $kodeaMsg = document.getElementById('kodeaMsg');
const $deskontuaMsg = document.getElementById('deskontuaMsg');

let kodeaOndo, deskontuaOndo;

$kodea.addEventListener('blur', ()=>{
    if ($kodea.value.trim() == ""){
        $kodea.classList.add('mal');
        $kodeaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin duzu eremu hau hutsik utzi';
        $kodea.value = $kodea.value.trim();
        kodeaOndo = false;
    }else{
        $kodea.classList.remove('mal');
        $kodeaMsg.textContent = "";
        kodeaOndo = true;
    }
});

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

    fetch("../Controlador/DeskontuKodeakIkusi.php")
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            if ($kodea.value == item.kodea){
                $kodea.classList.add('mal');
                $kodeaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Kode hori erregistratuta dago';
                kodeaOndo = false;
            }
        
    
});


    if (kodeaOndo && deskontuaOndo){
        console.log(kodeaOndo);
        fetch(`../Controlador/DeskontuKodeaInsert.php?kodea=${$kodea.value}&deskontua=${$deskontua.value}`)
        .then(() => {
        window.opener.deskontuKodeakIkusi(); 
        window.opener.okMezua(); 
        window.close();
    });
    }
})
});

