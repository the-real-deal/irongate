import { ResultSetHeader } from "mysql2"
import { db } from "../context"
import { createQuery } from "../core/db"
import { PeopleTable } from "../../common/tables/people"
import utils from "../../common/utils"

async function get(id?: string): Promise<PeopleTable[] | PeopleTable> {
    const query = createQuery(
        "SELECT *",
        "FROM `People`",
        id === undefined ? "" : "WHERE `DocumentID` = :id"
    )
    const res = await db.executeQuery<PeopleTable[]>(query, { id })
    return id === undefined ? res : res[0]
}

async function remove(id: string): Promise<boolean> {
    const query = createQuery(
        "DELETE FROM `People` WHERE `DocumentID` = :id",
    )
    const res = await db.executeQuery<ResultSetHeader>(query, { id })
    return res.affectedRows > 0
}

async function update(id: string, edits: Partial<PeopleTable>): Promise<boolean> {
    edits = utils.removeUndefinedKeys(edits)
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

async function create(data: Partial<PeopleTable>): Promise<boolean> {
    data = utils.removeUndefinedKeys(data)
    if (Object.keys(data).length < PeopleEntry) {
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
