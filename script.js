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

    console.log('Eseguo ricerca: ' + author_value);
    
    const rest_url = 'http://openlibrary.org/search.json?q=' + author_value;
    console.log('URL: ' + rest_url);
    
    fetch(rest_url).then(onResponse).then(onJson);
}

const form = document.querySelector('#ricerca');
form.addEventListener('submit', search);




// --- CLASSIFICA FILM DEL GIORNO (TMDb) ---

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
    const API_KEY = 'cb216e086c72157de88a76d71631e973';
    const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + API_KEY + '&language=it-IT&region=IT';
    
    fetch(url).then(onResponseRanking).then(onJsonRanking);
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
    const inputRicerca = document.querySelector('#input-ricerca-film');
    const testoCercato = encodeURIComponent(inputRicerca.value);

    if (!testoCercato){
        const contenitoreRisultato = document.querySelector('#risultato-ricerca');
        contenitoreRisultato.innerHTML = '';
        return;
    }
    const API_KEY = 'cb216e086c72157de88a76d71631e973';
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&language=it-IT&query=' + testoCercato;
    fetch(url).then(onResponseRicerca).then(onJsonRicerca);
}

const formRicerca = document.querySelector('#form-ricerca-film');
formRicerca.addEventListener('submit', cercaFilmTramiteForm);