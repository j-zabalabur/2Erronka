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
    
    public function getErabiltzailea($id){
        $query = $this->getCon()->query('SELECT * FROM erabiltzaileak WHERE id='.$id);
        $erabiltzailea = $query->fetch_assoc();
        return $erabiltzailea;
    }

    public function erabiltzaileaEzabatu($id){
        $query = $this->getCon()->query('DELETE FROM erabiltzaileak WHERE id='.$id);
        return "ok";
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