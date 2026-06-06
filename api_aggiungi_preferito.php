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

    if (isset($_POST["id_libro"])) {
        $libro_id = mysqli_real_escape_string($conn, $_POST["id_libro"]);
    } 
    else if (isset($_POST["titolo"])) {
        $titolo = mysqli_real_escape_string($conn, $_POST["titolo"]);
        $autore = mysqli_real_escape_string($conn, $_POST["autore"]);
        $copertina = mysqli_real_escape_string($conn, $_POST["copertina"]);
        $prezzo = mysqli_real_escape_string($conn, $_POST["prezzo"]);
        $prezzo_sconto = mysqli_real_escape_string($conn, $_POST["prezzo_sconto"]);

        $query_cerca = "SELECT id FROM libri WHERE titolo = '$titolo' AND autore = '$autore'";
        $res_cerca = mysqli_query($conn, $query_cerca);

        if (mysqli_num_rows($res_cerca) > 0) {
            $row = mysqli_fetch_assoc($res_cerca);
            $libro_id = $row['id'];
        } else {
            $query_inserisci = "INSERT INTO libri(copertina, titolo, autore, prezzo, prezzo_sconto) VALUES ('$copertina', '$titolo', '$autore', '$prezzo', '$prezzo_sconto')";
            mysqli_query($conn, $query_inserisci);
            $libro_id = mysqli_insert_id($conn);
        }
    } else {
        echo json_encode(array("success" => false, "error" => "Dati mancanti"));
        exit;
    }

    $query_check = "SELECT * FROM preferiti WHERE user_id = '$userid' AND libro_id = '$libro_id'";
    $res_check = mysqli_query($conn, $query_check);

    if(mysqli_num_rows($res_check) > 0) {
        $query = "DELETE FROM preferiti WHERE user_id = '$userid' AND libro_id = '$libro_id'";
        mysqli_query($conn, $query);
        echo json_encode(array("success" => true, "messaggio" => "Rimosso dai preferiti"));
    } else {
        $query = "INSERT INTO preferiti(user_id, libro_id) VALUES ('$userid', '$libro_id')";
        mysqli_query($conn, $query);
        echo json_encode(array("success" => true, "messaggio" => "Aggiunto ai preferiti"));
    }

    mysqli_close($conn);
    exit;
?>