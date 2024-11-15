<?php

include_once("../Modelo/Erabiltzailea.php");

$id = isset($_GET['id']) ? $_GET['id'] : null;
$izena = isset($_POST['izena']) ? $_POST['izena'] : null;
$abizena = isset($_POST['abizena']) ? $_POST['abizena'] : null;
$pasahitza = isset($_POST['pasahitza']) ? $_POST['pasahitza'] : null;
$helbidea = isset($_POST['helbidea']) ? $_POST['helbidea'] : null;

Erabiltzailea::erabiltzaileProfilaDatuakAldatu($izena, $abizena, $pasahitza, $helbidea, $id);

