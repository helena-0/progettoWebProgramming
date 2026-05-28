<?php
    session_start();
   
    header('Content-Type: application/json');
    require_once 'dbconfig.php';
    $risposta = array();

    // 1. Controllo se l'utente ha fatto il login
    if (!isset($_SESSION["user_id"])) {
        $risposta["success"] = false;
        $risposta["error"] = "Devi fare l'accesso per aggiungere al carrello.";
        
        echo json_encode($risposta);
        exit;
    }

    // 2. Controllo di aver ricevuto i dati del libro da JavaScript
    if (isset($_POST["titolo"]) && isset($_POST["copertina"]) && isset($_POST["prezzo"])) {

        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    
        $userid = $_SESSION["user_id"];
        $titolo = mysqli_real_escape_string($conn, $_POST["titolo"]);
        $copertina = mysqli_real_escape_string($conn, $_POST["copertina"]);
        $prezzo = mysqli_real_escape_string($conn, $_POST["prezzo"]);

        $query_cerca = "SELECT * FROM carrello WHERE user_id = '$userid' AND titolo = '$titolo'";
        $res_cerca = mysqli_query($conn, $query_cerca);

        if (mysqli_num_rows($res_cerca) > 0) {
            
            $query_cancella = "DELETE FROM carrello WHERE user_id = '$userid' AND titolo = '$titolo'";
            mysqli_query($conn, $query_cancella);
            
            $risposta["success"] = true;
            $risposta["messaggio"] = "Libro rimosso dal carrello";
            
        } else {
           
            $query_inserisci = "INSERT INTO carrello(user_id, titolo, copertina, prezzo) VALUES ('$userid', '$titolo', '$copertina', '$prezzo')";
            mysqli_query($conn, $query_inserisci);
            
            $risposta["success"] = true;
            $risposta["messaggio"] = "Libro aggiunto al carrello";
        }

        mysqli_close($conn);
        echo json_encode($risposta);
        exit;
    }


    $risposta["success"] = false;
    $risposta["error"] = "Mancano i dati del libro.";
    echo json_encode($risposta);
    exit;
?>