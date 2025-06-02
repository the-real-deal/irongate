import { createTableStructure, TableEntry } from "./db"
import utils from "./utils"

export const ENUM_TABLES = [
    "Genders",
    "SecurityLevels",
    "PersonnelTypes",
    "DeviceTypes",
    "GoodTypes",
] as const
export type EnumTable = (typeof ENUM_TABLES)[number]

export type EnumEntry = TableEntry<{
    ID: string
}>

export const ENUM_STRUCTURE = createTableStructure<EnumEntry>({
    ID: {
        primaryKey: true,
    },
})

export type PeopleEntry = TableEntry<{
    DocumentID: string
    Name: string
    Surname: string
    Birthday: string
    BirthPlace: string
    GenderID: EnumEntry["ID"]
}>

export const PEOPLE_STRUCTURE = createTableStructure<PeopleEntry>({
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
    GenderID: EnumEntry["ID"]
    SecurityLevelID: EnumEntry["ID"]
}>

export const SECTORS_STRUCTURE = createTableStructure<SectorsEntry>({
    ID: {
        primaryKey: true,
        generate: async () => "SCT-" + utils.generateUUID()
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

export const CELLS_STRUCTURE = createTableStructure<CellsEntry>({
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

export const INMATES_STRUCTURE = createTableStructure<InmatesEntry>({
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
    DateTime: string
    InmateNumber: InmatesEntry["Number"]
    CellSectorID: CellsEntry["SectorID"]
    CellNumber: CellsEntry["Number"]
}>
export const MOVEMENTS_STRUCTURE = createTableStructure<MovementsEntry>({
    DateTime: {
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
