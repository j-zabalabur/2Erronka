<?php
include_once("../Modelo/Eskaera.php");

$idEra = $_GET['idEra'];
$egoera = $_GET['egoera'];

Eskaera::eskaeraInsert($idEra, $egoera);