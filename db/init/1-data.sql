-- this file inserts dummy data in the database
USE `IronGate`;

INSERT INTO `Genders`(
    `ID`, 
    `Name`
) VALUES
(0, 'Male'),
(1, 'Female');

INSERT INTO `Persons`(
    `DocumentID`,
    `Name`,
    `Surname`,
    `Birthday`,
    `BirthPlace`,
    `GenderID`
) VALUES
-- male b1
('IT-ABC12345A', 'Luca', 'Bianchi', '1980-05-12', 'Rome', 0),
('US-987654321', 'John', 'Smith', '1975-11-23', 'New York', 0),
('BR-345678901', 'Carlos', 'Silva', '1982-01-10', 'Sao Paulo', 0),
('ES-456789012', 'Miguel', 'Garcia', '1979-09-05', 'Madrid', 0),
('IT-GHI34567C', 'Marco', 'Verdi', '1978-06-09', 'Naples', 0),
('AU-345678912', 'Jack', 'Brown', '1984-03-27', 'Sydney', 0),
('IT-JKL90123D', 'Paolo', 'Neri', '1986-11-19', 'Turin', 0),
('US-234567890', 'Robert', 'Williams', '1977-05-25', 'Los Angeles', 0),
('IN-456789013', 'Raj', 'Patel', '1981-12-05', 'Mumbai', 0),
('CN-567890124', 'Li', 'Wei', '1993-02-21', 'Beijing', 0),
('ZA-678901235', 'Thabo', 'Nkosi', '1986-07-14', 'Johannesburg', 0),
('IT-MNO23456E', 'Simone', 'Conti', '1985-03-12', 'Florence', 0),
('US-345678902', 'Michael', 'Brown', '1983-01-19', 'Boston', 0),
('DE-456789013', 'Stefan', 'Müller', '1979-04-25', 'Hamburg', 0),
('JP-789012346', 'Haruto', 'Sato', '1991-11-03', 'Osaka', 0),
('CA-345678902', 'Noah', 'Wilson', '1984-05-27', 'Toronto', 0),
('IT-PQR56789F', 'Davide', 'Ricci', '1982-02-11', 'Venice', 0),
('GB-678901235', 'George', 'Evans', '1978-10-05', 'Manchester', 0),
('FR-345678902', 'Julien', 'Moreau', '1985-03-18', 'Marseille', 0),
('BR-678901235', 'Pedro', 'Alves', '1981-09-23', 'Brasilia', 0),
('US-567890124', 'William', 'Moore', '1980-08-20', 'Houston', 0),
('AU-567890124', 'Liam', 'Harris', '1982-03-09', 'Perth', 0),
('ES-678901235', 'Javier', 'Lopez', '1985-12-28', 'Seville', 0),
('DE-678901235', 'Jonas', 'Becker', '1988-09-02', 'Stuttgart', 0),
('BR-789012346', 'Gabriel', 'Costa', '1990-10-17', 'Salvador', 0),
('JP-901234568', 'Ren', 'Kobayashi', '1986-02-24', 'Nagoya', 0),
('CA-567890124', 'Benjamin', 'Dubois', '1989-12-03', 'Ottawa', 0),
('ES-789012346', 'Diego', 'Ruiz', '1987-04-27', 'Valencia', 0),
('IT-BCD23456J', 'Federico', 'Lombardi', '1983-08-19', 'Pisa', 0),
('SE-123456789', 'Erik', 'Johansson', '1985-01-15', 'Stockholm', 0),
('FI-345678901', 'Mikko', 'Virtanen', '1982-07-09', 'Helsinki', 0),
('PL-567890123', 'Jan', 'Kowalski', '1987-05-18', 'Warsaw', 0),
('PT-789012345', 'João', 'Silva', '1984-12-12', 'Lisbon', 0),
('CH-901234567', 'Luca', 'Müller', '1986-08-27', 'Zurich', 0),
('BE-123450987', 'Lucas', 'Dupont', '1983-06-19', 'Brussels', 0),
('HU-345672109', 'Gabor', 'Nagy', '1980-09-07', 'Budapest', 0),
('SK-567894321', 'Peter', 'Horvath', '1985-05-11', 'Bratislava', 0),
('BG-789016543', 'Georgi', 'Ivanov', '1982-03-29', 'Sofia', 0),
('RS-901238765', 'Marko', 'Jovanovic', '1989-11-05', 'Belgrade', 0),
('TR-123450987', 'Ahmet', 'Yilmaz', '1983-04-17', 'Istanbul', 0),
('SA-345672109', 'Fahad', 'Al Saud', '1986-10-02', 'Riyadh', 0),
('KR-567894321', 'Min-jun', 'Kim', '1984-02-08', 'Seoul', 0),
('TH-789016543', 'Nattapong', 'Sukhum', '1981-05-15', 'Bangkok', 0),
('ID-901238765', 'Budi', 'Santoso', '1985-03-03', 'Jakarta', 0),
('VN-123450987', 'Quang', 'Nguyen', '1982-12-29', 'Hanoi', 0),
('MX-345672109', 'Carlos', 'Hernandez', '1983-01-25', 'Mexico City', 0),
('CL-567894321', 'Diego', 'Torres', '1986-04-20', 'Santiago', 0),
('PE-789016543', 'Jose', 'Perez', '1984-10-07', 'Lima', 0),
('DZ-901238765', 'Youssef', 'Benkirane', '1987-05-23', 'Algiers', 0),
('NG-123450987', 'Chinedu', 'Okafor', '1981-12-04', 'Lagos', 0),
-- female b1
('GH-345672109', 'Kwame', 'Mensah', '1985-06-02', 'Accra', 1),
('TZ-567894321', 'Juma', 'Musa', '1983-09-15', 'Dar es Salaam', 1),
('ZW-789016543', 'Tendai', 'Chirwa', '1982-05-19', 'Harare', 1),
('FR-123456789', 'Marie', 'Dubois', '1988-03-15', 'Paris', 1),
('DE-234567890', 'Anna', 'Schmidt', '1990-07-30', 'Berlin', 1),
('GB-567890123', 'Emily', 'Clark', '1992-12-01', 'London', 1),
('JP-678901234', 'Yuki', 'Tanaka', '1985-04-18', 'Tokyo', 1),
('IT-DEF67890B', 'Giulia', 'Rossi', '1983-08-22', 'Milan', 1),
('US-123456789', 'Alice', 'Johnson', '1987-02-14', 'Chicago', 1),
('CA-234567891', 'Sophie', 'Martin', '1991-10-11', 'Montreal', 1),
('RU-345678900', 'Olga', 'Ivanova', '1989-09-17', 'Moscow', 1),
('EG-789012346', 'Fatima', 'Hassan', '1990-10-30', 'Cairo', 1),
('FR-234567891', 'Claire', 'Leroy', '1992-06-08', 'Lyon', 1),
('BR-567890124', 'Fernanda', 'Oliveira', '1987-08-16', 'Rio de Janeiro', 1),
('AU-456789013', 'Olivia', 'Taylor', '1988-09-14', 'Melbourne', 1),
('ES-567890124', 'Lucia', 'Martinez', '1990-12-22', 'Barcelona', 1),
('US-456789013', 'Jessica', 'Davis', '1986-07-29', 'San Francisco', 1),
('DE-567890124', 'Laura', 'Fischer', '1993-06-12', 'Frankfurt', 1),
('JP-890123457', 'Sakura', 'Yamamoto', '1989-01-07', 'Kyoto', 1),
('IT-STU89012G', 'Alessia', 'Greco', '1994-04-15', 'Genoa', 1),
('CA-456789013', 'Emma', 'Lefevre', '1987-11-30', 'Vancouver', 1),
('IT-VWX12345H', 'Chiara', 'Romano', '1991-05-06', 'Bologna', 1),
('FR-456789013', 'Manon', 'Simon', '1983-07-13', 'Nice', 1),
('IT-YZA45678I', 'Martina', 'Barbieri', '1984-06-21', 'Palermo', 1),
('US-678901235', 'Sophia', 'Martinez', '1992-09-11', 'Miami', 1),
('AU-678901235', 'Charlotte', 'Walker', '1981-01-16', 'Brisbane', 1),
('NO-234567890', 'Ingrid', 'Larsen', '1990-03-22', 'Oslo', 1),
('DK-456789012', 'Freja', 'Nielsen', '1993-11-30', 'Copenhagen', 1),
('GR-678901234', 'Eleni', 'Papadopoulos', '1989-09-25', 'Athens', 1),
('IE-890123456', 'Aoife', 'Murphy', '1991-04-03', 'Dublin', 1),
('AT-012345678', 'Anna', 'Gruber', '1992-10-14', 'Vienna', 1),
('NL-234561098', 'Sanne', 'Jansen', '1988-02-28', 'Amsterdam', 1),
('CZ-456783210', 'Tereza', 'Novak', '1994-01-23', 'Prague', 1),
('RO-678905432', 'Andreea', 'Popescu', '1990-12-16', 'Bucharest', 1),
('HR-890127654', 'Ivana', 'Kovacic', '1987-07-21', 'Zagreb', 1),
('UA-012349876', 'Olena', 'Shevchenko', '1991-08-13', 'Kyiv', 1),
('IL-234561098', 'Noa', 'Levi', '1992-06-25', 'Tel Aviv', 1),
('AE-456783210', 'Aisha', 'Al Mansoori', '1988-12-19', 'Dubai', 1),
('SG-678905432', 'Mei', 'Lim', '1993-09-27', 'Singapore', 1),
('MY-890127654', 'Aisyah', 'Binti Ahmad', '1987-11-22', 'Kuala Lumpur', 1),
('PH-012349876', 'Maria', 'Reyes', '1990-07-18', 'Manila', 1),
('NZ-234561098', 'Sophie', 'Williams', '1991-09-10', 'Auckland', 1),
('AR-456783210', 'Valentina', 'Gomez', '1988-06-14', 'Buenos Aires', 1),
('CO-678905432', 'Camila', 'Rodriguez', '1992-08-31', 'Bogota', 1),
('VE-890127654', 'Gabriela', 'Fernandez', '1989-02-12', 'Caracas', 1),
('MA-012349876', 'Salma', 'El Amrani', '1993-03-16', 'Casablanca', 1),
('KE-234561098', 'Amina', 'Mohamed', '1986-08-28', 'Nairobi', 1),
('ET-456783210', 'Hana', 'Abebe', '1990-11-09', 'Addis Ababa', 1),
('UG-678905432', 'Grace', 'Nabwire', '1988-01-30', 'Kampala', 1),
('CM-890127654', 'Estelle', 'Ngono', '1991-07-24', 'Yaounde', 1),
-- male b2
('US-111223333', 'Ethan', 'Baker', '1987-03-12', 'Chicago', 0),
('CA-222334444', 'Logan', 'Martin', '1989-07-21', 'Vancouver', 0),
('GB-333445555', 'Oliver', 'Wright', '1985-11-30', 'Liverpool', 0),
('DE-444556666', 'Leon', 'Schneider', '1990-01-15', 'Munich', 0),
('FR-555667777', 'Lucas', 'Bernard', '1988-09-18', 'Lille', 0),
('IT-666778888', 'Matteo', 'Gallo', '1986-05-22', 'Turin', 0),
('ES-777889999', 'Adrian', 'Moreno', '1991-10-09', 'Bilbao', 0),
('PT-888990000', 'Tiago', 'Ferreira', '1984-12-27', 'Porto', 0),
('NL-999001111', 'Daan', 'De Vries', '1987-08-14', 'Rotterdam', 0),
('BE-101112131', 'Milan', 'Peeters', '1989-04-03', 'Antwerp', 0),
('SE-121314151', 'William', 'Andersson', '1985-06-19', 'Gothenburg', 0),
('FI-131415161', 'Elias', 'Laine', '1992-02-25', 'Espoo', 0),
('PL-141516171', 'Kacper', 'Nowak', '1988-12-11', 'Gdansk', 0),
('RU-151617181', 'Ivan', 'Petrov', '1986-09-07', 'Saint Petersburg', 0),
('UA-161718191', 'Dmytro', 'Koval', '1991-03-29', 'Dnipro', 0),
('RO-171819202', 'Andrei', 'Ionescu', '1987-07-16', 'Cluj', 0),
('BG-181920212', 'Nikolay', 'Dimitrov', '1989-05-24', 'Varna', 0),
('GR-192021222', 'Nikos', 'Georgiou', '1985-10-13', 'Patras', 0),
('TR-202122232', 'Emre', 'Demir', '1990-08-02', 'Izmir', 0),
('IL-212223242', 'Amit', 'Cohen', '1988-11-05', 'Haifa', 0),
('EG-222324252', 'Omar', 'Ali', '1986-04-18', 'Alexandria', 0),
('ZA-232425262', 'Sipho', 'Zulu', '1992-01-27', 'Durban', 0),
('NG-242526272', 'Ifeanyi', 'Eze', '1987-09-30', 'Abuja', 0),
('KE-252627282', 'Brian', 'Otieno', '1989-12-15', 'Mombasa', 0),
('IN-262728293', 'Aarav', 'Sharma', '1991-06-22', 'Delhi', 0),
-- female b2
('US-333221111', 'Ava', 'Miller', '1988-02-14', 'San Diego', 1),
('CA-444332222', 'Mia', 'Clark', '1990-08-19', 'Calgary', 1),
('GB-555443333', 'Ella', 'Walker', '1986-12-23', 'Bristol', 1),
('DE-666554444', 'Lina', 'Neumann', '1987-05-28', 'Dresden', 1),
('FR-777665555', 'Camille', 'Dubois', '1992-09-11', 'Toulouse', 1),
('IT-888776666', 'Sara', 'Fontana', '1989-03-17', 'Parma', 1),
('ES-999887777', 'Carmen', 'Serrano', '1985-07-05', 'Granada', 1),
('PT-000998888', 'Beatriz', 'Sousa', '1991-11-29', 'Coimbra', 1),
('NL-111009999', 'Julia', 'Bakker', '1987-01-13', 'Utrecht', 1),
('BE-121110101', 'Fleur', 'Jacobs', '1988-10-21', 'Ghent', 1),
('SE-131211111', 'Agnes', 'Lindberg', '1990-06-08', 'Uppsala', 1),
('FI-141312121', 'Aino', 'Heikkinen', '1986-03-26', 'Tampere', 1),
('PL-151413131', 'Zuzanna', 'Wojcik', '1989-12-02', 'Krakow', 1),
('RU-161514141', 'Anastasia', 'Smirnova', '1992-04-16', 'Kazan', 1),
('UA-171615151', 'Olena', 'Bondarenko', '1987-08-31', 'Lviv', 1),
('RO-181716161', 'Ioana', 'Pop', '1985-11-27', 'Timisoara', 1),
('BG-191817171', 'Elena', 'Ivanova', '1991-02-20', 'Plovdiv', 1),
('GR-201918181', 'Maria', 'Nikolaou', '1988-07-15', 'Heraklion', 1),
('TR-212019191', 'Zeynep', 'Kaya', '1990-05-03', 'Bursa', 1),
('IL-222120202', 'Noa', 'Levy', '1986-09-18', 'Eilat', 1),
('EG-232221212', 'Salma', 'Mahmoud', '1989-01-09', 'Giza', 1),
('ZA-242322222', 'Lerato', 'Mokoena', '1992-03-12', 'Pretoria', 1),
('NG-252423232', 'Ngozi', 'Okeke', '1987-06-25', 'Ibadan', 1),
('KE-262524242', 'Faith', 'Mwangi', '1991-12-30', 'Kisumu', 1),
('IN-272625252', 'Priya', 'Reddy', '1988-05-07', 'Bangalore', 1);


