const FOTO_BANNER=[
    'immagini/banner1.jpg',
    'immagini/banner2.jpg',
    'immagini/banner3.png',
    'immagini/banner4.png'
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

const bottoni_novità=document.querySelectorAll('.libro .pulsante-freccia');

for(let i=0; i<bottoni_novità.length; i++){
        bottoni_novità[i].addEventListener('click', BottoneRosso);
}

function loggin(){
    const vistaModale=document.querySelector('#modal-view');
    document.body.classList.add('no-scroll');
    vistaModale.classList.remove('hidden');
}

const accesso=document.querySelector('#loggin');
accesso.addEventListener('click', loggin);

function chiudereModale(){
    document.body.classList.remove('no-scroll');
    const vistaModale=document.querySelector('#modal-view');
    vistaModale.classList.add('hidden');
}

const immagineX=document.querySelector('#modal-view .logo');
immagineX.addEventListener('click',chiudereModale);


function visualizzaPreferiti(){
    const pulsante=document.querySelector('#pannello-preferiti');
    if(pulsante.classList.contains('hidden'))
        pulsante.classList.remove('hidden');


    else
        pulsante.classList.add('hidden');
}

const pulsantePreferiti=document.querySelector('#preferiti')
pulsantePreferiti.addEventListener('click',visualizzaPreferiti)


function onResponse(response) {
    if(response.ok) {
        return response.json();
    } else {
        return null;
    }
}

function onJson(json) {
    console.log('JSON ricevuto');
    
    const containerRisultati = document.querySelector('#risultati-ricerca');
    containerRisultati.classList.remove('hidden');

    const library = document.querySelector('#sezione-ricerca');
    library.innerHTML = '';
    
    let num_results = json.num_found;
    if (num_results > 6) {
        num_results = 6;
    }

    // Processa ciascun risultato
    for(let i=0; i<num_results; i++) {
        const doc = json.docs[i]
        const title = doc.title;
        const cover_url = 'http://covers.openlibrary.org/b/id/' + doc.cover_i + '-M.jpg';
        
        const book = document.createElement('div');
        book.classList.add('libro-ricerca');
        
        const img = document.createElement('img');
        img.src = cover_url;
        
        const caption = document.createElement('span');
        caption.textContent = title;
        
        book.appendChild(img);
        book.appendChild(caption);
        caption.classList.add('descrizione-ricerca')
        library.appendChild(book);
    }
}


function search(event) {
    // Impedisci il submit del form
    event.preventDefault();
    
    // Leggi valore del campo di testo
    const author_input = document.querySelector('.barra-ricerca input');
    const author_value = encodeURIComponent(author_input.value);
    console.log('Eseguo ricerca: ' + author_value);
    
    // Prepara la richiesta (Uso q= per ricerca generale anziché author= per farti cercare di tutto)
    const rest_url = 'http://openlibrary.org/search.json?q=' + author_value;
    console.log('URL: ' + rest_url);
    
    // Esegui fetch
    fetch(rest_url).then(onResponse).then(onJson);
}

// Aggiungi event listener al form
const form = document.querySelector('#ricerca');
form.addEventListener('submit', search);




// --- CLASSIFICA FILM DEL GIORNO (TMDb) ---

function onResponseRanking(response) {
    // Verifichiamo se la richiesta è andata a buon fine
    if (!response.ok) return null;
    return response.json(); // Estraiamo il JSON
}

function onJsonRanking(json) {
    const container = document.querySelector('#lista-ranking-film');
    container.innerHTML = ''; // Puliamo il contenuto esistente

    const movies = json.results;
    // Prendiamo solo i primi 5 film per la classifica [cite: 474]
    for (let i = 0; i < 5; i++) {
        const movieData = movies[i];
        
        // Creiamo l'elemento article per il film [cite: 481]
        const movieArticle = document.createElement('article');
        movieArticle.classList.add('libro'); // Riusiamo la tua classe CSS per lo stile

        // Gestione immagine (locandina)
        const posterPath = 'https://image.tmdb.org/t/p/w500' + movieData.poster_path;
        const imgCont = document.createElement('div');
        imgCont.classList.add('contenitore-immagine');
        
        const img = document.createElement('img');
        img.src = posterPath;
        imgCont.appendChild(img);

        // Numero della classifica
        const rankNum = document.createElement('div');
        rankNum.classList.add('numero-classifica');
        rankNum.textContent = i + 1; // 1, 2, 3...

        // Descrizione (Titolo e Data)
        const desc = document.createElement('div');
        desc.classList.add('libro-descrizione');
        
        const title = document.createElement('div');
        title.classList.add('titolo');
        title.textContent = movieData.title;
        
        const date = document.createElement('div');
        date.classList.add('sottotitolo');
        date.textContent = 'Uscita: ' + movieData.release_date;

        // Assembliamo i pezzi [cite: 487]
        desc.appendChild(title);
        desc.appendChild(date);
        
        movieArticle.appendChild(imgCont);
        movieArticle.appendChild(rankNum);
        movieArticle.appendChild(desc);
        
        container.appendChild(movieArticle);
    }
}

function aggiornaClassificaFilm() {
    const API_KEY = 'cb216e086c72157de88a76d71631e973';
    // Endpoint per i film di tendenza oggi in italiano
    const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + API_KEY + '&language=it-IT&region=IT';
    
    fetch(url).then(onResponseRanking).then(onJsonRanking);
}

// Avviamo la funzione all'apertura del sito
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
    contenitoreRisultato.innerHTML = ''; // Svuotiamo risultati precedenti

    if (json.results.length === 0) {
        contenitoreRisultato.textContent = "Nessun film trovato con questo titolo.";
        return;
    }

    const filmTrovato = json.results[0];

    // 1. Creiamo la scheda principale e le diamo la classe
    const schedaFilm = document.createElement('div');
    schedaFilm.classList.add('scheda-film');

    // 2. Titolo
    const titolo = document.createElement('h4');
    titolo.classList.add('titolo-film');
    titolo.textContent = filmTrovato.title;

    // 4. Trama
    const trama = document.createElement('p');
    trama.classList.add('trama-film');
    
    if (filmTrovato.overview !== "") {
        trama.textContent = filmTrovato.overview;
    } else {
        trama.textContent = "Trama non disponibile in italiano per questo film.";
    }

    // Assembliamo
    schedaFilm.appendChild(titolo);
    schedaFilm.appendChild(trama);

    // Inseriamo nell'HTML
    contenitoreRisultato.appendChild(schedaFilm);
}

function cercaFilmTramiteForm(event) {
    // 1. Blocchiamo il ricaricamento della pagina
    event.preventDefault();

    // 2. Leggiamo cosa ha scritto l'utente
    const inputRicerca = document.querySelector('#input-ricerca-film');
    const testoCercato = encodeURIComponent(inputRicerca.value);

    // Se l'utente clicca cerca senza scrivere nulla, ci fermiamo
    if (!testoCercato) return;

    // 3. Costruiamo l'URL di ricerca
    const API_KEY = 'cb216e086c72157de88a76d71631e973'; // Usa la tua chiave API
    
    // Usiamo /search/movie e aggiungiamo query= (il testo) e language=it-IT
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&language=it-IT&query=' + testoCercato;

    // 4. Avviamo la richiesta Fetch
    fetch(url).then(onResponseRicerca).then(onJsonRicerca);
}

// 5. Agganciamo l'Event Listener al Form
const formRicerca = document.querySelector('#form-ricerca-film');
formRicerca.addEventListener('submit', cercaFilmTramiteForm);