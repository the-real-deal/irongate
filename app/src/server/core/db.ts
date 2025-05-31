import { createPool, PoolConnection, PoolOptions, ResultSetHeader } from "mysql2/promise"
import env from "../../common/env"
import { Pool } from "mysql2/promise"
import { ColumnValue, DBTable, TableRecord } from "../../common/db"

function defineForcedOptions<T extends Partial<PoolOptions>>(options: T): T {
    return options
}

const forcedOptions = defineForcedOptions({
    rowsAsArray: false,
    namedPlaceholders: false,
    multipleStatements: false,
    typeCast: (field, next) => {
        switch (field.type) {
            case "DATE":
            case "TIMESTAMP":
            case "TIMESTAMP2":
            case "DATETIME2":
            case "DATETIME":
            case "TIME":
            case "TIME2":
                return field.string()
            case "BIT":
                return field.string() === "1"
            case "NULL":
            case "DECIMAL":
            case "TINY":
            case "SHORT":
            case "LONG":
            case "FLOAT":
            case "DOUBLE":
            case "LONGLONG":
            case "INT24":
            case "YEAR":
            case "NEWDATE":
            case "VARCHAR":
            case "VECTOR":
            case "JSON":
            case "NEWDECIMAL":
            case "ENUM":
            case "SET":
            case "TINY_BLOB":
            case "MEDIUM_BLOB":
            case "LONG_BLOB":
            case "BLOB":
            case "VAR_STRING":
            case "STRING":
            case "GEOMETRY":
                return next() // default casting for other types
        }
    },
})

export type DBConfig = Omit<PoolOptions, keyof typeof forcedOptions>

export class DBManager {
    private pool: Pool

    constructor(config: DBConfig = {}) {
        config.host ??= env.getRequired("DB_HOST", "string")
        config.port ??= env.get("DB_PORT", "number") ?? 3306
        config.database ??= env.getRequired("DB_NAME", "string")
        config.user ??= env.getRequired("DB_USER", "string")
        config.password ??= env.getRequired("DB_PASSWORD", "string")
        this.pool = createPool({ ...config, ...forcedOptions })
    }

    async testConnection() {
        let connection: PoolConnection | null = null
        try {
            connection = await this.pool.getConnection()
        } catch (error) {
            throw new Error(`DB connection failed: ${error}`)
        } finally {
            if (connection !== null) {
                connection.release()
            }
        }
    }

    async executeQuery<T extends DBTable<TableRecord>[] | ResultSetHeader>(
        query: string,
        values: ColumnValue[] = [],
    ): Promise<T> {
        const connection = await this.pool.getConnection()
        try {
            await connection.beginTransaction()
            console.log("Running query:", query)
            const [result] = await connection.query(query, values)
            await connection.commit()
            return result as T
        } catch (err) {
            await connection.rollback()
            throw err
        } finally {
            connection.release()
        }
    }
}

export function createQuery(...lines: (string | string[])[]): string {
    return lines
        .map(l => Array.isArray(l) ? l.join(", ") : l)
        .join("\n")
}

export function escapeQueryField(name: string): string {
    return `\`${name}\``
}
