<?php
include_once('Konexioa.php');

class Erabiltzailea extends Konexioa{
    public function getErabiltzaileak(){
        $query = $this->getCon()->query("SELECT * FROM erabiltzaileak");
        $array = [];

        if ($query){
            while ($lerroa = $query->fetch_assoc()) {
                $array[] = $lerroa;
            }
        }
            return $array;


    }

    public static function insertErabiltzailea($email, $izena, $abizena, $pasahitza, $admin, $helbidea){
        $konexioa = new Erabiltzailea();
        $sentencia = $konexioa->getCon()->prepare("INSERT INTO erabiltzaileak (email, izena, abizena, pasahitza, administratzailea, helbidea) VALUES (?, ?, ?, ?, ?, ?)");
        $sentencia->bind_param("ssssis", $email, $izena, $abizena, $pasahitza, $admin, $helbidea);
        $sentencia->execute();
        $sentencia->close();
    }
}
?>