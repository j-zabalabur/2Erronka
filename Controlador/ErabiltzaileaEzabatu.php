<?php

require_once('../Modelo/Erabiltzailea.php');

$erabiltzaileak = new Erabiltzailea();
$id = file_get_contents("php://input");
echo $erabiltzaileak->erabiltzaileaEzabatu($id);