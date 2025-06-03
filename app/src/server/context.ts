import { DBManager } from "./core/db"

const db = new DBManager()
await db.testConnection()

export default { db }
