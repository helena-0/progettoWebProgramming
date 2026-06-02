function onJsonEliminaAccount(json) {
    if (json.success === true) {
        window.location.href = 'index.php';
    } else {
        alert("Errore: " + json.error);
    }
}

function onResponseEliminaAccount(response) {
    return response.json();
}

function eliminaAccount(event) {
    fetch('api_elimina_account.php').then(onResponseEliminaAccount).then(onJsonEliminaAccount);
}

const btnEliminaAccount = document.querySelector('#bottone_conferma');
if (btnEliminaAccount) {
    btnEliminaAccount.addEventListener('click', eliminaAccount);
}

//----------------------------------------------------------------------------------------------------

function modale(){
    const vistaModale=document.querySelector('#modal-view');
    document.body.classList.add('no-scroll');
    vistaModale.classList.remove('hidden');
}

const accesso=document.querySelector('#bottone_elimina');
if(accesso){
    accesso.addEventListener('click', modale);
}

function chiudereModale(){
    document.body.classList.remove('no-scroll');
    const vistaModale=document.querySelector('#modal-view');
    vistaModale.classList.add('hidden');
}

const annulla=document.querySelector('#boxElimina a');
annulla.addEventListener('click',chiudereModale);