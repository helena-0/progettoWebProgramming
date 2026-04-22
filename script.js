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
function BottoneRosso(){
    const bottoneCliccato= event.currentTarget;

    if(bottoneCliccato.classList.contains('bottone-rosso'))
        bottoneCliccato.classList.remove('bottone-rosso');
    else 
        bottoneCliccato.classList.add('bottone-rosso');
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
