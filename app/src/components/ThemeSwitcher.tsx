import { Select, useColorScheme, Option } from "@mui/joy"
import { BaseProps } from "./utils"
import { FC } from "react"

const ThemeSwitcher: FC<BaseProps> = ({ sx }) => {
    const { mode, setMode } = useColorScheme()
    return (
        <Select
            sx={sx}
            variant="soft"
            value={mode}
            onChange={(_, newMode) => {
                setMode(newMode)
            }}
        >
            <Option value="system">System</Option>
            <Option value="light">Light</Option>
            <Option value="dark">Dark</Option>
        </Select>
    )
}

export default ThemeSwitcher