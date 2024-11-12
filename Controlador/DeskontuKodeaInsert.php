<?php

require_once('../Modelo/DeskontuKodea.php');

$kodea = $_GET['kodea'];
$deskontua = $_GET['deskontua'];

DeskontuKodea::deskontuKodeaInsert($kodea, $deskontua);
?>