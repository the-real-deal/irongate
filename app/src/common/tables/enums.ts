import { createTableStructure, TableEntry } from "../db"

export const ENUM_TABLES = [
    "Genders",
    "SecurityLevels",
    "PersonnelTypes",
    "DeviceTypes",
    "GoodTypes",
] as const

export type EnumEntry = TableEntry<{
    ID: string
}>

export const ENUM_STRUCTURE = createTableStructure<EnumEntry>({
    ID: {
        primaryKey: true,
    },
})

