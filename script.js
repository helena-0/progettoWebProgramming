const FOTO_BANNER=[
    'immagini/banner1.jpg',
    'immagini/banner2.jpg',
    'immagini/banner3.jpg',
    'immagini/banner4.jpg'
];

let contatore=0

function OnClickDX(){

    contatore++;

    if(contatore===4){
        contatore=0;
    }

    const FotoSrc=FOTO_BANNER[contatore];

    Immagine=document.querySelector('#banner img');
    Immagine.src=FotoSrc;

}

function OnClickSX(){

    contatore--;

    if(contatore===-1){
        contatore=3;
    }
    
    const FotoSrc=FOTO_BANNER[contatore];

    Immagine=document.querySelector('#banner img');
    Immagine.src=FotoSrc;

}
const scorrisx_banner=document.querySelector('#banner .sinistra');
scorrisx_banner.addEventListener('click', OnClickSX);

const scorridx_banner=document.querySelector('#banner .destra');
scorridx_banner.addEventListener('click', OnClickDX);

//-------------------------------------------------------------------------------------

function BottoneRosso(event){
    const bottone= event.currentTarget; 

    const pannello=document.querySelector('#pannello-preferiti');
    const flexPreferiti=document.querySelector('#sezionej')
    pannello.appendChild(flexPreferiti);

    const copertinaLibro= document.createElement('img');
    copertinaLibro.src=bottone.dataset.copertina;

    const nomeLibro=bottone.dataset.titolo;
    const prezzoLibro=bottone.dataset.prezzo;

    if(bottone.classList.contains('bottone-rosso')){
        bottone.classList.remove('bottone-rosso');

        const LibriSalvati= flexPreferiti.querySelectorAll('.libroj');

        for(let i=0; i<LibriSalvati.length; i++){
            if(LibriSalvati[i].dataset.nome===nomeLibro){
                LibriSalvati[i].remove();
                break;
            }
        }
    }
    else{
        bottone.classList.add('bottone-rosso');

        const elemPreferito= document.createElement('article');
        elemPreferito.classList.add('libroj');
        elemPreferito.dataset.nome = nomeLibro; 
        flexPreferiti.appendChild(elemPreferito);

        const contenitoreImm=document.createElement('div');
        contenitoreImm.classList.add("contenitore-immaginej");
        elemPreferito.appendChild(contenitoreImm);
        contenitoreImm.appendChild(copertinaLibro);

        const descrizione=document.createElement('div');
        descrizione.classList.add('libro-descrizionej');
        elemPreferito.appendChild(descrizione);

        const titolo=document.createElement('div');
        titolo.classList.add("titoloj");
        titolo.textContent=nomeLibro;
        descrizione.appendChild(titolo);

        const prezzo=document.createElement('div');
        prezzo.classList.add("sottotitoloj");
        prezzo.textContent=prezzoLibro;
        descrizione.appendChild(prezzo);
    }

}

const bottoni_novità=document.querySelectorAll('.libro .pulsante-freccia.sinistra');
for(let i=0; i<bottoni_novità.length; i++){
        bottoni_novità[i].addEventListener('click', BottoneRosso);
}
// ------------------------------------------------------------------------------------------



function inizializzaHome() {
    const contenitoreHome = document.querySelector('#sezione-libri-dinamici');
    if (contenitoreHome) {
        fetch('api_libri.php')
            .then(function(response) { return response.json(); })
            .then(onJsonCaricaCatalogo);
    }
}

