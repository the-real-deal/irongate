import mysql from "mysql2/promise"
import env from "./env"

const pool = mysql.createPool({
    host: env.getRequired("DB_HOST", "string"),
    port: env.get("DB_PORT", "number")
})

async function executeQuery<T>(query: string, values: any[]) {
    const connection = await pool.getConnection()
    try {
        const [results, fields] = await connection.query(query, values)
        console.log(results) // results contains rows returned by server
        console.log(fields) // fields contains extra meta data about results, if available
    } catch (err) {
        console.log(err)
    }
}