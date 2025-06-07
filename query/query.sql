--query irongate


--inserisci nuovo detenuto
INSERT INTO Inmates ('Number', 
    'DocumentID', 
    'IncarcerationDate', 
    'SentenceDuration', 
    'CriminalRecord', 
    'CellSectorID',
    'CellNumber')
VALUES ('43-867-9999','IT-FENSDO809','2018-11-12', 21 ,'Theft', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 8)


INSERT INTO People (DocumentID,'Name','Surname',Birthday, BirthPlace, GenderID)
VALUES ('IT-FENSDO809','Lu','Pino', '2004-07-14', 'Lecce', 'Male')

--rimozione detenuto
DELETE FROM Inmates
WHERE 'Number' = '43-867-9999'

DELETE FROM People
WHere DocumentID = 'IT-FENSDO809'

--trasferimento di un detenuto in cella vuota
UPDATE Sector
SET Sector.TotalInmates=Sector.TotalInmates-1
WHERE Sector.ID = (SELECT I.CellSectorID
    FROM Inmates I 
    WHERE I.Number= '43-867-9999')

INSERT INTO Movement ('DateTime',
    'InmateNumber',
    'CellSectorID',
    'CellNumber')
VALUES('2021-11-11 12:12:12', '43-867-9999', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 8)

UPDATE Inmates, Sector
FROM Inmates I JOIN Sector S ON (I.CellSectorID=S.ID)
SET Inmates.CellNumber = 8, Inmates.CellSectorID='SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 
    Sector.TotalInmates= Sector.TotalInmates+1
