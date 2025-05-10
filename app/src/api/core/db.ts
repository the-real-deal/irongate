import mysql, { PoolConnection, PoolOptions, ResultSetHeader, RowDataPacket } from "mysql2/promise"
import env from "./env"
import { Pool } from "mysql2/promise"
import { PathLike } from "node:fs"
import fs from "node:fs/promises"

function defineForcedOptions<T extends Partial<PoolOptions>>(options: T): T {
    return options
}

const forcedOptions = defineForcedOptions({
    rowsAsArray: false,
    multipleStatements: false,
})

export type DBConfig = Omit<PoolOptions, keyof typeof forcedOptions>

function init(config: DBConfig = {}) {
    config.host ??= env.getRequired("DB_HOST", "string")
    config.port ??= env.get("DB_PORT", "number") ?? 3306
    config.database ??= env.getRequired("DB_NAME", "string")
    config.user ??= env.getRequired("DB_USER", "string")
    config.password ??= env.getRequired("DB_PASSWORD", "string")
    return new DBManager(mysql.createPool({ ...config, ...forcedOptions }))
}

export type QueryResult<T> = (T & RowDataPacket)[]

export class DBManager {
    private readonly pool: Pool

    constructor(pool: Pool) {
        this.pool = pool
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

    async executeQuery<T extends RowDataPacket[] | ResultSetHeader>(
        query: string,
        values: any[] = [],
    ): Promise<T> {
        const connection = await this.pool.getConnection()
        try {
            const [result] = await connection.query<T>(query, values)
            return result
        } finally {
            connection.release()
        }
    }

    async executeScript<T extends RowDataPacket[] | ResultSetHeader>(path: PathLike, values: any[]): Promise<T> {
        const file = await fs.readFile(path)
        return this.executeQuery(file.toString(), values)
    }
}

export default { init }
