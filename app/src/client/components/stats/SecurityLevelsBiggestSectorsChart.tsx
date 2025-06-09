import { useEffect, useMemo, useState } from "react"
import { SecurityLevelsBiggestSectorsStats } from "../../../common/api/stats"
import { BaseProps } from "../../core/utils"
import { HttpMethod } from "../../../common/http"
import { fetchJSON } from "../../core/server"
import { Sheet, Table, Typography } from "@mui/joy"

export type SecurityLevelsBiggestSectorChartProps = BaseProps

export default function SecurityLevelsBiggestSectorsChart({
    sx
}: SecurityLevelsBiggestSectorChartProps) {
    const [data, setData] = useState<SecurityLevelsBiggestSectorsStats>([])

    useEffect(() => {
        (async () => {
            const fetchData = await fetchJSON<SecurityLevelsBiggestSectorsStats>(
                HttpMethod.GET,
                "/stats/securitylevels/biggest-sectors",
            )
            setData(fetchData)
        })()
        return () => setData([])
    }, [])

    const groupedData = useMemo(() => {
        const result: {
            [key: SecurityLevelsBiggestSectorsStats[number]["SecurityLevelID"]]: {
                total: SecurityLevelsBiggestSectorsStats[number]["SectorTotalInmates"]
                sectors: SecurityLevelsBiggestSectorsStats[number]["SectorID"][]
            }
        } = {}
        data.forEach(({ SecurityLevelID, SectorID, SectorTotalInmates }) => {
            if (result[SecurityLevelID] === undefined) {
                result[SecurityLevelID] = {
                    total: SectorTotalInmates,
                    sectors: []
                }
            }
            result[SecurityLevelID].sectors.push(SectorID)
        })
        return result
    }, [data])

    return (
        <Sheet variant="outlined" sx={sx}>
            <Table
                variant="soft"
                borderAxis="bothBetween"
                sx={{
                    tableLayout: "auto",
                    overflow: "scroll",
                }}>
                <tbody>
                    {
                        (Object.keys(groupedData) as (keyof typeof groupedData)[]).map(key => (
                            <tr>
                                <td style={{
                                    width: 0,
                                    whiteSpace: "nowrap",
                                    verticalAlign: "top",
                                    backgroundColor: "var(--TableCell-headBackground)"
                                }}>
                                    {key} ({groupedData[key].total} {groupedData[key].total === 1 ? "inmate" : "inmates"})
                                </td>
                                <td>
                                    {
                                        groupedData[key].sectors.map((sectorID) => (
                                            <Typography>{sectorID}</Typography>
                                        ))
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Sheet>
    )
}