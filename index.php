<?php
require_once("vista/elementukomunak.php");
require_once("vista/main.php");

ElementuKomunak::htmlHead();
ElementuKomunak::htmlHeader();

$controller = isset($_GET['controller']) ? $_GET['controller'] : null;
$action = isset($_GET['action']) ? $_GET['action'] : 'hasiera';

    if ($controller==null){
        Main::hasierakoOrria();

    } else {
        require_once("controlador/".$controller."Controller.php");

        $controllerFullName = $controller."Controller";
        $controllerObject = new $controllerFullName;
        $controllerObject->ekintzaKudeatzailea($action);
    }

ElementuKomunak::htmlFooter();
?>