<?php

require_once('../Modelo/Produktua.php');


$produktuak = new Produktua();
$id = $_POST['id'];
$egoera = $_POST['egoera'];
$egoeraBerria="";

if($egoera==1){
    $egoeraBerria="0";
} else {
    $egoeraBerria="1";
}

echo $produktuak->produktuEgoeraUpdate($id, $egoeraBerria);

?>