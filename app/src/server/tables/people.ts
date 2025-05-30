import { ResultSetHeader } from "mysql2"
import { db } from "../context"
import { createQuery } from "../core/db"
import { PeopleEntry } from "../../common/tables/people"

async function get(id?: string): Promise<PeopleEntry[] | PeopleEntry> {
    const query = createQuery(
        "SELECT *",
        "FROM `People`",
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

async function update(id: string, edits: Partial<PeopleEntry>): Promise<boolean> {
    if (Object.keys(edits).length == 0) {
        return true
    }
    const query = createQuery(
        "UPDATE `People` SET",
        (Object.keys(edits) as (keyof typeof edits)[]).map(
            key => `\`${key}\` = :${key}`
        ).join(", "),
        "WHERE `DocumentID` = :id"
    )
    const res = await db.executeQuery<ResultSetHeader>(query, { id, ...edits })
    return res.affectedRows > 0
}

export default { get, remove, update }
