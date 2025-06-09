import { Router } from "express"
import { parseJSONPrimitive } from "../../common/json"
import { PrimitiveRequest } from "../middlewares"
import { HttpStatusCode } from "../../common/http"
import context from "../context"
import { createQuery } from "../core/db"
import { ActivitiesPopularityStats, ActivitiesSurveillancesRankingStats, InmatesReportsTogetherStats, SecurityLevelsBiggestSectorsStats, SecurityLevelsTotalInmatesStats } from "../../common/api/stats"

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

statsRouter.get("/securitylevels/biggest-sectors", async (_, res) => {
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

statsRouter.get("/activities/surveillances-ranking", async (req: PrimitiveRequest, res) => {
    const ActivityID = req.query.ActivityID === undefined ? undefined : parseJSONPrimitive(req.query.ActivityID)
    const limit = req.query.limit === undefined ? 3 : parseJSONPrimitive(req.query.limit)
    if (
        ActivityID === undefined ||
        typeof ActivityID !== "string" ||
        typeof limit !== "number" ||
        limit < 1
    ) {
        res.status(HttpStatusCode.BAD_REQUEST).send()
        return
    }
    const query = createQuery(
        "SELECT ",
        [
            "S.`PersonnelID`",
            "COUNT(P.`ID`) AS TotalSurveillances",
        ],
        "FROM `Routines` R",
        "    JOIN `Surveillances` S",
        "        ON R.`ZoneNumber` = S.`RoutineZoneNumber`",
        "        AND R.`ZoneSectorID` = S.`RoutineZoneSectorID`",
        "        AND R.`DateTime` = S.`RoutineDateTime`",
        "    JOIN `Personnel` P ON S.`PersonnelID` = P.`ID`",
        "WHERE",
        "    P.`PersonnelTypeID` = 'Guard'",
        "    AND R.`ActivityID` = ?",
        "GROUP BY",
        [
            "S.`PersonnelID`"
        ],
        "ORDER BY",
        [
            "R.`ActivityID`",
            "TotalSurveillances DESC",
        ],
        `LIMIT ${limit}`,
    )
    const result = await context.db.executeQuery<ActivitiesSurveillancesRankingStats>(query, [ActivityID])
    res.send(result)
})

statsRouter.get("/inmates/reports-toghether", async (_, res) => {
    const query = createQuery(
        "SELECT",
        [
            "LEAST(E1.`InmateNumber`, E2.`InmateNumber`) AS FirstInmateNumber",
            "GREATEST(E1.`InmateNumber`, E2.`InmateNumber`) AS SecondInmateNumber",
            "COUNT(DISTINCT E1.`ReportID`) AS TotalReportsTogether",
        ],
        "FROM `EngagedInmates` E1",
        "    JOIN `EngagedInmates` E2 ON E1.`ReportID` = E2.`ReportID`",
        "WHERE E1.`InmateNumber` <> E2.`InmateNumber`",
        "GROUP BY",
        [
            "FirstInmateNumber",
            "SecondInmateNumber",
        ],
        "ORDER BY",
        [
            "TotalReportsTogether DESC",
        ],
    )
    const result = await context.db.executeQuery<InmatesReportsTogetherStats>(query)
    res.send(result)
})

export default statsRouter
