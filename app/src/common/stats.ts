import { ActivitiesEntry, SectorsEntry } from "./structures"

export type ActivitiesPopularityStats = {
    ActivityID: ActivitiesEntry["ID"]
    Popularity: number
}[]

export type SecurityLevelsTotalInmatesStats = {
    SecurityLevelID: SectorsEntry["SecurityLevelID"]
    TotalInmates: number
}[]