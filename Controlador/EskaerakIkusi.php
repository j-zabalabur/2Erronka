<?php
include_once('../Modelo/Eskaera.php');

        $eskaeraController = new Eskaera();
        $eskaerak = $eskaeraController->getEskaerak();

        header('Content-Type: application/json'); 
        echo json_encode($eskaerak);
    
?>