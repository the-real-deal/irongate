import { createTableStructure, TableEntry } from "../db"

export type PeopleEntry = TableEntry<{
    DocumentID: string
    Name: string
    Surname: string
    Birthday: string
    BirthPlace: string
    GenderID: string
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
