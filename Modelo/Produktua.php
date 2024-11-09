<?php
include_once('Konexioa.php');

class Produktua extends Konexioa{
    public function produktuakIkusi(){
        $query = $this->getCon()->query('SELECT * FROM produktuak');
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

    public function produktuakIkusiTxikienetikHandienera(){
        $query = $this->getCon()->query("SELECT * FROM `produktuak` ORDER BY prezioa - ((prezioa * beherapena) / 100) ASC");
        $array = [];

        while($lerroa = $query->fetch_assoc()){
            $argazkia_base64 = base64_encode($lerroa['argazkia']);
            $lerroa['argazkia'] = $argazkia_base64;

            $array[] = $lerroa;
        }
        header("Content-Type: application/json");
        echo json_encode($array);
    }

    public function produktuakIkusiHandienetikTxikienera(){
        $query = $this->getCon()->query("SELECT * FROM `produktuak` ORDER BY prezioa - ((prezioa * beherapena) / 100) DESC");
        $array = [];

        while($lerroa = $query->fetch_assoc()){
            $argazkia_base64 = base64_encode($lerroa['argazkia']);
            $lerroa['argazkia'] = $argazkia_base64;

            $array[] = $lerroa;
        }
        header("Content-Type: application/json");
        echo json_encode($array);
    }
}