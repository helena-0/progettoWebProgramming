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
    copertina VARCHAR(255) NOT NULL,
    titolo VARCHAR(255) NOT NULL,
    autore VARCHAR(255) NOT NULL,
    prezzo VARCHAR(50) NOT NULL,
    prezzo_sconto VARCHAR(50) NOT NULL
);

INSERT INTO libri (copertina, titolo, autore, prezzo, prezzo_sconto) VALUES
('immagini/libronov1.jpg', 'La gioia è un duro lavoro', 'Gio Evan','15,20€', '16,00€'), 
('immagini/libronov2.jpg', 'Funny Story', 'Emily Henry','17,00€', '17,90€'),
('immagini/libronov3.jpg', 'Vento e Verità', 'Brandon Sanderson', '33,25€', '35,00€'),
('immagini/libro2.jpg', 'Saggio sulla lucidità', 'José Saramago','12,35€', '13,00€'),
('immagini/libronov5.jpg', 'Heated Rivarly', 'Rachel Reid','17,00€', '17,90€');


CREATE TABLE carrello (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    libro_id INT NOT NULL
);

CREATE TABLE preferiti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    libro_id INT NOT NULL
);
