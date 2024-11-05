<?php
include_once('Konexioa.php');

class Produktua extends Konexioa{
    public function produktuakIkusi(){
        $query = $this->getCon()->query('SELECT * FROM produktuak');
        $array = [];

        while($lerroa = $query->fetch_assoc()){
            $array[] = $lerroa;
        }
        
        return json_encode($array);
    }
}