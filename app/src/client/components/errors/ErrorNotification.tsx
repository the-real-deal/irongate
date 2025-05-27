import { Snackbar, SnackbarCloseReason } from "@mui/joy"
import { SyntheticEvent } from "react"

export interface ErrorNotificationProps {
    error: Error | null
    onClose: (event: SyntheticEvent | Event | null, reason: SnackbarCloseReason) => void
}

export default function ErrorNotification({ error, onClose }: ErrorNotificationProps) {
    return (
        <Snackbar
            open={error !== null}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}
            onClose={onClose}
            color="danger"
            variant="solid"
        >
            {error?.message}
        </Snackbar>
    )
}