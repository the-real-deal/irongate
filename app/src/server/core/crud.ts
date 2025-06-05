import { ResultSetHeader } from "mysql2"
import { createQuery, escapeQueryField } from "./db"
import { ColumnValue, TableEntry, TableRecord, TableStructure, tableStructurePrimaryKey } from "../../common/db"
import context from "../context"
import utils from "../../common/utils"

export class SanitizeError extends Error { }

export interface CRUDOptions<T extends TableEntry<TableRecord>> {
    get: {
        filter: Partial<T> | null,
        orderBy: (
            keyof T | {
                column: keyof T,
                direction: "ASC" | "DESC"
            }
        )[]
    }
}

export default class CRUDOperations<T extends TableEntry<TableRecord>> {
    public readonly defaultOptions: CRUDOptions<T>

    constructor(
        public readonly structure: TableStructure<T>,
        defaultOptions: {
            [K in keyof CRUDOptions<T>]?: Partial<CRUDOptions<T>[K]>
        } = {},
    ) {
        this.defaultOptions = {
            get: {
                filter: null,
                orderBy: [],
                ...defaultOptions.get
            }
        }
    }

    private async sanitizeData(
        data: Partial<T>,
        {
            keys = Object.keys(this.structure.keys),
            allowUndefined = false,
            generateData = false,
        }: {
            keys?: (keyof T)[],
            allowUndefined?: boolean,
            generateData?: boolean,
        } = {},
    ) {
        Object.keys(data).forEach(key => {
            if (!keys.includes(key)) {
                delete data[key]
            }
        })
        await Promise.all(keys.map(async <K extends keyof T>(key: K) => {
            const generated = this.structure.keys[key].generated
            if (generated && generateData) {
                delete data[key]
            }
            else if (data[key] === undefined) {
                if (allowUndefined) {
                    delete data[key]
                } else {
                    throw new SanitizeError(`Missing key ${key.toString()}`)
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

    async get(options: Partial<CRUDOptions<T>["get"]> = {}): Promise<T[]> {
        const { filter, orderBy } = {
            ...this.defaultOptions.get,
            ...options,
        }
        const filterQuery =
            filter === null ? null : await (async () => {
                this.sanitizeData(filter, { allowUndefined: true })
                return this.filterQuery(filter)
            })()
        const query = createQuery(
            "SELECT *",
            `FROM ${escapeQueryField(this.structure.table)}`,
            filterQuery?.query ?? "",
            orderBy.length == 0 ? "" : createQuery(
                "ORDER BY",
                orderBy.map(
                    o => utils.isPlainObject(o) ? `${escapeQueryField(o.column.toString())} ${o.direction}` : escapeQueryField(o.toString())
                )
            )
        )
        const res = await context.db.executeQuery<T[]>(query, filterQuery?.values ?? undefined)
        return res
    }

    async remove(primaryKey: Partial<T>): Promise<boolean> {
        await this.sanitizePrimaryKey(primaryKey)
        const primaryKeyQuery = await this.filterQuery(primaryKey)
        const query = createQuery(
            `DELETE FROM ${escapeQueryField(this.structure.table)}`,
            primaryKeyQuery.query
        )
        const res = await context.db.executeQuery<ResultSetHeader>(query, primaryKeyQuery.values)
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
            `UPDATE ${escapeQueryField(this.structure.table)} SET`,
            (Object.keys(edits)).map(
                key => `${escapeQueryField(key)} = ?`
            ),
            primaryKeyQuery.query
        )
        const res = await context.db.executeQuery<ResultSetHeader>(query, [
            ...(Object.values(edits)),
            ...primaryKeyQuery.values
        ])
        return res.affectedRows > 0
    }

    async create(data: Partial<T>) {
        await this.sanitizeData(data, { generateData: true })

        const keys = Object.keys(data)
        const query = createQuery(
            `INSERT INTO ${escapeQueryField(this.structure.table)} (`,
            (keys.map(key => `${escapeQueryField(key)}`)),
            ") VALUES (",
            (keys.map(_ => "?")),
            ")",
        )

        await context.db.executeQuery<ResultSetHeader>(query, Object.values(data))
    }

}
