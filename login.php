<?php
    require_once "auth.php";
    if (checkAuth()) {
        header("Location: index.php");
        exit;
    }

    $errore_login = "";

    $email_precompilata = "";
    if (isset($_COOKIE["email_salvata"])) {
        $email_precompilata = $_COOKIE["email_salvata"];
    }

    if (!empty($_POST["email"]) && !empty($_POST["password"])) {
        require_once "dbconfig.php";
        $conn = mysqli_connect($dbconfig["host"], $dbconfig["user"], $dbconfig["password"], $dbconfig["name"]) or die(mysqli_error($conn));
        
        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $query = "SELECT * FROM utenti WHERE email = '".$email."'";
        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

        if (mysqli_num_rows($res) > 0) {
            $entry = mysqli_fetch_assoc($res);
            
            if (password_verify($_POST["password"], $entry["password"])) {
                $_SESSION["email"] = $entry["email"];
                $_SESSION["user_id"] = $entry["id"]; 
                
                setcookie("email_salvata", $entry["email"], time() + (86400 * 7), "/");
                
                mysqli_free_result($res);
                mysqli_close($conn);
                header("Location: index.php");
                exit;
            }
        }
        $errore_login = "Email e/o password errati.";
        mysqli_close($conn);
    } else if (isset($_POST["email"]) || isset($_POST["password"])) {
        $errore_login = "Inserisci email e password.";
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Feltrinelli - Accedi</title>
        <link rel='stylesheet' href='login.css'>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="login.js" defer></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
        <meta charset="UTF-8">
    </head>
    <body>
        <div id="body_sx"></div>
        <div id="body_up"></div>
        <section id="body_dx">  
            <div id="indietro">
                <img src="immagini/freccia_rossa.png">
                <a href="index.php">Torna al sito</a>
            </div> 
            <div id="reg">        
                <h1>Accedi</h1>
                <form id="accesso" name="login" method='post'>
                    <div id="div-email">
                        <label for="email">E-mail</label>
                        <input type='text' name='email' id="email" value="<?php if(isset($_POST['email'])){echo $_POST['email'];} else {echo $email_precompilata;} ?>">
                        <span>Inserisci l'e-mail</span>
                    </div>
                    <div id="div-password">
                        <label for="password">Password</label>
                        <input type='password' name='password' id="password">
                        <span>Inserisci la password</span>
                    </div>
                    
                    <?php 
                        if (!empty($errore_login)) {
                            echo "<div class='errore-login'>$errore_login</div>";
                        }
                    ?>

                    <div id="bottone-reg">
                        <input type='submit' value="Entra" id="submit">
                    </div>
                    <div id="registrazione">
                        Non hai un account? 
                        <a href="registrazione.php">Registrati</a>
                    </div>
                </form>
            </div>
        </section>
    </body>
</html>