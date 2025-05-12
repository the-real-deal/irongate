-- this file inserts dummy data in the database
USE `IronGate`;

-- Genders
INSERT INTO Genders (ID, Name)
VALUES (1, 'Male'),
    (2, 'Female');

-- DeviceTypes
INSERT INTO DeviceTypes (ID, Name)
VALUES (1, 'Camera'),
    (2, 'Sensor');

-- PersonnelTypes
INSERT INTO PersonnelTypes (ID, Name)
VALUES (1, 'Guard'),
    (2, 'Warden'),
    (3, 'Admin');

-- GoodsTypes
INSERT INTO GoodsTypes (ID, Name)
VALUES (1, 'Food'),
    (2, 'Medical Supplies');

-- Persons
INSERT INTO Persons (
        DocumentID,
        Name,
        Surname,
        Birthday,
        BirthPlace,
        GenderID
    )
VALUES (
        'D001',
        'John',
        'Doe',
        '1985-02-15',
        'New York',
        1
    ),
    (
        'D002',
        'Jane',
        'Smith',
        '1990-06-20',
        'Los Angeles',
        2
    ),
    (
        'D003',
        'Mike',
        'Johnson',
        '1975-09-10',
        'Houston',
        1
    ),
    (
        'D004',
        'Emily',
        'Davis',
        '1988-12-05',
        'Chicago',
        2
    ),
    (
        'D005',
        'Robert',
        'Brown',
        '1995-03-30',
        'Miami',
        1
    );

-- Sectors
INSERT INTO Sectors (ID, Name, GenderID, SecurityLevel, Capacity)
VALUES ('S1', 'Alpha', 1, 3, 50),
    ('S2', 'Beta', 2, 2, 30);

-- Cells
INSERT INTO Cells (SectorID, Number, Capacity)
VALUES ('S1', 101, 2),
    ('S1', 102, 2),
    ('S2', 201, 1);

-- Inmates
INSERT INTO Inmates (
        Number,
        DocumentID,
        IncarcerationDate,
        SentenceDuration,
        CriminalRecord,
        CellSectorID,
        CellNumber
    )
VALUES (
        1,
        'D001',
        '2022-01-10',
        5,
        'Armed robbery and assault',
        'S1',
        101
    ),
    (
        2,
        'D003',
        '2023-03-14',
        3,
        'Fraud and identity theft',
        'S1',
        102
    );

-- Guests
INSERT INTO Guests (DocumentID)
VALUES ('D002'),
    ('D004');

-- Visits
INSERT INTO Visits (InmateNumber, DateTime)
VALUES (1, '2024-12-01 10:00:00'),
    (2, '2024-12-02 11:00:00');

-- Visitors
INSERT INTO Visitors (
        VisitInmateNumber,
        VisitDateTime,
        GuestDocumentID
    )
VALUES (1, '2024-12-01 10:00:00', 'D002'),
    (2, '2024-12-02 11:00:00', 'D004');

-- Personnel
INSERT INTO Personnel (ID, DocumentID, PersonnelTypeID, SectorID)
VALUES ('P1', 'D005', 1, 'S1');

-- Reports
INSERT INTO Reports (DateTime, Description, ResponsiblePersonnelID)
VALUES (
        '2025-01-05 15:00:00',
        'Altercation in Cell 101',
        'P1'
    );

-- Involvements
INSERT INTO Involvements (InmateNumber, ReportID)
VALUES (1, 1),
    (2, 1);

-- EngagedPersonnel
INSERT INTO EngagedPersonnel (ReportID, PersonnelID)
VALUES (1, 'P1');

-- Couriers
INSERT INTO Couriers (DocumentID)
VALUES ('D005');

-- Vehicles
INSERT INTO Vehicles (PlateNumber, CourierDocumentID)
VALUES ('XYZ1234', 'D005');

-- Deliveries
INSERT INTO Deliveries (
        DateTime,
        GoodsTypeID,
        Quantity,
        VehiclePlateNumber
    )
VALUES ('2025-01-10 08:00:00', 1, 200, 'XYZ1234');

-- Activities
INSERT INTO Activities (ID, Name, Description, Duration)
VALUES (
        'A1',
        'Gym',
        'Physical training in prison gym',
        60
    );

-- Avaiabilities
INSERT INTO Avaiabilities (ActivityID, SectorID)
VALUES ('A1', 'S1');

-- Zones
INSERT INTO Zones (SectorID, Number, Name, Capacity)
VALUES ('S1', 1, 'Yard', 20);

-- Routines
INSERT INTO Routines (
        SectorID,
        Datetime,
        ActivityID,
        ZoneSectorID,
        ZoneNumber
    )
VALUES ('S1', '2025-01-15 09:00:00', 'A1', 'S1', 1);

-- Surveillances
INSERT INTO Surveillances (PersonnelID, RoutineSectorID, RoutineDateTime)
VALUES ('P1', 'S1', '2025-01-15 09:00:00');

-- Devices
INSERT INTO Devices (Serial, SectorID, Number, DeviceTypeID)
VALUES ('DEV001', 'S1', 1, 1);

-- EngagedDevices
INSERT INTO EngagedDevices (DeviceSerial, ReportID)
VALUES ('DEV001', 1);

-- EngagedSectors
INSERT INTO EngagedSectors (ReportID, SectorID)
VALUES (1, 'S1');

-- Movements
INSERT INTO Movements (DateTime, InmateNumber, CellSectorID, CellNumber)
VALUES ('2025-01-02 08:00:00', 1, 'S1', 101),
    ('2025-01-03 09:00:00', 2, 'S1', 102);