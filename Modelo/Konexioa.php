<?php
class Konexioa {
    private $con;
    
    public function __construct(){
        $this->con = new \mysqli('localhost', 'root', '', 'sneakify');
        
        if ($this->con->connect_error) {
            die("Konexioak huts egin du: " . $this->conexion->connect_error);
        }

    }

    public function getCon(){
        return $this->con;
    }

    public function closeCon(){
        $this->con->close();
    }   
 
}
?>