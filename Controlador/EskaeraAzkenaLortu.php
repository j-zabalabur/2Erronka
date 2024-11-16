<?php
include_once("../Modelo/Eskaera.php");

$idEra = $_GET['idEra'];

$eskaera = Eskaera::getAzkenEskaera($idEra);

echo json_encode($eskaera);