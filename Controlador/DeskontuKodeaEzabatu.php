<?php

require_once('../Modelo/DeskontuKodea.php');

$deskontuKodeak = new DeskontuKodea();
$kodea = file_get_contents("php://input");
echo $deskontuKodeak->deskontuKodeaEzabatu($kodea);
?>