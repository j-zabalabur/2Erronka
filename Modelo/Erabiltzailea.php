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

    public function erabiltzaileaDatuakJaso(int $id){
        $prep = $this->getCon()->prepare("SELECT * FROM erabiltzaileak WHERE id=?");
        $prep->bind_param('i', $id);
        $prep->execute();

        header("Content-Type: application/json");
        echo json_encode($prep->get_result()->fetch_assoc());
    }
}
?>