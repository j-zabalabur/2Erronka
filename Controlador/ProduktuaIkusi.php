<?php

require_once('../Modelo/Produktua.php');

$produktuak = new Produktua();

try{
    $id = $_GET['id'];
    echo $produktuak->produktuaIkusi($id);
}catch(Exception $e){
    echo $e;
}