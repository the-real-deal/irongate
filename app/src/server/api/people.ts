import { Router } from "express"
import people from "../tables/people"
import { PrimitiveRequest } from "../middlewares"
import { HttpStatusCode } from "../../common/http"
import utils from "../../common/utils"

const peopleRouter = Router()

peopleRouter.get("/", async (req: PrimitiveRequest, res) => {
    const id = req.query.id
    res.send(await people.get(id))
})

peopleRouter.delete("/", async (req: PrimitiveRequest, res) => {
    const id = req.query.id
    if (id === undefined) {
        res.status(HttpStatusCode.BAD_REQUEST).send("Missing query parameter id")
        return
    }
    const ok = await people.remove(id)
    if (ok) {
        res.status(HttpStatusCode.OK).send()
    } else {
        res.status(HttpStatusCode.NOT_FOUND).send(`id ${id} not found`)
    }
})

peopleRouter.put("/", async (req: PrimitiveRequest, res) => {
    const id = req.query.id
    if (id === undefined) {
        res.status(HttpStatusCode.BAD_REQUEST).send("Missing query parameter id")
        return
    } else if (req.body === undefined || !utils.isPlainObject(req.body)) {
        res.status(HttpStatusCode.BAD_REQUEST).send(`Invalid body ${req.body}`)
        return
    }
    const ok = await people.update(id, req.body)
    if (ok) {
        res.status(HttpStatusCode.OK).send()
    } else {
        res.status(HttpStatusCode.NOT_FOUND).send(`id ${id} not found`)
    }
})

peopleRouter.post("/", async (req: PrimitiveRequest, res) => {
    if (req.body === undefined || !utils.isPlainObject(req.body)) {
        res.status(HttpStatusCode.BAD_REQUEST).send(`Invalid body ${req.body}`)
        return
    }
    await people.create(req.body)
    res.status(HttpStatusCode.OK).send()
})

export default peopleRouter
