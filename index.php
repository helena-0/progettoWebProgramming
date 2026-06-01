<?php
    require_once 'auth.php';
    $isLogged=checkAuth();

    $email_precompilata = "";
    if (isset($_COOKIE["email_salvata"])) {
        $email_precompilata = $_COOKIE["email_salvata"];
    }
?>


<!DOCTYPE html>
<html>
<head>
    <title>Feltrinelli: Libri, DVD, Blue-Ray, CD, eBook, Games, eReader, Giocattoli</title>
    <link rel="stylesheet" href="style.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="script.js" defer></script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <meta charset="UTF-8">
</head>
<body>
    <header>
        <div id="bordo-nav">
            <nav id="navservizi">
                <div>
                    <a href="#">CartaEffe</a>
                    <a href="#">Gift Card</a>
                    <a href="#">Negozi</a>
                    <a href="#">Punti di ritiro</a>
                    <a href="#">Eventi</a>
                    <a href="#">Convenzioni</a>
                    <a href="#" class="bordo">Assistenza clienti</a>
                </div>
            </nav>
        </div>

        <div class="barra-superiore"> 
            <div><img src="immagini/logo.png" class="logo"></div>

            <form id="ricerca">        
                <div class="barra-ricerca">
                    <input type="text" placeholder="Ciao, cosa vuoi cercare?" class="input-ricerca">
                    <input type="image" src="immagini/search.png" class="logo">
                </div>
                <a>Ricerca avanzata</a>
            </form>

            <div id="risultati-ricerca" class="hidden">
                <h3 id="titolo-ricerca">Risultati ricerca:</h3>
                <div id="sezione-ricerca"></div>
            </div>

            <div class="icone">
                <img src="immagini/favorite.png" class="logo" id="preferiti">
                <?php 
                    if($isLogged==false){ ?>
                            <img src="immagini/cart.png" class="logo" >
                    <?php } 
                    else{ ?>
                        <a href="carrello.php">
                            <img src="immagini/cart.png" class="logo" >
                        </a>
                <?php } ?> 
                <?php 
                    if($isLogged==false){ ?>
                            <img src="immagini/person.png" class="logo" id="loggin">
                    <?php } 
                    else{ ?>
                        <a href="account.php">
                            <img src="immagini/person_log.png" class="logo">
                        </a>
                <?php } ?>                
            </div>

            <div id="pannello-preferiti" class="hidden">
                <h1 id="titolo-sezione">Preferiti</h1>
                <div id="sezionej"></div>
            </div>
        </div>
        <div class="consegne">
            <div><img src="immagini/camion-delivery.png" class="logo"></div>
            <span><strong>Consegna</strong> Sempre <strong>GRATIS</strong> nella Tua <strong>Libreria</strong></span>
        </div>
        <div id="barra-menu">
            <div class="voce-menu">
                <a href="#">Libri</a>
                <div class="barra-menu-aperto">
                    <div class="contenitore-menu">
                        <div class="menu-colonna">
                            <section>
                                <div class="titoli-paragrafi">Libri</div>
                                <div class="link-menu">
                                    <div><span>Homepage</span></div>
                                    <div><span>I più venduti</span></div>
                                    <div><span>Novità del momento</span></div>
                                    <div><span>In prenotazione</span></div>
                                    <div><span>Copie autografate</span></div>
                                </div>
                            </section>
                            <section>
                                <div class="titoli-paragrafi">In offerta</div>
                                <div class="link-menu">
                                    <div><span>Novità con consegna gratis</span></div>
                                    <div><span>Editori in promozione</span></div>
                                    <div><span>Outlet -60%</span></div>
                                    <div><span>Occasioni -25%</span></div>
                                </div>
                            </section>
                        </div>
                        <div class="menu-colonna bordo">
                            <section>
                                <div class="titoli-paragrafi">Scuola e università</div>
                                <div class="link-menu">
                                    <div><span>Carta della Cultura</span></div>
                                    <div><span>Libri universitari</span></div>
                                    <div><span>Feltrinelli per la scuola</span></div>
                                </div>
                            </section>
                            <section>
                                <div class="titoli-paragrafi">Scelti per te</div>
                                <div class="link-menu">
                                    <div><span>La casa del Romance</span></div>
                                    <div><span>Booktok</span></div>
                                    <div><span>Cosy crime</span></div>
                                    <div><span>Fumettie Manga</div>
                                    <div><span>Dal libro alla serie</div>
                                    <div><span>Gialli e thriller</span></div>
                                    <div><span>Narrativa italiana</span></div>
                                    <div><span>Narrativa straniera</span></div>
                                </div>
                            </section>
                        </div>
                        <div class="menu-colonna bordo">
                            <div class="titoli-paragrafi">Promozioni</div>
                            <img src="immagini/promozioni1.webp">
                            <img src="immagini/promozioni2.webp">
                        </div>
                        <div class="menu-colonna bordo">
                            <div id="contenitore-promo">
                                <div id="overlay-menu"></div>
                                <h2>Novità settimanali</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="voce-menu">
                <a href="#">Fumetti e Manga</a>
                <div class="barra-menu-aperto">
                    <div class="contenitore-menu">
                        <div class="menu-colonna">
                            <section>
                                <div class="titoli-paragrafi">Fumetti e manga</div>
                                <div class="link-menu">
                                    <div><span>Homepage</span></div>
                                    <div><span>Classifica</span></div>
                                    <div><span>Novità</span></div>
                                    <div><span>In prenotazione</span></div>
                                    <div><span>Guida ai migliori manga</span></div>
                                    <div><span>Capire Zerocalcare</span></div>
                                    <div><span>Concorso Nuvolette all'Orizzonte</span></div>
                                </div>
                            </section>
                        </div>
                        <div class="menu-colonna bordo">
                            <section>
                                <div class="titoli-paragrafi">Reparti in evidenza</div>
                                <div class="link-menu">
                                    <div><span>Manga</span></div>
                                    <div><span>Supereroi</span></div>
                                    <div><span>Cartoni animati e fumetti</span></div>
                                </div>
                            </section>
                            <section>
                                <div class="titoli-paragrafi">Saghe del momento</div>
                                <div class="link-menu">
                                    <div><span>One piece</span></div>
                                    <div><span>Jujutsu Kaisen</span></div>
                                    <div><span>Fullmetal alchemist</span></div>
                                    <div><span>Blue lock</span></div>
                                    <div><span>Chainsow man</span></div>
                                    <div><span>20th century boys</span></div>
                                </div>
                            </section>
                        </div>
                        <div class="menu-colonna bordo">
                            <div class="titoli-paragrafi">Promozioni</div>
                            <img src="immagini/promozioni3.webp">
                        </div>
                        <div class="menu-colonna bordo">
                            <div id="contenitore-promo2">
                                <div class="overlay-menu"></div>
                                <h2>Novità settimanali</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>           
            
            <a href="#">Bambini e ragazzi</a>
            <a href="#">Libri in inglese</a>
            <a href="#">Libri vintage</a>
            <a href="#">eBook e audiolibri</a>
            <a href="#">Film</a>
            <a href="#">CD e vinili</a>
            <a href="#">Cartoleria</a>
            <a href="#">Giochi</a>
            <a href="#">Offerte</a>         
        </div>

        <div id="barra-superiore1024">
            <div class="icone">
                <img src="immagini/menu.png" class="logo">
                <img src="immagini/person.png" class="logo">
            </div>
            <img src="immagini/logo.png" class="logo">
            <div class="icone">
                <img src="immagini/favorite.png" class="logo">
                <img src="immagini/cart.png" class="logo">
            </div>
        </div>
        <div class="barra-ricerca barra-ricerca1024">
            <input type="text" placeholder="Ciao, cosa vuoi cercare?" class="input-ricerca">
            <input type="image" src="immagini/search.png" class="logo" alt="Cerca">
        </div>
        <div class="consegne consegne1024">
            <div><img src="immagini/camion-delivery.png" class="logo"></div>
            <span><strong>Consegna</strong> Sempre <strong>GRATIS</strong> nella Tua <strong>Libreria</strong></span>
        </div>
    </header>

    <div id="banner">
        <img src="immagini/banner1.jpg">
        <div class="pulsante-freccia sinistra">
            <
        </div>

        <div class="pulsante-freccia destra">
            >
        </div>
    </div>

    <section id="blocco-classifica">
        <h2>La Classifica del giorno</h2>
        <div id="classifica-categorie">
            <div id="categoria-rossa">LIBRI</div>
            <div class="bordo">FILM</div>
            <div class="bordo">MUSICA</div>
            <div class="bordo">GIOCHI</div>
        </div>
        <div class="sezione">
            <article id="primo-posto">
                <div id="numero-uno">1°</div>
                <div id="primo-posto-sfondo">
                    <div class="contenitore-immagine">
                        <img src="immagini/libro1.jpg">
                        <div class="overlay"></div>
                    </div>
                    <div class="numero-classifica">1</div>
                    <div class="libro-descrizione">
                        <div>
                            <div class="titolo">Io sono Adele</div>
                            <div class="sottotitolo">di <span>Csaba dalla Zorza</span></div>
                        </div>
                        <img src="immagini/cinque-stelle-grigio2.png" id="stelle3">
                        <img src="immagini/cinque-stelle2.png" class="stelle2">
                        <div class="sottotitolo">Marsilio, 2026</div>
                    </div>
                </div>
            </article>
            <div>
                <article class="libro">
                    <div class="contenitore-immagine">
                        <img src="immagini/libro2.jpg">
                        <div class="overlay"></div>
                    </div>
                    <div class="numero-classifica">2</div>
                    <div class="libro-descrizione">
                        <div>
                            <div class="titolo"><span>Saggio sulla lucidità</span></div>
                            <div class="sottotitolo">di <span>José Saramago</span></div>
                        </div>
                        <div class="stelle">
                            <img src="immagini/cinque-stelle.png">
                            <span>(2)</span>
                        </div>
                        <div class="sottotitolo">Feltrinelli, 2026</div>
                    </div>
                </article>

                <article class="libro">
                    <div class="contenitore-immagine">
                        <img src="immagini/libro3.jpg">
                        <div class="overlay"></div>
                    </div>
                    <div class="numero-classifica">3</div>
                    <div class="libro-descrizione">
                        <div>
                            <div class="titolo"><span>La morte di Ivan Il'ic</span></div>
                            <div class="sottotitolo">di <span>Lev Tolstoj</span></div>
                        </div>
                        <div class="stelle">
                            <img src="immagini/cinque-stelle.png">
                            <span>(4)</span>
                        </div>
                        <div class="sottotitolo">Feltrinelli, 2026</div>
                    </div>
                </article>

                <article class="libro">
                    <div class="contenitore-immagine">
                        <img src="immagini/libro4.jpg">
                        <div class="overlay"></div>
                    </div>
                    <div class="numero-classifica">4</div>
                    <div class="libro-descrizione">
                        <div>
                            <div class="titolo"><span>Il giocatore</span></div>
                            <div class="sottotitolo">di <span>Fedor Dostoevskij</span></div>
                        </div>
                        <div class="stelle">
                            <img src="immagini/cinque-stelle.png">
                            <span>(3)</span>
                        </div>
                        <div class="sottotitolo">Feltrinelli, 2026</div>
                    </div>
                </article>

                <article class="libro">
                    <div class="contenitore-immagine">
                        <img src="immagini/libro5.jpg">
                        <div class="overlay"></div>
                    </div>
                    <div class="numero-classifica">5</div>
                    <div class="libro-descrizione">
                        <div>
                            <div class="titolo"><span>Le origini del male</span></div>
                            <div class="sottotitolo">di <span>You-jeong Jeong</span></div>
                        </div>
                        <div class="stelle">
                            <img src="immagini/cinque-stelle.png">
                            <span>(3)</span>
                        </div>
                        <div class="sottotitolo">Feltrinelli, 2026</div>
                    </div>
                </article>
            </div>
        </div>
        <div class="categorie">
            <div><span>I libri più letti</span></div>
            <div class="bordo"><span>I film più visti</span></div>
            <div class="bordo"><span>I CD più ascoltati</span></div>
            <div class="bordo"><span>I CD più ascoltati</span></div>
        </div>
    </section>

    <section id="blocco-novita">
        <h2>Novità da non perdere</h2>       
            <div class="sezione">
                <article class="libro">
                    <div class="contenitore-immagine">
                        <img src="immagini/libronov1.jpg" class="copertina">
                        <div>
                            <?php if($isLogged) { ?>
                                <div class="pulsante-freccia sinistra"
                                    data-copertina="immagini/libronov1.jpg"
                                    data-titolo="La gioia è un duro lavoro"
                                    data-prezzo="15,20€"
                                    >                                
                                    <img src="immagini/favorite.png">
                                </div>
                                <div class="pulsante-freccia destra" data-id-libro="1">
                                    <img src="immagini/cart.png">
                                </div>
                            <?php } ?>
                        </div>
                    </div>
                    <div class="libro-descrizione">
                        <div>
                            <div class="titolo"><span>La gioia è un duro lavoro</span></div>
                            <div class="sottotitolo">di <span>Gio Evan</span></div>
                        </div>
                        <div class="stelle">
                            <img src="immagini/cinque-stelle-grigio.png">
                        </div>
                        <div class="prezzo">
                            <span class="sconto">15,20€</span>
                            <span class="prezzo-pieno">16,00€</span>
                        </div>
                    </div>
                </article>

                <article class="libro">
                    <div class="contenitore-immagine">
                        <img src="immagini/libronov2.jpg" class="copertina">
                        <div>
                            <?php if($isLogged) { ?>
                                <div class="pulsante-freccia sinistra"
                                    data-copertina="immagini/libronov2.jpg"
                                    data-titolo="Funny story. Un amore per finta"
                                    data-prezzo="17,00€"
                                >
                                    <img src="immagini/favorite.png">
                                </div>
                                <div class="pulsante-freccia destra" data-id-libro="2">
                                    <img src="immagini/cart.png">
                                </div>
                            <?php } ?>
                        </div>
                    </div>
                    <div class="libro-descrizione">
                        <div>
                            <div class="titolo"><span>Funny story. Un amore per finta</span></div>
                            <div class="sottotitolo">di <span>Emily Henry</span></div>
                        </div>
                        <div class="stelle">
                            <img src="immagini/cinque-stelle2-grigio.png">
                        </div>
                        <div class="prezzo">
                            <span class="sconto">17,00€</span>
                            <span class="prezzo-pieno">17,90€</span>
                        </div>
                    </div>
                </article>

                <article class="libro" id="tre">
                    <div class="contenitore-immagine">
                        <img src="immagini/libronov3.jpg" class="copertina">
                        <div>
                            <?php if($isLogged) { ?>
                                <div class="pulsante-freccia sinistra"
                                    data-copertina="immagini/libronov3.jpg"
                                    data-titolo="Vento e verità"
                                    data-prezzo="33,25€"
                                >
                                    <img src="immagini/favorite.png">
                                </div>
                                <div class="pulsante-freccia destra" data-id-libro="3">
                                    <img src="immagini/cart.png">
                                </div>
                            <?php } ?>
                        </div>
                    </div>
                    <div class="libro-descrizione">
                        <div>
                            <div class="titolo"><span>Vento e verità</span></div>
                            <div class="sottotitolo">di <span>Brandon Sanderson</span></div>
                        </div>
                        <div class="stelle">
                            <img src="immagini/cinque-stelle-grigio.png">
                        </div>
                        <div class="prezzo">
                            <span class="sconto">33,25€</span>
                            <span class="prezzo-pieno">35,00€</span>
                        </div>
                    </div>
                </article>

                <article class="libro" id="due">
                    <div class="contenitore-immagine">
                        <img src="immagini/libro2.jpg" class="copertina">
                        <div>
                            <?php if($isLogged) { ?>
                                <div class="pulsante-freccia sinistra"
                                    data-copertina="immagini/libro2.jpg"
                                    data-titolo="Saggio sulla lucidità"
                                    data-prezzo="12,35€"
                                >
                                    <img src="immagini/favorite.png">
                                </div>
                                <div class="pulsante-freccia destra" data-id-libro="4">
                                    <img src="immagini/cart.png">
                                </div>
                            <?php } ?>
                        </div>
                    </div>
                    <div class="libro-descrizione">
                        <div>
                            <div class="titolo"><span>Saggio sulla lucidità</span></div>
                            <div class="sottotitolo">di <span>José Saramago</span></div>
                        </div>
                        <div class="stelle">
                            <img src="immagini/cinque-stelle-grigio.png">
                        </div>
                        <div class="prezzo tolto">
                            <span class="sconto">12,35€</span>
                            <span class="prezzo-pieno">13,00€</span>
                        </div>
                    </div>
                </article>

                <article class="libro" id="uno">
                    <div class="contenitore-immagine">
                        <img src="immagini/libronov5.jpg" class="copertina">
                        <div>
                            <?php if($isLogged) { ?>
                                <div class="pulsante-freccia sinistra"
                                    data-copertina="immagini/libronov5.jpg"
                                    data-titolo="Heated Rivarly"
                                    data-prezzo="17,00€"
                                >
                                    <img src="immagini/favorite.png">
                                </div>
                                <div class="pulsante-freccia destra" data-id-libro="5">
                                    <img src="immagini/cart.png">
                                </div>
                            <?php } ?>
                        </div>
                    </div>
                    <div class="libro-descrizione">
                        <div>
                            <div class="titolo"><span>Heated Rivarly</span></div>
                            <div class="sottotitolo">di <span>Rachel Reid</span></div>
                        </div>
                        <div class="stelle">
                            <img src="immagini/cinque-stelle2-grigio.png">
                        </div>
                        <div class="prezzo">
                            <span class="sconto">17,00€</span>
                            <span class="prezzo-pieno">17,90€</span>
                        </div>
                    </div>
                </article>
            </div>  
            <div class="categorie">
                <div><span>Novità con consegna gratis</span></div>
                <div class="bordo"><span>In prenotazione</span></div>
                <div class="bordo"><span>Vai al mondo dei libri</span></div>
        </div>      
    </section>
    
    <section id="layout-film">  
        <div id="riga-film">
            <h2>Film più visti al cinema</h2>
            <div id="lista-ranking-film" class="sezione"></div>
        </div>
        <div id="riga-ricerca">
            <div id="ricerca-film">
                <form id="form-ricerca-film">
                    <div class="barra-ricerca">
                        <input type="text" placeholder="Cerca trama film..." class="input-ricerca">
                    </div>
                    <button type="submit">Cerca</button>
                </form>
                <div id="risultato-ricerca"></div>
            </div>
        </div>
    </section>

    <footer>
        <div id="footer-grigio">
            <div class="footer-informazioni">
                <div>
                    <div class="titoli-paragrafi">FELTRINELLI LIBERIE</div>
                    <div>
                        <a>Negozi</a>
                        <a>Evento</a>
                        <a>Lavora con noi</a>
                    </div>
                </div>
                <div>
                    <div class="titoli-paragrafi">SERVIZI PER IL CLIENTE</div>
                    <div>
                        <a href="#">Carta Effe</a>
                        <a href="#">Prenota e ritira</a>
                        <a href="#">Gift Cart Feltrinelli</a>
                        <a href="#">Carta Cultura</a>
                        <a href="#">Carta del docente</a>
                        <a href="#">Punti di ritiro</a>
                        <a href="#">Indici</a>
                        <a href="#">Stampa foto online</a>
                    </div>
                </div>
                <div>
                    <div class="titoli-paragrafi">SERVIZI BUSINESS</div>
                    <div>
                        <a href="#">Apri un franchising</a>
                        <a href="#">Affiliazioni</a>
                        <a href="#">Gift Card Business</a>
                        <a href="#">Vendi su Marketplace</a>
                        <a href="#">Collaborazioni online</a>
                        <a href="#">Prima Effe</a>
                    </div>
                </div>
 
                <div>
                    <div class="titoli-paragrafi">SUPPORTO CLIENTE</div>
                    <div>
                        <a href="#">Area Personale</a>
                        <a href="#">I miei ordini</a>
                        <a href="#">Assistenza clienti</a>
                        <a href="#">Contattaci</a>
                        <a href="#">Spese di consegna</a>
                    </div>
                </div>
                <div>
                    <div class="titoli-paragrafi">TERMINI E CONDIZIONI</div>
                    <div>
                        <a href="#">Condizioni generali di vendita</a>
                        <a href="#">Informativa sul diritto di recesso</a>
                        <a href="#">Informativa sulla privacy</a>
                    </div>
                </div>
                <div>
                    <div class="titoli-paragrafi">I SITI DEL GRUPPO</div>
                    <div>
                        <a href="#">Gruppo Feltrinelli</a>
                        <a href="#">Giangiacomo Feltrinelli Editore</a>
                        <a href="#">Fondazione Giangiacomo Feltrinelli</a>
                        <a href="#">Feltrinelli Education</a>
                    </div>
                </div>
            </div>

            <div class="footer-informazioni" id="footer-linea-icone">
                <div class="icone">
                    <img src="immagini/cartadicredito.png">
                    <a href="#">CartaEffe</a>
                </div>
                <div class="icone">
                    <img src="immagini/negozio.png">
                    <a href="#">Negozi</a>
                </div>
                <div class="icone">
                    <img src="immagini/assistenza.png">
                    <a href="#">Assistenza clienti</a>
                </div>
                <div class="icone">
                    <img src="immagini/camion.png">
                    <a href="#">Consegne</a>
                </div>
            </div>

            <div class="footer-informazioni">
                <div>
                    <div class="titoli-paragrafi">LIBRI</div>
                    <div>
                        <a href="#">Libri in italiano</a>
                        <a href="#">Libri Outlet</a>
                        <a href="#">Libri in Inglese</a>
                        <a href="#">Libri Vintage</a>
                        <a href="#">eBook</a>
                        <a href="#">Audiolibri</a>
                    </div>
                </div>
                <div>
                    <div class="titoli-paragrafi">MUSICA</div>
                    <div>
                        <a href="#">CD</a>
                        <a href="#">Novità CD</a>
                        <a href="#">Classifica CD</a>
                        <a href="#">Vinili</a>
                        <a href="#">Novità Vinili</a>
                        <a href="#">Classifica Vinili</a>
                    </div>
                </div>
                <div>
                    <div class="titoli-paragrafi">FILM</div>
                    <div>
                        <a href="#">Film</a>
                        <a href="#">Novità Film</a>
                        <a href="#">Classifica DVD</a>
                        <a href="#">Classifica Blu-ray</a>
                        <a href="#">Serie TV</a>
                        <a href="#">Bambini e ragazzi</a>
                    </div>
                </div>
                <div>
                    <div class="titoli-paragrafi">GIOCATTOLI</div>
                    <div>
                        <a href="#">Giochi e giocattoli</a>
                        <a href="#">Costruzione e mattoncini</a>
                        <a href="#">Giochi educativi</a>
                        <a href="#">Giochi di società</a>
                        <a href="#">Bambole e bambolotti</a>
                        <a href="#">Action figures</a>
                    </div>
                </div>
                <div>
                    <div class="titoli-paragrafi">CARTOLERIA</div>
                    <div>
                        <a href="#">Cartoleria</a>
                        <a href="#">Diari</a>
                        <a href="#">Zaini</a>
                        <a href="#">Cancelleria</a>
                        <a href="#">Open Wor(l)ds</a>
                        <a href="#">Quaderni</a>
                    </div>
                </div>
                <div>
                    <div class="titoli-paragrafi">IDEE REGALO</div>
                    <div>
                        <a href="#">Idee regalo</a>
                        <a href="#">Merchandising Feltrinelli</a>
                        <a href="#">Viaggi e Gift Box</a>
                        <a href="#">Gadget</a>
                        <a href="#">eReader Rakuten Kobo</a>
                    </div>
                </div>
            </div>
            

            <div class="footer-tendina768">
                <div>FELTRINELLI LIBRERIE</div>
                <img src="immagini/add.png">
            </div>
            <div class="footer-tendina768">
                <div>SERVIZI PER IL CLIENTE</div>
                <img src="immagini/add.png">
            </div>
            <div class="footer-tendina768">
                <div>SERVIZI BUSINESS</div>
                <img src="immagini/add.png">
            </div>
            <div class="footer-tendina768">
                <div>SUPPORTO CLIENTE</div>
                <img src="immagini/add.png">
            </div>
            <div class="footer-tendina768">
                <div>TERMINI E CONDIZIONI</div>
                <img src="immagini/add.png">
            </div>
            <div class="footer-tendina768">
                <div>I SITI DEL GRUPPO</div>
                <img src="immagini/add.png">
            </div>

            <div>
                <div class="footer-grigio-icone1-768">
                    <div class="icone">
                        <img src="immagini/cartadicredito.png">
                        <a href="#">CartaEffe</a>
                    </div>
                    <div class="icone">
                        <img src="immagini/negozio.png">
                        <a href="#">Negozi</a>
                    </div>
                </div>
                <div class="footer-grigio-icone1-768">
                    <div class="icone">
                        <img src="immagini/assistenza.png">
                        <a href="#">Assistenza clienti</a>
                    </div>
                    <div class="icone">
                        <img src="immagini/camion.png">
                        <a href="#">Consegne</a>
                    </div>
                </div>
            </div>

            <div class="footer-tendina768">
                <div>LIBRI</div>
                <img src="immagini/add.png">
            </div>
            <div class="footer-tendina768">
                <div>MUSICA</div>
                <img src="immagini/add.png">
            </div>
            <div class="footer-tendina768">
                <div>FILM</div>
                <img src="immagini/add.png">
            </div>
            <div class="footer-tendina768">
                <div>GIOCATTOLI</div>
                <img src="immagini/add.png">
            </div>
            <div class="footer-tendina768">
                <div>CARTOLERIA</div>
                <img src="immagini/add.png">
            </div>
            <div class="footer-tendina768">
                <div>IDEE REGALO</div>
                <img src="immagini/add.png">
            </div>

            <div class="footer-informazioni2">
                <img src="immagini/logo-bianco.png" id="logo-bianco768">
                <div>
                    <div class="titoli-paragrafi">Seguici sui social</div>
                    <div class="icone">
                        <img src="immagini/facebook.png">
                        <img src="immagini/instagram.png">
                        <img src="immagini/x.png">
                        <img src="immagini/youtube.png">
                        <img src="immagini/tiktok.png">
                    </div>
                </div>
                <div>
                    <div class="titoli-paragrafi">Sempre aggiornati con la nostra APP</div>
                    <div class="icone">
                        <img src="immagini/appstore.png">
                        <img src="immagini/googleplay.png">
                    </div>
                </div>
            </div>
        </div>
        <div id="footer-bianco">
            <div class="footer-bianco1">
                <div id="footer-bianco1-sinistra">
                    <div>
                        <span>Pagamenti con:</span>
                        <span class="icone">
                            <img src="immagini/Visa.png">
                            <img src="immagini/Visa-electron.png">
                            <img src="immagini/MasterCard.png">
                            <img src="immagini/AmericanExpress.png">
                            <img src="immagini/PayPal.png">
                            <img src="immagini/Postepay.png">
                            <img src="immagini/VerifiedVisa.png">
                            <img src="immagini/VeriSign.png">
                            <img src="immagini/Klarna.png">
                        </span>
                    </div>
                </div>
                <div id="footer-bianco1-destra">
                    <div>
                        <span>Garanzia:</span>
                        <div>
                            <img src="immagini/Netcomm.png">
                            <img src="immagini/feedaty.png">
                        </div>
                    </div>
                    <div>
                        <span>Accessibilità:</span>
                        <img src="immagini/Accessibilità.png">
                    </div>
                </div>
            </div>
            <div id="footer-bianco2">
                <a href="#">Dichiarazione di Accessibilità</a>
                <a href="#">Codice etico</a>
                <a href="#">Condizioni d'uso del sito</a>
                <a href="#">Informativa sulla risoluzione alternativa controversie consumatori - ADR/ODR</a>
                <a href="#">Informativa sulla garanzia legale di conformità</a>
                <a href="#">Informativa sul RAEE</a>
                <a href="#">Informativa sul cookie</a>
                <a href="#">Gestione Preferenze Cookie</a>
                <a href="#">Codice di Autoregolamentazione Netcomm</a>
                <a href="#">Netcomm Spazio consumatori</a>
                <a href="#">Regolamento DSA</a>
            </div>
            <div id="footer-bianco3">
                LaFeltrinelli Internet Bookshop S.r.l. - Sede legale e amministrativa Via Maurizio Quadrio, 17 20154 Milano
                - C.F. e P.I. 05329570963 - Reg. imprese di Milano Monza Brianza Lodi nr. 05329570963 - R.E.A. MI 1813088
                - Capitale Sociale € 10.000,00 i.v. - A Socio Unico soggetta a direzione e coordinamento di Feltrinelli S.p.A
            </div>
        </div>
    </footer>
    
    <section id="modal-view" class="hidden">
        <section id="boxAccesso">
            <div>
                <span id="accesso">
                    <h1>Accedi</h1>
                    <img src="immagini/chiudi.png" class="logo">
                </span>
                <div>Avrai accesso ai tuoi acquisti e al mondo Feltrinelli</div>
            </div>
            <form id="form_login">
                <div>
                    <div class="dati-accesso">
                        <input type="text" name="email" id="log_email" placeholder="Email" value="<?php echo $email_precompilata; ?>">
                    </div>
                    <div class="dati-accesso">
                        <input type="password" name="password" id="log_password" placeholder="Password">
                    </div>
                    <div id="password-dimenticata">
                        <a href="#">Password dimenticata?</a>
                    </div>
                    <div id="log_errore"></div>
                </div>
                <button>Entra</button>
            </form>
            <div id="registrazione">
                <div>Non hai un account?</div>
                <a href="registrazione.php">Registrati</a>
            </div>
            <div id="alternativa-accesso">
                <p>Oppure procedi con</p>
                <div id="accesso-app">
                    <img src="immagini/cerchio-google.png" class="logo" >
                    <img src="immagini/cerchio-paypall.png" class="logo">
                    <img src="immagini/cerchio-apple.png" class="logo">
                </div>
            </div>
        </section>
    </section>

</body>
</html>

