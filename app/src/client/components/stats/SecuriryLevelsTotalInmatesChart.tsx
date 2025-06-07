import { useEffect, useState } from "react"
import { BaseProps, chartSlotProps } from "../../core/utils"
import { SecurityLevelsTotalInmatesStats } from "../../../common/stats"
import { fetchJSON } from "../../core/server"
import { HttpMethod } from "../../../common/http"
import { Box } from "@mui/joy"
import { BarChart } from "@mui/x-charts"

export type SecurityLevelsTotalInmatesChartProps = BaseProps

export default function SecurityLevelsTotalInmatesChart({
    sx
}: SecurityLevelsTotalInmatesChartProps) {
    const [data, setData] = useState<SecurityLevelsTotalInmatesStats>([])

    useEffect(() => {
        (async () => {
            const fetchData = await fetchJSON<SecurityLevelsTotalInmatesStats>(
                HttpMethod.GET,
                "/stats/securitylevels/total-inmates",
            )
            setData(fetchData)
        })()
        return () => setData([])
    }, [])

    return (
        <Box sx={sx}>
            <BarChart
                height={300}
                xAxis={[{ data: data.map(({ SecurityLevelID }) => SecurityLevelID) }]}
                series={[
                    { data: data.map(({ TotalInmates }) => TotalInmates) }
                ]}
                slotProps={chartSlotProps()}
            />
        </Box>
    )
}