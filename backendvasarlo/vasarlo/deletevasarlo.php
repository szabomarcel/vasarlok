<?php
$sql = '';
if(count($keresVasarlo) > 1){
    if(is_int(intval($keresVasarlo))){
        $sql = 'DELETE FROM vasarlok WHERE vasarloID=' . $keresVasarlo[1];
    }else{
        http_response_code(404);
        echo 'Nem létező futár';
    }
}
require_once './databaseconnection.php';
$result = $connection->query($sql);
if($result->num_rows > 0){
    $vasarlok = array();
    http_response_code(200);
    echo json_encode($vasarlok);
}else{
    http_response_code(404);
    echo ' Nincs egy ügyfel sem';
}