function onJsonCaricaCatalogo(json) {
    const contenitoreHome = document.querySelector('#sezione-libri-dinamici');
    contenitoreHome.innerHTML = ''; 

    const utenteLoggato = (document.querySelector('#loggin') === null);

    let maxLibri = json.length;
    if (maxLibri > 5) maxLibri = 5;

    for (let i = 0; i < maxLibri; i++) {
        const libro = json[i];
        const article = document.createElement('article');
        article.classList.add('libro');
        
        if (i === 2) article.id = 'tre';
        if (i === 3) article.id = 'due';
        if (i === 4) article.id = 'uno';

        const contenitoreImmagine = document.createElement('div');
        contenitoreImmagine.classList.add('contenitore-immagine');

        const immagine = document.createElement('img');
        immagine.classList.add('copertina');
        immagine.src = libro.copertina;
        contenitoreImmagine.appendChild(immagine);
        
        const divInternoBottoni = document.createElement('div');

        if (utenteLoggato) {
            const btnPreferiti = document.createElement('div');
            btnPreferiti.classList.add('pulsante-freccia', 'sinistra');
            btnPreferiti.dataset.copertina = libro.copertina;
            btnPreferiti.dataset.titolo = libro.titolo;
            btnPreferiti.dataset.prezzo = libro.prezzo;
            
            const imgCuore = document.createElement('img');
            imgCuore.src = 'immagini/favorite.png';
            btnPreferiti.appendChild(imgCuore);
            btnPreferiti.addEventListener('click', BottoneRosso); 
            
            const btnCarrello = document.createElement('div');
            btnCarrello.classList.add('pulsante-freccia', 'destra'); 
            btnCarrello.dataset.idLibro = libro.id; 
            
            const imgCarrello = document.createElement('img');
            imgCarrello.src = 'immagini/cart.png';
            btnCarrello.appendChild(imgCarrello);
            btnCarrello.addEventListener('click', aggiungiAlCarrello); 

            divInternoBottoni.appendChild(btnPreferiti);
            divInternoBottoni.appendChild(btnCarrello);
        }
        contenitoreImmagine.appendChild(divInternoBottoni);

        const libroDescrizione = document.createElement('div');
        libroDescrizione.classList.add('libro-descrizione');

        const divTitoloAutore = document.createElement('div');
        
        const titolo = document.createElement('div');
        titolo.classList.add('titolo');
        const spanTitolo = document.createElement('span');
        spanTitolo.textContent = libro.titolo;
        titolo.appendChild(spanTitolo);

        const sottotitolo = document.createElement('div');
        sottotitolo.classList.add('sottotitolo');
        sottotitolo.innerHTML = 'di <span>' + libro.autore + '</span>'; //CONTROLLARE

        divTitoloAutore.appendChild(titolo);
        divTitoloAutore.appendChild(sottotitolo);

        const divStelle = document.createElement('div');
        divStelle.classList.add('stelle');
        const imgStelle = document.createElement('img');
        imgStelle.src = 'immagini/cinque-stelle-grigio.png';
        divStelle.appendChild(imgStelle);

        const divPrezzo = document.createElement('div');
        divPrezzo.classList.add('prezzo');
        
        const spanSconto = document.createElement('span');
        spanSconto.classList.add('sconto');
        spanSconto.textContent = libro.prezzo;

        const spanPrezzoPieno = document.createElement('span');
        spanPrezzoPieno.classList.add('prezzo-pieno');
        spanPrezzoPieno.textContent = libro.prezzo_sconto;

        divPrezzo.appendChild(spanSconto);
        divPrezzo.appendChild(spanPrezzoPieno);

        libroDescrizione.appendChild(divTitoloAutore);
        libroDescrizione.appendChild(divStelle);
        libroDescrizione.appendChild(divPrezzo);

        article.appendChild(contenitoreImmagine);
        article.appendChild(libroDescrizione);
        contenitoreHome.appendChild(article);
    }

    if (utenteLoggato) {
        ripristinaStatoCarrelloHome();
    }
}
// ------------------------------------------------------------------------------------------

function ripristinaStatoCarrelloHome() {
    fetch('api_leggi_carrello.php')
        .then(function(response) { return response.json(); })
        .then(function(json) {
            for (let i = 0; i < json.length; i++) {
                const idLibroSalvato = json[i].libro_id;
                const bottone = document.querySelector('.pulsante-freccia.destra[data-id-libro="' + idLibroSalvato + '"]');
                if (bottone) {
                    bottone.classList.add('bottone-rosso');
                }
            }
        });
}

function onJsonCarrello(json) {
    if (json.success === true) {
        console.log("Successo: " + json.messaggio);
    } else {
        console.log("Errore: " + json.error);
    }
}

function onResponseCarrello(response) {
    return response.json();
}

function aggiungiAlCarrello(event) {
    const bottone = event.currentTarget;
    const dati_carrello = new FormData();

    if (bottone.classList.contains('bottone-rosso')) {
        bottone.classList.remove('bottone-rosso');
    } else {
        bottone.classList.add('bottone-rosso');
    }    

    if (bottone.dataset.idLibro) {
        dati_carrello.append('id_libro', bottone.dataset.idLibro);
    } else if (bottone.dataset.titolo) {
        dati_carrello.append('titolo', bottone.dataset.titolo); //CONTROLLARE
        dati_carrello.append('autore', bottone.dataset.autore);
        dati_carrello.append('copertina', bottone.dataset.copertina);
        dati_carrello.append('prezzo', bottone.dataset.prezzo);
        dati_carrello.append('prezzo_sconto', bottone.dataset.prezzoSconto);
    }

    const opzioni = { method: 'post', body: dati_carrello };
    fetch('api_aggiungi_carrello.php', opzioni).then(onResponseCarrello).then(onJsonCarrello);
}

inizializzaHome();

// ----------------------------------------------------------------------------------------------


function loggin(){
    const vistaModale=document.querySelector('#modal-view');
    document.body.classList.add('no-scroll');
    vistaModale.classList.remove('hidden');
}

