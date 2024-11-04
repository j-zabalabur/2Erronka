<?php
class ElementuKomunak {

    public static function htmlHead(){?>
        <!DOCTYPE html>
            <html lang="eu">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Sneakify - Marka onenen oinetakoak prezio onenean</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
                <style>
                    <?php 
                    require_once("../vista/Css/global.css");
                    require_once("../vista/Css/admin.css");
                    ?>
                </style>
            </head>
            <body>
        <?php
    }
    

public static function htmlHeader(){?>
    <header>
        <a href="index.php">
            <img id="logo" src="Img/SNEAKIFY.webp" alt="logo">
        </a>

        <div class="dropdown">
            <span id="erab-icon-container" data-bs-toggle="dropdown" aria-expanded="false">
                <i id="erab-icon" class="bi bi-person"></i>
            </span>

            <ul class="dropdown-menu dropdown-menu-end">
                <p id="izen-abizenak" class="dropdown-header">Nombre Apellido</p>
                <p id="email" class="dropdown-header">posta@gmail.com</p>
                <li><hr class="dropdown-divider"></li>
                <li>
                    <a class="dropdown-item" href="#">
                    <i class="bi bi-bag"></i>
                        Orga
                    </a>
                </li>
                <li><a class="dropdown-item" href="#">
                <i class="bi bi-box-arrow-left"></i>
                    Saioa Itxi
                </a></li>
            </ul>
        </div>
        
        
    </header>
    <?php
}


public static function htmlFooter(){?>
    </main>
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