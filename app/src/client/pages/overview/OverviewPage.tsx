import { Box, Typography } from "@mui/joy"
import { useEffect, useState } from "react"

export default function OverviewPage() {
    const [person, setPerson] = useState<string | null>(null)

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/people/test")
            setPerson(await res.text())
        })()
    }, [])

    return (
        <Box>
            <Typography level="h1">Overview</Typography>
            <Typography level="title-lg">Hello, {person}</Typography>
        </Box>
    )
}
