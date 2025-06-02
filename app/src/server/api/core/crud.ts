import { Router } from "express"
import { TableEntry, recordPrimaryKey, TableRecord, TableStructure, recordEntry } from "../../../common/db"
import CRUDOperations, { OrderByDefinition, SanitizeError } from "../../core/crud"
import { PrimitiveRequest } from "../../middlewares"
import { HttpStatusCode } from "../../../common/http"
import utils from "../../../common/utils"

interface MethodOptions {
    enabled?: boolean
}

export function createCRUDRouter<T extends TableEntry<TableRecord>>(
    tableName: string,
    structure: TableStructure<T>,
    methods: {
        get?: MethodOptions & {
            orderBy?: OrderByDefinition<T>
        }
        delete?: MethodOptions
        put?: MethodOptions
        post?: MethodOptions
    } = {}
) {
    const crud = new CRUDOperations(tableName, structure)
    const router = Router()

    if (methods.get?.enabled ?? true) {
        router.get("/", async (req: PrimitiveRequest, res) => {
            const filter = Object.keys(req.query).length == 0 ? undefined : recordEntry(req.query, structure)
            try {
                const result = await crud.get({ filter, orderBy: methods.get?.orderBy })
                res.send(result)
            } catch (err) {
                if (err instanceof SanitizeError) {
                    res.status(HttpStatusCode.BAD_REQUEST).send()
                } else {
                    throw err
                }
            }
        })
    }

    if (methods.delete?.enabled ?? true) {
        router.delete("/", async (req: PrimitiveRequest, res) => {
            const primaryKey = recordPrimaryKey(req.query, structure)
            const ok = await crud.remove(primaryKey)
            if (ok) {
                res.status(HttpStatusCode.OK).send()
            } else {
                res.status(HttpStatusCode.NOT_FOUND).send()
            }
        })
    }

    if (methods.put?.enabled ?? true) {
        router.put("/", async (req: PrimitiveRequest, res) => {
            if (Object.keys(req.query).length == 0) {
                res.status(HttpStatusCode.BAD_REQUEST).send("Missing query parameters")
                return
            }
            const primaryKey = recordPrimaryKey(req.query, structure)
            if (req.body === undefined || !utils.isPlainObject(req.body)) {
                res.status(HttpStatusCode.BAD_REQUEST).send(`Invalid body ${req.body}`)
                return
            }
            const ok = await crud.update(primaryKey, req.body as Partial<T>)
            if (ok) {
                res.status(HttpStatusCode.OK).send()
            } else {
                res.status(HttpStatusCode.NOT_FOUND).send()
            }
        })
    }

    if (methods.post?.enabled ?? true) {
        router.post("/", async (req: PrimitiveRequest, res) => {
            if (req.body === undefined || !utils.isPlainObject(req.body)) {
                res.status(HttpStatusCode.BAD_REQUEST).send(`Invalid body ${req.body}`)
                return
            }
            await crud.create(req.body as Partial<T>)
            res.status(HttpStatusCode.OK).send()
        })
    }

    return router
}