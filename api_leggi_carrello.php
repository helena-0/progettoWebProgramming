<?php
    session_start();
    header('Content-Type: application/json');
    require_once 'dbconfig.php';

    $risposta = array();

    if (!isset($_SESSION["user_id"])) {
        echo json_encode($risposta);
        exit;
    }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $userid = $_SESSION["user_id"];

    $query = "SELECT carrello.libro_id, libri.isbn, libri.prezzo, libri.prezzo_sconto 
            FROM carrello 
            JOIN libri ON carrello.libro_id = libri.id 
            WHERE carrello.user_id = '$userid'";

    $res = mysqli_query($conn, $query);
    $libri_nel_carrello = array();

    while($row = mysqli_fetch_assoc($res)) {
        $libro = array();
        $libro["libro_id"] = $row["libro_id"]; 
        $libro["isbn"] = $row["isbn"];         
        $libro["prezzo"] = $row["prezzo"];
        $libro["prezzoSconto"] = $row["prezzo_sconto"];

        $libri_nel_carrello[] = $libro;
    }

    mysqli_free_result($res);
    mysqli_close($conn);

    echo json_encode($libri_nel_carrello);
    exit;
?>