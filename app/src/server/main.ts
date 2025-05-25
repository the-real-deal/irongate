import express from "express"
import env from "../common/env"
import ViteExpress from "vite-express"

const app = express()
const router = express.Router()

router.get("/", (_, res) => {
    res.send("hello, world")
})

app.use("/api", router)

const port = env.getRequired("APP_PORT", "number")
ViteExpress.listen(
    app,
    port,
    () => console.log(`Server listening on http://localhost:${port}`)
)
