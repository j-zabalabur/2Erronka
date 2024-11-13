<?php
include_once("../Modelo/Produktua.php");

$izena = $_GET['izena'];
$prezioa = $_GET['prezioa'];
$marka = $_GET['marka'];
$argazkia = $_GET['argazkia'];
$beherapena = $_GET['beherapena'];
$deskripzioa = $_GET['deskripzioa'];

Produktua::produktuaInsert($izena, $prezioa, $marka, $argazkia, $beherapena, $deskripzioa);