WHERE (SELECT COUNT(*)
        FROM Inmates
        WHERE CellNumber = 8 AND CellSectorID = 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0')
    < (SELECT Capacity
    FROM Cells
    WHERE CellNumber=8 AND CellSectorID = 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0')
    AND S.GenderID = (SELECT GenderID
        FROM Inmates II JOIN People P ON (II.DocumentID=P.DocumentID)
        WHERE 'Number'= '43-867-9999')


--Trasferimento due detenuti da una cella all'altra

INSERT INTO Movement ('DateTime',
    'InmateNumber',
    'CellSectorID',
    'CellNumber')
VALUES('2021-11-11 12:12:12', '43-867-9999', 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 8)

INSERT INTO Movement ('DateTime',
    'InmateNumber',
    'CellSectorID',
    'CellNumber')
VALUES('2021-11-11 12:12:13', '43-867-9998', 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 7)

UPDATE Inmates
SET
    CellNumber = CASE
        WHEN 'Number'='43-867-9999' THEN 8
        WHEN 'Number'='43-867-9998' THEN 7
       -- ELSE CellNumber
    END,
    CellSectorID = CASE
        WHEN 'Number'='43-867-9999' THEN 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0'
        WHEN 'Number'='43-867-9998' THEN 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'
        --ELSE CellSectorID
    END
WHERE (SELECT GenderID
        FROM Inmates I JOIN People P ON (I.DocumentID=P.DocumentID)
        WHERE 'Number'= '43-867-9999') = (SELECT GenderID
        FROM Inmates I JOIN People P ON (I.DocumentID=P.DocumentID)
        WHERE 'Number'= '43-867-9998')


--inserimento report
INSERT INTO Report ('DateTime', 'Description', ResponsiblePersonnelID)
VALUES ('2025-12-12 12:12:12','Briefing', 'PER-b13327fc-9bf5-4b94-98db-57389a795034')

--inserimento personale
INSERT INTO Personnel (ID, DocumentID, PersonnelTypeID, SectorID)
VALUES ('PER-b13327fc-9bf5-4b94-98db-57389a795034', 'IT-FENSDO808', 'Guard','SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0')

INSERT INTO People (DocumentID,'Name','Surname',Birthday, BirthPlace, GenderID)
VALUES ('IT-FENSDO808', 'Paolo', 'Paoli', '2000-12-12', 'Lecce', 'Male')

--rimozione personale
DELETE FROM Personnel
WHERE ID='PER-b13327fc-9bf5-4b94-98db-57389a795034'

DELETE FROM People
WHERE DocumentID='IT-FENSDO808'


--modifica personale
UPDATE Personnel
SET SectorID= 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'
WHERE PersonnelTypeID='Guard'


--inserimento consegne
INSERT INTO Delivery('DateTime', 'GoodsTypeID', Quantity, VehiclePlateNumber)
VALUES ('2020-12-12 12:12:12', 'Food', 20, 'XE8P1R6TWK')


--modifica consegne
UPDATE Delivery D
SET Quantity=18
WHERE D.DateTime='2020-12-12 12:12:12' AND D.GoodsTypeID='Food' 


--Visita di un detenuto
INSERT INTO People (DocumentID,'Name','Surname',Birthday, BirthPlace, GenderID)
VALUES ('IT-FENSDO800','anna','maria', '2004-07-14', 'Lecce', 'Female')

INSERT INTO Guests (DocumentID)
VALUES ('IT-FENSDO800')

INSERT INTO Visits (InmateNumber, 'DateTime')
VALUES ('43-867-9999', '2020-12-12 12:12:12')

INSERT INTO Visitors (VisitInmateNumber, VisitDateTime, GuestDocumentID)
VALUES ('43-867-9999', '2020-12-12 12:12:12','IT-FENSDO800')


--Inserimento attività
INSERT INTO Activities (ID, 'Description', Duration)
VALUES ('ACT-2220d028-ca56-473e-94c6-cd4788ce1185','Reading',45)

INSERT INTO `Availabilities`(`SecurityLevelID`, `ActivityID`)
VALUES ("Medium", 'ACT-2220d028-ca56-473e-94c6-cd4788ce1185')


--Modifica attività
UPDATE Activities
SET Duration=50
WHERE ID = 'ACT-2220d028-ca56-473e-94c6-cd4788ce1185'

UPDATE Availabilities
SET SecurityLevelID="High"
WHERE ActivityID = 'ACT-2220d028-ca56-473e-94c6-cd4788ce1185'


--Inserimento nuova routine
INSERT INTO Routines (ZoneSectorID, ZoneNumber, 'DateTime', ActivityID)
VALUES ('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0',2,'2025-12-12 12:12:12', 'ACT-2220d028-ca56-473e-94c6-cd4788ce1185') 

INSERT INTO Partecipations (RoutineZoneSectorID, RoutineZoneNumber, RountineDateTime, SectorID)
VALUES ('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0',2,'2025-12-12 12:12:12','SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0')
CHECK ----------------------------------------------------------------------------------------------------

INSERT INTO Surveillances (RoutineZoneSectorID, RoutineZoneNumber, RountineDateTime, PersonnelID)
VALUES ('SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 2, '2025-12-12 12:12:12', 'PER-b13327fc-9bf5-4b94-98db-57389a795034')


--Inserimento dispositivo
INSERT INTO Devices ('Serial', 'SectorID', 'Number', 'DeviceTypeID')
VALUES (1164422448, 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0', 29, 'Camera')

--Modifica dispositivo
UPDATE Devices D
SET D.SectorID = 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9', 
        D.Number = (SELECT MAX('Number')
                    FROM Devices
                    WHERE D.SectorID = 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9'
                    LIMIT 1 ) + 1
WHERE D.Serial = 1164422448;


-- query statistiche

-- attività più svolte in determinate fasce orarie.
SELECT
    R.`ActivityID` AS ActivityID,
    COUNT(R.`ActivityID`) AS Popularity
FROM `Routines` R
WHERE HOUR(R.`DateTime`) BETWEEN 0 AND 23
GROUP BY R.`ActivityID`
ORDER BY Popularity DESC;


-- Numero di detenuti per ogni grado di sicurezza nei settori.
SELECT 
    S.`SecurityLevelID`,
    SUM(S.`TotalInmates`) as TotalInmates
FROM `Sectors` S
GROUP BY S.`SecurityLevelID`;

-- Settore con più detenuti per security level
UPDATE `Sectors` SET `TotalInmates` = 0 WHERE ID = 'SCT-08ad4254-4804-462e-b23a-1269cfdb5b5f';
UPDATE `Sectors` SET `TotalInmates` = 8 WHERE ID = 'SCT-8f5cbeb8-946d-45a2-9a74-a5711f2dfdf0';
UPDATE `Sectors` SET `TotalInmates` = 8 WHERE ID = 'SCT-fdc8350b-c31d-489b-ae98-3f3ee36e3343';
UPDATE `Sectors` SET `TotalInmates` = 6 WHERE ID = 'SCT-6c51df3f-f94c-4194-8fd4-2160194e0cd9';
UPDATE `Sectors` SET `TotalInmates` = 5 WHERE ID = 'SCT-afb7d3aa-29f3-4bb4-9275-648e30beb1df';
UPDATE `Sectors` SET `TotalInmates` = 4 WHERE ID = 'SCT-43ea64e9-4da7-4664-9fcd-0adbba6a30ce';
UPDATE `Sectors` SET `TotalInmates` = 3 WHERE ID = 'SCT-232ab27c-e7ea-4aee-b863-a7a369c609e7';
UPDATE `Sectors` SET `TotalInmates` = 2 WHERE ID = 'SCT-1dfb25b9-d643-45b1-b25d-db8a53bef961';
UPDATE `Sectors` SET `TotalInmates` = 1 WHERE ID = 'SCT-2b1d0279-02a5-4ffa-a341-ce70af166dcc';

-- SELECT MAX(S.TotalInmates)
-- FROM Inmates I JOIN Sectors S ON I.CellSectorID=S.ID
-- GROUP BY S.SecurityLevelID, S.ID;

SELECT 
    S1.`SecurityLevelID`, 
    S1.`ID` AS SectorID, 
    S1.`TotalInmates` AS SectorTotalInmates
FROM `Sectors` S1
WHERE S1.`TotalInmates` = (
    SELECT MAX(S2.`TotalInmates`)
    FROM `Sectors` S2
    WHERE S2.`SecurityLevelID` = S1.`SecurityLevelID`
);

-- Classifica delle guardie assegnate con maggior frequenza ad ogni attività.
SELECT 
    S.`PersonnelID`, 
    COUNT(P.`ID`) AS TotalSurveillances
FROM `Routines` R 
    JOIN `Surveillances` S 
        ON R.`ZoneNumber` = S.`RoutineZoneNumber` 
        AND R.`ZoneSectorID` = S.`RoutineZoneSectorID` 
        AND R.`DateTime` = S.`RoutineDateTime` 
    JOIN `Personnel` P ON S.`PersonnelID` = P.`ID`
WHERE 
    P.`PersonnelTypeID` = 'Guard'
    AND R.`ActivityID` = 'ACT-c1471994-7ba9-4ce2-a28c-a4811ba54fd1'
GROUP BY S.`PersonnelID`
ORDER BY R.`ActivityID`, TotalSurveillances DESC;

-- Classifica dei detenuti coinvolti insieme nei diversi report.
SELECT
    LEAST(E1.`InmateNumber`, E2.`InmateNumber`) AS FirstInmateNumber,
    GREATEST(E1.`InmateNumber`, E2.`InmateNumber`) AS SecondInmateNumber,
    COUNT(DISTINCT E1.`ReportID`) AS TotalReportsTogether
FROM `EngagedInmates` E1
    JOIN `EngagedInmates` E2 ON E1.`ReportID` = E2.`ReportID`
WHERE E1.`InmateNumber` <> E2.`InmateNumber`
GROUP BY
    FirstInmateNumber,
    SecondInmateNumber
ORDER BY TotalReportsTogether DESC
LIMIT 5;


-- Dati due detenuti, determinare quante volte sono stati coinvolti assieme in diversi report.
SELECT COUNT(DISTINCT R.`ID`)
FROM `Reports` R 
    JOIN `EngagedInmates` E ON R.`ID` = E.`ReportID` 
    JOIN `EngagedInmates` EE ON E.`ReportID` = EE.`ReportID`
WHERE 
    E.`InmateNumber`='x' 
    AND EE.`InmateNumber`='y' 
    AND E.`InmateNumber` <> EE.`InmateNumber`;

