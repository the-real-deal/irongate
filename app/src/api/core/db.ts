import { createPool, PoolConnection, PoolOptions, ResultSetHeader } from "mysql2/promise"
import env from "./env"
import { Pool } from "mysql2/promise"

function defineForcedOptions<T extends Partial<PoolOptions>>(options: T): T {
    return options
}

const forcedOptions = defineForcedOptions({
    rowsAsArray: false,
    namedPlaceholders: true,
    multipleStatements: false,
})

export type DBConfig = Omit<PoolOptions, keyof typeof forcedOptions>

export type ColumnValue = string | number | Date | null
export type TableStructure = { [key: string]: ColumnValue }
export type QueryEntry<T extends TableStructure> = {
    [K in keyof T]: T[K]
}

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

    async executeQuery<T extends QueryEntry<TableStructure>[] | ResultSetHeader>(
        query: string,
        values: { [k: string]: any } = {},
    ): Promise<T> {
        const connection = await this.pool.getConnection()
        try {
            const [result] = await connection.query(query, values)
            return result as T
        } finally {
            connection.release()
        }
    }
}
