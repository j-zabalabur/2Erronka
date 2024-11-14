<?php
include_once("../Modelo/Produktua.php");

$izena = $_POST['izena'];
$prezioa = $_POST['prezioa'];
$marka = $_POST['marka'];

$fitxategia = $_FILES['argazkia'];
$izenafitxategia = $fitxategia['name'];
$tmpfitxategia = $fitxategia['tmp_name'];
$motafitxategia = $fitxategia['type'];


$beherapena = $_POST['beherapena'];
$deskripzioa = $_POST['deskripzioa'];

Produktua::produktuaInsert($izena, $prezioa, $marka, $fitxategia, $beherapena, $deskripzioa);