INSERT INTO `SecurityLevels`(
    `ID`,
    `Name`
) VALUES
(0, 'Low'),
(1, 'Medium'),
(2, 'High'),
(3, 'Maximum');


INSERT INTO `Sectors`(
    `ID`,
    `Name`,
    `GenderID`,
    `SecurityLevelID`
) VALUES
('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 'Main - Male', 0, 0),
('SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 'Main - Female', 1, 0),
('SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 'Priority - Male', 0, 1),
('SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df', 'Priority - Female', 1, 1),
('SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce', 'High risk - Male', 0, 2),
('SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7', 'High risk - Female', 1, 2),
('SCT-1dfb25b9-d643-45b1-b25d-db8a53bef961', 'Isolation - Male', 0, 3),
('SCT-2b1d0279-02a5-4ffa-a341-ce70af166dcc', 'Isolation - Female', 1, 3);


INSERT INTO `Cells`(
    `SectorID`,
    `Number`,
    `Capacity`
) VALUES
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

DELETE FROM `Inmates`;
INSERT INTO `Inmates`(
    `Number`,
    `DocumentID`,
    `IncarcerationDate`,
    `SentenceDuration`,
    `CriminalRecord`,
    `CellSectorID`,
    `CellNumber`
) VALUES
-- male b1
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
-- female b1
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


INSERT INTO `Movements`(
    `DateTime`,
    `InmateNumber`,
    `CellSectorID`,
    `CellNumber`
) VALUES
-- male b1
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
('1995-06-06 10:54:57', '67-246-0233', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 8), -- before isolation male
('1996-02-14 7:11:39', '67-246-0233', 'SCT-1dfb25b9-d643-45b1-b25d-db8a53bef961', 1), -- isolation male
-- female b1
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
('2006-09-14 18:16:21', '22-897-5812', 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343', 8), -- before isolation female
('2007-11-09 12:07:30', '22-897-5812', 'SCT-2b1d0279-02a5-4ffa-a341-ce70af166dcc', 1); -- isolation female

DELETE FROM `Guests`;
INSERT INTO `Guests`(
    `DocumentID`
) VALUES
('JP-901234568'),
('CA-567890124'),
('NO-234567890'),
('AU-678901235');


DELETE FROM `Visits`;
INSERT INTO `Visits`(
    `InmateNumber`,
    `DateTime`
) VALUES
('72-733-3969', '2021-01-15 10:00:00'),
('72-733-3969', '2021-08-10 15:00:00'),
('83-628-8300', '2001-04-10 11:30:00'),
('22-112-0638', '2002-01-10 10:00:00'),
('21-927-1468', '2008-09-15 15:00:00'),
('12-745-2335', '2016-12-01 11:30:00');

DELETE FROM `Visitors`;
INSERT INTO `Visitors`(
    `VisitInmateNumber`,
    `VisitDateTime`,
    `GuestDocumentID`
) VALUES
('72-733-3969', '2021-01-15 10:00:00', 'JP-901234568'),
('72-733-3969', '2021-01-15 10:00:00', 'CA-567890124'),
('72-733-3969', '2021-08-10 15:00:00', 'CA-567890124'),
('83-628-8300', '2001-04-10 11:30:00', 'NO-234567890'),
('22-112-0638', '2002-01-10 10:00:00', 'AU-678901235'),
('21-927-1468', '2008-09-15 15:00:00', 'AU-678901235'),
('21-927-1468', '2008-09-15 15:00:00', 'NO-234567890'),
('21-927-1468', '2008-09-15 15:00:00', 'JP-901234568'),
('12-745-2335', '2016-12-01 11:30:00', 'NO-234567890');


DELETE FROM `PersonnelTypes`;
INSERT INTO `PersonnelTypes`(
    `ID`,
    `Name`
) VALUES
(0, 'Director'),
(1, 'Guard'),
(2, 'Technician'),
(3, 'Janitor'),
(4, 'Librarian');


DELETE FROM `Personnel`;
INSERT INTO `Personnel`(
    `ID`,
    `DocumentID`,
    `PersonnelTypeID`,
    `SectorID`
) VALUES
-- male b1
('PER-ecee39cb-5c88-4e17-aea8-3d04eab1a411', 'ES-789012346', 0, NULL),
('PER-0be1d506-df53-4348-82fb-ea9a3bcfd3aa', 'IT-BCD23456J', 4, NULL),
('PER-52682313-7d4c-4842-9975-c69b90bc6df0', 'SE-123456789', 4, NULL),
('PER-f788b6b2-fd80-437c-a9c2-7d0b3b1cb273', 'FI-345678901', 3, NULL),
('PER-44244ae0-596c-4adc-a5d0-79a5565659a1', 'PL-567890123', 3, NULL),
('PER-71a7707a-dd14-4399-9d2c-6a0e67dc262d', 'PT-789012345', 3, NULL),
('PER-9a5cee1a-1b66-4ba5-86b4-44b6139f8e84', 'CH-901234567', 3, NULL),
('PER-744649c9-73cf-4e1d-b7bb-f0e7a9258327', 'BE-123450987', 2, NULL),
('PER-700af87f-ded6-4e23-8a51-d5d9b553445d', 'HU-345672109', 2, NULL),
('PER-8c26e10c-e8bb-400f-adc7-2478edec4b85', 'SK-567894321', 2, NULL),
('PER-b13327fc-9bf5-4b94-98db-57389a795034', 'BG-789016543', 1, 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-3e2a9969-c7a8-4668-b080-818118411238', 'RS-901238765', 1, 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-9f92c9ff-593e-420f-b793-3477d98ad154', 'TR-123450987', 1, 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-8cfd0e9d-8aa0-4b97-a225-a1a54b92c176', 'SA-345672109', 1, 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-48d684f2-53ab-4165-adcd-366990a039a3', 'KR-567894321', 1, 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-c0b86991-5e98-4d39-9f54-3f5f15edef81', 'TH-789016543', 1, 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-6384e8ba-5971-475b-9e7f-f01533c6b4c7', 'ID-901238765', 1, 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-b8da78c0-bcf9-4f7a-bfeb-e5e9f5043050', 'VN-123450987', 1, 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-db378a3e-ca5d-4ff7-873e-7799c1257c68', 'MX-345672109', 1, 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-87348924-6243-48d2-a8b4-a458a79bfef1', 'CL-567894321', 1, 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
-- male b2
('PER-fc547153-1aef-4e27-bd80-3c3d0211b889', 'US-111223333', 1, 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-6e05e71f-554b-4ab2-9e1c-b2342cff18e5', 'CA-222334444', 1, 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-d8f7b4f9-8420-4e9c-9fa6-a1161f1974ee', 'GB-333445555', 1, 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-aca95c76-dc6d-4f95-8d02-efe249e0293b', 'DE-444556666', 1, 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-dbce1e62-3a81-4710-a316-93ac570b64e9', 'FR-555667777', 1, 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'),
('PER-c7379407-73fc-4ef2-9fe5-e6ac446a182c', 'IT-666778888', 1, 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
('PER-275eff7d-b535-4819-a882-82ff91a114e2', 'ES-777889999', 1, 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
('PER-66533c16-b0f9-4ecf-9a0d-5884a01b9882', 'PT-888990000', 1, 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
('PER-15bf7fb5-2e85-4441-bc6e-fcd986823cc7', 'NL-999001111', 1, 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
('PER-9cc75548-2d73-43e0-b564-75c3d5a7d6dd', 'BE-101112131', 1, 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
('PER-2c5f21bd-2aa8-474c-a2a8-b46fd51486f1', 'SE-121314151', 1, 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
('PER-e8fffe44-aa7c-462d-a40d-2f86d9ae5830', 'FI-131415161', 1, 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
('PER-d430fa7a-8649-4a01-b01d-4a5fb708669f', 'PL-141516171', 1, 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
('PER-93ab0d5f-cbfe-44f1-ac86-518863386ce7', 'RU-151617181', 1, 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
('PER-3dc83a9c-f7cc-4ee8-9d07-3b1aa9befb8e', 'UA-161718191', 1, 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'),
('PER-40da2cb4-1e76-4d58-be13-59c351537cff', 'RO-171819202', 1, 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce'),
('PER-5975d813-3071-43e8-afa8-d21a44387a44', 'BG-181920212', 1, 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce'),
('PER-445c30ac-720d-46ca-a208-f915ffd5b617', 'GR-192021222', 1, 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce'),
('PER-9012cab3-e393-44c7-8587-1e8bae279f01', 'TR-202122232', 1, 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce'),
('PER-041a4e06-8a86-48b2-959d-a04ef3bb5aa4', 'IL-212223242', 1, 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce'),
('PER-39898012-0cfd-4e02-8cc8-b61f14c2dd97', 'EG-222324252', 1, 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce'),
('PER-202638f2-f83f-4651-9bf3-b2b61fcac33e', 'ZA-232425262', 1, 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce'),
('PER-e97880cd-4b61-4121-9e99-04e033fea9a6', 'NG-242526272', 1, 'SCT-1dfb25b9-d643-45b1-b25d-db8a53bef961'),
('PER-34c36928-cd93-4043-8739-5d5873640f5d', 'KE-252627282', 1, 'SCT-1dfb25b9-d643-45b1-b25d-db8a53bef961'),
('PER-39213d23-e3e0-414f-80dc-8e27824a4edc', 'IN-262728293', 1, 'SCT-1dfb25b9-d643-45b1-b25d-db8a53bef961'),
-- female b1
('PER-caafd732-cf23-4f3b-82ab-58e9194c90ea', 'DK-456789012', 2, NULL),
('PER-207cc7f3-cdd3-493e-b842-60c9b564ae03', 'GR-678901234', 4, NULL),
('PER-e7dde97f-8a8f-4e3b-9f9c-a9ddf279c1b8', 'IE-890123456', 4, NULL),
('PER-b8f6286e-7f47-47cd-82db-5ba452efa6f9', 'AT-012345678', 3, NULL),
('PER-7a8399b0-6318-4dee-9c2b-6a7965d2592e', 'NL-234561098', 3, NULL),
('PER-23d99887-4db8-445f-928b-a31c4cb8822f', 'CZ-456783210', 3, NULL),
('PER-9a0af957-0bbb-4b97-8f6d-2d561732ebfb', 'RO-678905432', 3, NULL),
('PER-d4fb89ac-249c-4710-be3c-bb8e2b4ab3e9', 'HR-890127654', 2, NULL),
('PER-4e31f4d8-a46f-4dec-a482-a8d8697ab55c', 'UA-012349876', 2, NULL),
('PER-79981ac5-b3fb-4ba6-b7b3-ff0b7d9e4fe5', 'IL-234561098', 2, NULL),
('PER-27d00923-b17a-43fa-a544-73c0d3f5d358', 'AE-456783210', 1, 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-8ca3485f-1960-4fb9-9789-92db0f605824', 'SG-678905432', 1, 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-4778712f-8113-4630-a67b-59b130afa7a0', 'MY-890127654', 1, 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-5c222ce0-4f29-4ad8-b298-a7c334cd089c', 'PH-012349876', 1, 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-98389d59-49b6-494b-9d3e-921c750974ff', 'NZ-234561098', 1, 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-6d74dc6a-f442-4483-9127-17a4b86f5266', 'AR-456783210', 1, 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-346a05a9-337b-455e-9a65-313c0d3278c0', 'CO-678905432', 1, 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-3a4cf916-8a6b-4a6e-a553-c618ae6b7f4f', 'VE-890127654', 1, 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-4e70c73d-0eee-4fee-8558-b609c005f4d7', 'MA-012349876', 1, 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-f0e89b06-42a8-4bea-ba82-5d555921cac7', 'KE-234561098', 1, 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
-- female b2
('PER-56efae6f-77b6-4768-beeb-ca8333aeeb74', 'US-333221111', 1, 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-5aa0ba84-0806-43c3-81db-f8cadb896ceb', 'CA-444332222', 1, 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-a514b1e0-0c57-4e27-af06-e2ac107838b4', 'GB-555443333', 1, 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-77b4131b-a288-4410-b287-e62cbf3f475b', 'DE-666554444', 1, 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-2d913059-dde9-43d5-935c-a66486adb095', 'FR-777665555', 1, 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343'),
('PER-cc349993-ec92-47dd-8d6b-a7069446b196', 'IT-888776666', 1, 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df'),
('PER-f3aa690e-bd63-4d1f-9426-917a0782670f', 'ES-999887777', 1, 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df'),
('PER-5fcbde84-a7c8-47f4-9eb0-3caa9f612ed0', 'PT-000998888', 1, 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df'),
('PER-cdd4e570-3a6a-49c8-910a-c0b4512358fa', 'NL-111009999', 1, 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df'),
('PER-28513974-a738-4a3d-aebb-c1172c7d7232', 'BE-121110101', 1, 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df'),
('PER-ae4ec946-4836-45d0-b6ce-4c1daa035de3', 'SE-131211111', 1, 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df'),
('PER-c272adf9-d6b9-4c05-94c6-1824fe5d13eb', 'FI-141312121', 1, 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df'),
('PER-b43687b0-ef09-4313-a1de-a81afdf06707', 'PL-151413131', 1, 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df'),
('PER-8626b673-52c6-420f-9322-14ad9066d9e0', 'RU-161514141', 1, 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df'),
('PER-b672c335-d20f-49ed-882c-c50ef255f162', 'UA-171615151', 1, 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df'),
('PER-80cc4a41-2ada-4a3c-902c-024a76c5446e', 'RO-181716161', 1, 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7'),
('PER-73348923-2122-4866-a826-1f3565b3f71f', 'BG-191817171', 1, 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7'),
('PER-d5666643-2d9c-44ca-87fc-a83784f7d9b0', 'GR-201918181', 1, 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7'),
('PER-e0b4be2e-390f-448f-b359-8c209db2fc18', 'TR-212019191', 1, 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7'),
('PER-9db6b91e-4737-4a5c-8886-43a340ad641d', 'IL-222120202', 1, 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7'),
('PER-dd93ad6e-421a-4701-a754-5eaa463059c4', 'EG-232221212', 1, 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7'),
('PER-cd84e85b-527e-4426-aa25-b0ec8baff40b', 'ZA-242322222', 1, 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7'),
('PER-15731d01-32ed-42f7-a50e-f518dd7deb23', 'NG-252423232', 1, 'SCT-2b1d0279-02a5-4ffa-a341-ce70af166dcc'),
('PER-628fc228-6d43-4fa3-ac88-ba1ae61d394c', 'KE-262524242', 1, 'SCT-2b1d0279-02a5-4ffa-a341-ce70af166dcc'),
('PER-4a5d087d-7a99-4c5e-b19a-09403c488ba6', 'IN-272625252', 1, 'SCT-2b1d0279-02a5-4ffa-a341-ce70af166dcc');

-- DELETE FROM `DeviceTypes`;
-- INSERT INTO `DeviceTypes`(
--     `ID`,
--     `Name`
-- ) VALUES


-- DELETE FROM `Devices`;
-- INSERT INTO `Devices`(
--     `Serial`,
--     `SectorID`,
--     `Number`,
--     `DeviceTypeID`
-- ) VALUES


-- DELETE FROM `Reports`;
-- ALTER TABLE `Reports` AUTO_INCREMENT = 1;
-- INSERT INTO `Reports`(
--     -- `ID` is auto increment
--     `DateTime`,
--     `Description`,
--     `ResponsiblePersonnelID`
-- ) VALUES


-- DELETE FROM `EngagedInmates`;
-- INSERT INTO `EngagedInmates`(
--     `ReportID`,
--     `InmateNumber`
-- ) VALUES


-- DELETE FROM `EngagedPersonnel`;
-- INSERT INTO `EngagedPersonnel`(
--     `ReportID`,
--     `PersonnelID`
-- ) VALUES


-- DELETE FROM `EngagedSectors`;
-- INSERT INTO `EngagedSectors`(
--     `ReportID`,
--     `SectorID`
-- ) VALUES


-- DELETE FROM `EngagedDevices`;
-- INSERT INTO `EngagedDevices`(
--     `ReportID`,
--     `DeviceSerial`
-- ) VALUES


-- DELETE FROM `Couriers`;
-- INSERT INTO `Couriers`(
--     `DocumentID`
-- ) VALUES


-- DELETE FROM `Vehicles`;
-- INSERT INTO `Vehicles`(
--     `PlateNumber`,
--     `CourierDocumentID`
-- ) VALUES


-- DELETE FROM `GoodsTypes`;
-- INSERT INTO `GoodsTypes`(
--     `ID`,
--     `Name`
-- ) VALUES


-- DELETE FROM `Deliveries`;
-- INSERT INTO `Deliveries`(
--     `DateTime`,
--     `GoodsTypeID`,
--     `Quantity`,
--     `VehiclePlateNumber`
-- ) VALUES


-- DELETE FROM `Activities`;
-- INSERT INTO `Activities`(
--     `ID`,
--     `Name`,
--     `Description`,
--     `Duration`
-- ) VALUES


-- DELETE FROM `Availabilities`;
-- INSERT INTO `Availabilities`(
--     `SecurityLevelID`,
--     `ActivityID`
-- ) VALUES


-- DELETE FROM `Zones`;
-- INSERT INTO `Zones`(
--     `SectorID`,
--     `Number`,
--     `Name`,
--     `Capacity`
-- ) VALUES


-- DELETE FROM `Routines`;
-- INSERT INTO `Routines`(
--     `SectorID`,
--     `Datetime`,
--     `ActivityID`,
--     `ZoneSectorID`,
--     `ZoneNumber`
-- ) VALUES


-- DELETE FROM `Surveillances`;
-- INSERT INTO `Surveillances`(
--     `PersonnelID`,
--     `RoutineSectorID`,
--     `RoutineDateTime`
-- ) VALUES

