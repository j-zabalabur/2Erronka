<?php

require_once('../Modelo/Eskaera.php');

$eskaerak = new Eskaera();
$id = file_get_contents("php://input");
echo $eskaerak->eskaeraEzabatu($id);