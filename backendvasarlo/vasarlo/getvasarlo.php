<?php
$sql = '';
if(count($keresVasarlo) > 1){
    if(is_int(intval($keresVasarlo[1]))){
        $sql = 'SELECT * FROM vasarlok WHERE vasarloID=' . $keresVasarlo[1];
    }else{
        http_response_code(404);
        echo 'Nem létező ügyfel';
    }
}else{
    $sql = 'SELECT * FROM vasarlok WHERE 1';
}
require_once "./databaseconnection.php";
$result = $connection->query($sql);
if($result->num_rows > 0){
    $vasarlok = array();
    while($row = $result->fetch_assoc()){
        $vasarlok[] = $row;
    }
    http_response_code(200);
    echo json_encode($vasarlok);
}else{
    http_response_code(404);
    echo 'Nincs egy ügyfel sem';
}