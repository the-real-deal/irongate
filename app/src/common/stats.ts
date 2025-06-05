import { ActivitiesEntry } from "./structures"

export type ActivitiesPopularityStats = {
    ActivityID: ActivitiesEntry["ID"]
    Popularity: number
}[]