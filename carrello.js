function onJsonLeggiCarrello(json) {
    const carrello = document.querySelector('#carrello');
    carrello.innerHTML = '<h2>Il mio carrello</h2>';

    if (json.length === 0) {
        aggiornaStatoCarrello();
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
                creaSchedaLibro(bookData, libroDB.prezzo, libroDB.prezzoSconto, libroDB.libro_id);               
            });
    }
}

function rimuoviDalCarrello(event) {
    const bottone = event.currentTarget;
    const idLibro = bottone.dataset.idLibro; 
    
    const dati_carrello = new FormData();
    dati_carrello.append('id_libro', idLibro);

    fetch('api_aggiungi_carrello.php', { method: 'post', body: dati_carrello })
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            if(json.success) {

                const divContenitoreDescrizione = bottone.parentNode;
                const articolo = divContenitoreDescrizione.parentNode;
                
                setTimeout(function() {
                    articolo.remove();
                    aggiornaStatoCarrello();
                }, 500);
            }
        });
}


function creaSchedaLibro(bookData, prezzoDB, prezzoScontoDB, idLibro) {
    const carrello = document.querySelector('#carrello');

    const article = document.createElement('article');
    article.classList.add('articolo_libro');

    const contenitore = document.createElement('div');
    contenitore.classList.add('contenitore_immagine');

    const immagine = document.createElement('img')
    immagine.src = bookData.cover.medium; 

    const contenitore_descrizione = document.createElement('div');
    contenitore_descrizione.classList.add('contenitore_descrizione');

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

    const bottone_elimina=document.createElement('button');
    bottone_elimina.textContent="Rimuovi";
    bottone_elimina.classList.add('bottoneElimina');
    bottone_elimina.dataset.idLibro = idLibro;
    bottone_elimina.addEventListener('click', rimuoviDalCarrello);

    carrello.appendChild(article);

    article.appendChild(contenitore);
    article.appendChild(contenitore_descrizione);

    contenitore_descrizione.appendChild(descrizione);
    contenitore_descrizione.appendChild(bottone_elimina);
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

function aggiornaStatoCarrello() {
    const carrello = document.querySelector('#carrello');
    const numeroLibri = carrello.querySelectorAll('.articolo_libro').length;

    if (numeroLibri === 0) {
        carrello.innerHTML = '<h2>Il mio carrello</h2>Il tuo carrello è vuoto. Aggiungi qualche libro!';
    }
}