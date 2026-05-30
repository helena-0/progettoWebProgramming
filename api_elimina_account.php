<?php
    session_start();
    header('Content-Type: application/json');
    require_once 'dbconfig.php';

    $risposta = array();

    if (!isset($_SESSION["user_id"])) {
        $risposta["success"] = false;
        $risposta["error"] = "Devi essere loggato per eliminare l'account.";
        echo json_encode($risposta);
        exit;
    }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $userid = $_SESSION["user_id"];

    // 2. Pulizia: Elimino prima tutto il carrello di questo utente
    $query_carrello = "DELETE FROM carrello WHERE user_id = '$userid'";
    mysqli_query($conn, $query_carrello);

    // 3. Elimino l'utente stesso dalla tabella utenti
    $query_utente = "DELETE FROM utenti WHERE id = '$userid'";
    
    if (mysqli_query($conn, $query_utente)) {
        // Se l'eliminazione ha successo, distruggo la sessione (lo scollego)
        session_destroy();
        
        $risposta["success"] = true;
        $risposta["messaggio"] = "Account eliminato";
    } else {
        $risposta["success"] = false;
        $risposta["error"] = "C'è stato un problema durante l'eliminazione.";
    }

    mysqli_close($conn);
    echo json_encode($risposta);
    exit;
?>