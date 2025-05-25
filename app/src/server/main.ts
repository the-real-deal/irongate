import express, { Router } from "express"
import env from "../common/env"
import peopleRouter from "./api/people"
import ViteExpress from "vite-express"
import { HTTPError, HttpStatusCode } from "../common/http"
import { jsonErrors, logRequest, primitiveRequest } from "./middlewares"

const app = express()
const router = Router()
router.use(logRequest())
router.use(primitiveRequest())

router.use("/people", peopleRouter)

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
