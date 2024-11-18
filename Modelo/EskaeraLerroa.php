<?php
include_once('Konexioa.php');

class EskaeraLerroa extends Konexioa{
    public static function eskaeraLerroaInsert($idEsk, $idPro, $kop){
        $konexioa = new Konexioa();
        $query = $konexioa->getCon()->prepare("INSERT INTO eskaera_lerroak (id_eskaera, id_produktua, kopurua) VALUES (?, ?, ?)");
        $query->bind_param("iii", $idEsk, $idPro, $kop);
        $query->execute();
        $query->close();
    }
}