<?php
require_once("../Modelo/Erabiltzailea.php");

$erabiltzaileak = new Erabiltzailea();

$id = isset($_POST['id']) ? $_POST['id'] : null;
$izena = isset($_POST['izena']) ? $_POST['izena'] : null;
$abizena = isset($_POST['abizena']) ? $_POST['abizena'] : null;
$pasahitza = isset($_POST['pasahitza']) ? $_POST['pasahitza'] : null;
$helbidea = isset($_POST['helbidea']) ? $_POST['helbidea'] : null;

$erabiltzaileak->erabiltzaileProfilaDatuakAldatu($izena, $abizena, $pasahitza, $helbidea, $id);
