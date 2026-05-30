function onJsonLeggiCarrello(json) {
    const carrello = document.querySelector('#carrello');
    carrello.innerHTML = '<h2>Il mio carrello</h2>';

    if (json.length === 0) {
        carrello.textContent = "Il tuo carrello è vuoto. Aggiungi qualche libro!";
        return;
    }


    for(let i = 0; i < json.length; i++) {
        const libroData = json[i];

        const article=document.createElement('article');
        article.classList.add('articolo_libro');

        const contenitore=document.createElement('div');
        contenitore.classList.add('contenitore_immagine');

        const immagine=document.createElement('img');
        immagine.src=libroData.copertina

        const descrizione=document.createElement('div');
        descrizione.classList.add('descrizione');

        const titolo_libro=document.createElement('div');
        titolo_libro.classList.add('titolo');
        titolo_libro.textContent=libroData.titolo;
        
        const autore_libro=document.createElement('div');
        autore_libro.classList.add('autore');
        autore_libro.textContent=libroData.autore;

        const div_prezzo=document.createElement('div');
        div_prezzo.classList.add('divPrezzo');

        const prezzo_libro=document.createElement('div');
        prezzo_libro.classList.add('prezzo');
        prezzo_libro.textContent=libroData.prezzo;

        const prezzosconto_libro=document.createElement('div');
        prezzosconto_libro.classList.add('sconto');
        prezzosconto_libro.textContent=libroData.prezzoSconto;

        const disponibile=document.createElement('div');
        disponibile.classList.add('disponibilita');
        disponibile.textContent="Disponibilità immediata";

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