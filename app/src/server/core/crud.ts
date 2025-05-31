import { ResultSetHeader } from "mysql2"
import { db } from "../context"
import { createQuery, escapeQueryField } from "./db"
import { ColumnValue, DBTable, TableRecord, TableStructure, tableStructurePrimaryKey } from "../../common/db"

export class SanitizeError extends Error { }

export default class CRUDOperations<T extends DBTable<TableRecord>> {

    constructor(
        private readonly tableName: string,
        private readonly structure: TableStructure<T>,
    ) {
        this.tableName = `\`${tableName}\``
    }

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

    private primaryKeyQuery(primaryKey: Partial<T>): [string, ColumnValue[]] {
        this.sanitizePrimaryKey(primaryKey)
        return [
            createQuery(
                "WHERE",
                Object.keys(primaryKey)
                    .map(key => `${escapeQueryField(key)} = ?`)
                    .join(" AND ")
            ),
            Object.values(primaryKey),
        ]
    }

    async get(primaryKey?: Partial<T>): Promise<T[] | (T | null)> {
        const [primaryKeyQuery, primaryKeyValues] =
            primaryKey === undefined ? ["", undefined] : this.primaryKeyQuery(primaryKey)
        const query = createQuery(
            "SELECT *",
            `FROM ${this.tableName}`,
            primaryKeyQuery
        )
        const res = await db.executeQuery<T[]>(query, primaryKeyValues)
        return primaryKey === undefined ? res : (res[0] ?? null)
    }

    async remove(primaryKey: Partial<T>): Promise<boolean> {
        const [primaryKeyQuery, primaryKeyValues] = this.primaryKeyQuery(primaryKey)
        const query = createQuery(
            `DELETE FROM ${this.tableName}`,
            primaryKeyQuery
        )
        const res = await db.executeQuery<ResultSetHeader>(query, primaryKeyValues)
        return res.affectedRows > 0
    }

    async update(primaryKey: Partial<T>, edits: Partial<T>): Promise<boolean> {
        this.sanitizeData(edits, { allowUndefined: true })
        const [primaryKeyQuery, primaryKeyValues] = this.primaryKeyQuery(primaryKey)

        if (Object.keys(edits).length == 0) {
            return true
        }
        const query = createQuery(
            `UPDATE ${this.tableName} SET`,
            (Object.keys(edits)).map(
                key => `${escapeQueryField(key)} = ?`
            ),
            primaryKeyQuery
        )
        const res = await db.executeQuery<ResultSetHeader>(query, [
            ...(Object.values(edits)),
            ...primaryKeyValues
        ])
        return res.affectedRows > 0
    }

    async create(data: Partial<T>) {
        this.sanitizeData(data)

        const keys = Object.keys(data)
        const query = createQuery(
            `INSERT INTO ${this.tableName}(`,
            (keys.map(key => `${escapeQueryField(key)}`)),
            ") VALUES (",
            (keys.map(_ => "?")),
            ")",
        )

        await db.executeQuery<ResultSetHeader>(query, Object.values(data))
    }

}
