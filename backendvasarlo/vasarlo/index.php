<?php
switch ($_SERVER['REQUEST_METHOD']){
    case "GET":
        require_once 'vasarlo/getvasarlo.php';
        break;
    case "POST":
        require_once 'vasarlo/postvasarlo.php';
        break;
    case "DELETE":
        require_once 'vasarlo/deletevasarlo.php';
        break;
    case "PUT":
        require_once 'vasarlo/putvasarlo.php';
        break;
    default:
        break;
}