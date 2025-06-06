DROP DATABASE IF EXISTS `IronGate`;
CREATE DATABASE `IronGate`;
USE `IronGate`;

-- tables

DROP TABLE IF EXISTS `Genders`;
CREATE TABLE `Genders` (
    `ID` VARCHAR(10) PRIMARY KEY
);

DROP TABLE IF EXISTS `People`;
CREATE TABLE `People` (
    `DocumentID` VARCHAR(30) PRIMARY KEY,
    `Name` VARCHAR(30) NOT NULL,
    `Surname` VARCHAR(30) NOT NULL,
    `Birthday` DATE NOT NULL,
    `BirthPlace` VARCHAR(50) NOT NULL,
    `GenderID` VARCHAR(10) NOT NULL
);

DROP TABLE IF EXISTS `SecurityLevels`;
CREATE TABLE `SecurityLevels` (
    `ID` VARCHAR(20) PRIMARY KEY
);

DROP TABLE IF EXISTS `Sectors`;
CREATE TABLE `Sectors` (
    `ID` VARCHAR(40) PRIMARY KEY DEFAULT (CONCAT('SCT-', UUID())),
    `Name` VARCHAR(20) NOT NULL,
    `GenderID` VARCHAR(10),
    `SecurityLevelID` VARCHAR(20) NOT NULL,
    `TotalInmates` INT NOT NULL DEFAULT 0
);

DROP TABLE IF EXISTS `Cells`;
CREATE TABLE `Cells` (
    `SectorID` VARCHAR(40),
    `Number` INT,
    `Capacity` INT NOT NULL,
    PRIMARY KEY (`SectorID`, `Number`)
);

DROP TABLE IF EXISTS `Inmates`;
CREATE TABLE `Inmates` (
    `Number` VARCHAR(30) PRIMARY KEY,
    `DocumentID` VARCHAR(30) NOT NULL UNIQUE,
    `IncarcerationDate` DATE NOT NULL,
    `SentenceDuration` INT NOT NULL,
    `CriminalRecord` VARCHAR(500) NOT NULL,
    `CellSectorID` VARCHAR(40) NOT NULL,
    `CellNumber` INT NOT NULL
);

DROP TABLE IF EXISTS `Movements`;
CREATE TABLE `Movements` (
    `Datetime` DATETIME,
    `InmateNumber` VARCHAR(30),
    `CellSectorID` VARCHAR(40),
    `CellNumber` INT,
    PRIMARY KEY (
        `Datetime`,
        `InmateNumber`
    )
);

DROP TABLE IF EXISTS `Guests`;
CREATE TABLE `Guests` (`DocumentID` VARCHAR(30) PRIMARY KEY);

DROP TABLE IF EXISTS `Visits`;
CREATE TABLE `Visits` (
    `InmateNumber` VARCHAR(30),
    `Datetime` DATETIME,
    PRIMARY KEY (`InmateNumber`, `Datetime`)
);

DROP TABLE IF EXISTS `Visitors`;
CREATE TABLE `Visitors` (
    `VisitInmateNumber` VARCHAR(30),
    `VisitDatetime` DATETIME,
    `GuestDocumentID` VARCHAR(30),
    PRIMARY KEY (
        `VisitInmateNumber`,
        `VisitDatetime`,
        `GuestDocumentID`
    )
);

DROP TABLE IF EXISTS `PersonnelTypes`;
CREATE TABLE `PersonnelTypes` (
    `ID` VARCHAR(30) PRIMARY KEY
);

DROP TABLE IF EXISTS `Personnel`;
CREATE TABLE `Personnel` (
    `ID` VARCHAR(40) PRIMARY KEY DEFAULT (CONCAT('PER-', UUID())),
    `DocumentID` VARCHAR(30) NOT NULL UNIQUE,
    `PersonnelTypeID` VARCHAR(30) NOT NULL,
    `SectorID` VARCHAR(40) -- can be NULL because only guards have an assigned sector
);

DROP TABLE IF EXISTS `DeviceTypes`;
CREATE TABLE `DeviceTypes` (
    `ID` VARCHAR(30) PRIMARY KEY
);

DROP TABLE IF EXISTS `Devices`;
CREATE TABLE `Devices` (
    `Serial` VARCHAR(30) PRIMARY KEY,
    `SectorID` VARCHAR(40) NOT NULL,
    `Number` INT NOT NULL,
    `DeviceTypeID` VARCHAR(30) NOT NULL,
    UNIQUE (`SectorID`, `Number`)
);

DROP TABLE IF EXISTS `Reports`;
CREATE TABLE `Reports` (
    `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Datetime` DATETIME NOT NULL,
    `Description` VARCHAR(500) NOT NULL,
    `ResponsiblePersonnelID` VARCHAR(40) NOT NULL
);

DROP TABLE IF EXISTS `EngagedInmates`;
CREATE TABLE `EngagedInmates` (
    `ReportID` INT,
    `InmateNumber` VARCHAR(30),
    PRIMARY KEY (`ReportID`, `InmateNumber`)
);

DROP TABLE IF EXISTS `EngagedPersonnel`;
CREATE TABLE `EngagedPersonnel` (
    `ReportID` INT,
    `PersonnelID` VARCHAR(40),
    PRIMARY KEY (`ReportID`, `PersonnelID`)
);

DROP TABLE IF EXISTS `EngagedSectors`;
CREATE TABLE `EngagedSectors`(
    `ReportID` INT,
    `SectorID` VARCHAR(40),
    PRIMARY KEY(`ReportID`, `SectorID`)
);

DROP TABLE IF EXISTS `EngagedDevices`;
CREATE TABLE `EngagedDevices` (
    `ReportID` INT,
    `DeviceSerial` VARCHAR(30),
    PRIMARY KEY(`ReportID`, `DeviceSerial`)
);

-- check er

DROP TABLE IF EXISTS `Couriers`;
CREATE TABLE `Couriers` (`DocumentID` VARCHAR(30) PRIMARY KEY);

DROP TABLE IF EXISTS `Vehicles`;
CREATE TABLE `Vehicles` (
    `PlateNumber` VARCHAR(10) PRIMARY KEY,
    `CourierDocumentID` VARCHAR(30) NOT NULL
);

DROP TABLE IF EXISTS `GoodsTypes`;
CREATE TABLE `GoodsTypes` (
    `ID` VARCHAR(30) PRIMARY KEY
);

DROP TABLE IF EXISTS `Deliveries`;
CREATE TABLE `Deliveries` (
    `Datetime` DATETIME,
    `GoodsTypeID` VARCHAR(30),
    `Quantity` INT NOT NULL,
    `VehiclePlateNumber` VARCHAR(10) NOT NULL,
    PRIMARY KEY (`Datetime`, `GoodsTypeID`)
);

DROP TABLE IF EXISTS `Activities`;
CREATE TABLE `Activities` (
    `ID` VARCHAR(40) PRIMARY KEY DEFAULT (CONCAT('ACT-', UUID())),
    `Description` VARCHAR(200) NOT NULL,
    `Duration` INT NOT NULL
);

DROP TABLE IF EXISTS `Availabilities`;
CREATE TABLE `Availabilities` (
    `SecurityLevelID` VARCHAR(20),
    `ActivityID` VARCHAR(40),
    PRIMARY KEY (`SecurityLevelID`, `ActivityID`)
);

DROP TABLE IF EXISTS `Zones`;
CREATE TABLE `Zones` (
    `SectorID` VARCHAR(40),
    `Number` INT,
    `Name` VARCHAR(30) NOT NULL,
    `Capacity` INT NOT NULL,
    PRIMARY KEY (`SectorID`, `Number`)
);

DROP TABLE IF EXISTS `Routines`;
CREATE TABLE `Routines` (
    `ZoneSectorID` VARCHAR(40),
    `ZoneNumber` INT,
    `Datetime` DATETIME,
    `ActivityID` VARCHAR(40) NOT NULL,
    PRIMARY KEY (`ZoneSectorID`, `ZoneNumber`, `Datetime`)
);

DROP TABLE IF EXISTS `Partecipations`;
CREATE TABLE `Partecipations` (
    `RoutineZoneSectorID` VARCHAR(40),
    `RoutineZoneNumber` INT,
    `RoutineDatetime` Datetime,
    `SectorID` VARCHAR(40),
    PRIMARY KEY (
        `RoutineZoneSectorID`,
        `RoutineZoneNumber`,
        `RoutineDatetime`,
        `SectorID`
    )
);

DROP TABLE IF EXISTS `Surveillances`;
CREATE TABLE `Surveillances` (
    `RoutineZoneSectorID` VARCHAR(40),
    `RoutineZoneNumber` INT,
    `RoutineDatetime` Datetime,
    `PersonnelID` VARCHAR(40),
    PRIMARY KEY (
        `RoutineZoneSectorID`,
        `RoutineZoneNumber`,
        `RoutineDatetime`,
        `PersonnelID`
    )
);

ALTER TABLE `People`
ADD CONSTRAINT `People_Genders_FK`
FOREIGN KEY (`GenderID`) REFERENCES `Genders`(`ID`);

ALTER TABLE `Sectors`
ADD CONSTRAINT `Sectors_Genders_FK`
FOREIGN KEY (`GenderID`) REFERENCES `Genders`(`ID`);

ALTER TABLE `Sectors`
ADD CONSTRAINT `Sectors_SecurityLevels_FK`
FOREIGN KEY (`SecurityLevelID`) REFERENCES `SecurityLevels`(`ID`);

