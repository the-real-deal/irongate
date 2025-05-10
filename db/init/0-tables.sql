-- this file creates the database tables
DROP DATABASE IF EXISTS irongate;
CREATE DATABASE irongate;
USE irongate;

-- Rebe: persona, personale...
DROP TABLE IF EXISTS Person;
CREATE TABLE Person (
    DocumentNumber VARCHAR(30) PRIMARY KEY,
    `Name` VARCHAR(25) NOT NULL,
    Surname VARCHAR(25) NOT NULL,
    Birthday DATE NOT NULL,
    BirthPlace VARCHAR (50),
    Sex INT NOT NULL
);

DROP TABLE IF EXISTS Gender;
CREATE TABLE Gender (
    ID INT PRIMARY KEY,
    `Description` VARCHAR (10) NOT NULL
);

DROP TABLE IF EXISTS Inmate;
CREATE TABLE Inmate (
    `NUMBER` INT PRIMARY KEY,
    DocumentNumber VARCHAR(30) NOT NULL UNIQUE,
    IncarcerationDate DATE NOT NULL,
    SentenceDuration INT NOT NULL,
    CriminalRecord VARCHAR (100) NOT NULL,
    Sector VARCHAR(36) NOT NULL,
    CellNumber INT NOT NULL
);

DROP TABLE IF EXISTS Movement;
CREATE TABLE Movement(
    `DateTime` DATETIME,
    InmateNumber INT,
    Sector VARCHAR (36),
    CellNumber INT,
    PRIMARY KEY (`DateTime`, InmateNumber, Sector, CellNumber)
);

DROP TABLE IF EXISTS Guest;
CREATE TABLE Guest (
   DocumentNumber VARCHAR(30) PRIMARY KEY
);

DROP TABLE IF EXISTS Visit;
CREATE TABLE Visit (
    `DateTime` DATETIME,
    VisitedInmate INT,
    PRIMARY KEY (`DateTime`, VisitedInmate)
);

DROP TABLE IF EXISTS Visitors;
CREATE TABLE Visitors (
    VisitTime DATETIME,
    VisitedInmate INT,
    Guest VARCHAR(30),
    PRIMARY KEY (VisitTime, VisitedInmate, Guest)
);

DROP TABLE IF EXISTS Personell;
CREATE TABLE Personell(
    ID VARCHAR(36) PRIMARY KEY,
    DocumentNumber VARCHAR(30) NOT NULL UNIQUE,
    `Type` INT NOT NULL,
    Sector varchar(36) NOT NULL
);

DROP TABLE IF EXISTS PersonellType;
CREATE TABLE PersonellType (
    ID INT PRIMARY KEY,
    `Description` VARCHAR (5) NOT NULL
);

DROP TABLE IF EXISTS Report;
CREATE TABLE Report(
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `DateTime` DATETIME NOT NULL,
    `Description` VARCHAR (100) NOT NULL,
    PersonellID INT NOT NULL
);

DROP TABLE IF EXISTS Involvement;
CREATE TABLE Involvement(
    InmateNumber INT,
    ReportID INT,
    PRIMARY KEY (InmateNumber, ReportID)
);

DROP TABLE IF EXISTS EngagedPersonell;
CREATE TABLE EngagedPersonell(
    ReportID INT,
    PersonellID VARCHAR(36),
    PRIMARY KEY (ReportID, PersonellID)
);

DROP TABLE IF EXISTS Courier;
CREATE TABLE Courier (
   DocumentNumber VARCHAR(30) PRIMARY KEY
);

DROP TABLE IF EXISTS Vehicle;
CREATE TABLE Vehicle (
    PlateNumber VARCHAR (10) PRIMARY KEY,
    Driver VARCHAR(30) NOT NULL
);

DROP TABLE IF EXISTS Delivery;
CREATE TABLE Delivery (
    `DateTime` DATETIME,
    Goods INT,
    Quantity INT NOT NULL,
    Vehicle VARCHAR (10) NOT NULL,
    PRIMARY KEY (`DateTime`, Goods)
);

DROP TABLE IF EXISTS GoodsType;
CREATE TABLE GoodsType (
    ID INT PRIMARY KEY,
    `Description` VARCHAR (50) NOT NULL
);

-- Manu: Settore, Zone ...

DROP TABLE IF EXISTS Sector;
CREATE TABLE Sector (
    ID VARCHAR(36) PRIMARY KEY,
    `Name` CHAR (20) NOT NULL,
    Gender CHAR(10) NOT NULL,
    SecurityLevel INT,
    Capacity INT
);

DROP TABLE IF EXISTS Avaiability;
CREATE TABLE Avaiability(
    ActivityID VARCHAR(36),
    SectorID VARCHAR(36),
    PRIMARY KEY(ActivityID, SectorID)
);

DROP TABLE IF EXISTS Cell;
CREATE TABLE Cell (
    `Number` INT,
    Belonging VARCHAR(36),
    Capacity INT NOT NULL,
    PRIMARY KEY (`Number`,Belonging)
);

DROP TABLE IF EXISTS Activity;
CREATE TABLE Activity(
    ID VARCHAR(36) PRIMARY KEY,
    `Name` CHAR(25) NOT NULL,
    `Description` CHAR (200),
    Duration DATETIME NOT NULL
);

DROP TABLE IF EXISTS `Surveillance`;
CREATE TABLE Surveillance(
    PersonellID INT,
    `DateTime` DateTime,
    SectorID VARCHAR(36),
    PRIMARY KEY(PersonellID, `DateTime`, SectorID)
);

DROP TABLE IF EXISTS `Event`;
CREATE TABLE Event(
    ReportID INT,
    ID VARCHAR(36),
    PRIMARY KEY(ReportID, ID)
);

DROP TABLE IF EXISTS EngagedDevices;
CREATE TABLE EngagedDevices(
    `Correlation` VARCHAR(36),
    `Serial` INT,
    ReportID INT,
    PRIMARY KEY(Correlation, `Serial`, ReportID)
);

DROP TABLE IF EXISTS Routine;
CREATE TABLE Routine (
    Partecipation VARCHAR(36), 
    `Datetime` DATETIME,
    ActivityID VARCHAR(36),
    Division VARCHAR(36),
    PRIMARY KEY (Partecipation, `DateTime`)
);

DROP TABLE IF EXISTS `Zone`;
CREATE TABLE Zone (
    Division VARCHAR(36),
    `Number` INT,
    `Name` CHAR (25) NOT NULL,
    Capacity INT NOT NULL,
    PRIMARY KEY(Division, `Number`)
);

DROP TABLE IF EXISTS Device;
CREATE TABLE Device (
    `Correlation` VARCHAR(36),
    `Serial` INT,
    ID INT NOT NULL,
    `Number` INT NOT NULL,
    PRIMARY KEY(`Correlation`, `Serial`)
);

DROP TABLE IF EXISTS DeviceType;
CREATE TABLE DeviceType(
    ID VARCHAR(36) PRIMARY KEY,
    Descr char(20) NOT NULL
); 