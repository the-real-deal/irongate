import { QueryEntry } from "../db"
import { Gender } from "./enums"

export type PeopleEntry = QueryEntry<{
    DocumentID: string
    Name: string
    Surname: string
    Birthday: string
    BirthPlace: string
    GenderID: Gender
}>