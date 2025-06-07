import { Box, Divider, Sheet, Typography } from "@mui/joy"
import ActivitiesPopularityChart from "../../components/stats/ActivitiesPopularityChart"
import SecurityLevelsTotalInmatesChart from "../../components/stats/SecuriryLevelsTotalInmatesChart"
import SecurityLevelsBiggestSectorsChart from "../../components/stats/SecurityLevelsBiggestSectorsChart"
import ActivitiesSurveillancesRankingChartChart from "../../components/stats/ActivitiesSurveillancesRankingChart"
import InmatesReportsTogetherChart from "../../components/stats/InmatesReportsTogetherChart"

export default function OverviewPage() {
    return (
        <Sheet sx={{
            maxHeight: "100%",
            overflow: "scroll",
        }}>
            <Typography
                level="h1"
                paddingBottom={"1em"}>
                Overview
            </Typography>
            <Typography
                level="h3"
                paddingBottom={".5em"}>
                Activities popularity
            </Typography>
            <ActivitiesPopularityChart />
            <Divider sx={{ marginBlock: "2em" }} />
            <Typography
                level="h3"
                paddingBottom={".5em"}>
                Activities surveillances ranking
            </Typography>
            <ActivitiesSurveillancesRankingChartChart />
            <Divider sx={{ marginBlock: "2em" }} />
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                maxHeight: "min-content",
            }}>
                <Box sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "50%",
                }}>
                    <Typography
                        level="h3"
                        paddingBottom={".5em"}>
                        Total inmates per security level
                    </Typography>
                    <SecurityLevelsTotalInmatesChart />
                </Box>
                <Box sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <Typography
                        level="h3"
                        paddingBottom={".5em"}>
                        Biggest sectors per security level
                    </Typography>
                    <SecurityLevelsBiggestSectorsChart />
                </Box>
            </Box>
            <Divider sx={{ marginBlock: "2em" }} />
            <Typography
                level="h3"
                paddingBottom={".5em"}>
                Inmates total reports together
            </Typography>
            <InmatesReportsTogetherChart />
        </Sheet>
    )
}
