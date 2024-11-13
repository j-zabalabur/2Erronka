<?php
include_once("../Modelo/Orga.php");

$kopurua = $_GET['kop'];
$idEra = $_GET['idEra'];
$idPro = $_GET['idPro'];

Orga::orgaUpdate($kopurua, $idEra, $idPro);