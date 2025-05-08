-- this file creates the database schema
DROP DATABASE IF EXISTS irongate;
CREATE DATABASE irongate;
USE irongate;
DROP TABLE IF EXISTS Example;
CREATE TABLE Example (ID INT NOT NULL, PRIMARY KEY (ID));

-- Rebe: persona, personale...
DROP TABLE IF EXISTS Person;
CREATE TABLE Person (
    DocNumber INT PRIMARY KEY,
    `Name` VARCHAR(25) NOT NULL,
    Surname VARCHAR(25),
    Birthday DATE,
    BirthPlace VARCHAR (50),
    Sex REFERENCES Gender (ID)
);

DROP TABLE IF EXISTS Gender;
CREATE TABLE Gender (
    ID INT PRIMARY KEY,
    Descr VARCHAR (10)
);

DROP TABLE IF EXISTS Inmate;
CREATE TABLE Inmate (
    ID INT SERIAL PRIMARY KEY,
    IncarcerationDate DATE,
    SentenceDuration YEAR,
    CriminalRecord VARCHAR (100),
);

DROP TABLE IF EXISTS Guest;
CREATE TABLE Guest (
    DocNumber REFERENCES Person (DocNumber) PRIMARY KEY
);

DROP TABLE IF EXISTS Visit;
CREATE TABLE Visit (
    `DateTime` DATETIME,
    VisitedInmate REFERENCES Inmate(ID);
    PRIMARY KEY (`DateTime`, VisitedInmate)
);

DROP TABLE IF EXISTS Visitors;
CREATE TABLE Visitors (
    Visit REFERENCES Visit (`DateTime`, VisitedInmate),
    Guest REFERENCES Guest (DocNumber),
    PRIMARY KEY (Visit, Guest)
);

DROP TABLE IF EXISTS Personell;
CREATE TABLE Personell (
    ID INT SERIAL PRIMARY KEY,
    TypeID REFERENCES PersonellType(ID)
);

DROP TABLE IF EXISTS PersonellType;
CREATE TABLE PersonellType (
    ID INT PRIMARY KEY,
    Descr VARCHAR (5)
);

DROP TABLE IF EXISTS Courier;
CREATE TABLE Courier (
    DocNumber REFERENCES Person (DocNumber) PRIMARY KEY
);

DROP TABLE IF EXISTS Vehicle;
CREATE TABLE Vehicle (
    PlateNumber VARCHAR (10) PRIMARY KEY,
    Driver REFERENCES Courier(DocNumber)
);

DROP TABLE IF EXISTS Delivery;
CREATE TABLE Delivery (
    `DateTime` DATETIME,
    Goods REFERENCES GoodsType(ID),
    Quantity INT,
    PRIMARY KEY (`DateTime`, Goods)
);

DROP TABLE IF EXISTS GoodsType;
CREATE TABLE GoodsType (
    ID INT PRIMARY KEY (ID),
    Descr VARCHAR (50)
);

-- Manu: Settore, Zone ...

DROP TABLE IF EXISTS Sector;
CREATE TABLE Sector (
    ID INT PRIMARY KEY,
    `Name` CHAR (20),
    SecurityLevel INT,
    Capacity INT NOT NULL,
);

DROP TABLE IF EXISTS Cell;
CREATE TABLE Cell (
    Number REFERENCES Sector (ID) PRIMARY KEY,
    Capacity INT,
);

DROP TABLE IF EXISTS Activity;
CREATE TABLE Activity(
    ID INT PRIMARY KEY (ID),
    `Name` CHAR (25) NOT NULL,
    Descr CHAR (200),
    ActDuration DATETIME,
);

DROP TABLE IF EXISTS Routine;
CREATE TABLE Routine (`Datetime` DATETIME,);
DROP TABLE IF EXISTS Zone;
CREATE TABLE Zone (
    ZoneNumber REFERENCES Sector (ID) PRIMARY KEY,
    `Name` CHAR (25) NOT NULL,
    Capacity INT,
);

DROP TABLE IF EXISTS Device;
CREATE TABLE Device (
    `Serial` INT REFERENCES Sector (ID) PRIMARY KEY,
    `Number` INT,
);

DROP TABLE IF EXISTS LOCK;
CREATE TABLE LOCK (
    `Serial` REFERENCES Device(`Serial`) PRIMARY KEY,
);

DROP TABLE IF EXISTS CAMERA;
CREATE TABLE CAMERA (
    `Serial` REFERENCES Device (`Serial`) PRIMARY KEY,
);

DROP TABLE IF EXISTS COMPUTER;
CREATE TABLE COMPUTER (
    `Serial` REFERENCES Device (`Serial`) PRIMARY KEY,
);