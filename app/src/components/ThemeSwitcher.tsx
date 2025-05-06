import { Select, useColorScheme, Option } from "@mui/joy"
import { useEffect, useState } from "react"

export default function ThemeSwitcher() {
    const { mode, setMode } = useColorScheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }
    return (
        <Select
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