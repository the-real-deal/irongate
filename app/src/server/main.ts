import express, { Router } from "express"
import env from "../common/env"
import peopleRouter from "./api/people"
import ViteExpress from "vite-express"

const app = express()
const router = Router()

router.use("/people", peopleRouter)

app.use("/api", router)

const port = env.getRequired("APP_PORT", "number")
ViteExpress.listen(
    app,
    port,
    () => console.log(`Server listening on http://localhost:${port}`)
)
