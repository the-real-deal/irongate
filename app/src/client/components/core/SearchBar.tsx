import { useEffect, useState } from "react"
import { BaseProps } from "../../api/utils"
import { Input } from "@mui/joy"

export interface SearchBarProps extends BaseProps {
    onChange: (value: string) => void,
    delay?: number
}

export default function SearchBar({ onChange, delay = 200, sx }: SearchBarProps) {
    const [value, setValue] = useState("")

    useEffect(() => {
        const handler = setTimeout(() => {
            onChange(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay, onChange])

    return (
        <Input
            placeholder="Search"
            value={value}
            onChange={(e) => {
                setValue(e.target.value)
            }}
            sx={sx}
        />
    )
}