const accesso=document.querySelector('#loggin');
if(accesso){
    accesso.addEventListener('click', loggin);
}

function chiudereModale(){
    document.body.classList.remove('no-scroll');
    const vistaModale=document.querySelector('#modal-view');
    vistaModale.classList.add('hidden');
}

const immagineX=document.querySelector('#modal-view .logo');
immagineX.addEventListener('click',chiudereModale);


function onJsonLogin(json) {
    if (json.success === true) {
        window.location.reload();
    } else {
        const divErrore = document.querySelector('#log_errore');
        divErrore.textContent = json.error;
        divErrore.classList.add('block');
    }
}

function onResponseLogin(response) {
    return response.json();
}

function eseguiLogin(event) {
    event.preventDefault();

    const form = document.querySelector('#form_login');
    
    const divErrore = document.querySelector('#log_errore');
    divErrore.classList.add('none');

    const form_data = {method: 'post', body: new FormData(form)}; 

    fetch('login.php', form_data).then(onResponseLogin).then(onJsonLogin); 
}


const formLogin = document.querySelector('#form_login'); 
if (formLogin) {
    formLogin.addEventListener('submit', eseguiLogin);
}

//-------------------------------------------------------------------------------------------


function visualizzaPreferiti(){
    const pulsante=document.querySelector('#pannello-preferiti');
    if(pulsante.classList.contains('hidden'))
        pulsante.classList.remove('hidden');
    else
        pulsante.classList.add('hidden');
}

const pulsantePreferiti=document.querySelector('#preferiti')
pulsantePreferiti.addEventListener('click',visualizzaPreferiti)


//--------------------------------------------------------------------------------------------------------


function onResponseRicercaDB(response) {
    if (response.ok) {
        return response.json();
    } else {
        return null;
    }
}

function onJson(json) {
    const containerRisultati = document.querySelector('#risultati-ricerca');
    containerRisultati.classList.remove('hidden');

    const library = document.querySelector('#sezione-ricerca');
    library.innerHTML = '';
    
    const utenteLoggato = (document.querySelector('#loggin') === null);

    let num_results = json.num_found;
    if (num_results === 0) {
        library.innerHTML = '<div style="padding: 20px; font-weight: 500;">Nessun libro trovato su Open Library.</div>';
        return;
    }

    if (num_results > 6) num_results = 6;

    for (let i = 0; i < num_results; i++) {
        const doc = json.docs[i]
        const title = doc.title;
        
        let autore = "Autore sconosciuto";
        if (doc.author_name && doc.author_name.length > 0) {
            autore = doc.author_name[0];
        }

        let cover_url = 'immagini/copertina_mancante.jpg'; 
        if (doc.cover_i) {
            cover_url = 'https://covers.openlibrary.org/b/id/' + doc.cover_i + '-M.jpg';
        }

        const prezzoFittizio = "15,00€";
        const prezzoScontoFittizio = "16,50€";
        
        const book = document.createElement('div');
        book.classList.add('libro-ricerca');
        
        const img = document.createElement('img');
        img.src = cover_url;
        
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info-ricerca');

        const caption = document.createElement('div');
        caption.innerHTML = '<strong>' + title + '</strong><br>di ' + autore;
        caption.classList.add('descrizione-ricerca');
        infoDiv.appendChild(caption);

        if (utenteLoggato) {
            const divBottoni = document.createElement('div');
            divBottoni.classList.add('bottoni-ricerca');

            const btnPreferiti = document.createElement('div');
            btnPreferiti.classList.add('pulsante-freccia'); 
            btnPreferiti.dataset.copertina = cover_url;
            btnPreferiti.dataset.titolo = title;
            btnPreferiti.dataset.prezzo = prezzoFittizio;
            const imgCuore = document.createElement('img');
            imgCuore.src = 'immagini/favorite.png';
            btnPreferiti.appendChild(imgCuore);
            btnPreferiti.addEventListener('click', BottoneRosso);

            const btnCarrello = document.createElement('div');
            btnCarrello.classList.add('pulsante-freccia', 'destra-ricerca'); 
            
            btnCarrello.dataset.titolo = title;
            btnCarrello.dataset.autore = autore;
            btnCarrello.dataset.copertina = cover_url;
            btnCarrello.dataset.prezzo = prezzoFittizio;
            btnCarrello.dataset.prezzoSconto = prezzoScontoFittizio;
            
            const imgCarrello = document.createElement('img');
            imgCarrello.src = 'immagini/cart.png';
            btnCarrello.appendChild(imgCarrello);
            btnCarrello.addEventListener('click', aggiungiAlCarrello);

            divBottoni.appendChild(btnPreferiti);
            divBottoni.appendChild(btnCarrello);
            infoDiv.appendChild(divBottoni);
        }
        
        book.appendChild(img);
        book.appendChild(infoDiv);
        library.appendChild(book);
    }

    if (utenteLoggato) {
        fetch('api_leggi_carrello.php')
            .then(function(res) { return res.json(); })
            .then(function(carrelloJson) {
                const bottoniRicerca = document.querySelectorAll('#sezione-ricerca .destra-ricerca');
                for (let b = 0; b < bottoniRicerca.length; b++) {
                    const btn = bottoniRicerca[b];
                    const titoloBtn = btn.dataset.titolo;
                    for (let c = 0; c < carrelloJson.length; c++) {
                        if (carrelloJson[c].titolo === titoloBtn) {
                            btn.classList.add('bottone-rosso');
                        }
                    }
                }
            });
    }
}

