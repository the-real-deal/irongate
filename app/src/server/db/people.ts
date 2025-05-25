import { QueryEntry } from "./db"

export type PeopleEntry = QueryEntry<{
    DocumentID: string
    Name: string
    Surname: string
    Birthday: Date
    BirthPlace: string
    GenderID: number
}>
