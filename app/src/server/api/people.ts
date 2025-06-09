import { Router } from "express"
import { createQuery } from "../core/db"
import context from "../context"
import { FreeDocumentIDsEntry } from "../../common/api/people"

const peopleRouter = Router()

peopleRouter.get("/free-documents", async (_, res) => {
    const query = createQuery(
        "SELECT *",
        "FROM `FreeDocumentIDs`",
    )
    const result = await context.db.executeQuery<FreeDocumentIDsEntry[]>(query)
    res.send(result)
})

export default peopleRouter
