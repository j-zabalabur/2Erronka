<?php
class ElementuKomunak {

public static function htmlHead(){?>
    <!DOCTYPE html>
        <html lang="eu">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sneakify - Marka onenen oinetakoak prezio onenean</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                <?php require_once("css/global.css");?>
                <?php require_once("css/admin.css");?>
            </style>
        </head>
        <body>
    <?php
}


public static function htmlHeader(){?>
    <header>
    <!-- HEADERRA HEMEN -->
    
    <h1>HEADER</h1>
    
    
    
    </header>
    <?php
}


public static function htmlFooter(){?>
    <footer>
    <!-- FOOTERRA HEMEN -->

    <h1>FOOTER</h1>

    
    
        
    </footer>
    <!-- Bootstrap eta JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>

    <script>
        <?php require_once("js/script.js");?>
        <?php require_once("js/admin_dashboard.js");?>
    </script>

    </body>
    </html>
    <?php
}


}
?>