ALTER TABLE `Cells`
ADD CONSTRAINT `Cells_Sectors_FK` 
FOREIGN KEY (`SectorID`) REFERENCES `Sectors`(`ID`)
ON DELETE CASCADE;

ALTER TABLE `Inmates`
ADD CONSTRAINT `Inmates_People_FK`
FOREIGN KEY (`DocumentID`) REFERENCES `People`(`DocumentID`)
ON DELETE CASCADE;

ALTER TABLE `Inmates`
ADD CONSTRAINT `Inmates_Cells_FK`
FOREIGN KEY (`CellSectorID`, `CellNumber`) REFERENCES `Cells`(`SectorID`, `Number`);

ALTER TABLE `Movements`
ADD CONSTRAINT `Movements_Inmates_FK`
FOREIGN KEY (`InmateNumber`) REFERENCES `Inmates`(`Number`);

ALTER TABLE `Movements`
ADD CONSTRAINT `Movements_Cells_FK`
FOREIGN KEY (`CellSectorID`, `CellNumber`) REFERENCES `Cells`(`SectorID`, `Number`);

ALTER TABLE `Guests`
ADD CONSTRAINT `Guests_People_FK`
FOREIGN KEY (`DocumentID`) REFERENCES `People`(`DocumentID`)
ON DELETE CASCADE;

ALTER TABLE `Visits`
ADD CONSTRAINT `Visits_Inmates_FK`
FOREIGN KEY (`InmateNumber`) REFERENCES `Inmates`(`Number`);

ALTER TABLE `Visitors`
ADD CONSTRAINT `Visitors_Visits_FK`
FOREIGN KEY (`VisitInmateNumber`, `VisitDatetime`) REFERENCES `Visits`(`InmateNumber`, `Datetime`);

ALTER TABLE `Visitors`
ADD CONSTRAINT `Visitors_Guests_FK`
FOREIGN KEY (`GuestDocumentID`) REFERENCES `Guests`(`DocumentID`);

ALTER TABLE `Personnel`
ADD CONSTRAINT `Personnel_People_FK`
FOREIGN KEY (`DocumentID`) REFERENCES `People`(`DocumentID`)
ON DELETE CASCADE;

ALTER TABLE `Personnel`
ADD CONSTRAINT `Personnel_PersonnelTypes_FK`
FOREIGN KEY (`PersonnelTypeID`) REFERENCES `PersonnelTypes`(`ID`);

ALTER TABLE `Devices`
ADD CONSTRAINT `Devices_Sectors_FK`
FOREIGN KEY (`SectorID`) REFERENCES `Sectors`(`ID`)
ON DELETE CASCADE;

ALTER TABLE `Devices`
ADD CONSTRAINT `Devices_DeviceTypes_FK`
FOREIGN KEY (`DeviceTypeID`) REFERENCES `DeviceTypes`(`ID`);

ALTER TABLE `Reports`
ADD CONSTRAINT `Reports_Personnel_FK`
FOREIGN KEY (`ResponsiblePersonnelID`) REFERENCES `Personnel`(`ID`);

ALTER TABLE `EngagedInmates`
ADD CONSTRAINT `EngagedInmates_Reports_FK`
FOREIGN KEY (`ReportID`) REFERENCES `Reports`(`ID`);

ALTER TABLE `EngagedInmates`
ADD CONSTRAINT `EngagedInmates_Inmates_FK`
FOREIGN KEY (`InmateNumber`) REFERENCES `Inmates`(`Number`);

ALTER TABLE `EngagedPersonnel`
ADD CONSTRAINT `EngagedPersonnel_Reports_FK`
FOREIGN KEY (`ReportID`) REFERENCES `Reports`(`ID`);

ALTER TABLE `EngagedPersonnel`
ADD CONSTRAINT `EngagedPersonnel_Personnel_FK`
FOREIGN KEY (`PersonnelID`) REFERENCES `Personnel`(`ID`);

ALTER TABLE `EngagedSectors`
ADD CONSTRAINT `EngagedSectors_Reports_FK`
FOREIGN KEY (`ReportID`) REFERENCES `Reports`(`ID`);

ALTER TABLE `EngagedSectors`
ADD CONSTRAINT `EngagedSectors_Sectors_FK`
FOREIGN KEY (`SectorID`) REFERENCES `Sectors`(`ID`);

ALTER TABLE `EngagedDevices`
ADD CONSTRAINT `EngagedDevices_Reports_FK`
FOREIGN KEY (`ReportID`) REFERENCES `Reports`(`ID`);

ALTER TABLE `EngagedDevices`
ADD CONSTRAINT `EngagedDevices_Devices_FK`
FOREIGN KEY (`DeviceSerial`) REFERENCES `Devices`(`Serial`);

ALTER TABLE `Couriers`
ADD CONSTRAINT `Couriers_People_FK`
FOREIGN KEY (`DocumentID`) REFERENCES `People`(`DocumentID`)
ON DELETE CASCADE;

ALTER TABLE `Vehicles`
ADD CONSTRAINT `Vehicles_Couriers_FK`
FOREIGN KEY (`CourierDocumentID`) REFERENCES `Couriers`(`DocumentID`);

ALTER TABLE `Deliveries`
ADD CONSTRAINT `Deliveries_GoodsTypes_FK`
FOREIGN KEY (`GoodsTypeID`) REFERENCES `GoodsTypes`(`ID`);

ALTER TABLE `Deliveries`
ADD CONSTRAINT `Deliveries_Vehicles_FK`
FOREIGN KEY (`VehiclePlateNumber`) REFERENCES `Vehicles`(`PlateNumber`);

ALTER TABLE `Availabilities`
ADD CONSTRAINT `Availabilities_SecurityLevels_FK`
FOREIGN KEY (`SecurityLevelID`) REFERENCES `SecurityLevels`(`ID`);

ALTER TABLE `Availabilities`
ADD CONSTRAINT `Availabilities_Activities_FK`
FOREIGN KEY (`ActivityID`) REFERENCES `Activities`(`ID`);

ALTER TABLE `Zones`
ADD CONSTRAINT `Zones_Sectors_FK`
FOREIGN KEY (`SectorID`) REFERENCES `Sectors`(`ID`)
ON DELETE CASCADE;

ALTER TABLE `Routines`
ADD CONSTRAINT `Routines_Zones_FK`
FOREIGN KEY (`ZoneSectorID`, `ZoneNumber`) REFERENCES `Zones`(`SectorID`, `Number`);

ALTER TABLE `Routines`
ADD CONSTRAINT `Routines_Activities_FK`
FOREIGN KEY (`ActivityID`) REFERENCES `Activities`(`ID`);

ALTER TABLE `Partecipations`
ADD CONSTRAINT `Partecipations_Routines_FK`
FOREIGN KEY (`RoutineZoneSectorID`, `RoutineZoneNumber`, `RoutineDatetime`) REFERENCES `Routines`(`ZoneSectorID`, `ZoneNumber`, `Datetime`);

ALTER TABLE `Partecipations`
ADD CONSTRAINT `Partecipations_Sectors_FK`
FOREIGN KEY (`SectorID`) REFERENCES `Sectors`(`ID`);

ALTER TABLE `Surveillances`
ADD CONSTRAINT `Surveillances_Routines_FK`
FOREIGN KEY (`RoutineZoneSectorID`, `RoutineZoneNumber`, `RoutineDatetime`) REFERENCES `Routines`(`ZoneSectorID`, `ZoneNumber`, `Datetime`);

ALTER TABLE `Surveillances`
ADD CONSTRAINT `Surveillances_Personnel_FK`
FOREIGN KEY (`PersonnelID`) REFERENCES `Personnel`(`ID`);

-- checks

-- data

INSERT INTO `Genders`(`ID`)
VALUES 
('Male'),
('Female');

