<?php
require_once("vista/header.php");
require_once("vista/footer.php");

main::htmlHead();
header::htmlHeader();

$controller = isset($_GET['controller']) ? $_GET['controller'] : null;
$action = isset($_GET['action']) ? $_GET['action'] : 'hasiera';

    if ($controller==null){
        main::hasierakoOrria();

    } else {
        require_once("controlador/".$controller."Controller.php");

        $controllerFullName = $controller."Controller";
        $controllerObject = new $controllerFullName;
        $controllerObject.ekintzaKudeatzailea($action);
    }

footer::htmlFooter();
?>