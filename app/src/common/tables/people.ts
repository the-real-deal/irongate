import { DBTable, TableStructure } from "../db"
import { Gender } from "./enums"

export type PeopleTable = DBTable<{
    DocumentID: string
    Name: string
    Surname: string
    Birthday: string
    BirthPlace: string
    GenderID: Gender
}>

export const PEOPLE_STRUCTURE: TableStructure<PeopleTable> = {
    id: ["DocumentID"],
}
