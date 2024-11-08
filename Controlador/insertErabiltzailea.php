<?php
include_once("../Modelo/Erabiltzailea.php");

$email = $_GET['email'];
$izena = $_GET['izena'];
$abizena = $_GET['abizena'];
$pasahitza = $_GET['pasahitza'];
$admin = $_GET['admin'];
$helbidea = $_GET['helbidea'];

Erabiltzailea::insertErabiltzailea($email, $izena, $abizena, $pasahitza, $admin, $helbidea);


