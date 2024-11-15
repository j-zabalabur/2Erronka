<?php
include_once('Konexioa.php');

class Eskaera extends Konexioa{
    public function getEskaerak(){
        $query = $this->getCon()->query("SELECT 
                                            e.id AS id_eskaera,
                                            er.izena AS erab_izena,
                                            er.abizena,
                                            el.id_produktua,
                                            el.kopurua,
                                            e.egoera,
                                            e.data,
                                            p.izena,
                                            p.prezioa,
                                            p.eragina,
                                            p.beherapena,
                                            p.deskripzioa
                                        FROM 
                                            eskaerak e
                                        JOIN
                                            erabiltzaileak er ON e.id_erabiltzailea = er.id
                                        LEFT JOIN 
                                            eskaera_lerroak el ON e.id = el.id_eskaera
                                        LEFT JOIN 
                                            produktuak p ON el.id_produktua = p.id
                                        ORDER BY 
                                            e.id DESC, el.id_produktua;
                                        ");
        $array = [];

        if ($query){
            while ($lerroa = $query->fetch_assoc()) {
                $array[] = $lerroa;
            }
        }
            return $array;


    }

    public function eskaeraEzabatu($id){
        $query = $this->getCon()->query('DELETE FROM eskaera_lerroak WHERE id_eskaera='.$id);
        $query = $this->getCon()->query('DELETE FROM eskaerak WHERE id='.$id);
        return "ok";
    }
    public function eskaeraEgoeraUpdate($id, $egoeraBerria){
        $query = $this->getCon()->prepare("UPDATE eskaerak SET egoera = ? WHERE id = ?");        
        $query->bind_param("si", $egoeraBerria, $id);
        $query->execute();
        $query->close();
        return "ok";

    }

    public static function eskaeraInsert($id, $egoera){
        $konexioa = new Konexioa();
        $query = $konexioa->getCon()->prepare("INSERT INTO eskaerak (id_erabiltzailea, egoera) VALUES (?, ?)");        
        $query->bind_param("is", $id, $egoera);
        $query->execute();
        $query->close();
    }

    public static function getAzkenEskaera($idEra){
        $konexioa = new Konexioa();
        $query = $konexioa->getCon()->query("SELECT * FROM eskaerak WHERE id_erabiltzailea = $idEra ORDER BY data DESC LIMIT 1;");
        $array = [];

        while ($lerroa = $query->fetch_assoc()) {
            $array[] = $lerroa;
        }
        
        return $array;
    }

}
?>
