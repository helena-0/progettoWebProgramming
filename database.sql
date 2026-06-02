Create DATABASE Feltrinelli;
USE Feltrinelli;

CREATE TABLE utenti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cognome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE libri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    isbn VARCHAR(50) NOT NULL,
    prezzo VARCHAR(50) NOT NULL,
    prezzo_sconto VARCHAR(50) NOT NULL
);

INSERT INTO libri (isbn, prezzo, prezzo_sconto) VALUES
('9788807970092', '15,20€', '16,00€'), 
('9780593441213', '17,00€', '17,90€'),
('9788804800699', '33,25€', '35,00€'),
('9788807882159', '12,35€', '13,00€'),
('9791255172208', '17,00€', '17,90€');


CREATE TABLE carrello (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    libro_id INT NOT NULL
);

DROP TABLE carrello;
DROP TABLE libri;