import { ErrorRequestHandler, json, Request, RequestHandler } from "express"
import type { ParamsDictionary } from 'express-serve-static-core'
import { HTTPError, HttpStatusCode } from "../common/http"
import { JSONType } from "../common/json"

export function logRequest(): RequestHandler {
    return (req, _res, next) => {
        console.log(`[Request] ${req.method} ${req.originalUrl}`)
        console.log('Headers:', req.headers)
        if (req.body) console.log('Body:', req.body)
        next()
    }
}

export type PrimitiveRequest<
    P = ParamsDictionary,
    ResBody = JSONType,
    ReqBody = JSONType | undefined,
    ReqQuery = {
        [key: string]: string | undefined
    }
> = Request<P, ResBody, ReqBody, ReqQuery>

export function primitiveRequest(): RequestHandler {
    const jsonMiddleware = json()
    return (req, res, next) => {
        jsonMiddleware(req, res, (err) => {
            if (err) {
                return next(err)
            }
            for (const [key, val] of Object.entries(req.query)) {
                if (
                    val !== undefined &&
                    typeof val !== "string"
                ) {
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
