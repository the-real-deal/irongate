import { Router } from "express"
import { PEOPLE_STRUCTURE } from "../../common/tables/people"
import { createCRUDRouter } from "./core/crud"

const peopleRouter = Router()

peopleRouter.use("/", createCRUDRouter("People", PEOPLE_STRUCTURE))

export default peopleRouter
