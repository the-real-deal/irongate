import { Box, Button, Typography } from "@mui/joy"

export default function OverviewPage() {
    return (
        <Box>
            <Typography level="h1">Overview</Typography>
            <Button onClick={() => { throw new Error("Test error") }}>get error</Button>
        </Box>
    )
}
