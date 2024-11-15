<?php
include_once('../Modelo/Erabiltzailea.php');

        $erabiltzaileakController = new Erabiltzailea();
        $id = isset($_GET['id']) ? $_GET['id'] : null;
        $erabiltzaileakController->getErabiltzailea($id);
?>