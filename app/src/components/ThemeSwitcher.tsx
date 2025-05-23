import { Select, useColorScheme, Option } from "@mui/joy"
import { FC } from "react"
import { BaseProps } from "../api/ui/components"

const ThemeSwitcher: FC<BaseProps> = ({ sx }) => {
    const { mode, setMode } = useColorScheme()
    return (
        <Select
            sx={{
                "&:hover, &:hover:not(.Mui-selected)": {
                    // backgroundColor: "neutral.500"
                },
                ...sx
            }}
            variant="outlined"
            color="primary"
            value={mode}
            onChange={(_, newMode) => {
                setMode(newMode)
            }}
        >
            <Option
                sx={{
                    "&:hover, &:hover:not(.Mui-selected)": {
                        // backgroundColor: "neutral.500"
                    }
                }}
                value="system">
                System
            </Option>
            <Option
                sx={{
                    "&:hover, &:hover:not(.Mui-selected)": {
                        // backgroundColor: "neutral.500"
                    }
                }}
                value="light">
                Light
            </Option>
            <Option
                sx={{
                    "&:hover, &:hover:not(.Mui-selected)": {
                        // backgroundColor: "neutral.500"
                    }
                }}
                value="dark">
                Dark
            </Option>
        </Select >
    )
}

export default ThemeSwitcher