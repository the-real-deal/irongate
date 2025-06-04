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
SELECT R.ActivityID, COUNT(R.ActivityID) AS assignNum
FROM Routines R
WHERE HOUR(R.DateTime) BETWEEN 0 AND 23
GROUP BY R.ActivityID
ORDER BY assignNum DESC;


-- Numero di detenuti per ogni grado di sicurezza nei settori.
SELECT S.TotalInmates
FROM Inmates I JOIN Sectors S ON (I.CellSectorID=S.ID)
GROUP BY S.SecurityLevel, S.ID;

-- Settore con più detenuti per security level
SELECT MAX(S.TotalInmates)
FROM Inmates I JOIN Sectors S ON (I.CellSectorID=S.ID)
GROUP BY S.SecurityLevel, S.ID;


-- Classifica delle guardie assegnate con maggior frequenza ad ogni attività.
SELECT R.ActivityID, P.PersonnelID, COUNT(P.PersonnelID) AS assignNum
FROM Routines R JOIN Surveillances S ON (R.ZoneNumber=S.ZoneNumber AND R.ZoneSectorID=S.ZoneSectorID AND R.DateTime=S.DateTime) 
    JOIN Personnel P ON (S.PersonnelID=P.PersonnelID)
WHERE P.PersonnelTypeID='Guard'
GROUP BY P.PersonnelID, R.ActivityID
ORDER BY assignNum DESC
LIMIT 10;


-- Classifica dei detenuti coinvolti insieme nei diversi report.
SELECT COUNT(DISTINCT E.InmateNumber) AS assignNum
FROM EngagedInmates E JOIN EngagedInmates EE ON (E.ReportID=EE.ReportID)
GROUP BY E.ReportID
WHERE E.InmateNumber <> EE.InmateNumber 
ORDER BY assignNum DESC;


-- Dati due detenuti, determinare quante volte sono stati coinvolti assieme in diversi report.
SELECT COUNT(DISTINCT R.ReportID)
FROM Report R JOIN EngagedInmates E ON (R.ID=E.ReportID) JOIN EngagedInmates EE ON (E.ReportID=EE.ReportID)
WHERE E.InmateNumber='x' AND EE.InmateNumber='y' AND E.InmateNumber<>EE.InmateNumber;

