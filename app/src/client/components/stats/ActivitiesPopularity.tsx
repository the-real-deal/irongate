import { Box, Select, Option, Typography } from "@mui/joy"
import { BaseProps, chartSlotProps } from "../../core/utils"
import { useEffect, useState } from "react"
import { ActivitiesPopularityStats } from "../../../common/stats"
import { fetchJSON } from "../../core/server"
import { HttpMethod } from "../../../common/http"
import { PieChart } from "@mui/x-charts"

const FIRST_HOUR = 0
const LAST_HOUR = 23
const HOURS = Array.from({ length: LAST_HOUR - FIRST_HOUR + 1 }, (_, i) => FIRST_HOUR + i)

function hoursOptions() {
    return HOURS.map(h => (
        <Option value={h}>{h.toString().padStart(2, "0")}:00</Option>
    ))
}

export type ActivitiesPopularityProps = BaseProps

export default function ActivitiesPopularity({
    sx
}: ActivitiesPopularityProps) {
    const [from, setFrom] = useState(FIRST_HOUR)
    const [to, setTo] = useState(LAST_HOUR)
    const [data, setData] = useState<ActivitiesPopularityStats>([])

    useEffect(() => {
        (async () => {
            const fetchData = await fetchJSON<ActivitiesPopularityStats>(
                HttpMethod.GET,
                "/stats/popular-activities",
                {
                    params: { from, to }
                }
            )
            setData(fetchData)
        })()
        return () => setData([])
    }, [from, to])

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            gap: "1em",
            ...sx
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                gap: "1em",
            }}>
                <Typography level="h3">Activities popularity</Typography>
                <Typography>From</Typography>
                <Select
                    value={from}
                    onChange={(_, value) => setFrom(value ?? FIRST_HOUR)}>
                    {hoursOptions()}
                </Select>
                <Typography>To</Typography>
                <Select
                    value={to}
                    onChange={(_, value) => setTo(value ?? LAST_HOUR)}>
                    {hoursOptions()}
                </Select>
            </Box>
            <PieChart
                sx={{
                    flex: 1,
                    width: "fit-content",
                }}
                series={[
                    {
                        data: data.map(({ ActivityID, Popularity }) => ({
                            id: ActivityID,
                            value: Popularity,
                            label: ActivityID,
                        })),
                    },
                ]}
                slotProps={chartSlotProps()}
            />
        </Box>
    )
}
