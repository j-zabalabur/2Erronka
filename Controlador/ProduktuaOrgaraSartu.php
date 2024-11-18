<?php
require_once '../Modelo/Produktua.php';
$produktuak = new Produktua();

$idErabiltzailea = $_GET['id_erabiltzailea'];
$idProduktua = $_GET['id_produktua'];

if(isset($idErabiltzailea) && isset($idProduktua)){
    $produktuak->produktuaOrgaraSartu($idErabiltzailea, $idProduktua);
}
