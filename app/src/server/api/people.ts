import { Router } from "express"
import people from "../tables/people"
import { PrimitiveRequest } from "../middlewares"

const peopleRouter = Router()

peopleRouter.get("/", async (req: PrimitiveRequest, res) => {
    const id = req.query.id
    res.send(await people.get(id))
})

export default peopleRouter
