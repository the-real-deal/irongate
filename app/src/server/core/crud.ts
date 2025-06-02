import { ResultSetHeader } from "mysql2"
import { db } from "../context"
import { createQuery, escapeQueryField } from "./db"
import { ColumnValue, TableEntry, TableRecord, TableStructure, tableStructurePrimaryKey } from "../../common/db"

export class SanitizeError extends Error { }

export type OrderByDefinition<T extends TableEntry<TableRecord>> = {
    column: keyof T,
    direction: "ASC" | "DESC"
}[]

export default class CRUDOperations<T extends TableEntry<TableRecord>> {

    constructor(
        private readonly tableName: string,
        private readonly structure: TableStructure<T>,
    ) { }

    private async sanitizeData(
        data: Partial<T>,
        {
            keys = Object.keys(this.structure),
            allowUndefined = false,
            generateData = false,
        }: {
            keys?: (keyof T)[],
            allowUndefined?: boolean,
            generateData?: boolean
        } = {},
    ) {
        Object.keys(data).forEach(key => {
            if (!keys.includes(key)) {
                delete data[key]
            }
        })
        await Promise.all(keys.map(async <K extends keyof T>(key: K) => {
            const generate = this.structure[key].generate
            if (generate === false && data[key] === undefined) {
                if (allowUndefined) {
                    delete data[key]
                } else {
                    throw new SanitizeError(`Missing key ${key.toString()}`)
                }
            } else if (generate !== false) {
                if (generateData && typeof generate === "function") {
                    delete data[key]
                    data[key] = await generate()
                }
            }
        }))
    }

    private async sanitizePrimaryKey(primaryKey: Partial<T>) {
        const keys = Object.keys(
            tableStructurePrimaryKey<T, typeof this.structure>(this.structure)
        ) as (keyof T)[]
        await this.sanitizeData(primaryKey, { keys })
    }

    private filterQuery(filterKey: Partial<T>): {
        query: string,
        values: ColumnValue[],
    } {
        return {
            query: createQuery(
                "WHERE",
                Object.keys(filterKey)
                    .map(key => `${escapeQueryField(key)} = ?`)
                    .join(" AND ")
            ),
            values: Object.values(filterKey),
        }
    }

    async get({
        filter,
        orderBy = []
    }: {
        filter?: Partial<T>,
        orderBy?: OrderByDefinition<T>
    } = {}): Promise<T[]> {
        const filterQuery =
            filter === undefined ? undefined : await (async () => {
                this.sanitizeData(filter, { allowUndefined: true })
                return this.filterQuery(filter)
            })()
        const query = createQuery(
            "SELECT *",
            `FROM ${escapeQueryField(this.tableName)}`,
            filterQuery?.query ?? "",
            orderBy.length == 0 ? "" : createQuery(
                "ORDER BY",
                orderBy.map(o => `${escapeQueryField(o.column.toString())} ${o.direction}`)
            )
        )
        const res = await db.executeQuery<T[]>(query, filterQuery?.values ?? undefined)
        return res
    }

    async remove(primaryKey: Partial<T>): Promise<boolean> {
        await this.sanitizePrimaryKey(primaryKey)
        const primaryKeyQuery = await this.filterQuery(primaryKey)
        const query = createQuery(
            `DELETE FROM ${escapeQueryField(this.tableName)}`,
            primaryKeyQuery.query
        )
        const res = await db.executeQuery<ResultSetHeader>(query, primaryKeyQuery.values)
        return res.affectedRows > 0
    }

    async update(primaryKey: Partial<T>, edits: Partial<T>): Promise<boolean> {
        await this.sanitizePrimaryKey(primaryKey)
        await this.sanitizeData(edits, { allowUndefined: true })
        const primaryKeyQuery = await this.filterQuery(primaryKey)

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
        await this.sanitizeData(data, { generateData: true })

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
