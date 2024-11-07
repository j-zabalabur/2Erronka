<?php
include_once('Konexioa.php');

class Eskaera extends Konexioa{
    public function getEskaerak(){
        $query = $this->getCon()->query("SELECT 
            e.id AS id_eskaera,
            er.izena AS erab_izena,
            er.abizena,
            el.id_produktua,
            el.kopurua,
            e.egoera,
            e.data,
            p.izena,
            p.prezioa,
            p.eragina,
            p.beherapena,
            p.deskripzioa
            FROM 
            eskaerak e
            JOIN
            erabiltzaileak er ON e.id_erabiltzailea=er.id
            JOIN 
            eskaera_lerroak el ON e.id = el.id_eskaera
            JOIN 
            produktuak p ON el.id_produktua = p.id
            ORDER BY 
            e.id, el.id_produktua;");
        $array = [];

        if ($query){
            while ($lerroa = $query->fetch_assoc()) {
                $array[] = $lerroa;
            }
        }
            return $array;


    }
}
?>