INSERT INTO `People`(`DocumentID`, `Name`, `Surname`, `Birthday`, `BirthPlace`, `GenderID`)
VALUES
('IT-ABC12345A', 'Luca', 'Bianchi', '1980-05-12', 'Rome', 'Male'),
('US-987654321', 'John', 'Smith', '1975-11-23', 'New York', 'Male'),
('BR-345678901', 'Carlos', 'Silva', '1982-01-10', 'Sao Paulo', 'Male'),
('ES-456789012', 'Miguel', 'Garcia', '1979-09-05', 'Madrid', 'Male'),
('IT-GHI34567C', 'Marco', 'Verdi', '1978-06-09', 'Naples', 'Male'),
('AU-345678912', 'Jack', 'Brown', '1984-03-27', 'Sydney', 'Male'),
('IT-JKL90123D', 'Paolo', 'Neri', '1986-11-19', 'Turin', 'Male'),
('US-234567890', 'Robert', 'Williams', '1977-05-25', 'Los Angeles', 'Male'),
('IN-456789013', 'Raj', 'Patel', '1981-12-05', 'Mumbai', 'Male'),
('CN-567890124', 'Li', 'Wei', '1993-02-21', 'Beijing', 'Male'),
('ZA-678901235', 'Thabo', 'Nkosi', '1986-07-14', 'Johannesburg', 'Male'),
('IT-MNO23456E', 'Simone', 'Conti', '1985-03-12', 'Florence', 'Male'),
('US-345678902', 'Michael', 'Brown', '1983-01-19', 'Boston', 'Male'),
('DE-456789013', 'Stefan', 'Müller', '1979-04-25', 'Hamburg', 'Male'),
('JP-789012346', 'Haruto', 'Sato', '1991-11-03', 'Osaka', 'Male'),
('CA-345678902', 'Noah', 'Wilson', '1984-05-27', 'Toronto', 'Male'),
('IT-PQR56789F', 'Davide', 'Ricci', '1982-02-11', 'Venice', 'Male'),
('GB-678901235', 'George', 'Evans', '1978-10-05', 'Manchester', 'Male'),
('FR-345678902', 'Julien', 'Moreau', '1985-03-18', 'Marseille', 'Male'),
('BR-678901235', 'Pedro', 'Alves', '1981-09-23', 'Brasilia', 'Male'),
('US-567890124', 'William', 'Moore', '1980-08-20', 'Houston', 'Male'),
('AU-567890124', 'Liam', 'Harris', '1982-03-09', 'Perth', 'Male'),
('ES-678901235', 'Javier', 'Lopez', '1985-12-28', 'Seville', 'Male'),
('DE-678901235', 'Jonas', 'Becker', '1988-09-02', 'Stuttgart', 'Male'),
('BR-789012346', 'Gabriel', 'Costa', '1990-10-17', 'Salvador', 'Male'),
('JP-901234568', 'Ren', 'Kobayashi', '1986-02-24', 'Nagoya', 'Male'),
('CA-567890124', 'Benjamin', 'Dubois', '1989-12-03', 'Ottawa', 'Male'),
('ES-789012346', 'Diego', 'Ruiz', '1987-04-27', 'Valencia', 'Male'),
('IT-BCD23456J', 'Federico', 'Lombardi', '1983-08-19', 'Pisa', 'Male'),
('SE-123456789', 'Erik', 'Johansson', '1985-01-15', 'Stockholm', 'Male'),
('FI-345678901', 'Mikko', 'Virtanen', '1982-07-09', 'Helsinki', 'Male'),
('PL-567890123', 'Jan', 'Kowalski', '1987-05-18', 'Warsaw', 'Male'),
('PT-789012345', 'João', 'Silva', '1984-12-12', 'Lisbon', 'Male'),
('CH-901234567', 'Luca', 'Müller', '1986-08-27', 'Zurich', 'Male'),
('BE-123450987', 'Lucas', 'Dupont', '1983-06-19', 'Brussels', 'Male'),
('HU-345672109', 'Gabor', 'Nagy', '1980-09-07', 'Budapest', 'Male'),
('SK-567894321', 'Peter', 'Horvath', '1985-05-11', 'Bratislava', 'Male'),
('BG-789016543', 'Georgi', 'Ivanov', '1982-03-29', 'Sofia', 'Male'),
('RS-901238765', 'Marko', 'Jovanovic', '1989-11-05', 'Belgrade', 'Male'),
('TR-123450987', 'Ahmet', 'Yilmaz', '1983-04-17', 'Istanbul', 'Male'),
('SA-345672109', 'Fahad', 'Al Saud', '1986-10-02', 'Riyadh', 'Male'),
('KR-567894321', 'Min-jun', 'Kim', '1984-02-08', 'Seoul', 'Male'),
('TH-789016543', 'Nattapong', 'Sukhum', '1981-05-15', 'Bangkok', 'Male'),
('ID-901238765', 'Budi', 'Santoso', '1985-03-03', 'Jakarta', 'Male'),
('VN-123450987', 'Quang', 'Nguyen', '1982-12-29', 'Hanoi', 'Male'),
('MX-345672109', 'Carlos', 'Hernandez', '1983-01-25', 'Mexico City', 'Male'),
('CL-567894321', 'Diego', 'Torres', '1986-04-20', 'Santiago', 'Male'),
('PE-789016543', 'Jose', 'Perez', '1984-10-07', 'Lima', 'Male'),
('DZ-901238765', 'Youssef', 'Benkirane', '1987-05-23', 'Algiers', 'Male'),
('NG-123450987', 'Chinedu', 'Okafor', '1981-12-04', 'Lagos', 'Male'),
('GH-345672109', 'Kwame', 'Mensah', '1985-06-02', 'Accra', 'Female'),
('TZ-567894321', 'Juma', 'Musa', '1983-09-15', 'Dar es Salaam', 'Female'),
('ZW-789016543', 'Tendai', 'Chirwa', '1982-05-19', 'Harare', 'Female'),
('FR-123456789', 'Marie', 'Dubois', '1988-03-15', 'Paris', 'Female'),
('DE-234567890', 'Anna', 'Schmidt', '1990-07-30', 'Berlin', 'Female'),
('GB-567890123', 'Emily', 'Clark', '1992-12-01', 'London', 'Female'),
('JP-678901234', 'Yuki', 'Tanaka', '1985-04-18', 'Tokyo', 'Female'),
('IT-DEF67890B', 'Giulia', 'Rossi', '1983-08-22', 'Milan', 'Female'),
('US-123456789', 'Alice', 'Johnson', '1987-02-14', 'Chicago', 'Female'),
('CA-234567891', 'Sophie', 'Martin', '1991-10-11', 'Montreal', 'Female'),
('RU-345678900', 'Olga', 'Ivanova', '1989-09-17', 'Moscow', 'Female'),
('EG-789012346', 'Fatima', 'Hassan', '1990-10-30', 'Cairo', 'Female'),
('FR-234567891', 'Claire', 'Leroy', '1992-06-08', 'Lyon', 'Female'),
('BR-567890124', 'Fernanda', 'Oliveira', '1987-08-16', 'Rio de Janeiro', 'Female'),
('AU-456789013', 'Olivia', 'Taylor', '1988-09-14', 'Melbourne', 'Female'),
('ES-567890124', 'Lucia', 'Martinez', '1990-12-22', 'Barcelona', 'Female'),
('US-456789013', 'Jessica', 'Davis', '1986-07-29', 'San Francisco', 'Female'),
('DE-567890124', 'Laura', 'Fischer', '1993-06-12', 'Frankfurt', 'Female'),
('JP-890123457', 'Sakura', 'Yamamoto', '1989-01-07', 'Kyoto', 'Female'),
('IT-STU89012G', 'Alessia', 'Greco', '1994-04-15', 'Genoa', 'Female'),
('CA-456789013', 'Emma', 'Lefevre', '1987-11-30', 'Vancouver', 'Female'),
('IT-VWX12345H', 'Chiara', 'Romano', '1991-05-06', 'Bologna', 'Female'),
('FR-456789013', 'Manon', 'Simon', '1983-07-13', 'Nice', 'Female'),
('IT-YZA45678I', 'Martina', 'Barbieri', '1984-06-21', 'Palermo', 'Female'),
('US-678901235', 'Sophia', 'Martinez', '1992-09-11', 'Miami', 'Female'),
('AU-678901235', 'Charlotte', 'Walker', '1981-01-16', 'Brisbane', 'Female'),
('NO-234567890', 'Ingrid', 'Larsen', '1990-03-22', 'Oslo', 'Female'),
('DK-456789012', 'Freja', 'Nielsen', '1993-11-30', 'Copenhagen', 'Female'),
('GR-678901234', 'Eleni', 'Papadopoulos', '1989-09-25', 'Athens', 'Female'),
('IE-890123456', 'Aoife', 'Murphy', '1991-04-03', 'Dublin', 'Female'),
('AT-012345678', 'Anna', 'Gruber', '1992-10-14', 'Vienna', 'Female'),
('NL-234561098', 'Sanne', 'Jansen', '1988-02-28', 'Amsterdam', 'Female'),
('CZ-456783210', 'Tereza', 'Novak', '1994-01-23', 'Prague', 'Female'),
('RO-678905432', 'Andreea', 'Popescu', '1990-12-16', 'Bucharest', 'Female'),
('HR-890127654', 'Ivana', 'Kovacic', '1987-07-21', 'Zagreb', 'Female'),
('UA-012349876', 'Olena', 'Shevchenko', '1991-08-13', 'Kyiv', 'Female'),
('IL-234561098', 'Noa', 'Levi', '1992-06-25', 'Tel Aviv', 'Female'),
('AE-456783210', 'Aisha', 'Al Mansoori', '1988-12-19', 'Dubai', 'Female'),
('SG-678905432', 'Mei', 'Lim', '1993-09-27', 'Singapore', 'Female'),
('MY-890127654', 'Aisyah', 'Binti Ahmad', '1987-11-22', 'Kuala Lumpur', 'Female'),
('PH-012349876', 'Maria', 'Reyes', '1990-07-18', 'Manila', 'Female'),
('NZ-234561098', 'Sophie', 'Williams', '1991-09-10', 'Auckland', 'Female'),
('AR-456783210', 'Valentina', 'Gomez', '1988-06-14', 'Buenos Aires', 'Female'),
('CO-678905432', 'Camila', 'Rodriguez', '1992-08-31', 'Bogota', 'Female'),
('VE-890127654', 'Gabriela', 'Fernandez', '1989-02-12', 'Caracas', 'Female'),
('MA-012349876', 'Salma', 'El Amrani', '1993-03-16', 'Casablanca', 'Female'),
('KE-234561098', 'Amina', 'Mohamed', '1986-08-28', 'Nairobi', 'Female'),
('ET-456783210', 'Hana', 'Abebe', '1990-11-09', 'Addis Ababa', 'Female'),
('UG-678905432', 'Grace', 'Nabwire', '1988-01-30', 'Kampala', 'Female'),
('CM-890127654', 'Estelle', 'Ngono', '1991-07-24', 'Yaounde', 'Female'),
('US-111223333', 'Ethan', 'Baker', '1987-03-12', 'Chicago', 'Male'),
('CA-222334444', 'Logan', 'Martin', '1989-07-21', 'Vancouver', 'Male'),
('GB-333445555', 'Oliver', 'Wright', '1985-11-30', 'Liverpool', 'Male'),
('DE-444556666', 'Leon', 'Schneider', '1990-01-15', 'Munich', 'Male'),
('FR-555667777', 'Lucas', 'Bernard', '1988-09-18', 'Lille', 'Male'),
('IT-666778888', 'Matteo', 'Gallo', '1986-05-22', 'Turin', 'Male'),
('ES-777889999', 'Adrian', 'Moreno', '1991-10-09', 'Bilbao', 'Male'),
('PT-888990000', 'Tiago', 'Ferreira', '1984-12-27', 'Porto', 'Male'),
('NL-999001111', 'Daan', 'De Vries', '1987-08-14', 'Rotterdam', 'Male'),
('BE-101112131', 'Milan', 'Peeters', '1989-04-03', 'Antwerp', 'Male'),
('SE-121314151', 'William', 'Andersson', '1985-06-19', 'Gothenburg', 'Male'),
('FI-131415161', 'Elias', 'Laine', '1992-02-25', 'Espoo', 'Male'),
('PL-141516171', 'Kacper', 'Nowak', '1988-12-11', 'Gdansk', 'Male'),
('RU-151617181', 'Ivan', 'Petrov', '1986-09-07', 'Saint Petersburg', 'Male'),
('UA-161718191', 'Dmytro', 'Koval', '1991-03-29', 'Dnipro', 'Male'),
('RO-171819202', 'Andrei', 'Ionescu', '1987-07-16', 'Cluj', 'Male'),
('BG-181920212', 'Nikolay', 'Dimitrov', '1989-05-24', 'Varna', 'Male'),
('GR-192021222', 'Nikos', 'Georgiou', '1985-10-13', 'Patras', 'Male'),
('TR-202122232', 'Emre', 'Demir', '1990-08-02', 'Izmir', 'Male'),
('IL-212223242', 'Amit', 'Cohen', '1988-11-05', 'Haifa', 'Male'),
('EG-222324252', 'Omar', 'Ali', '1986-04-18', 'Alexandria', 'Male'),
('ZA-232425262', 'Sipho', 'Zulu', '1992-01-27', 'Durban', 'Male'),
('NG-242526272', 'Ifeanyi', 'Eze', '1987-09-30', 'Abuja', 'Male'),
('KE-252627282', 'Brian', 'Otieno', '1989-12-15', 'Mombasa', 'Male'),
('IN-262728293', 'Aarav', 'Sharma', '1991-06-22', 'Delhi', 'Male'),
('US-333221111', 'Ava', 'Miller', '1988-02-14', 'San Diego', 'Female'),
('CA-444332222', 'Mia', 'Clark', '1990-08-19', 'Calgary', 'Female'),
('GB-555443333', 'Ella', 'Walker', '1986-12-23', 'Bristol', 'Female'),
('DE-666554444', 'Lina', 'Neumann', '1987-05-28', 'Dresden', 'Female'),
('FR-777665555', 'Camille', 'Dubois', '1992-09-11', 'Toulouse', 'Female'),
('IT-888776666', 'Sara', 'Fontana', '1989-03-17', 'Parma', 'Female'),
('ES-999887777', 'Carmen', 'Serrano', '1985-07-05', 'Granada', 'Female'),
('PT-000998888', 'Beatriz', 'Sousa', '1991-11-29', 'Coimbra', 'Female'),
('NL-111009999', 'Julia', 'Bakker', '1987-01-13', 'Utrecht', 'Female'),
('BE-121110101', 'Fleur', 'Jacobs', '1988-10-21', 'Ghent', 'Female'),
('SE-131211111', 'Agnes', 'Lindberg', '1990-06-08', 'Uppsala', 'Female'),
('FI-141312121', 'Aino', 'Heikkinen', '1986-03-26', 'Tampere', 'Female'),
('PL-151413131', 'Zuzanna', 'Wojcik', '1989-12-02', 'Krakow', 'Female'),
('RU-161514141', 'Anastasia', 'Smirnova', '1992-04-16', 'Kazan', 'Female'),
('UA-171615151', 'Olena', 'Bondarenko', '1987-08-31', 'Lviv', 'Female'),
('RO-181716161', 'Ioana', 'Pop', '1985-11-27', 'Timisoara', 'Female'),
('BG-191817171', 'Elena', 'Ivanova', '1991-02-20', 'Plovdiv', 'Female'),
('GR-201918181', 'Maria', 'Nikolaou', '1988-07-15', 'Heraklion', 'Female'),
('TR-212019191', 'Zeynep', 'Kaya', '1990-05-03', 'Bursa', 'Female'),
('IL-222120202', 'Noa', 'Levy', '1986-09-18', 'Eilat', 'Female'),
('EG-232221212', 'Salma', 'Mahmoud', '1989-01-09', 'Giza', 'Female'),
('ZA-242322222', 'Lerato', 'Mokoena', '1992-03-12', 'Pretoria', 'Female'),
('NG-252423232', 'Ngozi', 'Okeke', '1987-06-25', 'Ibadan', 'Female'),
('KE-262524242', 'Faith', 'Mwangi', '1991-12-30', 'Kisumu', 'Female'),
('IN-272625252', 'Priya', 'Reddy', '1988-05-07', 'Bangalore', 'Female');

