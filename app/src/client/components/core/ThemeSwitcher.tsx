import { Select, useColorScheme, Option } from "@mui/joy"
import { BaseProps } from "../../utils"

export default function ThemeSwitcher({ sx }: BaseProps) {
    const { mode, setMode } = useColorScheme()
    return (
        <Select
            sx={sx}
            variant="outlined"
            color="primary"
            value={mode}
            onChange={(_, newMode) => {
                setMode(newMode)
            }}
        >
            <Option value="system">
                System
            </Option>
            <Option value="light">
                Light
            </Option>
            <Option value="dark">
                Dark
            </Option>
        </Select >
    )
}
