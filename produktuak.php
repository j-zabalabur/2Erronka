<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sneakify - Marka onenen oinetakoak prezio onenean</title>
    <link rel="icon" href="Vista/Img/favicon.webp">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="Vista/Css/global.css">
    <link rel="stylesheet" href="Vista/Css/produktuak.css">
</head>
<body>
<header class="z-3">
        <a href="produktuak.php">
            <img id="logo" src="Vista/Img/SNEAKIFY.webp" alt="logo">
        </a>

        <div class="dropdown">
            <span id="erab-icon-container" data-bs-toggle="dropdown" aria-expanded="false">
                <i id="erab-icon" class="bi bi-person"></i>
            </span>

            <ul class="dropdown-menu dropdown-menu-end z-3">
                <p id="izen-abizenak" class="dropdown-header">Nombre Apellido</p>
                <p id="email" class="dropdown-header">posta@gmail.com</p>
                <li><hr class="dropdown-divider"></li>
                <li>
                    <a class="dropdown-item" href="Vista/orga.html">
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
    <div id="carouselExampleIndicators" class="carousel slide z-2">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <!-- Banner argazkiak hemen -->
        <div class="carousel-inner"></div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <!-- Bilaketa filtroa -->
      <div id="filtroa">
        <select>
          <option value="0" selected>--Opzio bat aukeratu--</option>
          <option value="1">Prezioa: txikienetik handienera</option>
          <option value="2">Prezioa: handienetik txikienera</option>
        </select>
        
        <select>
            <option value="0">--Eragin bat aukeratu--</option>
            <option value="Adidas">Adidas</option>
            <option value="Nike">Nike</option>
        </select>
        <!-- Range input-a hemen -->
        <!-- Bilaketa barra hemen -->
      </div>
      <div id="produktuak">
        <!-- Produktuak hemen -->
      </div>
    <footer>
    <!-- FOOTERRA HEMEN -->
        <a href="produktuak.php">
            <img id="logo" src="Vista/Img/SNEAKIFY.webp" alt="logo">
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
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="Vista/Js/produktuak.js"></script>
    <script src="Vista/Js/script.js"></script>
</body>
</html>