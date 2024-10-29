<?php
include_once 'Conexion.php';

class Erabiltzailea{
    // private int $id;
    // private string $email;
    // private string $izena;
    // private string $abizena;
    // private string $pasahitza;
    // private bool $administratzailea;
    // private string $helbidea;


    public function getErabiltzaileak() {
        $konexioa = Konexioa::getCon();
        $kontsulta = "SELECT * FROM erabiltzaileak";
        $emaitza = $konexioa->query($kontsulta);

        $erabiltzaileak = [];
        if ($ilara && $emaitza->num_rows > 0) {
            while ($ilara = $emaitza->fetch_assoc()) {
                $erabiltzaileak[] = $ilara;
            }
        }
        return json_encode($erabiltzaileak);
    }



}