import { Box, Typography } from "@mui/joy"
import ActivitiesPopularity from "../../components/stats/ActivitiesPopularity"

export default function OverviewPage() {
    return (
        <Box>
            <Typography level="h1">Overview</Typography>
            <ActivitiesPopularity sx={{
                height: "20dvh"
            }} />
        </Box>
    )
}
