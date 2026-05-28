Create DATABASE Feltrinelli;
USE Feltrinelli;

CREATE TABLE utenti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cognome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE carrello(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    titolo VARCHAR(255) NOT NULL,
    copertina VARCHAR(255) NOT NULL,
    prezzo VARCHAR(50) NOT NULL
);