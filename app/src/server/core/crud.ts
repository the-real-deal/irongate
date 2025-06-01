import { ResultSetHeader } from "mysql2"
import { db } from "../context"
import { createQuery, escapeQueryField } from "./db"
import { ColumnValue, TableEntry, TableRecord, TableStructure, tableStructurePrimaryKey } from "../../common/db"

export class SanitizeError extends Error { }

export default class CRUDOperations<T extends TableEntry<TableRecord>> {

    constructor(
        private readonly tableName: string,
        private readonly structure: TableStructure<T>,
    ) { }

    private sanitizeData(
        data: Partial<T>,
        {
            keys = Object.keys(this.structure),
            allowUndefined = false,
        }: {
            keys?: (keyof T)[],
            allowUndefined?: boolean,
        } = {},
    ) {
        Object.keys(data).forEach(key => {
            if (!keys.includes(key)) {
                delete data[key]
            }
        })
        keys.forEach(<K extends keyof T>(key: K) => {
            const generate = this.structure[key].generate
            switch (typeof generate) {
                case "boolean": {
                    if (generate) {
                        delete data[key]
                    } else if (data[key] === undefined && !allowUndefined) {
                        throw new SanitizeError(`Missing key ${key.toString()}`)
                    }
                    break
                }
                case "function": {
                    data[key] = generate(data)
                    break
                }
                default: {
                    throw new Error()
                }
            }
        })
    }

    private sanitizePrimaryKey(primaryKey: Partial<T>) {
        const keys = Object.keys(
            tableStructurePrimaryKey<T, typeof this.structure>(this.structure)
        ) as (keyof T)[]
        this.sanitizeData(primaryKey, { keys })
    }

    private primaryKeyQuery(primaryKey: Partial<T>): {
        query: string,
        values: ColumnValue[],
    } {
        this.sanitizePrimaryKey(primaryKey)
        return {
            query: createQuery(
                "WHERE",
                Object.keys(primaryKey)
                    .map(key => `${escapeQueryField(key)} = ?`)
                    .join(" AND ")
            ),
            values: Object.values(primaryKey),
        }
    }

    async get({
        primaryKey,
        keyOnly = false,
    }: {
        primaryKey?: Partial<T>
        keyOnly?: boolean
    }): Promise<T[] | (T | null)> {
        const primaryKeyQuery =
            primaryKey === undefined ? undefined : this.primaryKeyQuery(primaryKey)
        const query = createQuery(
            "SELECT",
            keyOnly ?
                Object.keys(tableStructurePrimaryKey<T, typeof this.structure>(this.structure)) :
                "*",
            `FROM ${escapeQueryField(this.tableName)}`,
            primaryKeyQuery?.query ?? ""
        )
        const res = await db.executeQuery<T[]>(query, primaryKeyQuery?.values ?? undefined)
        return primaryKey === undefined ? res : (res[0] ?? null)
    }

    async remove(primaryKey: Partial<T>): Promise<boolean> {
        const primaryKeyQuery = this.primaryKeyQuery(primaryKey)
        const query = createQuery(
            `DELETE FROM ${escapeQueryField(this.tableName)}`,
            primaryKeyQuery.query
        )
        const res = await db.executeQuery<ResultSetHeader>(query, primaryKeyQuery.values)
        return res.affectedRows > 0
    }

    async update(primaryKey: Partial<T>, edits: Partial<T>): Promise<boolean> {
        this.sanitizeData(edits, { allowUndefined: true })
        const primaryKeyQuery = this.primaryKeyQuery(primaryKey)

        if (Object.keys(edits).length == 0) {
            return true
        }
        const query = createQuery(
            `UPDATE ${escapeQueryField(this.tableName)} SET`,
            (Object.keys(edits)).map(
                key => `${escapeQueryField(key)} = ?`
            ),
            primaryKeyQuery.query
        )
        const res = await db.executeQuery<ResultSetHeader>(query, [
            ...(Object.values(edits)),
            ...primaryKeyQuery.values
        ])
        return res.affectedRows > 0
    }

    async create(data: Partial<T>) {
        this.sanitizeData(data)

        const keys = Object.keys(data)
        const query = createQuery(
            `INSERT INTO ${escapeQueryField(this.tableName)} (`,
            (keys.map(key => `${escapeQueryField(key)}`)),
            ") VALUES (",
            (keys.map(_ => "?")),
            ")",
        )

        await db.executeQuery<ResultSetHeader>(query, Object.values(data))
    }

}
