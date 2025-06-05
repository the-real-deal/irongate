import Select, { SelectStaticProps } from '@mui/joy/Select'
import IconButton from '@mui/joy/IconButton'
import { MdClose } from 'react-icons/md'
import { BaseProps } from '../core/utils'
import { useEffect, useRef, useState } from 'react'
import { Option } from '@mui/joy'
import { ColumnValue } from '../../common/db'

// https://mui.com/joy-ui/react-select/#clear-action

export interface ControlledSelectProps<T extends ColumnValue> extends BaseProps {
    values: T[]
    placeholder?: string
    required?: boolean
    defaultValue?: T | null,
    onChange?: (value: T | null) => void
}

export default function ControlledSelect<T extends ColumnValue>({
    values,
    placeholder,
    required = false,
    defaultValue = null,
    onChange,
    sx,
}: ControlledSelectProps<T>) {
    const [value, setValue] = useState<T | null>(defaultValue)
    const action: SelectStaticProps['action'] = useRef(null)

    useEffect(() => {
        (async () => {
            if (onChange !== undefined) {
                await onChange(value)
            }
        })()
    }, [onChange, value])

    return (
        <Select
            action={action}
            value={value}
            required={required}
            placeholder={placeholder}
            onChange={(_, newValue) => setValue(newValue as T | null)}
            {...(!required && value && {
                // display the button and remove select indicator
                // when user has selected a value
                endDecorator: (
                    <IconButton
                        size="sm"
                        variant="plain"
                        color="neutral"
                        onMouseDown={(event) => {
                            // don't open the popup when clicking on this button
                            event.stopPropagation()
                        }}
                        onClick={() => {
                            setValue(null)
                            action.current?.focusVisible()
                        }}>
                        <MdClose />
                    </IconButton>
                ),
                indicator: null,
            })}
            sx={sx}>
            {
                values.map(x => <Option value={x}>{x}</Option>)
            }
        </Select>
    )
}
