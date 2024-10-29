<?php
include_once 'Conexion.php';

class Orga{
    // private int $id_erabiltzailea;
    // private int $id_produktua;
    // private int $kopurua;


    public function getOrga() {
        $konexioa = Konexioa::getCon();
        $kontsulta = "SELECT * FROM orga";
        $emaitza = $konexioa->query($kontsulta);

        $orga = [];
        if ($ilara && $emaitza->num_rows > 0) {
            while ($ilara = $emaitza->fetch_assoc()) {
                $orga[] = $ilara;
            }
        }
        return json_encode($orga);
    }
}