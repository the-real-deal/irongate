import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Input from '@mui/joy/Input'
import { BaseProps } from '../api/utils'
import { Box } from '@mui/joy'

export interface JoyDatePickerProps extends BaseProps {
    defaultValue: Date
    placeholder?: string
    showTimeSelect?: boolean
    onChange: (value: Date) => void
}

export default function JoyDatePicker({
    defaultValue,
    placeholder,
    showTimeSelect = false,
    sx,
}: JoyDatePickerProps) {
    const [value, setValue] = useState(defaultValue)

    return (
        <Box sx={{
            "&, & > .react-datepicker-wrapper": {
                width: "100%"
            },
            ...sx
        }}>
            <DatePicker
                showTimeSelect={showTimeSelect}
                selected={new Date(value)}
                onChange={(date) => setValue(date!)}
                customInput={<Input placeholder={placeholder} />}
            />
        </Box>
    )
}
