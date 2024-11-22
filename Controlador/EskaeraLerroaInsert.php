<?php
include_once("../Modelo/EskaeraLerroa.php");

$idEsk = $_GET['idEsk'];
$idPro = $_GET['idPro'];
$kop = $_GET['kop'];
$prezioaHasieran = $_GET['preHasi'];
$deskontua = $_GET['deskontua'];
$prezioaAmaieran = $_GET['preAmai'];

EskaeraLerroa::eskaeraLerroaInsert($idEsk, $idPro, $kop, $prezioaHasieran, $deskontua, $prezioaAmaieran);