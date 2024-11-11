<?php

require_once('../Modelo/Produktua.php');

$produktuak = new Produktua();
$id = file_get_contents("php://input");
echo $produktuak->produktuakEzabatu($id);