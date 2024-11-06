<?php
include_once('DeskontuKodea.php');

        $deskontuKodea = new DeskontuKodea();
        $emaitzak = $deskontuKodea->getDeskontuKodeak();

        header('Content-Type: application/json'); 
        echo json_encode($emaitzak);
    
?>
