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
                require_once("Css/global.css");
                require_once("Css/admin.css");
                ?>
            </style>
        </head>
        <body>
        <header>
        <a href="index.php">
            <img id="logo" src="img/SNEAKIFY.webp" alt="logo">
        </a>
        <div class="dropdown">
            <span class="icon-container admin" data-bs-toggle="dropdown" aria-expanded="false">
                <i id="admin-icon" class="bi bi-person-lock"></i>
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
        <div class="admin-panel">
        <aside class="sidebar">
            <!--TODO Los botones seran bootstrap y seguiran la estetica del global.css-->
            <h1>Admin Dashboard</h1>
            <button onclick="erakutsiTaula('produktuak')">Produktuak</button>
            <button onclick="erakutsiTaula('erabiltzaileak')">Erabiltzaileak</button>
            <button onclick="erakutsiTaula('eskariak')">Eskariak</button>
            <button onclick="erakutsiTaula('deskontu_kodeak')">Deskontu kodeak</button>
        </aside>

        <main class="taula_container">
            <section id="produktuak" class="taula">
                <h2>Produktuak</h2>
                <button type="button" class="btn btn-warning">Erregistro berria sortu</button>
                <table class="table table-hover table-resposive">
                    <thead class="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="emaitzaProduktuak">
                        <!-- ILARAK HEMEN AGERTUKO DIRA -->
                    </tbody>
                </table>
            </section>

            <section id="erabiltzaileak" class="taula">
                <h2>Erabiltzaileak</h2>
                <button type="button" class="btn btn-secondary">Erregistro berria sortu</button>
                <table class="table table-hover table-resposive">
                    <thead class="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="emaitzaProduktuak">
                        <!-- ILARAK HEMEN AGERTUKO DIRA -->
                    </tbody>
                </table>
            </section>

            <section id="eskariak" class="taula">
                <h2>Eskariak</h2>
                <button type="button" class="btn btn-secondary">Erregistro berria sortu</button>
                <table class="table table-hover table-resposive">
                    <thead class="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="emaitzaProduktuak">
                        <!-- ILARAK HEMEN AGERTUKO DIRA -->
                    </tbody>
                </table>
            </section>

            <section id="deskontu_kodeak" class="taula">
                <h2>Deskontu Kodeak</h2>
                <button type="button" class="btn btn-secondary">Erregistro berria sortu</button>
                <table class="table table-hover table-resposive">
                    <thead class="thead-dark">
                        <tr>
                            <th>Kodea</th>
                            <th>Deskontua</th>
                            <th>Aukerak</th>
                        </tr>
                    </thead>
                    <tbody id="emaitzaDeskontuKodeak">
                        <!-- ILARAK HEMEN AGERTUKO DIRA -->
                    </tbody>
                </table>
            </section>

        </main>
    </div>
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