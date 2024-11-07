<?php
include_once('../Modelo/Erabiltzailea.php');

        $erabiltzaileakController = new Erabiltzailea();
        $erabiltzaileak = $erabiltzaileakController->getErabiltzaileak();

        header('Content-Type: application/json'); 
        echo json_encode($erabiltzaileak);
    
?>