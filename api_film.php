<?php
    header("Content-Type: application/json");

    $api_key = "cb216e086c72157de88a76d71631e973";

    if(isset($_GET["q"])) {
        $query = urlencode($_GET["q"]);
        $url = "https://api.themoviedb.org/3/search/movie?api_key=" . $api_key . "&language=it-IT&query=" . $query;
    } else {
        $url = "https://api.themoviedb.org/3/movie/now_playing?api_key=" . $api_key . "&language=it-IT&region=IT";
    }

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); 
    
    $risposta_film = curl_exec($curl);
    curl_close($curl);

    echo $risposta_film;
?>