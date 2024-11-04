<?php
require_once("vista/ElementuKomunak.php");
require_once("vista/hasieraOrria.php");

ElementuKomunak::htmlHead();
ElementuKomunak::htmlHeader();

$controller = isset($_GET['controller']) ? $_GET['controller'] : null;
$action = isset($_GET['action']) ? $_GET['action'] : 'hasiera';

    if ($controller==null){
        hasieraOrria::hasierakoOrria();

    } else {
        require_once("controlador/".$controller."Controller.php");

        $controllerFullName = $controller."Controller";
        $controllerObject = new $controllerFullName;
        $controllerObject->ekintzaKudeatzailea($action);
    }

ElementuKomunak::htmlFooter();
?>