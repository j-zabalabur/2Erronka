<?php

require_once '../Modelo/Erabiltzailea.php';

$erabiltzaileak = new Erabiltzailea();

try{
    $id = $_GET['id'];
    $erabiltzaileak->erabiltzaileaDatuakJaso($id);
}catch(Exception $e){
    throw new Error($e);
}