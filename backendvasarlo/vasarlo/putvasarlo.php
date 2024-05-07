<?php
$putadat = fopen('php://input', "r");
$raw_data = "";
while($chunk = fread($putadat, 1024)){
    $raw_data .=$chunk;
}
fclose($putadat);
$adatJSON = json_decode($raw_data);
$vasarloID = $adatJSON->vasarloID;
$nev = $adatJSON->nev;
$szuletett = $adatJSON->szuletett;
$helyseg = $adatJSON->helyseg;
$megyeID = $adatJSON->megyeID;
require_once './databaseconnection.php';
$sql = "UPDATE vasarlok SET nev=?, szuletett=?, helyseg=?, megyeID=? WHERE vasarloID=?";
$stml = $connection->prepare($sql);
$stml->bind_param("ssssi", $nev, $szuletett, $helyseg, $megyeID, $vasarloID);
if($stml->execute()){
    http_response_code(201);
    echo "Sikeres módosítás";
}else{
    http_response_code(404);
    echo "Sikertelen módosítás";
}