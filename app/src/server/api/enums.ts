import { Router } from "express"
import { createCRUDRouter } from "./core/crud"
import { ENUM_STRUCTURE, ENUM_TABLES } from "../../common/tables/enums"

const enumsRouter = Router()

for (const table of ENUM_TABLES) {
    enumsRouter.use(`/${table.toLowerCase()}`, createCRUDRouter(
        table,
        ENUM_STRUCTURE,
        {
            get: { enabled: true },
            delete: { enabled: false },
            put: { enabled: false },
            post: { enabled: false },
        }
    ))
}

export default enumsRouter
