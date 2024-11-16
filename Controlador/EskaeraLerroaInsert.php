<?php
include_once("../Modelo/EskaeraLerroa.php");

$idEsk = $_GET['idEsk'];
$idPro = $_GET['idPro'];
$kop = $_GET['kop'];

EskaeraLerroa::eskaeraLerroaInsert($idEsk, $idPro, $kop);