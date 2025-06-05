import { Router } from "express"
import { parseJSONPrimitive } from "../../common/json"
import { PrimitiveRequest } from "../middlewares"
import { HttpStatusCode } from "../../common/http"
import context from "../context"
import { createQuery } from "../core/db"
import { ActivitiesPopularityStats } from "../../common/stats"

const statsRouter = Router()

statsRouter.get("/activities-popularity", async (req: PrimitiveRequest, res) => {
    const from = req.query.from === undefined ? 0 : parseJSONPrimitive(req.query.from)
    const to = req.query.to === undefined ? 0 : parseJSONPrimitive(req.query.to)
    if (typeof from !== "number" || typeof to !== "number") {
        res.status(HttpStatusCode.BAD_REQUEST).send()
        return
    }
    const query = createQuery(
        "SELECT",
        [
            "R.`ActivityID`",
            "COUNT(R.`ActivityID`) AS Popularity",
        ],
        "FROM `Routines` R",
        "WHERE HOUR(R.`DateTime`) BETWEEN ? AND ?",
        "GROUP BY R.`ActivityID`",
        "ORDER BY Popularity DESC",
    )
    const result = await context.db.executeQuery<ActivitiesPopularityStats>(query, [from, to])
    res.send(result)
})

statsRouter.get("/securitylevels-totalinmates", async (_, res) => {
    const query = createQuery(
        "SELECT",
        [
            "S.`SecurityLevelID`",
            "SUM(S.`TotalInmates`) as TotalInmates",
        ],
        "FROM `Sectors` S",
        "GROUP BY S.`SecurityLevelID`",
    )
    const result = await context.db.executeQuery<ActivitiesPopularityStats>(query)
    res.send(result)
})

export default statsRouter
