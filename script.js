//scorrere le immagini del banner
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


//fare diventare i bottoni nella parte novità rossi 
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

        //Verificare se è corretto
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
        elemPreferito.dataset.nome = nomeLibro; //aggiunta che serve per poi verificare se il libro c'è per la rimozione
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

//vista modale
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


//visualizza pannello dei Preferiti
function visualizzaPreferiti(){
    const pulsante=document.querySelector('#pannello-preferiti');
    if(pulsante.classList.contains('hidden'))
        pulsante.classList.remove('hidden');


    else
        pulsante.classList.add('hidden');
}

const pulsantePreferiti=document.querySelector('#preferiti')
pulsantePreferiti.addEventListener('click',visualizzaPreferiti)
