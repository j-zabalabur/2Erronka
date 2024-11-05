<?php
include_once('Konexioa.php');

class Produktua extends Konexioa{
    public function produktuakIkusi(){
        $query = $this->getCon()->query("SELECT * FROM produktuak");
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