<?php
include_once("../Modelo/Eskaera.php");

$idEra = $_GET['idEra'];
$egoera = $_GET['egoera'];
$prezioaHasieran = $_GET['preHasi'];
$deskontuaCod = $_GET['deskontua'];
$prezioaAmaieran = $_GET['preAm'];


Eskaera::eskaeraInsert($idEra, $egoera, $prezioaHasieran, $deskontuaCod, $prezioaAmaieran);