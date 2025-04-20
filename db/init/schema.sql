-- this file creates the database schema

DROP DATABASE IF EXISTS irongate;
CREATE DATABASE irongate;
USE irongate;

DROP TABLE IF EXISTS Example;
CREATE TABLE Example (
    ID INT NOT NULL,
    PRIMARY KEY (ID)
);
