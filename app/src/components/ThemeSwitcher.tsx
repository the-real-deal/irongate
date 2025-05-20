import { Select, useColorScheme, Option } from "@mui/joy"
import { SxProps } from "@mui/material"

interface Props {
    sx?: SxProps
}

export default function ThemeSwitcher({ sx }: Props) {
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