import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Input from '@mui/joy/Input'
import { BaseProps } from '../core/utils'
import { Box } from '@mui/joy'

export interface JoyDatePickerProps extends BaseProps {
    includeTime: boolean
    defaultValue?: Date | null
    placeholder?: string
    required?: boolean
    dateFormat: string
    timeFormat: string
    onChange: (value: Date | null) => void
}

export default function ControlledDatePicker({
    defaultValue = null,
    placeholder,
    includeTime,
    required = false,
    dateFormat,
    timeFormat,
    onChange,
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
                showTimeSelect={includeTime}
                selected={value}
                placeholderText={placeholder}
                required={required}
                dateFormat={dateFormat}
                timeFormat={timeFormat}
                onChange={async date => {
                    setValue(date)
                    await onChange(date)
                }}
                customInput={<Input />}
            />
        </Box>
    )
}
