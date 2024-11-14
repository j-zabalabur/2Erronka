<?php
include_once("../Modelo/Produktua.php");

$id = $_POST['id'];
$izena = $_POST['izena'];
$prezioa = $_POST['prezioa'];
$marka = $_POST['marka'];
$beherapena = $_POST['beherapena'];
$deskripzioa = $_POST['deskripzioa'];

Produktua::produktuaUpdate($izena, $prezioa, $marka, $beherapena, $deskripzioa, $id);

