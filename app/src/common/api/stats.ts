import { TableEntry } from "../db"
import { ActivitiesEntry, EngagedInmatesEntry, EnumEntry, SectorsEntry, SurveillancesEntry } from "../structures"

export type ActivitiesPopularityStats = TableEntry<{
    ActivityID: ActivitiesEntry["ID"]
    Popularity: number
}>[]

export type SecurityLevelsTotalInmatesStats = TableEntry<{
    SecurityLevelID: EnumEntry["ID"]
    TotalInmates: number
}>[]

export type SecurityLevelsBiggestSectorsStats = TableEntry<{
    SecurityLevelID: EnumEntry["ID"]
    SectorID: SectorsEntry["ID"]
    SectorTotalInmates: SectorsEntry["TotalInmates"]
}>[]

export type ActivitiesSurveillancesRankingStats = TableEntry<{
    PersonnelID: SurveillancesEntry["PersonnelID"]
    TotalSurveillances: number
}>[]

export type InmatesReportsTogetherStats = TableEntry<{
    FirstInmateNumber: EngagedInmatesEntry["InmateNumber"]
    SecondInmateNumber: EngagedInmatesEntry["InmateNumber"]
    TotalReportsTogether: number
}>[]
