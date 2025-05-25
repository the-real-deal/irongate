import { DBManager } from "./core/db"

export const db = new DBManager()
await db.testConnection()
