<?php

require_once('../Modelo/Produktua.php');

$produktuak = new Produktua();

try{
    $id = $_GET['id'];
    $produktuak->produktuaIkusi($id);
}catch(Exception $e){
    echo $e;
}