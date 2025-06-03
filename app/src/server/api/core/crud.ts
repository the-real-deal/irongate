import { Router } from "express"
import { TableEntry, recordPrimaryKey, TableRecord, recordEntry } from "../../../common/db"
import CRUDOperations, { SanitizeError } from "../../core/crud"
import { PrimitiveRequest } from "../../middlewares"
import { HttpStatusCode } from "../../../common/http"
import utils from "../../../common/utils"

export interface CRUDRouterOptions {
    get?: boolean
    delete?: boolean
    put?: boolean
    post?: boolean
}

export function createCRUDRouter<T extends TableEntry<TableRecord>>(
    crud: CRUDOperations<T>,
    methods: CRUDRouterOptions = {
        get: true,
        delete: true,
        put: true,
        post: true,
    }
) {
    const router = Router()

    if (methods.get) {
        router.get("/", async (req: PrimitiveRequest, res) => {
            const filter = Object.keys(req.query).length == 0 ? null : recordEntry(req.query, crud.structure)
            try {
                const result = await crud.get({ filter })
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

    if (methods.delete) {
        router.delete("/", async (req: PrimitiveRequest, res) => {
            const primaryKey = recordPrimaryKey(req.query, crud.structure)
            const ok = await crud.remove(primaryKey)
            if (ok) {
                res.status(HttpStatusCode.OK).send()
            } else {
                res.status(HttpStatusCode.NOT_FOUND).send()
            }
        })
    }

    if (methods.put) {
        router.put("/", async (req: PrimitiveRequest, res) => {
            if (Object.keys(req.query).length == 0) {
                res.status(HttpStatusCode.BAD_REQUEST).send("Missing query parameters")
                return
            }
            const primaryKey = recordPrimaryKey(req.query, crud.structure)
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

    if (methods.post) {
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