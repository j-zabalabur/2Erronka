<?php
include_once 'Conexion.php';

class EskaeraLerroa{
    // private int $id_erabiltzailea;
    // private int $id_produktua;
    // private int $kopurua;


    public function getEskaera_lerroak() {
        $konexioa = Konexioa::getCon();
        $kontsulta = "SELECT * FROM eskaera_lerroak";
        $emaitza = $konexioa->query($kontsulta);

        $eskaera_lerroak = [];
        if ($ilara && $emaitza->num_rows > 0) {
            while ($ilara = $emaitza->fetch_assoc()) {
                $eskaera_lerroak[] = $ilara;
            }
        }
        return json_encode($eskaera_lerroak);
    }

}