<?php

class Konexioa{
    private $con;

    public function __construct(){
        $this->con = new mysqli('localhost', 'sneakifyAdmin', 'sneakifyAdmin', 'sneakify');
        
        if($this->con->connect_error){
            die("Konexioak huts egin du: " . $this->con->connect_error);
        }
    }

    public function getCon(){
        return $this->con;
    }
}