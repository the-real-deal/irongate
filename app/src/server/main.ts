import express, { Router } from "express"
import env from "../common/env"
import ViteExpress from "vite-express"
import { HTTPError, HttpStatusCode } from "../common/http"
import { jsonErrors, logs, primitiveRequest } from "./middlewares"
import { TABLE_DAOS } from "./api/tableDAO"
import statsRouter from "./api/stats"

const app = express()
const router = Router()
router.use(logs())
router.use(primitiveRequest())

for (const dao of TABLE_DAOS) {
    router.use(dao.route, dao.router)
}

router.use("/stats", statsRouter)

router.use((_req, _res, next) => {
    next(new HTTPError(HttpStatusCode.NOT_FOUND, "Not Found"))
})
router.use(jsonErrors())

app.use("/api", router)

const port = env.getRequired("APP_PORT", "number")
ViteExpress.listen(
    app,
    port,
    () => console.log(`Server listening on http://localhost:${port}`)
)
