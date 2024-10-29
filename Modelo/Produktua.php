<?php
include_once 'Conexion.php';

class Produktua{
    // private int $id;
    // private string $izena;
    // private float $prezioa;
    // private string $eragina;
    // private string $argazkia;
    // private int $beherapena;
    // private string $deskripzioa;


    public function getProduktuak() {
        $konexioa = Konexioa::getCon();
        $kontsulta = "SELECT * FROM produktuak";
        $emaitza = $konexioa->query($kontsulta);

        $produktuak = [];
        if ($ilara && $emaitza->num_rows > 0) {
            while ($ilara = $emaitza->fetch_assoc()) {
                $produktuak[] = $ilara;
            }
        }
        return json_encode($produktuak);
    }
}