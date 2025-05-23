import { Snackbar, SnackbarCloseReason } from "@mui/joy"
import { SyntheticEvent } from "react"

export interface Props {
    error: Error | null
    onClose: (event: SyntheticEvent<any> | Event | null, reason: SnackbarCloseReason) => void
}

export default function ErrorNotification({ error, onClose }: Props) {
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