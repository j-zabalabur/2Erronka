<?php
require_once '../Modelo/Produktua.php';
$produktuak = new Produktua();

try{
    $idErabiltzailea = $_GET['id_erabiltzailea'];
    $idProduktua = $_GET['id_produktua'];

    if(isset($idErabiltzailea) && isset($idProduktua)){
        $produktuak->produktuaOrgaraSartu($idErabiltzailea, $idProduktua);
    }
}catch(Exception $e){
    throw new Error($e);
}