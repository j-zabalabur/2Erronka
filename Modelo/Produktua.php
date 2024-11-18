<?php
include_once('Konexioa.php');

class Produktua extends Konexioa{
    public function produktuakIkusi(){
        $query = $this->getCon()->query('SELECT * FROM produktuak WHERE aktibo=1');
        $array = [];

        while($lerroa = $query->fetch_assoc()){
            // Argazkiak base64 formatura pasatzen ditu
            $argazkia_base64 = base64_encode($lerroa['argazkia']);
            $lerroa['argazkia'] = $argazkia_base64;

            $array[] = $lerroa;
        }
        header("Content-Type: application/json");
        echo json_encode($array);
    }

    public function produktuakEzabatu($id){
        $query = $this->getCon()->query('DELETE FROM produktuak WHERE id='.$id);
        return "ok";
    }

    public function eraginakJaso(){
        $query = $this->getCon()->query("SELECT DISTINCT `eragina` FROM `produktuak`");
        $array = [];

        while($lerroa = $query->fetch_assoc()){
            $array[] = $lerroa;
        }
        header("Content-Type: application/json");
        echo json_encode($array);
    }

    public function produktuaIkusi($id){
        $prep = $this->getCon()->prepare("SELECT * FROM produktuak WHERE id = ?");
        $prep->bind_param('i', $id);
        $prep->execute();
        $result = $prep->get_result()->fetch_assoc();
        $argazkia_base64 = base64_encode($result['argazkia']);
        $result['argazkia'] = $argazkia_base64;
        
        header("Content-Type: application/json");
        echo json_encode($result);
    }

    public function produktuaOrgaraSartu(int $idErabiltzaile, int $idProduktua){
        try{
            $update = $this->getCon()->prepare("UPDATE `orga_lerroak` SET kopurua=kopurua+1 WHERE id_erabiltzailea=? AND id_produktua=? LIMIT 1");
            $update->bind_param('ii', $idErabiltzaile, $idProduktua);
            $update->execute();

            if($update->affected_rows === 0){
                $insert = $this->getCon()->prepare("INSERT INTO `orga_lerroak`(`id_erabiltzailea`, `id_produktua`, `kopurua`) VALUES (?,?,1)");
                $insert->bind_param('ii', $idErabiltzaile, $idProduktua);
                $insert->execute();

            }else{
                $delete = $this->getCon()->prepare("DELETE FROM `orga_lerroak` WHERE id_erabiltzailea=? AND id_produktua=? AND kopurua=1");
                $delete->bind_param('ii', $idErabiltzaile, $idProduktua);
                $delete->execute();
            }

            echo json_encode(["egoera"=>"OK", "msg"=>"Produktua organ sartu egin da"]);
        }catch(Exception $e){
            echo json_encode(["egoera"=>"ERROR", "msg"=>"ERROREA: $e"]);
        }
    }
    public static function produktuaInsert($izena, $prezioa, $marka, $argazkia, $beherapena, $deskripzioa){
        $konexioa = new Produktua();
        $fitxategia = file_get_contents($argazkia['tmp_name']); 
        $sentencia = $konexioa->getCon()->prepare("INSERT INTO produktuak (izena, prezioa, eragina, argazkia, beherapena, deskripzioa) VALUES (?, ?, ?, ?, ?, ?)");
        $sentencia->bind_param("sissis", $izena, $prezioa, $marka, $fitxategia, $beherapena, $deskripzioa);
        $sentencia->execute();
        $sentencia->close();

    }
    public static function produktuaUpdate($izena, $prezioa, $marka, $beherapena, $deskripzioa, $id){
        $konexioa = new Produktua();
        $sentencia = $konexioa->getCon()->prepare("UPDATE produktuak SET izena = ?, prezioa = ?, eragina = ?, beherapena = ?, deskripzioa = ? WHERE id = ?");
        $sentencia->bind_param("sisisi", $izena, $prezioa, $marka, $beherapena, $deskripzioa, $id);        
        $sentencia->execute();
        $sentencia->close();

    }
    public function produktuEgoeraUpdate($id, $egoeraBerria){
        $query = $this->getCon()->prepare("UPDATE produktuak SET aktibo = ? WHERE id = ?");        
        $query->bind_param("ii", $egoeraBerria, $id);
        $query->execute();
        $query->close();
        return "ok";

    }
}