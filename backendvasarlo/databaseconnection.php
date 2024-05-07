<?php
$connection = new mysqli("localhost", "root", "", "vasarlasok");
//var_dump($keresfutar);
if($connection->connect_error)
    die("Connection error: " . $connection->connect_error);
$connection->set_charset("utf8");