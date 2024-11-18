window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);

    document.getElementById("id").value = urlParams.get("id");
    document.getElementById("izena").value = urlParams.get("izena");
    document.getElementById("abizena").value = urlParams.get("abizena");
    document.getElementById("pasahitza").value = urlParams.get("pasahitza");
    document.getElementById("pasahitzaE").value = urlParams.get("pasahitza");
    document.getElementById("admin").value = urlParams.get("admin");
    document.getElementById("helbidea").value = urlParams.get("helbidea");
}

  //Elementos del DOM
    const $form = document.querySelector('form');
    const $id = document.getElementById('id');

    const $izena = document.getElementById('izena');
    const $abizena = document.getElementById('abizena');
    const $helbidea = document.getElementById('helbidea');
    // const $email = document.getElementById('email');
    const $admin = document.getElementById('admin');
    const $pasahitza = document.getElementById('pasahitza');
    const $pasahitzaErr = document.getElementById('pasahitzaE');
    
    const $izenaMsg = document.getElementById('izenaMsg');
    const $abizenaMsg = document.getElementById('abizenaMsg');
    const $helbideaMsg = document.getElementById('helbideaMsg');
    // const $emailMsg = document.getElementById('emailMsg');
    const $pasahitzaMsg = document.getElementById('pasahitzaMsg');
    const $pasahitzaErrMsg = document.getElementById('pasahitzaEMsg');
    
    let izenaOndo=true, abizenaOndo=true, helbideaOndo=true, pasahitzaOndo=true, pasahitzaErrOndo=true;
    
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
    
    // $email.addEventListener('blur', ()=>{
    //     if ($email.value.trim() == ""){
    //         $email.classList.add('mal');
    //         $emailMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin duzu eremu hau hutsik utzi';
    //         $email.value = $email.value.trim();
    //         emailOndo = false;
    //     }else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($email.value)){
    //         $email.classList.remove('mal');
    //         $emailMsg.innerHTML = "";
    //         emailOndo = true;
    //     }else{
    //         $email.classList.add('mal');
    //         $emailMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Sartu baliozko email bat';
    //         emailOndo = false;
    //     }
    // });

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
        // let cont=0;
        // fetch("../Controlador/ErabiltzaileakIkusi.php")
        // .then(response => response.json())
        // .then(erabiltzaile => {
        //     for (let i = 0; i < erabiltzaile.length; i++){
        //         if ($email.value == erabiltzaile[i].email){
        //             cont++;
        //         }
        //     }
        //     if(cont>1){
        //         $email.classList.add('mal');
        //         $emailMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Email hori erregistratuta dago';
        //         emailOndo = false;
        //     }
        // });
    
        if ($pasahitzaErr.value != $pasahitza.value){
            $pasahitzaErr.classList.add('mal');
            $pasahitzaErrMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Pasahitzak ez dira berdinak';
            pasahitzaErrOndo = false;
        }else{
            $pasahitzaErr.classList.remove('mal');
            $pasahitzaErrMsg.innerHTML = '';
            pasahitzaErrOndo = true;
        }
    
        if (izenaOndo && abizenaOndo && helbideaOndo && pasahitzaOndo && pasahitzaErrOndo){
            fetch(`../Controlador/ErabiltzaileaUpdate.php?izena=${$izena.value}&abizena=${$abizena.value}&pasahitza=${$pasahitza.value}&admin=${$admin.value}&helbidea=${$helbidea.value}&id=${$id.value}`)
        .then(() => {
            window.opener.erabiltzaileakIkusi(); 
            window.opener.okMezua(); 
            window.close();
        })
        }
    });
    