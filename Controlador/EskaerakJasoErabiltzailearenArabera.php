<?php

require_once '../Modelo/Eskaera.php';

$eskaerak = new Eskaera();

$id = isset($_GET['id']) ? $_GET['id'] : null;

$eskaerak->eskaerakJasoErabiltzailearenArabera($id);