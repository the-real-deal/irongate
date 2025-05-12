-- this file creates the database schema
DROP DATABASE IF EXISTS `IronGate`;
CREATE DATABASE `IronGate`;
USE `IronGate`;

DROP TABLE IF EXISTS `Persons`;
CREATE TABLE `Persons` (
    `DocumentID` VARCHAR(30) PRIMARY KEY,
    `Name` VARCHAR(30) NOT NULL,
    `Surname` VARCHAR(30) NOT NULL,
    `Birthday` DATE NOT NULL,
    `BirthPlace` VARCHAR(50) NOT NULL,
    `GenderID` INT NOT NULL
);

DROP TABLE IF EXISTS `Genders`;
CREATE TABLE `Genders` (
    `ID` INT PRIMARY KEY,
    `Name` VARCHAR(10) NOT NULL
);

DROP TABLE IF EXISTS `Inmates`;
CREATE TABLE `Inmates` (
    `Number` INT PRIMARY KEY,
    `DocumentID` VARCHAR(30) NOT NULL UNIQUE,
    `IncarcerationDate` DATE NOT NULL,
    `SentenceDuration` INT NOT NULL,
    `CriminalRecord` VARCHAR(500) NOT NULL,
    `CellSectorID` VARCHAR(40) NOT NULL,
    `CellNumber` INT NOT NULL
);

DROP TABLE IF EXISTS `Movements`;
CREATE TABLE `Movements` (
    `DateTime` DATETIME,
    `InmateNumber` INT,
    `CellSectorID` VARCHAR(40),
    `CellNumber` INT,
    PRIMARY KEY (
        `DateTime`,
        `InmateNumber`,
        `CellSectorID`,
        `CellNumber`
    )
);

DROP TABLE IF EXISTS `Guests`;
CREATE TABLE `Guests` (`DocumentID` VARCHAR(30) PRIMARY KEY);

DROP TABLE IF EXISTS `Visits`;
CREATE TABLE `Visits` (
    `InmateNumber` INT,
    `DateTime` DATETIME,
    PRIMARY KEY (`InmateNumber`, `DateTime`)
);

DROP TABLE IF EXISTS `Visitors`;
CREATE TABLE `Visitors` (
    `VisitInmateNumber` INT,
    `VisitDateTime` DATETIME,
    `GuestDocumentID` VARCHAR(30),
    PRIMARY KEY (
        `VisitInmateNumber`,
        `VisitDateTime`,
        `GuestDocumentID`
    )
);

DROP TABLE IF EXISTS `Personnel`;
CREATE TABLE `Personnel` (
    `ID` VARCHAR(40) PRIMARY KEY,
    `DocumentID` VARCHAR(30) NOT NULL UNIQUE,
    `PersonnelTypeID` INT NOT NULL,
    `SectorID` VARCHAR(40) -- can be NULL because only guards have an assigned sector
);

DROP TABLE IF EXISTS `PersonnelTypes`;
CREATE TABLE `PersonnelTypes` (
    `ID` INT PRIMARY KEY,
    `Name` VARCHAR(30) NOT NULL
);

