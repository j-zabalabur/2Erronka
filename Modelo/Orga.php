<?php
include_once('Konexioa.php');

class Orga extends Konexioa{
    public static function getOrga($idEra){
        $konexioa = new Konexioa;
        $query = $konexioa->getCon()->query("SELECT id_erabiltzailea,id_produktua,kopurua,produktuak.izena, produktuak.prezioa, produktuak.beherapena, produktuak.argazkia FROM orga_lerroak INNER JOIN produktuak ON orga_lerroak.id_produktua = produktuak.id WHERE orga_lerroak.id_erabiltzailea = $idEra");

        $array = array();

        if ($query){
            while ($lerroa = $query->fetch_assoc()) {
                $base64 = base64_encode($lerroa['argazkia']);
                $lerroa['argazkia'] = $base64;
                $array[] = $lerroa;
            }
        }
        return $array;
    }

    public static function orgaEzabatu($idEra, $idPro){
        $konexioa = new Konexioa;
        $query = $konexioa->getCon()->query("DELETE FROM orga_lerroak WHERE id_erabiltzailea = $idEra AND id_produktua = $idPro");
        $query->close();
    }

    public static function orgaUpdate($kopurua, $idEra, $idPro){
        $konexioa = new Konexioa;
        $query = $konexioa->getCon()->query("UPDATE orga_lerroak SET kopurua = $kopurua WHERE id_erabiltzailea= $idEra AND id_produktua= $idPro");
        $query->close();
    }
}