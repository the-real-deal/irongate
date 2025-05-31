import { ResultSetHeader } from "mysql2"
import { db } from "../context"
import { createQuery } from "../core/db"
import { PEOPLE_STRUCTURE, PeopleTable } from "../../common/tables/people"
import utils from "../../common/utils"
import { ColumnValue } from "../../common/db"

async function get(id?: string): Promise<PeopleTable[] | PeopleTable> {
    const query = createQuery(
        "SELECT *",
        "FROM `People`",
        id === undefined ? "" : "WHERE `DocumentID` = ?"
    )
    const res = await db.executeQuery<PeopleTable[]>(query, id === undefined ? [] : [id])
    return id === undefined ? res : res[0]
}

async function remove(id: string): Promise<boolean> {
    const query = createQuery(
        "DELETE FROM `People` WHERE `DocumentID` = ?",
    )
    const res = await db.executeQuery<ResultSetHeader>(query, [id])
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
            key => `\`${key}\` = ?`
        ),
        "WHERE `DocumentID` = ?"
    )
    const res = await db.executeQuery<ResultSetHeader>(query, [
        ...(Object.values(edits) as ColumnValue[]),
        id
    ])
    return res.affectedRows > 0
}

async function create(data: Partial<PeopleTable>) {
    const keys = Object.keys(PEOPLE_STRUCTURE) as (keyof PeopleTable)[]
    keys.forEach(<K extends keyof PeopleTable>(key: K) => {
        const generate = PEOPLE_STRUCTURE[key].generate
        if (generate !== undefined) {
            data[key] = generate(data)
        } else if (data[key] === undefined) {
            throw new Error(`Missing key ${key} from data`)
        }
    })
    data = utils.removeUndefinedKeys(data)

    const newKeys = Object.keys(data)
    const query = createQuery(
        "INSERT INTO `People`(",
        (newKeys.map(key => `\`${key}\``)),
        ") VALUES (",
        (newKeys.map(_ => "?")),
        ")",
    )

    await db.executeQuery<ResultSetHeader>(query, Object.values(data) as ColumnValue[])
}

export default { get, remove, update, create }
