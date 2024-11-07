<?php
include_once('Konexioa.php');

class DeskontuKodea extends Konexioa{
    public function getDeskontuKodeak(){
        $query = $this->getCon()->query("SELECT * FROM deskontu_kodeak");
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