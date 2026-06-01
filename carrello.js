// 1. Questa funzione riceve i dati dal TUO database (solo ISBN e Prezzi)
function onJsonLeggiCarrello(json) {
    const carrello = document.querySelector('#carrello');
    carrello.innerHTML = '<h2>Il mio carrello</h2>';

    if (json.length === 0) {
        carrello.textContent = "Il tuo carrello è vuoto. Aggiungi qualche libro!";
        return;
    }

    for (let i = 0; i < json.length; i++) {
        const libroDB = json[i];
        
        fetch('api_openlibrary.php?isbn=' + libroDB.isbn)
            .then(function(response) {
                return response.json();
            })
            .then(function(openLibraryJson) {
                const bookData = openLibraryJson['ISBN:' + libroDB.isbn];
                
                if (bookData) {
                    // SE L'API FUNZIONA: Disegna tutto normalmente
                    creaSchedaLibro(bookData, libroDB.prezzo, libroDB.prezzoSconto);
                } else {
                    // PIANO B: SE L'API FALLISCE, CREIAMO DEI DATI PROVVISORI PER NON BLOCCARE IL CARRELLO!
                    const datiDiScorta = {
                        title: "Libro in elaborazione (ISBN: " + libroDB.isbn + ")",
                        authors: [{name: "Autore da verificare"}],
                        cover: null // Senza copertina, userà quella "mancante"
                    };
                    creaSchedaLibro(datiDiScorta, libroDB.prezzo, libroDB.prezzoSconto);
                }
            });
    }
}


function creaSchedaLibro(bookData, prezzoDB, prezzoScontoDB) {
    const carrello = document.querySelector('#carrello');

    const article = document.createElement('article');
    article.classList.add('articolo_libro');

    const contenitore = document.createElement('div');
    contenitore.classList.add('contenitore_immagine');

    const immagine = document.createElement('img');
    // Prendo la copertina da Open Library (se non c'è, ne metto una finta di scorta)
    if (bookData.cover) {
        immagine.src = bookData.cover.medium;
    } else {
        // Assicurati di avere un'immagine di scorta in questa cartella, oppure lascia vuoto!
        immagine.src = "immagini/copertina_mancante.jpg"; 
    }

    const descrizione = document.createElement('div');
    descrizione.classList.add('descrizione');

    const titolo_libro = document.createElement('div');
    titolo_libro.classList.add('titolo');
    titolo_libro.textContent = bookData.title;
    
    const autore_libro = document.createElement('div');
    autore_libro.classList.add('autore');
    if (bookData.authors && bookData.authors.length > 0) {
        autore_libro.textContent = bookData.authors[0].name;
    } else {
        autore_libro.textContent = "Autore sconosciuto";
    }

    const div_prezzo = document.createElement('div');
    div_prezzo.classList.add('divPrezzo');

    const prezzo_libro = document.createElement('div');
    prezzo_libro.classList.add('prezzo');
    prezzo_libro.textContent = prezzoDB; 

    const prezzosconto_libro = document.createElement('div');
    prezzosconto_libro.classList.add('sconto');
    prezzosconto_libro.textContent = prezzoScontoDB;

    const disponibile = document.createElement('div');
    disponibile.classList.add('disponibilita');
    disponibile.textContent = "Disponibilità immediata";

    carrello.appendChild(article);

    article.appendChild(contenitore);
    article.appendChild(descrizione);

    contenitore.appendChild(immagine);

    descrizione.appendChild(titolo_libro);
    descrizione.appendChild(autore_libro);
    descrizione.appendChild(div_prezzo);
    descrizione.appendChild(disponibile);

    div_prezzo.appendChild(prezzo_libro);
    div_prezzo.appendChild(prezzosconto_libro);
}

function onResponseLeggiCarrello(response) {
    return response.json();
}

function caricaCarrelloAsincrono() {
    const contenitore = document.querySelector('#carrello');
 
    if (contenitore) {
        fetch('api_leggi_carrello.php').then(onResponseLeggiCarrello).then(onJsonLeggiCarrello);
    }
}

caricaCarrelloAsincrono();