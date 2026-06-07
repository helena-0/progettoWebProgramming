<?php
    header("Content-Type: application/json");

    if(isset($_GET['isbn'])) {
        $isbn = urlencode($_GET['isbn']);
        $url = "https://openlibrary.org/api/books?bibkeys=ISBN:" . $isbn . "&format=json&jscmd=data";

    } else if(isset($_GET['q'])) {
        $query = urlencode($_GET['q']);
        $url = "https://openlibrary.org/search.json?q=" . $query;

    } else {
        echo json_encode(array("error" => "Nessun parametro specificato"));
        exit;
    }

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); 

    $risposta_openlibrary = curl_exec($curl);
    curl_close($curl);

    echo $risposta_openlibrary;
?>