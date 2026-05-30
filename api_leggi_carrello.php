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

    $query = "SELECT * FROM carrello WHERE user_id = '$userid'";
    $res = mysqli_query($conn, $query);

    while ($row = mysqli_fetch_assoc($res)) {

        $libro = array();
        $libro["id"] = $row["id"];
        $libro["titolo"] = $row["titolo"];
        $libro["copertina"] = $row["copertina"];
        $libro["prezzo"] = $row["prezzo"];
        $libro["autore"] = $row["autore"];
        $libro["prezzoSconto"] = $row["prezzoSconto"];

        $risposta[] = $libro;
    }

    mysqli_free_result($res);
    mysqli_close($conn);

    echo json_encode($risposta);
    exit;
?>