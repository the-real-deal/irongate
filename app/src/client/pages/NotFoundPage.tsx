import { Button, Sheet, Typography } from "@mui/joy"

export default function NotFountPage() {
    return (
        <Sheet sx={{
            height: "100dvh",
            width: "100dvw",
            display: "flex",
            flexDirection: "column",
            gap: "2em",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Typography level="h1">Page not found</Typography>
            <Button
                component="a"
                href="/">
                Return to home
            </Button>
        </Sheet>
    )
}