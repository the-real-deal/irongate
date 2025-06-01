import { Router } from "express"
import { TableEntry, recordPrimaryKey, TableRecord, TableStructure } from "../../../common/db"
import CRUDOperations, { SanitizeError } from "../../core/crud"
import { PrimitiveRequest } from "../../middlewares"
import { HttpStatusCode } from "../../../common/http"
import utils from "../../../common/utils"
import { parseJSONPrimitive } from "../../../common/json"

interface MethodOptions {
    enabled?: boolean
}

const defaultMethodOptions: MethodOptions = {
    enabled: true
} as const

export function createCRUDRouter<T extends TableEntry<TableRecord>>(
    tableName: string,
    structure: TableStructure<T>,
    methods: {
        get?: MethodOptions
        delete?: MethodOptions
        put?: MethodOptions
        post?: MethodOptions
    } = {
            get: defaultMethodOptions,
            delete: defaultMethodOptions,
            put: defaultMethodOptions,
            post: defaultMethodOptions,
        }
) {
    const crud = new CRUDOperations(tableName, structure)
    const router = Router()

    if (methods.get?.enabled) {
        router.get("/", async (req: PrimitiveRequest, res) => {
            const queryParams = { ...req.query }
            const keyOnly = queryParams.keyOnly === undefined ? false : parseJSONPrimitive(queryParams.keyOnly)
            if (typeof keyOnly !== "boolean") {
                res.status(HttpStatusCode.BAD_REQUEST).send()
                return
            }
            const primaryKey = Object.keys(queryParams).length == 0 ? undefined : recordPrimaryKey(queryParams, structure)
            try {
                const result = await crud.get({ primaryKey, keyOnly })
                if (result === null) {
                    res.status(HttpStatusCode.NOT_FOUND).send()
                } else {
                    res.send(result)
                }
            } catch (err) {
                if (err instanceof SanitizeError) {
                    res.status(HttpStatusCode.BAD_REQUEST).send()
                } else {
                    throw err
                }
            }
        })
    }

    if (methods.delete?.enabled) {
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

    if (methods.put?.enabled) {
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

    if (methods.post?.enabled) {
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