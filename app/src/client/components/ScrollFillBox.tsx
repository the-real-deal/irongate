import { Box } from "@mui/joy"
import { BaseProps } from "../core/utils"
import { PropsWithChildren } from "react"

export type ScrollFillBox = PropsWithChildren<BaseProps>

export default function ScrollFillBox({
    sx,
    children,
}: ScrollFillBox) {
    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "1em",
            justifyContent: "space-between",
            "& > *": {
                flex: 1,
            },
            ...sx,
        }}>
            {children}
        </Box>
    )
}