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
    
    public function getErabiltzailea(int $id){
        try{
            $prep = $this->getCon()->prepare("SELECT izena, abizena, email, pasahitza, helbidea FROM erabiltzaileak WHERE id=?");
            $prep->bind_param('i', $id);
            $prep->execute();
            $erab = $prep->get_result()->fetch_assoc();
            header("Content-Type: application/json");
            echo json_encode($erab);
        }catch(Exception $e){
            throw new Error($e);
        }
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
        try{
        $prep = $this->getCon()->prepare("SELECT erabiltzaileak.id, erabiltzaileak.izena, erabiltzaileak.abizena, erabiltzaileak.email, (SELECT SUM(orga_lerroak.kopurua) FROM orga_lerroak WHERE orga_lerroak.id_erabiltzailea=erabiltzaileak.id) AS orga_produktuak FROM `erabiltzaileak` WHERE erabiltzaileak.id=?");
        $prep->bind_param('i', $id);
        $prep->execute();

        header("Content-Type: application/json");
        echo json_encode($prep->get_result()->fetch_assoc());
        }catch(Exception $e){
            throw new Error($e);
        }
    }
    public static function erabiltzaileaUpdate($izena, $abizena, $pasahitza, $administratzailea, $helbidea, $id){
        $konexioa = new Erabiltzailea();
        $sentencia = $konexioa->getCon()->prepare("UPDATE erabiltzaileak SET izena = ?, abizena = ?, pasahitza = ?, administratzailea = ?, helbidea = ? WHERE id = ?");
        $sentencia->bind_param("sssisi", $izena, $abizena, $pasahitza, $administratzailea, $helbidea, $id);        
        $sentencia->execute();
        $sentencia->close();

    }
}
?>