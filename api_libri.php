<?php
    header('Content-Type: application/json');
    require_once 'dbconfig.php';

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    
    $query = "SELECT * FROM libri";
    $res = mysqli_query($conn, $query);
    
    $catalogo = array();
    while($row = mysqli_fetch_assoc($res)) {
        $catalogo[] = $row;
    }

    mysqli_free_result($res);
    mysqli_close($conn);

    echo json_encode($catalogo);
?>