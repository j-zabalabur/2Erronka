<?php

class Konexioa{
    private $con;

    public function __construct(){
        $this->con = new mysqli('localhost', 'root', '', 'sneakify');        
    }

    public function getCon(){
        return $this->con;
    }
}