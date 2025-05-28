import { ResultSetHeader } from "mysql2"
import { db } from "../context"
import { createQuery } from "../core/db"
import { PeopleEntry } from "../../common/tables/people"

async function get(id?: string): Promise<PeopleEntry[] | PeopleEntry> {
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
    const res = await db.executeQuery<PeopleEntry[]>(query, { id })
    return id === undefined ? res : res[0]
}

async function remove(id: string): Promise<boolean> {
    const query = createQuery(
        "DELETE FROM `People` WHERE `DocumentID` = :id",
    )
    const res = await db.executeQuery<ResultSetHeader>(query, { id })
    return res.affectedRows > 0
}

export default { get, remove }