DROP TABLE IF EXISTS `Reports`;
CREATE TABLE `Reports` (
    `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `DateTime` DATETIME NOT NULL,
    `Description` VARCHAR(500) NOT NULL,
    `ResponsiblePersonnelID` VARCHAR(40) NOT NULL
);

DROP TABLE IF EXISTS `Involvements`;
CREATE TABLE `Involvements` (
    `InmateNumber` INT,
    `ReportID` INT,
    PRIMARY KEY (`InmateNumber`, `ReportID`)
);

DROP TABLE IF EXISTS `EngagedPersonnel`;
CREATE TABLE `EngagedPersonnel` (
    `ReportID` INT,
    `PersonnelID` VARCHAR(40),
    PRIMARY KEY (`ReportID`, `PersonnelID`)
);

DROP TABLE IF EXISTS `Couriers`;
CREATE TABLE `Couriers` (`DocumentID` VARCHAR(30) PRIMARY KEY);

DROP TABLE IF EXISTS `Vehicles`;
CREATE TABLE `Vehicles` (
    `PlateNumber` VARCHAR(10) PRIMARY KEY,
    `CourierDocumentID` VARCHAR(30) NOT NULL
);

DROP TABLE IF EXISTS `Deliveries`;
CREATE TABLE `Deliveries` (
    `DateTime` DATETIME,
    `GoodsTypeID` INT,
    `Quantity` INT NOT NULL,
    `VehiclePlateNumber` VARCHAR(10) NOT NULL,
    PRIMARY KEY (`DateTime`, `GoodsTypeID`)
);

DROP TABLE IF EXISTS `GoodsTypes`;
CREATE TABLE `GoodsTypes` (
    `ID` INT PRIMARY KEY,
    `Name` VARCHAR(30) NOT NULL
);

DROP TABLE IF EXISTS `Sectors`;
CREATE TABLE `Sectors` (
    `ID` VARCHAR(40) PRIMARY KEY,
    `Name` VARCHAR(20) NOT NULL,
    `GenderID` INT NOT NULL,
    `SecurityLevel` INT NOT NULL,
    `Capacity` INT NOT NULL
);

DROP TABLE IF EXISTS `Avaiabilities`;
CREATE TABLE `Avaiabilities` (
    `ActivityID` VARCHAR(40),
    `SectorID` VARCHAR(40),
    PRIMARY KEY(`ActivityID`, `SectorID`)
);

DROP TABLE IF EXISTS `Cells`;
CREATE TABLE `Cells` (
    `SectorID` VARCHAR(40),
    `Number` INT,
    `Capacity` INT NOT NULL,
    PRIMARY KEY (`SectorID`, `Number`)
);

DROP TABLE IF EXISTS `Activities`;
CREATE TABLE `Activities` (
    `ID` VARCHAR(40) PRIMARY KEY,
    `Name` VARCHAR(30) NOT NULL,
    `Description` VARCHAR(200) NOT NULL,
    `Duration` INT NOT NULL
);

DROP TABLE IF EXISTS `Surveillances`;
CREATE TABLE `Surveillances` (
    `PersonnelID` VARCHAR(40),
    `RoutineSectorID` VARCHAR(40),
    `RoutineDateTime` DateTime,
    PRIMARY KEY(
        `PersonnelID`,
        `RoutineSectorID`,
        `RoutineDateTime`
    )
);

DROP TABLE IF EXISTS `EngagedSectors`;
CREATE TABLE `EngagedSectors`(
    `ReportID` INT,
    `SectorID` VARCHAR(40),
    PRIMARY KEY(`ReportID`, `SectorID`)
);

DROP TABLE IF EXISTS `EngagedDevices`;
CREATE TABLE `EngagedDevices` (
    `DeviceSerial` VARCHAR(30),
    `ReportID` INT,
    PRIMARY KEY(`DeviceSerial`, `ReportID`)
);

DROP TABLE IF EXISTS `Routines`;
CREATE TABLE `Routines` (
    `SectorID` VARCHAR(40),
    `Datetime` DATETIME NOT NULL,
    `ActivityID` VARCHAR(40) NOT NULL,
    `ZoneSectorID` VARCHAR(40) NOT NULL,
    `ZoneNumber` INT NOT NULL,
    PRIMARY KEY (`SectorID`, `DateTime`)
);

DROP TABLE IF EXISTS `Zones`;
CREATE TABLE `Zones` (
    `SectorID` VARCHAR(40),
    `Number` INT,
    `Name` VARCHAR(30) NOT NULL,
    `Capacity` INT NOT NULL,
    PRIMARY KEY(`SectorID`, `Number`)
);

DROP TABLE IF EXISTS `Devices`;
CREATE TABLE `Devices` (
    `Serial` VARCHAR(30) PRIMARY KEY,
    `SectorID` VARCHAR(40) NOT NULL,
    `Number` INT NOT NULL,
    `DeviceTypeID` INT NOT NULL,
    UNIQUE (`SectorID`, `Number`)
);

DROP TABLE IF EXISTS `DeviceTypes`;
CREATE TABLE `DeviceTypes` (
    `ID` INT PRIMARY KEY,
    `Name` char(30) NOT NULL
);

ALTER TABLE `Persons`
ADD CONSTRAINT `Persons_Genders_FK` FOREIGN KEY (`GenderID`) REFERENCES `Genders`(`ID`);

ALTER TABLE `Inmates`
ADD CONSTRAINT `Inmates_Persons_FK` FOREIGN KEY (`DocumentID`) REFERENCES `Persons`(`DocumentID`);

ALTER TABLE `Inmates`
ADD CONSTRAINT `Inmates_Cells_FK` FOREIGN KEY (`CellSectorID`, `CellNumber`) REFERENCES `Cells`(`SectorID`, `Number`); 

ALTER TABLE `Movements`
ADD CONSTRAINT `Movements_Inmates_FK` FOREIGN KEY (`InmateNumber`) REFERENCES `Inmates`(`Number`);

ALTER TABLE `Movements`
ADD CONSTRAINT `Movements_Cells_FK` FOREIGN KEY (`CellSectorID`, `CellNumber`) REFERENCES `Cells`(`SectorID`, `Number`);

ALTER TABLE `Guests`
ADD CONSTRAINT `Guests_Persons_FK` FOREIGN KEY (`DocumentID`) REFERENCES `Persons`(`DocumentID`);

ALTER TABLE `Visits`
ADD CONSTRAINT `Visits_Inmates_FK` FOREIGN KEY (`InmateNumber`) REFERENCES `Inmates`(`Number`);

ALTER TABLE `Visitors`
ADD CONSTRAINT `Visitors_Visits_FK` FOREIGN KEY (`VisitInmateNumber`, `VisitDateTime`) REFERENCES `Visits`(`InmateNumber`, `DateTime`);

ALTER TABLE `Visitors`
ADD CONSTRAINT `Visitors_Guests_FK` FOREIGN KEY (`GuestDocumentID`) REFERENCES `Guests`(`DocumentID`);

ALTER TABLE `Personnel`
ADD CONSTRAINT `Personnel_Persons_FK` FOREIGN KEY (`DocumentID`) REFERENCES `Persons`(`DocumentID`);

ALTER TABLE `Personnel`
ADD CONSTRAINT `Personnel_PersonnelTypes_FK` FOREIGN KEY (`PersonnelTypeID`) REFERENCES `PersonnelTypes`(`ID`);

ALTER TABLE `Reports`
ADD CONSTRAINT `Reports_Personnel_FK` FOREIGN KEY (`ResponsiblePersonnelID`) REFERENCES `Personnel`(`ID`);

ALTER TABLE `Involvements`
ADD CONSTRAINT `Involvements_Inmates_FK` FOREIGN KEY (`InmateNumber`) REFERENCES `Inmates`(`Number`);

ALTER TABLE `Involvements`
ADD CONSTRAINT `Involvements_Reports_FK` FOREIGN KEY (`ReportID`) REFERENCES `Reports`(`ID`);    

ALTER TABLE `EngagedPersonnel`
ADD CONSTRAINT `EngagedPersonnel_Reports_FK` FOREIGN KEY (`ReportID`) REFERENCES `Reports`(`ID`);   

ALTER TABLE `EngagedPersonnel`
ADD CONSTRAINT `EngagedPersonnel_Personnel_FK` FOREIGN KEY (`PersonnelID`) REFERENCES `Personnel`(`ID`);  

ALTER TABLE `Couriers`
ADD CONSTRAINT `Couriers_Persons_FK` FOREIGN KEY (`DocumentID`) REFERENCES `Persons`(`DocumentID`); 

ALTER TABLE `Vehicles`
ADD CONSTRAINT `Vehicles_Couriers_FK` FOREIGN KEY (`CourierDocumentID`) REFERENCES `Couriers`(`DocumentID`); 

ALTER TABLE `Deliveries`
ADD CONSTRAINT `Deliveries_GoodsTypes_FK` FOREIGN KEY (`GoodsTypeID`) REFERENCES `GoodsTypes`(`ID`); 

ALTER TABLE `Deliveries`
ADD CONSTRAINT `Deliveries_Vehicles_FK` FOREIGN KEY (`VehiclePlateNumber`) REFERENCES `Vehicles`(`PlateNumber`); 

ALTER TABLE `Sectors`
ADD CONSTRAINT `Sectors_Genders_FK` FOREIGN KEY (`GenderID`) REFERENCES `Genders`(`ID`); 

ALTER TABLE `Avaiabilities`
ADD CONSTRAINT `Avaiabilities_Activities_FK` FOREIGN KEY (`ActivityID`) REFERENCES `Activities`(`ID`);

ALTER TABLE `Avaiabilities`
ADD CONSTRAINT `Avaiabilities_Sectors_FK` FOREIGN KEY (`SectorID`) REFERENCES `Sectors`(`ID`);

ALTER TABLE `Cells`
ADD CONSTRAINT `Cells_Sectors_FK` FOREIGN KEY (`SectorID`) REFERENCES `Sectors`(`ID`);

ALTER TABLE `Surveillances`
ADD CONSTRAINT `Surveillances_Personnel_FK` FOREIGN KEY (`PersonnelID`) REFERENCES `Personnel`(`ID`);

ALTER TABLE `Surveillances`
ADD CONSTRAINT `Surveillances_Routines_FK` FOREIGN KEY (`RoutineSectorID`, `RoutineDateTime`) REFERENCES `Routines`(`SectorID`, `DateTime`);

ALTER TABLE `EngagedSectors`
ADD CONSTRAINT `EngagedSectors_Reports_FK` FOREIGN KEY (`ReportID`) REFERENCES `Reports`(`ID`);

ALTER TABLE `EngagedSectors`
ADD CONSTRAINT `EngagedSectors_Sectors_FK` FOREIGN KEY (`SectorID`) REFERENCES `Sectors`(`ID`);

ALTER TABLE `EngagedDevices`
ADD CONSTRAINT `EngagedDevices_Devices_FK` FOREIGN KEY (`DeviceSerial`) REFERENCES `Devices`(`Serial`);

ALTER TABLE `EngagedDevices`
ADD CONSTRAINT `EngagedDevices_Reports_FK` FOREIGN KEY (`ReportID`) REFERENCES `Reports`(`ID`);

ALTER TABLE `Routines`
ADD CONSTRAINT `Routines_Sectors_FK` FOREIGN KEY (`SectorID`) REFERENCES `Sectors`(`ID`);

ALTER TABLE `Routines`
ADD CONSTRAINT `Routines_Activities_FK` FOREIGN KEY (`ActivityID`) REFERENCES `Activities`(`ID`);

ALTER TABLE `Routines`
ADD CONSTRAINT `Routines_Zones_FK` FOREIGN KEY (`ZoneSectorID`, `ZoneNumber`) REFERENCES `Zones`(`SectorID`, `Number`);

ALTER TABLE `Zones`
ADD CONSTRAINT `Zones_Sectors_FK` FOREIGN KEY (`SectorID`) REFERENCES `Sectors`(`ID`);

ALTER TABLE `Devices`
ADD CONSTRAINT `Devices_Sectors_FK` FOREIGN KEY (`SectorID`) REFERENCES `Sectors`(`ID`);

ALTER TABLE `Devices`
ADD CONSTRAINT `Devices_DeviceTypes_FK` FOREIGN KEY (`DeviceTypeID`) REFERENCES `DeviceTypes`(`ID`);