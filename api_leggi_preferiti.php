<?php
    session_start();
    require_once "dbconfig.php";

    $risposta = array();
    if (!isset($_SESSION["user_id"])) {
        echo json_encode($risposta);
        exit;
    }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $userid = $_SESSION["user_id"];

    $query = "SELECT preferiti.libro_id, libri.titolo, libri.autore, libri.copertina, libri.prezzo, libri.prezzo_sconto 
            FROM preferiti 
            JOIN libri ON preferiti.libro_id = libri.id 
            WHERE preferiti.user_id = '$userid'";

    $res = mysqli_query($conn, $query);
    $libri_preferiti = array();

    while($row = mysqli_fetch_assoc($res)) {
        $libri_preferiti[] = $row;
    }

    mysqli_free_result($res);
    mysqli_close($conn);

    echo json_encode($libri_preferiti);
    exit;
?>