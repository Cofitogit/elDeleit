CREATE DATABASE ticketsdb;

use ticketsdb;

CREATE TABLE ticketsave (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    importe INT,
    detalle VARCHAR(400) NOT NULL,
    createdAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    turno VARCHAR(20),
    fecha VARCHAR(29)
);

describe ticket;
