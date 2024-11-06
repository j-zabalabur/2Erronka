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
}