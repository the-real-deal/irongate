import { createTableStructure, TableEntry, TableStructure } from "./db"
import utils from "./utils"

export const ENUM_TABLES = [
    "Genders",
    "SecurityLevels",
    "PersonnelTypes",
    "DeviceTypes",
    "GoodsTypes",
] as const
export type EnumTable = (typeof ENUM_TABLES)[number]
export type EnumEntry = TableEntry<{
    ID: string
}>
export function enumStructure(table: EnumTable): TableStructure<EnumEntry> {
    return createTableStructure<EnumEntry>(table, {
        ID: {
            primaryKey: true,
        },
    })
}

export type PeopleEntry = TableEntry<{
    DocumentID: string
    Name: string
    Surname: string
    Birthday: string
    BirthPlace: string
    GenderID: EnumEntry["ID"]
}>
export const PEOPLE_STRUCTURE = createTableStructure<PeopleEntry>("People", {
    DocumentID: {
        primaryKey: true,
    },
    Name: {},
    Surname: {},
    Birthday: {},
    BirthPlace: {},
    GenderID: {}
})

export type SectorsEntry = TableEntry<{
    ID: string
    Name: string
    GenderID: EnumEntry["ID"] | null
    SecurityLevelID: EnumEntry["ID"]
}>
export const SECTORS_STRUCTURE = createTableStructure<SectorsEntry>("Sectors", {
    ID: {
        primaryKey: true,
        generate: () => "SCT-" + utils.generateUUID()
    },
    Name: {},
    GenderID: {},
    SecurityLevelID: {},
})

export type CellsEntry = TableEntry<{
    SectorID: SectorsEntry["ID"]
    Number: number
    Capacity: number
}>
export const CELLS_STRUCTURE = createTableStructure<CellsEntry>("Cells", {
    SectorID: {
        primaryKey: true
    },
    Number: {
        primaryKey: true
    },
    Capacity: {}
})

export type InmatesEntry = TableEntry<{
    Number: string
    DocumentID: PeopleEntry["DocumentID"]
    IncarcerationDate: string
    SentenceDuration: number
    CriminalRecord: string
    CellSectorID: CellsEntry["SectorID"]
    CellNumber: CellsEntry["Number"]
}>
export const INMATES_STRUCTURE = createTableStructure<InmatesEntry>("Inmates", {
    Number: {
        primaryKey: true
    },
    DocumentID: {},
    IncarcerationDate: {},
    SentenceDuration: {},
    CriminalRecord: {},
    CellSectorID: {},
    CellNumber: {},
})

export type MovementsEntry = TableEntry<{
    Datetime: string
    InmateNumber: InmatesEntry["Number"]
    CellSectorID: CellsEntry["SectorID"]
    CellNumber: CellsEntry["Number"]
}>
export const MOVEMENTS_STRUCTURE = createTableStructure<MovementsEntry>("Movements", {
    Datetime: {
        primaryKey: true
    },
    InmateNumber: {
        primaryKey: true
    },
    CellSectorID: {
        primaryKey: true
    },
    CellNumber: {
        primaryKey: true
    },
})

export type GuestsEntry = TableEntry<{
    DocumentID: PeopleEntry["DocumentID"]
}>
export const GUESTS_STRUCTURE = createTableStructure<GuestsEntry>("Guests", {
    DocumentID: {
        primaryKey: true
    },
})

export type VisitsEntry = TableEntry<{
    InmateNumber: InmatesEntry["Number"]
    Datetime: string
}>
export const VISITS_STRUCTURE = createTableStructure<VisitsEntry>("Visits", {
    InmateNumber: {
        primaryKey: true
    },
    Datetime: {
        primaryKey: true
    },
})

export type VisitorsEntry = TableEntry<{
    VisitInmateNumber: VisitsEntry["InmateNumber"]
    VisitDatetime: VisitsEntry["Datetime"]
    GuestDocumentID: GuestsEntry["DocumentID"]
}>
export const VISITORS_STRUCTURE = createTableStructure<VisitorsEntry>("Visitors", {
    VisitInmateNumber: {
        primaryKey: true
    },
    VisitDatetime: {
        primaryKey: true
    },
    GuestDocumentID: {
        primaryKey: true
    },
})

export type PersonnelEntry = TableEntry<{
    ID: string
    DocumentID: PeopleEntry["DocumentID"]
    PersonnelTypeID: EnumEntry["ID"]
    SectorID: SectorsEntry["ID"] | null
}>
export const PERSONNEL_STRUCTURE = createTableStructure<PersonnelEntry>("Personnel", {
    ID: {
        primaryKey: true,
        generate: () => "PER-" + utils.generateUUID()
    },
    DocumentID: {},
    PersonnelTypeID: {},
    SectorID: {},
})

export type DevicesEntry = TableEntry<{
    Serial: string
    SectorID: SectorsEntry["ID"]
    Number: number
    DeviceTypeID: EnumEntry["ID"]
}>
export const DEVICES_STRUCTURE = createTableStructure<DevicesEntry>("Devices", {
    Serial: {
        primaryKey: true
    },
    SectorID: {},
    Number: {},
    DeviceTypeID: {},
})

export type ReportsEntry = TableEntry<{
    ID: number
    Datetime: string
    Description: string
    ResponsiblePersonnelID: PersonnelEntry["ID"]
}>
export const REPORTS_STRUCTURE = createTableStructure<ReportsEntry>("Reports", {
    ID: {
        primaryKey: true,
        generate: true
    },
    Datetime: {},
    Description: {},
    ResponsiblePersonnelID: {},
})

