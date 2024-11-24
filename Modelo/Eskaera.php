<?php
include_once('Konexioa.php');

class Eskaera extends Konexioa{
    public function getEskaerak(){
        $query = $this->getCon()->query("SELECT 
                                            e.id AS id_eskaera,
                                            e.prezioa_hasieran AS esk_prezioa_has,
                                            e.deskontua_cod,
                                            e.prezioa_amaieran AS esk_prezioa_ama,
                                            er.izena AS erab_izena,
                                            er.abizena,
                                            el.id_produktua,
                                            el.kopurua,
                                            el.prezioa_hasieran AS prod_prezioa_has,
                                            el.deskontua_prod,
                                            el.prezioa_amaieran AS prod_prezioa_ama,
                                            e.egoera,
                                            e.data,
                                            p.izena,
                                            p.eragina,
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

    public static function eskaeraInsert($id, $egoera, $prezioHasieran, $deskontuaCod, $prezioAmaieran){
        $konexioa = new Konexioa();
        $query = $konexioa->getCon()->prepare("INSERT INTO eskaerak (id_erabiltzailea, egoera, prezioa_hasieran, deskontua_cod, prezioa_amaieran) VALUES (?, ?, ?, ?, ?)");        
        $query->bind_param("isdid", $id, $egoera,$prezioHasieran, $deskontuaCod, $prezioAmaieran);
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

    public function eskaerakJasoErabiltzailearenArabera(int $id){
        try{
        $prep = $this->getCon()->prepare("
        SELECT
        eskaerak.id AS id_eskaera, 
        eskaera_lerroak.id_produktua, 
        eskaera_lerroak.kopurua, eskaerak.egoera,
        eskaerak.data,
        produktuak.izena,
        produktuak.prezioa,
        produktuak.eragina,
        produktuak.beherapena
        FROM eskaerak
        JOIN erabiltzaileak ON eskaerak.id_erabiltzailea = erabiltzaileak.id
        LEFT JOIN eskaera_lerroak ON eskaerak.id = eskaera_lerroak.id_eskaera
        LEFT JOIN produktuak ON eskaera_lerroak.id_produktua = produktuak.id
        WHERE erabiltzaileak.id=?
        ");
        $prep->bind_param('i', $id);
        $prep->execute();
        $result = $prep->get_result();
        $eskaerak = [];

        while($lerroa = $result->fetch_assoc()){
            $eskaerak[] = $lerroa;
        }

        header("Content-Type: application/json");
        echo json_encode($eskaerak);
        }catch(Exception $e){
            throw new Error($e);
        }
    }
}
?>
