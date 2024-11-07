<?php
include_once('../Modelo/DeskontuKodea.php');

        $deskontuKodeaController = new DeskontuKodea();
        $deskontuKodeak = $deskontuKodeaController->getDeskontuKodeak();

        header('Content-Type: application/json'); 
        echo json_encode($deskontuKodeak);
    
?>