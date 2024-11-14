window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);

    document.getElementById("id").value = urlParams.get("id");
    document.getElementById("izena").value = urlParams.get("izena");
    document.getElementById("prezioa").value = urlParams.get("prezioa");
    document.getElementById("marka").value = urlParams.get("marka");
    document.getElementById("beherapena").value = urlParams.get("beherapena");
    document.getElementById("deskripzioa").value = urlParams.get("deskripzioa");
}

 //Elementos del DOM
 const $form = document.querySelector('form');
 const $id = document.getElementById('id');
 const $izena = document.getElementById('izena');
 const $prezioa = document.getElementById('prezioa');
 const $marka = document.getElementById('marka');
//  const $argazkia = document.getElementById('argazkia');
 const $beherapena = document.getElementById('beherapena');
 const $deskripzioa = document.getElementById('deskripzioa');
 
 const $izenaMsg = document.getElementById('izenaMsg');
 const $prezioaMsg = document.getElementById('prezioaMsg');
 const $markaMsg = document.getElementById('markaMsg');
//  const $argazkiaMsg = document.getElementById('argazkiaMsg');
 const $beherapenaMsg = document.getElementById('beherapenaMsg');
 const $deskripzioaMsg = document.getElementById('deskripzioaMsg');
 
 let izenaOndo=true, prezioaOndo=true, markaOndo=true, beherapenaOndo=true, deskripzioaOndo=true;
 
 $izena.addEventListener('blur', ()=>{
     if ($izena.value.trim() == ""){
         $izena.classList.add('mal');
         $izenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin duzu eremu hau hutsik utzi';
         $izena.value = $izena.value.trim();
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
 
 $prezioa.addEventListener('blur', ()=>{
     if ($prezioa.value.trim() == ""){
         $prezioa.classList.add('mal');
         $prezioaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin duzu eremu hau hutsik utzi';
         $prezioa.value = $prezioa.value.trim();
         prezioaOndo = false;
     }else if (!/^\d+$/.test($prezioa.value)){
         $prezioa.classList.add('mal');
         $prezioaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Zenbakiak bakarrik egon daitezke';
         prezioaOndo = false;
     }else{
         $prezioa.classList.remove('mal');
         $prezioaMsg.textContent = "";
         prezioaOndo = true;
     }
 });

 $beherapena.addEventListener('blur', ()=>{
   if ($beherapena.value.trim() == ""){
       $beherapena.classList.add('mal');
       $beherapenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin duzu eremu hau hutsik utzi';
       $beherapena.value = $beherapena.value.trim();
       beherapenaOndo = false;
   }else if (!/^\d+$/.test($beherapena.value)){
       $beherapena.classList.add('mal');
       $beherapenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Zenbakiak bakarrik egon daitezke';
       beherapenaOndo = false;
   }else if ($beherapena.value> 99 || $beherapena.value< 0){
       $beherapena.classList.add('mal');
       $beherapenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Beherapena 0 eta 99 artean izan behar da';
       beherapenaOndo = false
   }else{
       $beherapena.classList.remove('mal');
       $beherapenaMsg.textContent = "";
       beherapenaOndo = true;
   }
});

 
 $marka.addEventListener('blur', ()=>{
     if ($marka.value.trim() == ""){
         $marka.classList.add('mal');
         $markaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin duzu eremu hau hutsik utzi';
         $marka.value = $marka.value.trim();
         markaOndo = false;
     }else{
         $marka.classList.remove('mal');
         $markaMsg.textContent = "";
         markaOndo = true;
     }
 });
 
//  $argazkia.addEventListener('blur', ()=>{
//      if ($argazkia.value.trim() == ""){
//          $argazkia.classList.add('mal');
//          $argazkiaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin duzu eremu hau hutsik utzi';
//          $argazkia.value = $argazkia.value.trim();
//          argazkiaOndo = false;
//      }else{
//          $argazkia.classList.remove('mal');
//          $argazkiaMsg.innerHTML = "";
//          argazkiaOndo = true;
//      }

//  });
 $deskripzioa.addEventListener('blur', ()=>{
     if ($deskripzioa.value.trim() == ""){
         $deskripzioa.classList.add('mal');
         $deskripzioaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Ezin duzu eremu hau hutsik utzi';
         $deskripzioa.value = $deskripzioa.value.trim();
         deskripzioaOndo = false;
     }else if($izena.value.length > 500){
         $deskripzioa.classList.add('mal');
         $deskripzioaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Deskripzioak 500 karaktere izan ditzake soilik';
         deskripzioaOndo = false;
     }else{
         $deskripzioa.classList.remove('mal');
         $deskripzioaMsg.innerHTML = '';
         deskripzioaOndo = true;
     }
 });
 
 $form.addEventListener('submit', (e) =>{
     e.preventDefault();
     let cont=0;
     fetch("../Controlador/ProduktuakIkusi.php")
     .then(response => response.json())
     .then(produktuak => {
         for (let i = 0; i < produktuak.length; i++){
             if ($izena.value == produktuak[i].izena){
                cont++;
             }
         }
         if(cont>1){
            $izena.classList.add('mal');
            $izenaMsg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Produktu izen hori erregistratuta dago';
            izenaOndo = false;
            window.opener.koMezua(); 
         }
     });
if (izenaOndo && prezioaOndo && beherapenaOndo && markaOndo && deskripzioaOndo) {
   const formData = new FormData();
//    formData.append('argazkia', $argazkia.files[0]);
   formData.append('izena', $izena.value);
   formData.append('prezioa', $prezioa.value);
   formData.append('deskripzioa', $deskripzioa.value);
   formData.append('beherapena', $beherapena.value);
   formData.append('marka', $marka.value);
   formData.append('id', $id.value);
   
   fetch('../Controlador/ProduktuaUpdate.php', {
     method: 'POST',
     body: formData,
   }).then(() => {
         window.opener.produktuakIkusi(); 
         window.opener.okMezua(); 
        //  window.close();
     })
     }

 });
 