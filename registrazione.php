<?php
    require_once "auth.php";

    if (checkAuth()) {
        header("Location: index.php");
        exit;
    } 

    if(!empty($_POST["nome"]) &&!empty($_POST["cognome"]) && !empty($_POST["email"]) && !empty($_POST["password"]) &&  
    !empty($_POST["conferma_password"])){

        $error=[];
        $conn=mysqli_connect($dbconfig["host"],$dbconfig["user"],$dbconfig["password"],$dbconfig["name"]) or die(mysqli_error($conn));

        if(strlen($_POST["password"])<8){
            $error[]="Caratteri insufficienti";
        }

        if($_POST["password"]!=$_POST["conferma_password"]){
            $error[]="Le password non coincidono";
        }

        if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
            $error[] = "Email non valida";
        }
        else{
            $email = mysqli_real_escape_string($conn, strtolower($_POST["email"]));
            $res = mysqli_query($conn, "SELECT email FROM utenti WHERE email = '$email'");
            if (mysqli_num_rows($res) > 0) {
                $error[] = "Email già utilizzata";
            }
        }

        if(count($error)==0){
            $nome=mysqli_real_escape_string($conn, $_POST["nome"]);
            $cognome=mysqli_real_escape_string($conn, $_POST["cognome"]);
            $email=mysqli_real_escape_string($conn, $_POST["email"]);

            $password=mysqli_real_escape_string($conn, $_POST["password"]);
            $password = password_hash($password, PASSWORD_BCRYPT);

            $query="INSERT INTO utenti(nome, cognome, email, password) VALUES('$nome', '$cognome', '$email', '$password')";

            if (mysqli_query($conn, $query)) {
                $_SESSION["user_id"] = mysqli_insert_id($conn);

                if (isset($_POST["ricordami"]) && $_POST["ricordami"] == "si") {
                    setcookie("email_salvata", $_POST["email"], time() + (86400 * 7), "/");
                }

                mysqli_close($conn);
                header("Location: index.php");
                exit;
            } 
            else {
                $error[] = "Errore di connessione al Database";
            }    
        }
        mysqli_close($conn);
    }


?>


<!DOCTYPE html>
<html>
    <head>
        <title>Feltrinelli-Registrazione</title>
        <link rel='stylesheet' href='registrazione.css'>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="registrazione.js" defer></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
        <meta charset="UTF-8">
    </head>
    <body>
        <div id="body_sx">
            
        </div>
        <div id="body_up"></div>
        <section id="body_dx">  
            <div id="indietro">
                <img src="immagini/freccia_rossa.png">
                <a href="index.php">Torna al sito</a>
            </div> 
            <div id="reg">        
                <h1>Crea un account</h1>
                <form id="registrazione" name="registrazione" method='post'>
                    <div>
                        <label for="nome">Nome</label>
                        <input type='text' name='nome' id="nome" <?php if(isset($_POST["nome"])){echo "value=\"".$_POST["nome"]."\"";} ?>>
                        <span>Devi inserire il tuo nome</span>
                    </div>
                    <div>
                        <label for="cognome">Cognome</label>
                        <input type='text' name='cognome' id="cognome" <?php if(isset($_POST["cognome"])){echo "value=\"".$_POST["cognome"]."\"";} ?>>
                        <span>Devi inserire il tuo cognome</span>
                    </div>
                    <div id="div-email">
                        <label for="email">E-mail</label>
                        <input type='text' name='email' id="email" <?php if(isset($_POST["email"])){echo "value=\"".$_POST["email"]."\"";} ?>>
                        <span>Indirizzo e-mail non valido</span>
                    </div>
                    <div id="div-password">
                        <label for="password">Password</label>
                        <input type='password' name='password' id="password" <?php if(isset($_POST["password"])){echo "value=\"".$_POST["password"]."\"";} ?>>
                        <span>Inserisci almeno 8 caratteri</span>
                    </div>
                    <div id="div-conferma_password">
                        <label for="conferma_password">Conferma Password</label>
                        <input type='password' name='conferma_password' id="conferma_password"<?php if(isset($_POST["conferma_password"])){echo "value=\"".$_POST["conferma_password"]."\"";} ?>>
                        <span>Le password non coincidono</span>
                    </div>
                    <div id="div-ricorda">
                        <label for="reg_ricordami">Ricordami</label>
                        <input type='checkbox' name='ricordami' id="reg_ricordami" value="si">
                    </div>
                    <div id="bottone-reg">
                        <input type='submit' value="Registrati" id="submit">
                    </div>
                </form>
            </div>
        </section>
    </body>
</html>

