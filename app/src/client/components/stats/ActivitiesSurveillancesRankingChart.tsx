import { Box, Option, Select, Slider, Typography } from "@mui/joy"
import { BaseProps, chartSlotProps } from "../../core/utils"
import { useEffect, useState } from "react"
import { ActivitiesSurveillancesRankingStats } from "../../../common/stats"
import { fetchJSON } from "../../core/server"
import { HttpMethod } from "../../../common/http"
import { PieChart } from "@mui/x-charts"
import { RoutinesEntry } from "../../../common/structures"
import { useActivitiesReference } from "../../core/tables"

const DEFAULT_LIMIT = 3

export type ActivitiesSurveillancesRankingChartProps = BaseProps

export default function ActivitiesSurveillancesRankingChartChart({
    sx
}: ActivitiesSurveillancesRankingChartProps) {
    const [ActivityID, setActivityID] = useState<RoutinesEntry["ActivityID"] | null>(null)
    const [limit, setLimit] = useState<number>(DEFAULT_LIMIT)
    const activities = useActivitiesReference()
    const [data, setData] = useState<ActivitiesSurveillancesRankingStats>([])

    useEffect(() => {
        (async () => {
            if (ActivityID === null) {
                setData([])
            } else {
                const fetchData = await fetchJSON<ActivitiesSurveillancesRankingStats>(
                    HttpMethod.GET,
                    "/stats/activities/surveillances-ranking",
                    {
                        params: { ActivityID, limit }
                    }
                )
                setData(fetchData)
            }
        })()
        return () => setData([])
    }, [ActivityID, limit])

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            gap: "1em",
            ...sx
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                // width: "fit-content",
                gap: "1em",
            }}>
                <Typography>Activity</Typography>
                <Select
                    value={ActivityID}
                    placeholder="Select an activity"
                    onChange={(_, value) => setActivityID(value)}>
                    {
                        activities.ID.map(id => <Option value={id}>{id}</Option>)
                    }
                </Select>
                <Typography>Limit</Typography>
                <Slider
                    marks
                    value={limit}
                    valueLabelDisplay="auto"
                    min={1}
                    max={20}
                    sx={{
                        marginInlineEnd: "1%"
                    }}
                    onChange={(_, value) => {
                        if (Array.isArray(value)) {
                            return
                        }
                        setLimit(
                            isNaN(value) ?
                                DEFAULT_LIMIT :
                                value < 1 ? 1 : value
                        )
                    }}
                />
            </Box>
            <PieChart
                height={300}
                sx={{
                    maxWidth: "100%",
                }}
                series={[
                    {
                        data: data.map(({ PersonnelID, TotalSurveillances }) => ({
                            id: PersonnelID,
                            value: TotalSurveillances,
                            label: PersonnelID,
                        })),
                    },
                ]}
                slotProps={chartSlotProps()}
            />
        </Box>
    )
}