function search(event) {
    event.preventDefault();
    const author_input = document.querySelector('.barra-ricerca input');
    const author_value = encodeURIComponent(author_input.value);

    if (!author_value) {
        const containerRisultati = document.querySelector('#risultati-ricerca');
        containerRisultati.classList.add('hidden'); 
        const library = document.querySelector('#sezione-ricerca');
        library.innerHTML = ''; 
        return; 
    }

    const rest_url = 'api_openlibrary.php?q=' + author_value;
    fetch(rest_url).then(onResponseRicercaDB).then(onJson);
}

const formRicercaLibri = document.querySelector('#ricerca');
if (formRicercaLibri) {
    formRicercaLibri.addEventListener('submit', search);
}


function onResponseRanking(response) {

    if (!response.ok) 
        return null;
    return response.json(); 
}

function onJsonRanking(json) {
    const container = document.querySelector('#lista-ranking-film');
    container.innerHTML = '';

    const movies = json.results;
    for (let i = 0; i < 5; i++) {
        const movieData = movies[i];
        const movieArticle = document.createElement('article');
        movieArticle.classList.add('libro'); 

        const posterPath = 'https://image.tmdb.org/t/p/w500' + movieData.poster_path;
        const imgCont = document.createElement('div');
        imgCont.classList.add('contenitore-immagine');
        
        const img = document.createElement('img');
        img.src = posterPath;
        imgCont.appendChild(img);

        const desc = document.createElement('div');
        desc.classList.add('libro-descrizione');
        
        const title = document.createElement('div');
        title.classList.add('titolo');
        title.textContent = movieData.title;
        
        const date = document.createElement('div');
        date.classList.add('sottotitolo');
        date.textContent = 'Uscita: ' + movieData.release_date;

        desc.appendChild(title);
        desc.appendChild(date);
        
        movieArticle.appendChild(imgCont);
        movieArticle.appendChild(desc);
        
        container.appendChild(movieArticle);
    }
}

function aggiornaClassificaFilm() {
    
    fetch('api_film.php').then(onResponseRanking).then(onJsonRanking);
}
aggiornaClassificaFilm();


function onResponseRicerca(response) {
    if (response.ok) {
        return response.json();
    } else {
        return null;
    }
}

function onJsonRicerca(json) {
    console.log("Risultati ricerca:", json);
    
    const contenitoreRisultato = document.querySelector('#risultato-ricerca');
    contenitoreRisultato.innerHTML = '';

    if (json.results.length === 0) {
        contenitoreRisultato.textContent = "Nessun film trovato con questo titolo.";
        return;
    }

    const filmTrovato = json.results[0];
    const schedaFilm = document.createElement('div');
    schedaFilm.classList.add('scheda-film');

    const titolo = document.createElement('h4');
    titolo.classList.add('titolo-film');
    titolo.textContent = filmTrovato.title;

    const trama = document.createElement('p');
    trama.classList.add('trama-film');
    
    if (filmTrovato.overview !== "") {
        trama.textContent = filmTrovato.overview;
    } else {
        trama.textContent = "Trama non disponibile in italiano per questo film.";
    }

    schedaFilm.appendChild(titolo);
    schedaFilm.appendChild(trama);
    contenitoreRisultato.appendChild(schedaFilm);
}

function cercaFilmTramiteForm(event) {
    event.preventDefault();
    const inputRicerca = document.querySelector('#layout-film .input-ricerca');
    const testoCercato = encodeURIComponent(inputRicerca.value);

    if (!testoCercato){
        const contenitoreRisultato = document.querySelector('#risultato-ricerca');
        contenitoreRisultato.innerHTML = '';
        return;
    }

    const url = 'api_film.php?q=' + testoCercato;
    fetch(url).then(onResponseRicerca).then(onJsonRicerca);
}

const formRicerca = document.querySelector('#form-ricerca-film');
formRicerca.addEventListener('submit', cercaFilmTramiteForm);

