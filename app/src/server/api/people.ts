import { Router } from "express"

const peopleRouter = Router()

peopleRouter.get("/test", (_, res) => {
    res.send("world")
})

export default peopleRouter
