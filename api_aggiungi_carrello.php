<?php
    session_start();
    header('Content-Type: application/json');
    require_once 'dbconfig.php';

    if (!isset($_SESSION["user_id"])) {
        echo json_encode(array("success" => false, "error" => "Non loggato"));
        exit;
    }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    
    $userid = $_SESSION["user_id"];
    $libro_id = mysqli_real_escape_string($conn, $_POST["id_libro"]);

    $query_check = "SELECT * FROM carrello WHERE user_id = '$userid' AND libro_id = '$libro_id'";
    $res_check = mysqli_query($conn, $query_check);

    if(mysqli_num_rows($res_check) > 0) {
        $query = "DELETE FROM carrello WHERE user_id = '$userid' AND libro_id = '$libro_id'";
        mysqli_query($conn, $query);
        echo json_encode(array("success" => true, "messaggio" => "Libro rimosso!"));
    } else {
        $query = "INSERT INTO carrello(user_id, libro_id) VALUES ('$userid', '$libro_id')";
        mysqli_query($conn, $query);
        echo json_encode(array("success" => true, "messaggio" => "Libro aggiunto!"));
    }

    mysqli_close($conn);
    exit;
?>