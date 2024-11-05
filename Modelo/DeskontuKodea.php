<?php
include_once('Konexioa.php');

class DeskontuKodea extends Konexioa{
    public function produktuakIkusi(){
        $query = $this->getCon()->query("SELECT * FROM deskontu_kodeak");
        $response = $query->fetch_assoc();
        $array = [];

        if(is_array($response) && count($response) > 0){
            if($lerroa = $response){
                $array[] = $lerroa;
            }

            return $array;
        }

        return null;
    }
}
?>