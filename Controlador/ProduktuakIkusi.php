<?php

require_once('Modelo/Produktua.php');

$produktuak = new Produktua();
echo json_encode($produktuak->produktuakIkusi());