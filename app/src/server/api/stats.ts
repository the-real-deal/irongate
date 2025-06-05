import { Router } from "express"
import { parseJSONPrimitive } from "../../common/json"
import { PrimitiveRequest } from "../middlewares"
import { HttpStatusCode } from "../../common/http"
import context from "../context"
import { createQuery } from "../core/db"
import { ActivitiesPopularityStats, SecurityLevelsBiggestSectorsStats, SecurityLevelsTotalInmatesStats } from "../../common/stats"

const statsRouter = Router()

statsRouter.get("/activities/popularity", async (req: PrimitiveRequest, res) => {
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

statsRouter.get("/securitylevels/total-inmates", async (_, res) => {
    const query = createQuery(
        "SELECT",
        [
            "S.`SecurityLevelID`",
            "SUM(S.`TotalInmates`) as TotalInmates",
        ],
        "FROM `Sectors` S",
        "GROUP BY S.`SecurityLevelID`",
    )
    const result = await context.db.executeQuery<SecurityLevelsTotalInmatesStats>(query)
    res.send(result)
})

statsRouter.use("/securitylevels/biggest-sectors", async (_, res) => {
    const query = createQuery(
        "SELECT",
        [
            "S1.`SecurityLevelID`",
            "S1.`ID` AS SectorID",
            "S1.`TotalInmates` AS SectorTotalInmates",
        ],
        "FROM `Sectors` S1",
        "WHERE S1.`TotalInmates` = (",
        "    SELECT MAX(S2.`TotalInmates`)",
        "    FROM `Sectors` S2",
        "    WHERE S2.`SecurityLevelID` = S1.`SecurityLevelID`",
        ")",
    )
    const result = await context.db.executeQuery<SecurityLevelsBiggestSectorsStats>(query)
    res.send(result)
})

export default statsRouter
