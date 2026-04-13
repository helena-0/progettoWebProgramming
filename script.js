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