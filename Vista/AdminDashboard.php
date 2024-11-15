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
            <script>
                if (!localStorage.getItem('saioaHasita')){
                    location.href = "saioaHasi.html";
                }
            </script>
        </head>
        <body>
        <header class="z-3">
        <a href="../index.html">
            <img id="logo" src="Img/SNEAKIFY.webp" alt="logo">
        </a>

        <div class="dropdown z-3">
            <span id="admin-icon-container" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                <i id="admin-icon" class="bi bi-person-lock"></i>
            </span>

            <ul class="dropdown-menu dropdown-menu-end z-3">
                <p id="izen-abizenak" class="dropdown-header">Erab. Anonimoa</p><!-- Izen-abizenak hemen -->
                <p id="email" class="dropdown-header"></p><!-- Emai-a hemen -->
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" id="saioa">
                <i class="bi bi-box-arrow-left"></i>
                    <span></span>
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
            <button onclick="erakutsiTaula('eskaerak')">Eskaerak</button>
            <button onclick="erakutsiTaula('deskontu_kodeak')">Deskontu kodeak</button>
        </aside>

        <main class="taula_container">
            <section id="produktuak" class="taula">
                <h2>Produktuak</h2>
                <button type="button" class="btn btn-secondary" onclick="produktuaInsertPopUp()">Erregistro berria sortu</button>
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead class="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Izena</th>
                                <th>Prezioa</th>
                                <th>Marka</th>
                                <th>Beherapena</th>
                                <th>Aukerak</th>
                            </tr>
                        </thead>
                        <tbody id="emaitzaProduktuak">
                            <!-- ILARAK HEMEN AGERTUKO DIRA -->
                        </tbody>
                    </table>
                </div>
            </section>

            <section id="erabiltzaileak" class="taula">
                <h2>Erabiltzaileak</h2>
                <button type="button" class="btn btn-secondary" onclick="erabiltzaileaInsertPopUp()">Erregistro berria sortu</button>
                <table class="table table-hover table-responsive">
                    <thead class="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Emaila</th>
                            <th>Izena</th>
                            <th>Abizena</th>
                            <th>Admin</th>
                            <th>Helbidea</th>
                            <th>Aukerak</th>
                        </tr>
                    </thead>
                    <tbody id="emaitzaErabiltzaileak">
                        <!-- ILARAK HEMEN AGERTUKO DIRA -->
                    </tbody>
                </table>
            </section>

            <section id="eskaerak" class="taula">
                <h2>Eskaerak</h2>
                <!-- <button type="button" class="btn btn-secondary">Erregistro berria sortu</button> -->
                <table class="table table-hover table-responsive">
                    <thead class="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Izena</th>
                            <th>Abizena</th>
                            <th>Data</th>
                            <th>Egoera</th>
                            <th>Aukerak</th>
                        </tr>
                    </thead>
                    <tbody id="emaitzaEskaerak">
                        <!-- ILARAK HEMEN AGERTUKO DIRA -->
                    </tbody>
                </table>
            </section>

            <section id="deskontu_kodeak" class="taula">
                <h2>Deskontu Kodeak</h2>
                <button type="button" class="btn btn-secondary" onclick="deskontuKodeaInsertPopUp()">Erregistro berria sortu</button>
                <table class="table table-hover table-responsive">
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
    <a href="../index.php">
            <img id="logo" src="Img/SNEAKIFY.webp" alt="logo">
            <div id="sare-sozialak">
                <a href="#">
                    <i class="bi bi-instagram"></i>
                </a>
                <a href="#">
                    <i class="bi bi-facebook"></i>
                </a>
                <a href="#">
                    <i class="bi bi-linkedin"></i>
                </a>
                <a href="#">
                    <i class="bi bi-twitter-x"></i>
                </a>
                <a href="#">
                    <i class="bi bi-telegram"></i>
                </a>
            </div>
        </a>
    </footer>
    <!-- Bootstrap eta JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>

    <script>
        
        <?php require_once("js/script.js");?>
        <?php require_once("js/admin_dashboard.js");?>
        <?php require_once("js/admin_dashboard_ikusi.js");?>
        <?php require_once("js/admin_dashboard_delete.js");?>
        <?php require_once("js/admin_dashboard_update.js");?>
        <?php require_once("js/admin_dashboard_insert.js");?>




    </script>

    </body>
    </html>