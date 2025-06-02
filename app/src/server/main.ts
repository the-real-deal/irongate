import express, { Router } from "express"
import env from "../common/env"
import peopleRouter from "./api/people"
import ViteExpress from "vite-express"
import { HTTPError, HttpStatusCode } from "../common/http"
import { jsonErrors, logs, primitiveRequest } from "./middlewares"
import enumsRouter from "./api/enums"
import cellsRouter from "./api/infrastructure/cells"
import inmatesRouter from "./api/inmates/inmates"
import sectorsRouter from "./api/infrastructure/sectors"
import movementsRouter from "./api/inmates/movements"

const app = express()
const router = Router()
router.use(logs())
router.use(primitiveRequest())

router.use("/enums", enumsRouter)
router.use("/people", peopleRouter)
router.use("/sectors", sectorsRouter)
router.use("/cells", cellsRouter)
router.use("/inmates", inmatesRouter)
router.use("/movements", movementsRouter)

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
