<?php
include_once('Konexioa.php');

class EskaeraLerroa extends Konexioa{
    public static function eskaeraLerroaInsert($idEsk, $idPro, $kop, $prezioaHasieran, $deskontua, $prezioaAmaieran){
        $konexioa = new Konexioa();
        $query = $konexioa->getCon()->prepare("INSERT INTO eskaera_lerroak (id_eskaera, id_produktua, kopurua, prezioa_hasieran, deskontua_prod, prezioa_amaieran) VALUES (?, ?, ?, ?, ?, ?)");
        $query->bind_param("iiidid", $idEsk, $idPro, $kop, $prezioaHasieran, $deskontua, $prezioaAmaieran);
        $query->execute();
        $query->close();
    }
}