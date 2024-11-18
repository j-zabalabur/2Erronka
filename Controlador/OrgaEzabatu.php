<?php
include_once("../Modelo/Orga.php");

$idErabiltzaile = $_GET['idEra'];
$idProduktu = $_GET['idPro'];

Orga::orgaEzabatu($idErabiltzaile, $idProduktu);