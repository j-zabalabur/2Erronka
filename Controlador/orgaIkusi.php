<?php
include_once("../Modelo/Orga.php");

$id = $_GET['idErabiltzaile'];

$orga = Orga::getOrga($id);

header('Content-Type: application/json'); 
echo json_encode($orga);