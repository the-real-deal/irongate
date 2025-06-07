import { useEffect, useState } from "react"
import { BaseProps, chartSlotProps } from "../../core/utils"
import { InmatesReportsTogetherStats } from "../../../common/stats"
import { fetchJSON } from "../../core/server"
import { HttpMethod } from "../../../common/http"
import { Box } from "@mui/joy"
import { BarChart } from "@mui/x-charts"

export type InmatesReportsTogetherChartProps = BaseProps

export default function InmatesReportsTogetherChart({
    sx
}: InmatesReportsTogetherChartProps) {
    const [data, setData] = useState<InmatesReportsTogetherStats>([])

    useEffect(() => {
        (async () => {
            const fetchData = await fetchJSON<InmatesReportsTogetherStats>(
                HttpMethod.GET,
                "/stats/inmates/reports-toghether",
            )
            setData(fetchData)
        })()
        return () => setData([])
    }, [])

    return (
        <Box sx={sx}>
            <BarChart
                height={300}
                layout="horizontal"
                sx={{
                    width: "100%",
                    height: "100%",
                }}
                yAxis={[{
                    data: data.map(({ FirstInmateNumber, SecondInmateNumber }) => `${FirstInmateNumber}, ${SecondInmateNumber}`),
                }]}
                series={[
                    { data: data.map(({ TotalReportsTogether }) => TotalReportsTogether) }
                ]}
                slotProps={chartSlotProps()}
            />
        </Box>
    )
}