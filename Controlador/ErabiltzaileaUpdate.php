<?php
include_once("../Modelo/Erabiltzailea.php");

$id = $_GET['id'];
$izena = $_GET['izena'];
$abizena = $_GET['abizena'];
$pasahitza = $_GET['pasahitza'];
$admin = $_GET['admin'];
$helbidea = $_GET['helbidea'];
echo "ID: $id, Izena: $izena, Abizena: $abizena, Pasahitza: $pasahitza, Admin: $admin, Helbidea: $helbidea";

Erabiltzailea::erabiltzaileaUpdate($izena, $abizena, $pasahitza, $admin, $helbidea, $id);

