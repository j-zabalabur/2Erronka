<?php
include_once('../Modelo/Erabiltzailea.php');

        $erabiltzaileakController = new Erabiltzailea();
        $id = file_get_contents("php://input");
        $erabiltzailea = $erabiltzaileakController->getErabiltzailea($id);

        header('Content-Type: application/json'); 
        echo json_encode($erabiltzailea);
    
?>