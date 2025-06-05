import { TableEntry } from "./db"
import { ActivitiesEntry, EnumEntry, SectorsEntry } from "./structures"

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
