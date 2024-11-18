<?php

require_once('../Modelo/Eskaera.php');


$eskaerak = new Eskaera();
$id = $_POST['id'];
$egoera = $_POST['egoera'];
$egoeraBerria="";

if($egoera==="Entregatzeke"){
    $egoeraBerria="Bidalita";
} else {
    $egoeraBerria="Entregatzeke";
}

echo $eskaerak->eskaeraEgoeraUpdate($id, $egoeraBerria);

?>