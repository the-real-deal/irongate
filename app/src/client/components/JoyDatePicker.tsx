import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Input from '@mui/joy/Input'
import { BaseProps } from '../api/utils'
import { Box } from '@mui/joy'
import { MYSQL_DATE_FORMAT, MYSQL_TIME_FORMAT } from '../../common/dates'

export interface JoyDatePickerProps extends BaseProps {
    timeSelect: boolean
    defaultValue?: Date
    placeholder?: string
    onChange: (value: Date) => void
}

export default function JoyDatePicker({
    defaultValue,
    placeholder,
    timeSelect,
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
                showTimeSelect={timeSelect}
                selected={value}
                dateFormat={MYSQL_DATE_FORMAT}
                timeFormat={MYSQL_TIME_FORMAT}
                onChange={date => {
                    if (date === null) {
                        throw new Error("Invalid date")
                    }
                    setValue(date)
                    onChange(date)
                }}
                customInput={<Input placeholder={placeholder} />}
            />
        </Box>
    )
}