INSERT INTO `SecurityLevels`(`ID`)
VALUES 
('Low'),
('Medium'),
('High'),
('Maximum');

INSERT INTO `Sectors`(`ID`, `Name`, `GenderID`, `SecurityLevelID`)
VALUES 
('SCT-08ad4254-4804-462e-b23a-1269cfdb5b5f', 'Common space', NULL, 'Low'),
('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 'Main - Male', 'Male', 'Low'),
('SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 'Main - Female', 'Female', 'Low'),
('SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 'Priority - Male', 'Male', 'Medium'),
('SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 'Priority - Female', 'Female', 'Medium'),
('SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce', 'High risk - Male', 'Male', 'High'),
('SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 'High risk - Female', 'Female', 'High'),
('SCT-1dfb25b9-d643-45b1-b25d-db8a53bef961', 'Isolation - Male', 'Male', 'Maximum'),
('SCT-2b1d0279-02a5-4ffa-a341-ce70af166dcc', 'Isolation - Female', 'Female', 'Maximum');

INSERT INTO `Cells`(`SectorID`, `Number`, `Capacity`)
VALUES 
('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 1, 4),
('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 2, 4),
('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 3, 4),
('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 4, 4),
('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 5, 4),
('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 6, 4),
('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 7, 4),
('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 8, 4),
('SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 1, 4),
('SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 2, 4),
('SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 3, 4),
('SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 4, 4),
('SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 5, 4),
('SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 6, 4),
('SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 7, 4),
('SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 8, 4),
('SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 1, 3),
('SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 2, 3),
('SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 3, 3),
('SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 4, 3),
('SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 5, 3),
('SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 1, 3),
('SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 2, 3),
('SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 3, 3),
('SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 4, 3),
('SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 5, 3),
('SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce', 1, 2),
('SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce', 2, 2),
('SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 1, 2),
('SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 2, 2),
('SCT-1dfb25b9-d643-45b1-b25d-db8a53bef961', 1, 1),
('SCT-2b1d0279-02a5-4ffa-a341-ce70af166dcc', 1, 1);

INSERT INTO `Inmates`(`Number`, `DocumentID`, `IncarcerationDate`, `SentenceDuration`, `CriminalRecord`, `CellSectorID`, `CellNumber`)
VALUES
('72-733-3969', 'IT-ABC12345A', '2020-03-06', 200, 'Forgery', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 1),
('83-628-8300', 'US-987654321', '2000-06-05', 53, 'Manslaughter', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 1),
('78-047-9866', 'BR-345678901', '2014-01-07', 56, 'Espionage', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 2),
('48-431-3619', 'ES-456789012', '2016-10-14', 74, 'Insider trading', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 2),
('30-708-1634', 'IT-GHI34567C', '2000-03-26', 65, 'Fraud', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 3),
('93-272-2218', 'AU-345678912', '2008-03-25', 325, 'Identity theft', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 3),
('82-976-1119', 'IT-JKL90123D', '2015-05-20', 37, 'Homicide', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 3),
('46-680-6938', 'US-234567890', '2005-06-10', 278, 'Insider trading', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 4),
('99-401-1282', 'IN-456789013', '2019-02-21', 285, 'Counterfeiting', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 5),
('56-432-9491', 'CN-567890124', '2004-07-09', 292, 'Harassment', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 5),
('55-277-3626', 'ZA-678901235', '1994-07-22', 15, 'Vandalism', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 6),
('71-174-5574', 'IT-MNO23456E', '2000-06-03', 311, 'Espionage', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 6),
('10-456-4494', 'US-345678902', '2001-04-08', 193, 'Money laundering', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 6),
('52-169-7632', 'DE-456789013', '1994-06-23', 32, 'Assault', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 7),
('56-502-0544', 'JP-789012346', '2018-10-03', 180, 'Counterfeiting', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 7),
('82-885-4760', 'CA-345678902', '1996-12-14', 106, 'Arson', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 1),
('18-957-4095', 'IT-PQR56789F', '2010-08-29', 336, 'Blackmail', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 1),
('95-652-1090', 'GB-678901235', '2014-08-11', 215, 'Perjury', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 2),
('80-823-4362', 'FR-345678902', '1994-12-28', 211, 'Extortion', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 2),
('56-920-5138', 'BR-678901235', '1998-10-22', 57, 'Smuggling', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 2),
('70-236-6212', 'US-567890124', '2021-04-08', 329, 'Manslaughter', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 3),
('94-189-9016', 'AU-567890124', '2024-05-13', 359, 'Drug possession', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce', 1),
('87-519-4678', 'ES-678901235', '2000-04-03', 50, 'Drug possession', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce', 1),
('20-314-6930', 'DE-678901235', '1997-02-02', 195, 'Prostitution', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce', 2),
('67-246-0233', 'BR-789012346', '1995-06-06', 166, 'Drug possession', 'SCT-1dfb25b9-d643-45b1-b25d-db8a53bef961', 1),
('22-112-0638', 'GH-345672109', '2001-12-01', 39, 'Arson', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 1),
('21-927-1468', 'TZ-567894321', '2008-04-27', 325, 'Homicide', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 1),
('12-745-2335', 'ZW-789016543', '2016-09-11', 49, 'Smuggling', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 2),
('95-153-1078', 'FR-123456789', '2021-02-25', 113, 'Burglary', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 2),
('83-459-7312', 'DE-234567890', '1998-11-08', 189, 'Kidnapping', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 3),
('18-777-3641', 'GB-567890123', '2024-02-23', 79, 'Racketeering', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 3),
('32-441-3666', 'JP-678901234', '2008-04-09', 348, 'Manslaughter', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 3),
('89-307-0469', 'IT-DEF67890B', '2000-12-14', 212, 'Perjury', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 4),
('34-945-1865', 'US-123456789', '2011-11-19', 133, 'Prostitution', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 5),
('82-245-7704', 'CA-234567891', '1994-04-07', 250, 'Fraud', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 5),
('99-326-3310', 'RU-345678900', '1990-09-05', 130, 'Assault', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 6),
('65-896-1353', 'EG-789012346', '2022-05-08', 173, 'Extortion', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 6),
('73-326-3348', 'FR-234567891', '1991-05-02', 320, 'Kidnapping', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 6),
('82-267-9978', 'BR-567890124', '2000-07-12', 52, 'Identity theft', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 7),
('24-341-5703', 'AU-456789013', '2016-08-02', 259, 'Carjacking', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 7),
('34-184-6391', 'ES-567890124', '2022-01-05', 136, 'Kidnapping', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 1),
('58-890-7687', 'US-456789013', '2002-06-04', 333, 'Blackmail', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 1),
('93-786-7959', 'DE-567890124', '2003-03-21', 44, 'Manslaughter', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 2),
('48-779-8501', 'JP-890123457', '2010-12-15', 360, 'Cybercrime', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 2),
('16-219-0866', 'IT-STU89012G', '2010-05-04', 85, 'Vandalism', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 2),
('75-971-7566', 'CA-456789013', '1995-11-03', 229, 'Harassment', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 3),
('78-509-3678', 'IT-VWX12345H', '1997-12-01', 318, 'Espionage', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 1),
('64-022-1757', 'FR-456789013', '2024-11-20', 201, 'Stalking', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 1),
('26-621-5306', 'IT-YZA45678I', '2020-11-20', 128, 'Carjacking', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 2),
('22-897-5812', 'US-678901235', '2006-09-14', 246, 'Forgery', 'SCT-2b1d0279-02a5-4ffa-a341-ce70af166dcc', 1);

INSERT INTO `Movements`(`Datetime`, `InmateNumber`, `CellSectorID`, `CellNumber`)
VALUES 
('2020-03-06 12:53:22', '72-733-3969', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 1),
('2000-06-05 17:25:20', '83-628-8300', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 1),
('2014-01-07 20:10:38', '78-047-9866', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 2),
('2016-10-14 10:01:22', '48-431-3619', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 2),
('2000-03-26 17:02:36', '30-708-1634', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 3),
('2008-03-25 8:42:15', '93-272-2218', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 3),
('2015-05-20 11:46:36', '82-976-1119', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 3),
('2005-06-10 17:20:34', '46-680-6938', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 4),
('2019-02-21 18:38:29', '99-401-1282', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 5),
('2004-07-09 15:11:15', '56-432-9491', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 5),
('1994-07-22 19:07:44', '55-277-3626', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 6),
('2000-06-03 8:04:01', '71-174-5574', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 6),
('2001-04-08 6:27:30', '10-456-4494', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 6),
('1994-06-23 14:20:28', '52-169-7632', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 7),
('2018-10-03 16:42:17', '56-502-0544', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 7),
('1996-12-14 10:13:58', '82-885-4760', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 1),
('2010-08-29 5:21:58', '18-957-4095', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 1),
('2014-08-11 15:00:02', '95-652-1090', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 2),
('1994-12-28 9:49:26', '80-823-4362', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 2),
('1998-10-22 14:32:44', '56-920-5138', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 2),
('2021-04-08 14:28:00', '70-236-6212', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 3),
('2024-05-13 18:25:30', '94-189-9016', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce', 1),
('2000-04-03 21:27:16', '87-519-4678', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce', 1),
('1997-02-02 13:50:39', '20-314-6930', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce', 2),
('1995-06-06 10:54:57', '67-246-0233', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 8),
('1996-02-14 7:11:39', '67-246-0233', 'SCT-1dfb25b9-d643-45b1-b25d-db8a53bef961', 1),
('2001-12-01 17:26:11', '22-112-0638', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 1),
('2008-04-27 13:11:02', '21-927-1468', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 1),
('2016-09-11 17:38:19', '12-745-2335', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 2),
('2021-02-25 19:17:17', '95-153-1078', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 2),
('1998-11-08 7:05:49', '83-459-7312', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 3),
('2024-02-23 11:11:23', '18-777-3641', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 3),
('2008-04-09 7:02:57', '32-441-3666', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 3),
('2000-12-14 20:16:42', '89-307-0469', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 4),
('2011-11-19 17:30:01', '34-945-1865', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 5),
('1994-04-07 18:51:32', '82-245-7704', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 5),
('1990-09-05 21:53:47', '99-326-3310', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 6),
('2022-05-08 7:33:21', '65-896-1353', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 6),
('1991-05-02 9:49:05', '73-326-3348', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 6),
('2000-07-12 7:27:58', '82-267-9978', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 7),
('2016-08-02 10:11:18', '24-341-5703', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 7),
('2022-01-05 18:25:18', '34-184-6391', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 1),
('2002-06-04 16:18:41', '58-890-7687', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 1),
('2003-03-21 9:21:55', '93-786-7959', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 2),
('2010-12-15 21:15:37', '48-779-8501', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 2),
('2010-05-04 14:03:56', '16-219-0866', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 2),
('1995-11-03 6:35:53', '75-971-7566', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 3),
('1997-12-01 17:09:43', '78-509-3678', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 1),
('2024-11-20 17:55:19', '64-022-1757', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 1),
('2020-11-20 19:32:53', '26-621-5306', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 2),
('2006-09-14 18:16:21', '22-897-5812', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 8),
('2007-11-09 12:07:30', '22-897-5812', 'SCT-2b1d0279-02a5-4ffa-a341-ce70af166dcc', 1);

INSERT INTO `Guests`(`DocumentID`)
VALUES 
('JP-901234568'),
('CA-567890124'),
('NO-234567890'),
('AU-678901235');

INSERT INTO `Visits`(`InmateNumber`, `Datetime`)
VALUES 
('72-733-3969', '2021-01-15 10:00:00'),
('72-733-3969', '2021-08-10 15:00:00'),
('83-628-8300', '2001-04-10 11:30:00'),
('22-112-0638', '2002-01-10 10:00:00'),
('21-927-1468', '2008-09-15 15:00:00'),
('12-745-2335', '2016-12-01 11:30:00');

INSERT INTO `Visitors`(`VisitInmateNumber`, `VisitDatetime`, `GuestDocumentID`)
VALUES 
('72-733-3969', '2021-01-15 10:00:00', 'JP-901234568'),
('72-733-3969', '2021-01-15 10:00:00', 'CA-567890124'),
('72-733-3969', '2021-08-10 15:00:00', 'CA-567890124'),
('83-628-8300', '2001-04-10 11:30:00', 'NO-234567890'),
('22-112-0638', '2002-01-10 10:00:00', 'AU-678901235'),
('21-927-1468', '2008-09-15 15:00:00', 'AU-678901235'),
('21-927-1468', '2008-09-15 15:00:00', 'NO-234567890'),
('21-927-1468', '2008-09-15 15:00:00', 'JP-901234568'),
('12-745-2335', '2016-12-01 11:30:00', 'NO-234567890');

INSERT INTO `PersonnelTypes`(`ID`)
VALUES 
('Director'),
('Guard'),
('Technician'),
('Janitor'),
('Librarian');

INSERT INTO `Personnel`(`ID`, `DocumentID`, `PersonnelTypeID`, `SectorID`)
VALUES 
('PER-ecee39cb-5c88-4e17-aea8-3d04eab1a411', 'ES-789012346', 'Director', NULL),
('PER-0be1d506-df53-4348-82fb-ea9a3bcfd3aa', 'IT-BCD23456J', 'Librarian', NULL),
('PER-52682313-7d4c-4842-9975-c69b90bc6df0', 'SE-123456789', 'Librarian', NULL),
('PER-f788b6b2-fd80-437c-a9c2-7d0b3b1cb273', 'FI-345678901', 'Janitor', NULL),
('PER-44244ae0-596c-4adc-a5d0-79a5565659a1', 'PL-567890123', 'Janitor', NULL),
('PER-71a7707a-dd14-4399-9d2c-6a0e67dc262d', 'PT-789012345', 'Janitor', NULL),
('PER-9a5cee1a-1b66-4ba5-86b4-44b6139f8e84', 'CH-901234567', 'Janitor', NULL),
('PER-744649c9-73cf-4e1d-b7bb-f0e7a9258327', 'BE-123450987', 'Technician', NULL),
('PER-700af87f-ded6-4e23-8a51-d5d9b553445d', 'HU-345672109', 'Technician', NULL),
('PER-8c26e10c-e8bb-400f-adc7-2478edec4b85', 'SK-567894321', 'Technician', NULL),
('PER-b13327fc-9bf5-4b94-98db-57389a795034', 'BG-789016543', 'Guard', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-3e2a9969-c7a8-4668-b080-818118411238', 'RS-901238765', 'Guard', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-9f92c9ff-593e-420f-b793-3477d98ad154', 'TR-123450987', 'Guard', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-8cfd0e9d-8aa0-4b97-a225-a1a54b92c176', 'SA-345672109', 'Guard', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-48d684f2-53ab-4165-adcd-366990a039a3', 'KR-567894321', 'Guard', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-c0b86991-5e98-4d39-9f54-3f5f15edef81', 'TH-789016543', 'Guard', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-6384e8ba-5971-475b-9e7f-f01533c6b4c7', 'ID-901238765', 'Guard', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-b8da78c0-bcf9-4f7a-bfeb-e5e9f5043050', 'VN-123450987', 'Guard', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-db378a3e-ca5d-4ff7-873e-7799c1257c68', 'MX-345672109', 'Guard', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-87348924-6243-48d2-a8b4-a458a79bfef1', 'CL-567894321', 'Guard', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-fc547153-1aef-4e27-bd80-3c3d0211b889', 'US-111223333', 'Guard', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-6e05e71f-554b-4ab2-9e1c-b2342cff18e5', 'CA-222334444', 'Guard', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-d8f7b4f9-8420-4e9c-9fa6-a1161f1974ee', 'GB-333445555', 'Guard', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-aca95c76-dc6d-4f95-8d02-efe249e0293b', 'DE-444556666', 'Guard', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-dbce1e62-3a81-4710-a316-93ac570b64e9', 'FR-555667777', 'Guard', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-c7379407-73fc-4ef2-9fe5-e6ac446a182c', 'IT-666778888', 'Guard', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
('PER-275eff7d-b535-4819-a882-82ff91a114e2', 'ES-777889999', 'Guard', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
('PER-66533c16-b0f9-4ecf-9a0d-5884a01b9882', 'PT-888990000', 'Guard', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
('PER-15bf7fb5-2e85-4441-bc6e-fcd986823cc7', 'NL-999001111', 'Guard', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
('PER-9cc75548-2d73-43e0-b564-75c3d5a7d6dd', 'BE-101112131', 'Guard', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
('PER-2c5f21bd-2aa8-474c-a2a8-b46fd51486f1', 'SE-121314151', 'Guard', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
('PER-e8fffe44-aa7c-462d-a40d-2f86d9ae5830', 'FI-131415161', 'Guard', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
('PER-d430fa7a-8649-4a01-b01d-4a5fb708669f', 'PL-141516171', 'Guard', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
('PER-93ab0d5f-cbfe-44f1-ac86-518863386ce7', 'RU-151617181', 'Guard', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
('PER-3dc83a9c-f7cc-4ee8-9d07-3b1aa9befb8e', 'UA-161718191', 'Guard', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
('PER-40da2cb4-1e76-4d58-be13-59c351537cff', 'RO-171819202', 'Guard', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce'),
('PER-5975d813-3071-43e8-afa8-d21a44387a44', 'BG-181920212', 'Guard', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce'),
('PER-445c30ac-720d-46ca-a208-f915ffd5b617', 'GR-192021222', 'Guard', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce'),
('PER-9012cab3-e393-44c7-8587-1e8bae279f01', 'TR-202122232', 'Guard', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce'),
('PER-041a4e06-8a86-48b2-959d-a04ef3bb5aa4', 'IL-212223242', 'Guard', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce'),
('PER-39898012-0cfd-4e02-8cc8-b61f14c2dd97', 'EG-222324252', 'Guard', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce'),
('PER-202638f2-f83f-4651-9bf3-b2b61fcac33e', 'ZA-232425262', 'Guard', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce'),
('PER-e97880cd-4b61-4121-9e99-04e033fea9a6', 'NG-242526272', 'Guard', 'SCT-1dfb25b9-d643-45b1-b25d-db8a53bef961'),
('PER-34c36928-cd93-4043-8739-5d5873640f5d', 'KE-252627282', 'Guard', 'SCT-1dfb25b9-d643-45b1-b25d-db8a53bef961'),
('PER-39213d23-e3e0-414f-80dc-8e27824a4edc', 'IN-262728293', 'Guard', 'SCT-1dfb25b9-d643-45b1-b25d-db8a53bef961'),
('PER-caafd732-cf23-4f3b-82ab-58e9194c90ea', 'DK-456789012', 'Technician', NULL),
('PER-207cc7f3-cdd3-493e-b842-60c9b564ae03', 'GR-678901234', 'Librarian', NULL),
('PER-e7dde97f-8a8f-4e3b-9f9c-a9ddf279c1b8', 'IE-890123456', 'Librarian', NULL),
('PER-b8f6286e-7f47-47cd-82db-5ba452efa6f9', 'AT-012345678', 'Janitor', NULL),
('PER-7a8399b0-6318-4dee-9c2b-6a7965d2592e', 'NL-234561098', 'Janitor', NULL),
('PER-23d99887-4db8-445f-928b-a31c4cb8822f', 'CZ-456783210', 'Janitor', NULL),
('PER-9a0af957-0bbb-4b97-8f6d-2d561732ebfb', 'RO-678905432', 'Janitor', NULL),
('PER-d4fb89ac-249c-4710-be3c-bb8e2b4ab3e9', 'HR-890127654', 'Technician', NULL),
('PER-4e31f4d8-a46f-4dec-a482-a8d8697ab55c', 'UA-012349876', 'Technician', NULL),
('PER-79981ac5-b3fb-4ba6-b7b3-ff0b7d9e4fe5', 'IL-234561098', 'Technician', NULL),
('PER-27d00923-b17a-43fa-a544-73c0d3f5d358', 'AE-456783210', 'Guard', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-8ca3485f-1960-4fb9-9789-92db0f605824', 'SG-678905432', 'Guard', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-4778712f-8113-4630-a67b-59b130afa7a0', 'MY-890127654', 'Guard', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-5c222ce0-4f29-4ad8-b298-a7c334cd089c', 'PH-012349876', 'Guard', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-98389d59-49b6-494b-9d3e-921c750974ff', 'NZ-234561098', 'Guard', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-6d74dc6a-f442-4483-9127-17a4b86f5266', 'AR-456783210', 'Guard', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-346a05a9-337b-455e-9a65-313c0d3278c0', 'CO-678905432', 'Guard', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-3a4cf916-8a6b-4a6e-a553-c618ae6b7f4f', 'VE-890127654', 'Guard', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-4e70c73d-0eee-4fee-8558-b609c005f4d7', 'MA-012349876', 'Guard', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-f0e89b06-42a8-4bea-ba82-5d555921cac7', 'KE-234561098', 'Guard', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-56efae6f-77b6-4768-beeb-ca8333aeeb74', 'US-333221111', 'Guard', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-5aa0ba84-0806-43c3-81db-f8cadb896ceb', 'CA-444332222', 'Guard', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-a514b1e0-0c57-4e27-af06-e2ac107838b4', 'GB-555443333', 'Guard', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-77b4131b-a288-4410-b287-e62cbf3f475b', 'DE-666554444', 'Guard', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-2d913059-dde9-43d5-935c-a66486adb095', 'FR-777665555', 'Guard', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-cc349993-ec92-47dd-8d6b-a7069446b196', 'IT-888776666', 'Guard', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df'),
('PER-f3aa690e-bd63-4d1f-9426-917a0782670f', 'ES-999887777', 'Guard', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df'),
('PER-5fcbde84-a7c8-47f4-9eb0-3caa9f612ed0', 'PT-000998888', 'Guard', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df'),
('PER-cdd4e570-3a6a-49c8-910a-c0b4512358fa', 'NL-111009999', 'Guard', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df'),
('PER-28513974-a738-4a3d-aebb-c1172c7d7232', 'BE-121110101', 'Guard', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df'),
('PER-ae4ec946-4836-45d0-b6ce-4c1daa035de3', 'SE-131211111', 'Guard', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df'),
('PER-c272adf9-d6b9-4c05-94c6-1824fe5d13eb', 'FI-141312121', 'Guard', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df'),
('PER-b43687b0-ef09-4313-a1de-a81afdf06707', 'PL-151413131', 'Guard', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df'),
('PER-8626b673-52c6-420f-9322-14ad9066d9e0', 'RU-161514141', 'Guard', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df'),
('PER-b672c335-d20f-49ed-882c-c50ef255f162', 'UA-171615151', 'Guard', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df'),
('PER-80cc4a41-2ada-4a3c-902c-024a76c5446e', 'RO-181716161', 'Guard', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7'),
('PER-73348923-2122-4866-a826-1f3565b3f71f', 'BG-191817171', 'Guard', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7'),
('PER-d5666643-2d9c-44ca-87fc-a83784f7d9b0', 'GR-201918181', 'Guard', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7'),
('PER-e0b4be2e-390f-448f-b359-8c209db2fc18', 'TR-212019191', 'Guard', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7'),
('PER-9db6b91e-4737-4a5c-8886-43a340ad641d', 'IL-222120202', 'Guard', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7'),
('PER-dd93ad6e-421a-4701-a754-5eaa463059c4', 'EG-232221212', 'Guard', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7'),
('PER-cd84e85b-527e-4426-aa25-b0ec8baff40b', 'ZA-242322222', 'Guard', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7'),
('PER-15731d01-32ed-42f7-a50e-f518dd7deb23', 'NG-252423232', 'Guard', 'SCT-2b1d0279-02a5-4ffa-a341-ce70af166dcc'),
('PER-628fc228-6d43-4fa3-ac88-ba1ae61d394c', 'KE-262524242', 'Guard', 'SCT-2b1d0279-02a5-4ffa-a341-ce70af166dcc'),
('PER-4a5d087d-7a99-4c5e-b19a-09403c488ba6', 'IN-272625252', 'Guard', 'SCT-2b1d0279-02a5-4ffa-a341-ce70af166dcc');

INSERT INTO `DeviceTypes`(`ID`)
VALUES 
('Camera'),
('Alarm'),
('Lock'),
('Computer'),
('Metal detector');

INSERT INTO `Devices`(`Serial`, `SectorID`, `Number`, `DeviceTypeID`)
VALUES 
('1164422448', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 1, 'Camera'),
('9112003239', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 2, 'Camera'),
('2385928094', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 3, 'Camera'),
('2440430420', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 4, 'Camera'),
('0879924209', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 5, 'Camera'),
('5745415045', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 6, 'Camera'),
('6800458031', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 7, 'Camera'),
('0747089078', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 8, 'Camera'),
('6361168492', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 9, 'Alarm'),
('5932547154', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 10, 'Alarm'),
('8388215248', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 11, 'Alarm'),
('3215784726', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 12, 'Alarm'),
('3905159538', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 13, 'Lock'),
('3208707053', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 14, 'Lock'),
('3485807095', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 15, 'Lock'),
('4158000874', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 16, 'Lock'),
('6708576198', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 17, 'Lock'),
('5286125816', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 18, 'Lock'),
('1097388794', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 19, 'Lock'),
('5809646050', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 20, 'Lock'),
('2777950997', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 21, 'Computer'),
('2124067656', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 22, 'Computer'),
('9861544275', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 23, 'Computer'),
('9186054023', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 24, 'Computer'),
('1724472194', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 25, 'Metal detector'),
('6441598809', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 26, 'Metal detector'),
('3136183576', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 27, 'Metal detector'),
('2725542170', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 28, 'Metal detector'),
('6416424142', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 1, 'Camera'),
('2957575655', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 2, 'Camera'),
('3349992064', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 3, 'Camera'),
('4493069244', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 4, 'Camera'),
('9057610035', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 5, 'Camera'),
('3089579731', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 6, 'Camera'),
('1103876244', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 7, 'Camera'),
('3557820602', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 8, 'Camera'),
('0549395520', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 9, 'Alarm'),
('2061807216', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 10, 'Alarm'),
('8002219392', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 11, 'Alarm'),
('4050794977', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 12, 'Alarm'),
('0670542997', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 13, 'Lock'),
('8724384402', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 14, 'Lock'),
('0861600762', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 15, 'Lock'),
('2204250007', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 16, 'Lock'),
('4193076636', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 17, 'Lock'),
('3946090265', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 18, 'Lock'),
('5204329587', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 19, 'Lock'),
('4040691326', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 20, 'Lock'),
('0768094402', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 21, 'Computer'),
('8967982321', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 22, 'Computer'),
('9187423553', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 23, 'Computer'),
('9731503692', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 24, 'Computer'),
('9337789051', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 25, 'Metal detector'),
('3276416476', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 26, 'Metal detector'),
('1772233153', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 27, 'Metal detector'),
('6542295968', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 28, 'Metal detector'),
('8924457535', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 1, 'Camera'),
('7114122624', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 2, 'Camera'),
('4476113850', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 3, 'Camera'),
('8993633932', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 4, 'Camera'),
('4096063231', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 5, 'Camera'),
('8850939396', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 6, 'Camera'),
('9235704863', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 7, 'Alarm'),
('4498811143', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 8, 'Alarm'),
('4536249192', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 9, 'Alarm'),
('1411509382', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 10, 'Lock'),
('9755875816', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 11, 'Lock'),
('7019841597', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 12, 'Lock'),
('6097890907', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 13, 'Lock'),
('4586562900', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 14, 'Lock'),
('9947110869', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 15, 'Computer'),
('0674824881', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 16, 'Computer'),
('7193783246', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 17, 'Computer'),
('2326652843', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 18, 'Metal detector'),
('6628133672', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 19, 'Metal detector'),
('9849082798', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 20, 'Metal detector'),
('5209914763', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 1, 'Camera'),
('2188353617', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 2, 'Camera'),
('5005001530', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 3, 'Camera'),
('7558054621', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 4, 'Camera'),
('5960448025', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 5, 'Camera'),
('1862439788', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 6, 'Camera'),
('5680072289', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 7, 'Alarm'),
('0493387269', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 8, 'Alarm'),
('9910122782', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 9, 'Alarm'),
('9822896166', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 10, 'Lock'),
('9113133446', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 11, 'Lock'),
('1905727380', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 12, 'Lock'),
('9371710721', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 13, 'Lock'),
('3055574893', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 14, 'Lock'),
('8426238750', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 15, 'Computer'),
('0868523895', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 16, 'Computer'),
('1795127171', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 17, 'Computer'),
('5887306114', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 18, 'Metal detector'),
('2487315423', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 19, 'Metal detector'),
('1333142633', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 20, 'Metal detector'),
('1704410940', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce', 1, 'Camera'),
('0556800613', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce', 2, 'Camera'),
('9949636884', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce', 3, 'Camera'),
('7869853682', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce', 4, 'Camera'),
('7797678847', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce', 5, 'Alarm'),
('1893967417', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce', 6, 'Alarm'),
('8200463680', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce', 7, 'Lock'),
('3791126237', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce', 8, 'Lock'),
('6933516628', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce', 9, 'Computer'),
('5756108750', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce', 10, 'Computer'),
('8807236826', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce', 11, 'Metal detector'),
('3048969403', 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce', 12, 'Metal detector'),
('5928525826', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 1, 'Camera'),
('5940788777', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 2, 'Camera'),
('3809398284', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 3, 'Camera'),
('6915361642', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 4, 'Camera'),
('8149973842', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 5, 'Alarm'),
('8059448862', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 6, 'Alarm'),
('7127889260', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 7, 'Lock'),
('2453944738', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 8, 'Lock'),
('1588162648', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 9, 'Computer'),
('1786335913', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 10, 'Computer'),
('8183287174', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 11, 'Metal detector'),
('5200117119', 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 12, 'Metal detector'),
('0334141443', 'SCT-1dfb25b9-d643-45b1-b25d-db8a53bef961', 1, 'Camera'),
('2776023782', 'SCT-1dfb25b9-d643-45b1-b25d-db8a53bef961', 2, 'Camera'),
('8609186784', 'SCT-1dfb25b9-d643-45b1-b25d-db8a53bef961', 3, 'Alarm'),
('5415383301', 'SCT-1dfb25b9-d643-45b1-b25d-db8a53bef961', 4, 'Lock'),
('6428945770', 'SCT-1dfb25b9-d643-45b1-b25d-db8a53bef961', 5, 'Computer'),
('9564806119', 'SCT-1dfb25b9-d643-45b1-b25d-db8a53bef961', 6, 'Metal detector'),
('1636200591', 'SCT-2b1d0279-02a5-4ffa-a341-ce70af166dcc', 1, 'Camera'),
('9323671983', 'SCT-2b1d0279-02a5-4ffa-a341-ce70af166dcc', 2, 'Camera'),
('7064320517', 'SCT-2b1d0279-02a5-4ffa-a341-ce70af166dcc', 3, 'Alarm'),
('2889743527', 'SCT-2b1d0279-02a5-4ffa-a341-ce70af166dcc', 4, 'Lock'),
('0980789648', 'SCT-2b1d0279-02a5-4ffa-a341-ce70af166dcc', 5, 'Computer'),
('7080176093', 'SCT-2b1d0279-02a5-4ffa-a341-ce70af166dcc', 6, 'Metal detector');

INSERT INTO `Reports`(`Datetime`, `Description`, `ResponsiblePersonnelID`)
VALUES 
('2019-07-11 08:50:55', 'Inmates escape attempt trough multiple sectors busted', 'PER-b13327fc-9bf5-4b94-98db-57389a795034'),
('2008-01-28 12:41:14', 'Computers upgrade', 'PER-caafd732-cf23-4f3b-82ab-58e9194c90ea'),
('2018-11-21 09:01:54', 'Library inventory check', 'PER-207cc7f3-cdd3-493e-b842-60c9b564ae03'),
('2020-03-14 10:26:10', 'Director summary of the week', 'PER-ecee39cb-5c88-4e17-aea8-3d04eab1a411');

INSERT INTO `EngagedInmates`(`ReportID`, `InmateNumber`)
VALUES 
(1, '72-733-3969'),
(1, '83-628-8300');

INSERT INTO `EngagedPersonnel`(`ReportID`, `PersonnelID`)
VALUES 
(1, 'PER-3e2a9969-c7a8-4668-b080-818118411238'),
(1, 'PER-c7379407-73fc-4ef2-9fe5-e6ac446a182c');

INSERT INTO `EngagedSectors`(`ReportID`, `SectorID`)
VALUES 
(1, 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
(1, 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
(2, 'SCT-1dfb25b9-d643-45b1-b25d-db8a53bef961'),
(2, 'SCT-2b1d0279-02a5-4ffa-a341-ce70af166dcc'),
(3, 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343');

INSERT INTO `EngagedDevices`(`ReportID`, `DeviceSerial`)
VALUES 
(1, '1164422448'),
(1, '9112003239'),
(1, '9235704863'),
(2, '8609186784'),
(2, '7064320517');

INSERT INTO `Couriers`(`DocumentID`)
VALUES 
('PE-789016543'),
('DZ-901238765'),
('NG-123450987'),
('ET-456783210'),
('UG-678905432'),
('CM-890127654');

INSERT INTO `Vehicles`(`PlateNumber`, `CourierDocumentID`)
VALUES 
('PLT9X7K2MJ', 'PE-789016543'),
('RX3T8V1NQL', 'PE-789016543'),
('BZ7W4K9PXM', 'DZ-901238765'),
('QK2J6N8TLR', 'NG-123450987'),
('MN5L3V7XQY', 'NG-123450987'),
('XE8P1R6TWK', 'NG-123450987'),
('CW9T2M5LQJ', 'ET-456783210'),
('LK4X7B8PRN', 'UG-678905432'),
('VJ1N9Q6WTE', 'CM-890127654');

INSERT INTO `GoodsTypes`(`ID`)
VALUES 
('Food'),
('Weapons'),
('Medical supplies'),
('Utensils');

INSERT INTO `Deliveries`(`Datetime`, `GoodsTypeID`, `Quantity`, `VehiclePlateNumber`)
VALUES 
('2006-12-02 20:56:40', 'Food', 113, 'PLT9X7K2MJ'),
('2019-11-03 18:55:24', 'Weapons', 143, 'RX3T8V1NQL'),
('2008-09-04 06:45:26', 'Food', 135, 'BZ7W4K9PXM'),
('2020-03-28 05:38:25', 'Medical supplies', 71, 'PLT9X7K2MJ'),
('2009-08-02 13:15:45', 'Utensils', 64, 'QK2J6N8TLR'),
('2008-06-19 13:33:26', 'Medical supplies', 79, 'MN5L3V7XQY'),
('2018-02-15 10:23:07', 'Utensils', 115, 'XE8P1R6TWK'),
('2020-06-26 06:22:48', 'Weapons', 104, 'XE8P1R6TWK'),
('2021-10-15 02:05:27', 'Food', 148, 'CW9T2M5LQJ'),
('2010-03-31 08:05:56', 'Medical supplies', 100, 'LK4X7B8PRN'),
('2024-12-29 16:06:04', 'Utensils', 65, 'VJ1N9Q6WTE'),
('2009-07-09 21:16:19', 'Medical supplies', 143, 'CW9T2M5LQJ');

INSERT INTO `Activities`(`ID`, `Description`, `Duration`)
VALUES 
('ACT-2220d028-ca56-473e-94c6-cd4788ce1185', 'Reading', 120),
('ACT-2e709f52-5529-4036-8bb9-df33d2176f17', 'Outside free time', 90),
('ACT-1f077c5c-e4bf-4131-9de1-4ec47715cfb5', 'Exercise', 120),
('ACT-c1471994-7ba9-4ce2-a28c-a4811ba54fd1', 'Meal time', 90);

INSERT INTO `Availabilities`(`SecurityLevelID`, `ActivityID`)
VALUES 
('Low', 'ACT-2220d028-ca56-473e-94c6-cd4788ce1185'),
('Low', 'ACT-2e709f52-5529-4036-8bb9-df33d2176f17'),
('Low', 'ACT-1f077c5c-e4bf-4131-9de1-4ec47715cfb5'),
('Low', 'ACT-c1471994-7ba9-4ce2-a28c-a4811ba54fd1'),
('Medium', 'ACT-2220d028-ca56-473e-94c6-cd4788ce1185'),
('Medium', 'ACT-1f077c5c-e4bf-4131-9de1-4ec47715cfb5'),
('Medium', 'ACT-c1471994-7ba9-4ce2-a28c-a4811ba54fd1'),
('High', 'ACT-c1471994-7ba9-4ce2-a28c-a4811ba54fd1');

INSERT INTO `Zones`(`SectorID`, `Number`, `Name`, `Capacity`)
VALUES
('SCT-08ad4254-4804-462e-b23a-1269cfdb5b5f', 1, 'Canteen', 200),
('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 1, 'Library', 50),
('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 2, 'Court', 80),
('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 3, 'Canteen', 100),
('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 4, 'Gym', 50),
('SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 1, 'Library', 50),
('SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 2, 'Court', 80),
('SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 3, 'Canteen', 100),
('SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 4, 'Gym', 50),
('SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 1, 'Library', 30),
('SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 3, 'Gym', 30),
('SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 1, 'Library', 30),
('SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 3, 'Gym', 30),
('SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 1, 'Canteen', 20),
('SCT-1dfb25b9-d643-45b1-b25d-db8a53bef961', 1, 'Canteen', 20);

INSERT INTO `Routines`(`ZoneSectorID`, `ZoneNumber`, `Datetime`, `ActivityID`)
VALUES 
('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 1, '2015-12-05 10:00:00', 'ACT-c1471994-7ba9-4ce2-a28c-a4811ba54fd1'),
('SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 1, '2020-03-20 15:30:00', 'ACT-2220d028-ca56-473e-94c6-cd4788ce1185'),
('SCT-08ad4254-4804-462e-b23a-1269cfdb5b5f', 1, '2019-02-10 10:30:00', 'ACT-c1471994-7ba9-4ce2-a28c-a4811ba54fd1');

INSERT INTO `Partecipations`(`RoutineZoneSectorID`, `RoutineZoneNumber`, `RoutineDatetime`, `SectorID`)
VALUES
('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 1, '2015-12-05 10:00:00', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 1, '2015-12-05 10:00:00', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
('SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 1, '2020-03-20 15:30:00', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df'),
('SCT-08ad4254-4804-462e-b23a-1269cfdb5b5f', 1, '2019-02-10 10:30:00', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('SCT-08ad4254-4804-462e-b23a-1269cfdb5b5f', 1, '2019-02-10 10:30:00', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('SCT-08ad4254-4804-462e-b23a-1269cfdb5b5f', 1, '2019-02-10 10:30:00', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
('SCT-08ad4254-4804-462e-b23a-1269cfdb5b5f', 1, '2019-02-10 10:30:00', 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df');

INSERT INTO `Surveillances`(`RoutineZoneSectorID`, `RoutineZoneNumber`, `RoutineDatetime`, `PersonnelID`)
VALUES 
('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 1, '2015-12-05 10:00:00', 'PER-b8da78c0-bcf9-4f7a-bfeb-e5e9f5043050'),
('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 1, '2015-12-05 10:00:00', 'PER-db378a3e-ca5d-4ff7-873e-7799c1257c68'),
('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 1, '2015-12-05 10:00:00', 'PER-c7379407-73fc-4ef2-9fe5-e6ac446a182c'),
('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 1, '2015-12-05 10:00:00', 'PER-275eff7d-b535-4819-a882-82ff91a114e2'),
('SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 1, '2020-03-20 15:30:00', 'PER-f3aa690e-bd63-4d1f-9426-917a0782670f'),
('SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 1, '2020-03-20 15:30:00', 'PER-5fcbde84-a7c8-47f4-9eb0-3caa9f612ed0'),
('SCT-08ad4254-4804-462e-b23a-1269cfdb5b5f', 1, '2019-02-10 10:30:00', 'PER-6384e8ba-5971-475b-9e7f-f01533c6b4c7'),
('SCT-08ad4254-4804-462e-b23a-1269cfdb5b5f', 1, '2019-02-10 10:30:00', 'PER-b8da78c0-bcf9-4f7a-bfeb-e5e9f5043050'),
('SCT-08ad4254-4804-462e-b23a-1269cfdb5b5f', 1, '2019-02-10 10:30:00', 'PER-d430fa7a-8649-4a01-b01d-4a5fb708669f'),
('SCT-08ad4254-4804-462e-b23a-1269cfdb5b5f', 1, '2019-02-10 10:30:00', 'PER-93ab0d5f-cbfe-44f1-ac86-518863386ce7'),
('SCT-08ad4254-4804-462e-b23a-1269cfdb5b5f', 1, '2019-02-10 10:30:00', 'PER-346a05a9-337b-455e-9a65-313c0d3278c0'),
('SCT-08ad4254-4804-462e-b23a-1269cfdb5b5f', 1, '2019-02-10 10:30:00', 'PER-3a4cf916-8a6b-4a6e-a553-c618ae6b7f4f'),
('SCT-08ad4254-4804-462e-b23a-1269cfdb5b5f', 1, '2019-02-10 10:30:00', 'PER-ae4ec946-4836-45d0-b6ce-4c1daa035de3'),
('SCT-08ad4254-4804-462e-b23a-1269cfdb5b5f', 1, '2019-02-10 10:30:00', 'PER-c272adf9-d6b9-4c05-94c6-1824fe5d13eb');
