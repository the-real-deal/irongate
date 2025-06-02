import Select, { SelectStaticProps } from '@mui/joy/Select'
import IconButton from '@mui/joy/IconButton'
import { MdClose } from 'react-icons/md'
import { BaseProps } from '../core/utils'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'

// https://mui.com/joy-ui/react-select/#clear-action

export interface ClearableSelectProps<T> extends BaseProps {
    placeholder?: string
    defaultValue?: T | null,
    onChange?: (value: T | null) => void
}

export default function ClearableSelect<T>({
    placeholder,
    defaultValue = null,
    onChange,
    sx,
    children,
}: PropsWithChildren<ClearableSelectProps<T>>) {
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
            multiple={false}
            placeholder={placeholder}
            onChange={(_, newValue) => setValue(newValue as T | null)}
            sx={sx}
            {...(value && {
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
            })}>
            {children}
        </Select>
    )
}
