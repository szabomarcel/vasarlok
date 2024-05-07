<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(isset($_POST["vasarloID"]) && isset($_POST["nev"]) && isset($_POST["szuletett"]) && isset($_POST["helyseg"]) && isset($_POST["megyeID"])) {
        require_once 'databaseconnection.php';
        if ($connection->connect_error) {
            die("Sikertelen kapcsolódás az adatbázishoz: " . $connection->connect_error);
        }
        $sql = "INSERT INTO vasarlok(vasarloID, nev, szuletett, helyseg, megyeID) VALUES (?,?,?,?,?)";
        if ($stmt = $connection->prepare($sql)) {
            $stmt->bind_param("issss", $vasarloID, $nev, $szuletett, $helyseg, $megyeID);
            $vasarloID = $_POST["vasarloID"];
            $nev = $_POST["nev"];
            $szuletett = $_POST["szuletett"];
            $helyseg = $_POST["helyseg"];
            $megyeID = $_POST["megyeID"];
            if ($stmt->execute()) {
                http_response_code(201);
                echo "Sikeresen lett hozzáadva";
            } else {
                http_response_code(404);
                echo 'Sikertelen hozzáadás';
            }
            $stmt->close();
        } else {
            echo "Hiba a lekérés előkészítésekor: " . $connection->error;
        }
        $connection->close();
    } else {
        echo "Hiányzó mezők!";
    }
} else {
    echo "Érvénytelen kérés!";
}