export type EngagedInmatesEntry = TableEntry<{
    ReportID: ReportsEntry["ID"]
    InmateNumber: InmatesEntry["Number"]
}>
export const ENGAGED_INMATES_STRUCTURE = createTableStructure<EngagedInmatesEntry>("EngagedInmates", {
    ReportID: {
        primaryKey: true
    },
    InmateNumber: {
        primaryKey: true
    },
})

export type EngagedPersonnelEntry = TableEntry<{
    ReportID: ReportsEntry["ID"]
    PersonnelID: PersonnelEntry["ID"]
}>
export const ENGAGED_PERSONNEL_STRUCTURE = createTableStructure<EngagedPersonnelEntry>("EngagedPersonnel", {
    ReportID: {
        primaryKey: true
    },
    PersonnelID: {
        primaryKey: true
    },
})

export type EngagedSectorsEntry = TableEntry<{
    ReportID: ReportsEntry["ID"]
    SectorID: SectorsEntry["ID"]
}>
export const ENGAGED_SECTORS_STRUCTURE = createTableStructure<EngagedSectorsEntry>("EngagedSectors", {
    ReportID: {
        primaryKey: true
    },
    SectorID: {
        primaryKey: true
    },
})

export type EngagedDevicesEntry = TableEntry<{
    ReportID: ReportsEntry["ID"]
    DeviceSerial: DevicesEntry["Serial"]
}>
export const ENGAGED_DEVICES_STRUCTURE = createTableStructure<EngagedDevicesEntry>("EngagedDevices", {
    ReportID: {
        primaryKey: true
    },
    DeviceSerial: {
        primaryKey: true
    },
})

export type CouriersEntry = TableEntry<{
    DocumentID: PeopleEntry["DocumentID"]
}>
export const COURIERS_STRUCTURE = createTableStructure<CouriersEntry>("Couriers", {
    DocumentID: {
        primaryKey: true
    },
})

export type VehiclesEntry = TableEntry<{
    PlateNumber: string
    CourierDocumentID: CouriersEntry["DocumentID"]
}>
export const VEHICLES_STRUCTURE = createTableStructure<VehiclesEntry>("Vehicles", {
    PlateNumber: {
        primaryKey: true
    },
    CourierDocumentID: {},
})

export type DeliveriesEntry = TableEntry<{
    Datetime: string
    GoodsTypeID: EnumEntry["ID"]
    Quantity: number
    VehiclePlateNumber: VehiclesEntry["PlateNumber"]
}>
export const DELIVERIES_STRUCTURE = createTableStructure<DeliveriesEntry>("Deliveries", {
    Datetime: {
        primaryKey: true
    },
    GoodsTypeID: {
        primaryKey: true
    },
    Quantity: {},
    VehiclePlateNumber: {},
})

export type ActivitiesEntry = TableEntry<{
    ID: string
    Description: string
    Duration: number
}>
export const ACTIVITIES_STRUCTURE = createTableStructure<ActivitiesEntry>("Activities", {
    ID: {
        primaryKey: true,
        generate: () => "ACT-" + utils.generateUUID()
    },
    Description: {},
    Duration: {},
})

export type AvailabilitiesEntry = TableEntry<{
    SecurityLevelID: EnumEntry["ID"]
    ActivityID: ActivitiesEntry["ID"]
}>
export const AVAILABILITIES_STRUCTURE = createTableStructure<AvailabilitiesEntry>("Availabilities", {
    SecurityLevelID: {
        primaryKey: true
    },
    ActivityID: {
        primaryKey: true
    },
})

export type ZonesEntry = TableEntry<{
    SectorID: SectorsEntry["ID"]
    Number: number
    Name: string
    Capacity: number
}>
export const ZONES_STRUCTURE = createTableStructure<ZonesEntry>("Zones", {
    SectorID: {
        primaryKey: true
    },
    Number: {
        primaryKey: true
    },
    Name: {},
    Capacity: {},
})

export type RoutinesEntry = TableEntry<{
    ZoneSectorID: ZonesEntry["SectorID"]
    ZoneNumber: ZonesEntry["Number"]
    Datetime: string
    ActivityID: ActivitiesEntry["ID"]
}>
export const ROUTINES_STRUCTURE = createTableStructure<RoutinesEntry>("Routines", {
    ZoneSectorID: {
        primaryKey: true
    },
    ZoneNumber: {
        primaryKey: true
    },
    Datetime: {
        primaryKey: true
    },
    ActivityID: {},
})

export type PartecipationsEntry = TableEntry<{
    RoutineZoneSectorID: RoutinesEntry["ZoneSectorID"]
    RoutineZoneNumber: RoutinesEntry["ZoneNumber"]
    RoutineDatetime: RoutinesEntry["Datetime"]
    SectorID: SectorsEntry["ID"]
}>
export const PARTECIPATIONS_STRUCTURE = createTableStructure<PartecipationsEntry>("Partecipations", {
    RoutineZoneSectorID: {
        primaryKey: true
    },
    RoutineZoneNumber: {
        primaryKey: true
    },
    RoutineDatetime: {
        primaryKey: true
    },
    SectorID: {
        primaryKey: true
    },
})

export type SurveillancesEntry = TableEntry<{
    RoutineZoneSectorID: RoutinesEntry["ZoneSectorID"]
    RoutineZoneNumber: RoutinesEntry["ZoneNumber"]
    RoutineDatetime: RoutinesEntry["Datetime"]
    PersonnelID: PersonnelEntry["ID"]
}>
export const SURVEILLANCES_STRUCTURE = createTableStructure<SurveillancesEntry>("Surveillances", {
    RoutineZoneSectorID: {
        primaryKey: true
    },
    RoutineZoneNumber: {
        primaryKey: true
    },
    RoutineDatetime: {
        primaryKey: true
    },
    PersonnelID: {
        primaryKey: true
    },
})
