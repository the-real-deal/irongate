import { db } from "../context"
import { createQuery, QueryEntry } from "../core/db"

export type PeopleEntry = QueryEntry<{
    DocumentID: string
    Name: string
    Surname: string
    Birthday: string
    BirthPlace: string
    Gender: string
}>

async function get(id?: string): Promise<PeopleEntry[]> {
    const query = createQuery(
        "SELECT",
        "   p.`DocumentID`,",
        "   p.`Name`,",
        "   p.`Surname`,",
        "   p.`Birthday`,",
        "   p.`BirthPlace`,",
        "   g.`Name` as `Gender`",
        "FROM `People` p",
        "   JOIN `Genders` g ON p.`GenderID` = g.`ID`",
        id === undefined ? "" : "WHERE `DocumentID` = :id"
    )
    return await db.executeQuery(query, { id })
}

export default { get }
