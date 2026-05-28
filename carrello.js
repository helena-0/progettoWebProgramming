function onJsonLeggiCarrello(json) {
    const carrello = document.querySelector('#carrello');
    

    if (json.length === 0) {
        contenitore.textContent = "Il tuo carrello è vuoto. Aggiungi qualche libro!";
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

        const prezzo_libro=document.createElement('div');
        prezzo_libro.classList.add('prezzo');
        prezzo_libro.textContent=libroData.prezzo;

        carrello.appendChild(article);

        article.appendChild(contenitore);
        article.appendChild(descrizione);

        contenitore.appendChild(immagine);

        descrizione.appendChild(titolo_libro);
        descrizione.appendChild(prezzo_libro);
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