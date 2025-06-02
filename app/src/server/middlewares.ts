import { ErrorRequestHandler, json, Request, RequestHandler } from "express"
import type { ParamsDictionary } from 'express-serve-static-core'
import { HTTPError, HttpStatusCode } from "../common/http"
import { JSONType } from "../common/json"
import utils from "../common/utils"

export function logs(): RequestHandler {
    return (req, res, next) => {
        const id = utils.generateUUID()
        const start = Date.now()
        console.log(`[Request ${id}]`)
        console.log("Method:", req.method)
        console.log("Original URL:", req.originalUrl)
        console.log("Headers:", req.headers)
        console.log("Body:", req.body)
        res.on("finish", () => {
            console.log(`[Response ${id}]`)
            console.log("Status:", res.statusCode)
            console.log("Headers:", res.getHeaders())
            console.log(`Elapsed time: ${Date.now() - start}ms`)
        })
        next()
    }
}

export type PrimitiveRequest<
    P = ParamsDictionary,
    ResBody = JSONType,
    ReqBody = JSONType | undefined,
    ReqQuery = Record<string, string>,
> = Request<P, ResBody, ReqBody, ReqQuery>

export function primitiveRequest(): RequestHandler {
    const jsonMiddleware = json()
    return (req, res, next) => {
        jsonMiddleware(req, res, (err) => {
            if (err) {
                return next(err)
            }
            for (const [key, val] of Object.entries(req.query)) {
                if (val === undefined) {
                    delete req.query[key]
                } else if (typeof val !== "string") {
                    return next(new HTTPError(HttpStatusCode.BAD_REQUEST, `Invalid type for parameter ${key}: ${typeof val}`))
                }
            }
            next()
        })
    }
}

export function jsonErrors(): ErrorRequestHandler {
    return ((err, _req, res, _next) => {
        const status = err.status || 500
        const message = err.message || "Internal Server Error"
        res.status(status).json({ status, message })
    }) as ErrorRequestHandler
}
