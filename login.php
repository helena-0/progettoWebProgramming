<?php
    session_start();
    header('Content-Type: application/json');
    require_once 'dbconfig.php';
    $risposta = array();

    if (!empty($_POST["email"]) && !empty($_POST["password"])) { 

        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);      
        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $query = "SELECT * FROM utenti WHERE email = '".$email."'";
        $res = mysqli_query($conn, $query);
        
        if (mysqli_num_rows($res) > 0) {
            $entry = mysqli_fetch_assoc($res);
            
            if (password_verify($_POST['password'], $entry['password'])) {
                
                $_SESSION["email"] = $entry['email'];
                $_SESSION["user_id"] = $entry['id']; 

                setcookie("email_salvata", $_POST["email"], time() + (86400 * 7), "/");
                
                mysqli_free_result($res);
                mysqli_close($conn);
                
                $risposta["success"] = true;

                echo json_encode($risposta);
                exit;
            }
        }
        
        mysqli_close($conn);
        
        $risposta["success"] = false;
        $risposta["error"] = "Email e/o password errati.";
        
        echo json_encode($risposta);
        exit;
        
    } else {

        $risposta["success"] = false;
        $risposta["error"] = "Inserisci email e password.";
        
        echo json_encode($risposta);
        exit;
    }
?>