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

    public function deskontuKodeaEzabatu($kodea){
        $query = $this->getCon()->query("DELETE FROM deskontu_kodeak WHERE kodea='".$kodea."'");
        return "ok";
    }
    public static function deskontuKodeaInsert($kodea, $deskontua){
        $konexioa = new DeskontuKodea();

        $sentencia = $konexioa->getCon()->prepare("INSERT INTO deskontu_kodeak (kodea, deskontua) VALUES (?, ?)");
        $sentencia->bind_param("si", $kodea, $deskontua);
        $sentencia->execute();
        $sentencia->close();

    }
    public static function deskontuKodeaUpdate($kodea, $deskontua){
        $konexioa = new DeskontuKodea();
        $sentencia = $konexioa->getCon()->prepare("UPDATE deskontu_kodeak SET deskontua = ? WHERE kodea = ?");
        $sentencia->bind_param("is", $deskontua, $kodea);        
        $sentencia->execute();
        $sentencia->close();

    }
}
?>