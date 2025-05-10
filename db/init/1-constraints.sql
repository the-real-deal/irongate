-- this file inserts constraint in the database's tables

-- persone, personale, prigionieri, ...

ALTER TABLE Person ADD CONSTRAINT Gender_FK
    FOREIGN KEY (Sex)
    REFERENCES Gender(ID);

ALTER TABLE Inmate ADD CONSTRAINT DocumentNumber_FK
    FOREIGN KEY (DocumentNumber)
    REFERENCES Person(DocumentNumber);

ALTER TABLE Inmate ADD CONSTRAINT Sector_FK
    FOREIGN KEY (Sector)
    REFERENCES Cell(Belonging);   

ALTER TABLE Inmate ADD CONSTRAINT CellNumber_FK
    FOREIGN KEY (CellNumber)
    REFERENCES Cell(`Number`);   

ALTER TABLE Movement ADD CONSTRAINT Sector_FK
    FOREIGN KEY (Sector)
    REFERENCES Cell(Belonging);   

ALTER TABLE Movement ADD CONSTRAINT CellNumber_FK
    FOREIGN KEY (CellNumber)
    REFERENCES Cell(`Number`);

ALTER TABLE Guest ADD CONSTRAINT DocumentNumber_FK
    FOREIGN KEY (DocumentNumber)
    REFERENCES Person(DocumentNumber);

ALTER TABLE Visit ADD CONSTRAINT VisitedInmate_FK
    FOREIGN KEY (VisitedInmate)
    REFERENCES Inmate(`Number`);

ALTER TABLE Visitors ADD CONSTRAINT VisitTime_FK
    FOREIGN KEY (VisitTime)
    REFERENCES Visit(`DateTime`);

ALTER TABLE Visitors ADD CONSTRAINT VisitedInmate_FK
    FOREIGN KEY (VisitedInmate)
    REFERENCES Visit(VisitedInmate);

ALTER TABLE Visitors ADD CONSTRAINT Guest_FK
    FOREIGN KEY (Guest)
    REFERENCES Guest(DocumentNumber);

ALTER TABLE Personell ADD CONSTRAINT DocumentNumber_FK
    FOREIGN KEY (DocumentNumber)
    REFERENCES Person(DocumentNumber);

ALTER TABLE Personell ADD CONSTRAINT Type_FK
    FOREIGN KEY (`Type`)
    REFERENCES PersonellType(ID);

ALTER TABLE Personell ADD CONSTRAINT Sector_FK
    FOREIGN KEY (Sector)
    REFERENCES Sector(ID);

ALTER TABLE Report ADD CONSTRAINT PersonellID_FK
    FOREIGN KEY (PersonellID)
    REFERENCES Personell(ID);

ALTER TABLE Involvement ADD CONSTRAINT InmateNumber_FK
    FOREIGN KEY (InmateNumber)
    REFERENCES Inmate(`Number`);

ALTER TABLE Involvement ADD CONSTRAINT ReportID_FK
    FOREIGN KEY (ReportID)
    REFERENCES Report(ID);    

ALTER TABLE EngagedPersonell ADD CONSTRAINT ReportID_FK
    FOREIGN KEY (ReportID)
    REFERENCES Report(ID);   

ALTER TABLE Involvement ADD CONSTRAINT PersonellID_FK
    FOREIGN KEY (PersonellID)
    REFERENCES Personell(ID);  

ALTER TABLE Courier ADD CONSTRAINT DocumentNumber_FK
    FOREIGN KEY (DocumentNumber)
    REFERENCES Person(DocumentNumber); 

ALTER TABLE Vehicle ADD CONSTRAINT Driver_FK
    FOREIGN KEY (Driver)
    REFERENCES Courier(DocumentNumber); 

ALTER TABLE Delivery ADD CONSTRAINT Goods_FK
    FOREIGN KEY (Goods)
    REFERENCES GoodsType(ID); 

ALTER TABLE Delivery ADD CONSTRAINT Vehicle_FK
    FOREIGN KEY (Vehicle_FK)
    REFERENCES Vehicle(PlateNumber); 

-- zone, settori, celle

ALTER TABLE Device ADD CONSTRAINT DeviceType_FK
    FOREIGN KEY (DeviceType)
    REFERENCES (ID);

ALTER TABLE Routine ADD CONSTRAINT Partecipation_FK
    FOREIGN KEY (Partecipation)
    REFERENCES Sector(ID);

ALTER TABLE Cell ADD CONSTRAINT Partecipation_FK
    FOREIGN KEY (Partecipation)
    REFERENCES Sector(ID);

ALTER TABLE `Zone` ADD CONSTRAINT Division_FK
    FOREIGN KEY (Division)
    REFERENCES Sector(ID);

ALTER TABLE EngagedDevices ADD CONSTRAINT Correlation_FK
    FOREIGN KEY (Correlation)
    REFERENCES Device(Correlation);

ALTER TABLE EngagedDevices ADD CONSTRAINT Serial_FK
    FOREIGN KEY (`Serial`)
    REFERENCES Device (Serial);
    
ALTER TABLE EngagedDevices ADD CONSTRAINT ReportID_FK
    FOREIGN KEY (ReportID)
    REFERENCES Report(ID);

ALTER TABLE Avaiability ADD CONSTRAINT ActivityID_FK
    FOREIGN KEY (ActivityID)
    REFERENCES Activity(ID);

ALTER TABLE Avaiability ADD CONSTRAINT SectorID_FK
    FOREIGN KEY (SectorID)
    REFERENCES Sector(ID);

ALTER TABLE `Event` ADD CONSTRAINT SectorID_FK
    FOREIGN KEY (SectorID)
    REFERENCES Sector(ID);

ALTER TABLE `Event` ADD CONSTRAINT ReportID_FK
    FOREIGN KEY (ReportID)
    REFERENCES Report(ID);
    
ALTER TABLE Surveillance ADD CONSTRAINT SectorID_FK
    FOREIGN KEY (SectorID)
    REFERENCES Routine(Partecipation);

ALTER TABLE Surveillance ADD CONSTRAINT PersonellID_FK
    FOREIGN KEY (Personell)
    REFERENCES Personell(ID);
    
ALTER TABLE Surveillance ADD CONSTRAINT Datetime_FK
    FOREIGN KEY (`DateTime`)
    REFERENCES Routine(`Datetime`);


