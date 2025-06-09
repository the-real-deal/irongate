import express, { Router } from "express"
import env from "../common/env"
import ViteExpress from "vite-express"
import { HTTPError, HttpStatusCode } from "../common/http"
import { jsonErrors, logs, primitiveRequest } from "./middlewares"
import statsRouter from "./api/stats"
import crudRouter from "./api/crud"
import peopleRouter from "./api/people"

const app = express()
const router = Router()
router.use(logs())
router.use(primitiveRequest())

router.use("/crud", crudRouter)
router.use("/people", peopleRouter)
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
