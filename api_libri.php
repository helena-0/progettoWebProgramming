<?php
    header('Content-Type: application/json');
    require_once 'dbconfig.php';

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    if(isset($_GET['q'])) {
        $testo_cercato = mysqli_real_escape_string($conn, $_GET['q']);
        $query = "SELECT * FROM libri WHERE titolo LIKE '%$testo_cercato%' OR autore LIKE '%$testo_cercato%'";
    } else {
        $query = "SELECT * FROM libri";
    }

    $res = mysqli_query($conn, $query);
    
    $catalogo = array();
    while($row = mysqli_fetch_assoc($res)) {
        $catalogo[] = $row;
    }

    mysqli_free_result($res);
    mysqli_close($conn);

    echo json_encode($catalogo);
?>