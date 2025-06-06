import { ReactNode } from "react"
import { ColumnValue, TableEntry, TableRecord, TableStructure } from "../../common/db"
import { Input, Textarea, Checkbox } from "@mui/joy"
import dates, { MYSQL_DATE_FORMAT, MYSQL_DATETIME_FORMAT, MYSQL_TIME_FORMAT } from "../../common/dates"
import ControlledDatePicker from "../components/ControlledDatePicker"
import { BaseProps } from "./utils"
import ControlledSelect from "../components/ControlledSelect"

export interface KeyDisplay<T extends TableEntry<TableRecord>, K extends keyof T> {
    title: string
    inputNode: (key: K, title: string, value: T[K] | undefined, edits: Partial<T>) => ReactNode
}

export type TableDisplay<T extends TableEntry<TableRecord>> = {
    tableTitle: string,
    detailTitle: string,
    keys: {
        [K in keyof T]: KeyDisplay<T, K>
    }
}

export function createDisplay<T extends TableEntry<TableRecord>>(
    structure: TableStructure<T>,
    {
        tableTitle,
        detailTitle,
        keys,
    }: {
        tableTitle?: TableDisplay<T>["tableTitle"]
        detailTitle?: TableDisplay<T>["detailTitle"]
        keys: {
            [K in keyof T]: Omit<KeyDisplay<T, K>, "title" | "inputNode"> & {
                title?: KeyDisplay<T, K>["title"]
                inputNode?: KeyDisplay<T, K>["inputNode"]
            }
        }
    }): TableDisplay<T> {
    const filledKeys = Object.fromEntries(
        (Object.keys(keys) as (keyof T)[]).map(key => {
            const title = keys[key].title ?? key.toString()
            const inputNode = keys[key].inputNode ?? (() => null)
            return [key, { title, inputNode }]
        })
    )

    tableTitle ??= structure.table
    detailTitle ??= tableTitle

    return {
        tableTitle,
        detailTitle,
        keys: filledKeys as { [K in keyof T]: typeof filledKeys[string] }
    }
}

function transformStringValue(value: string): string | null {
    return value.length === 0 ? null : value
}

export function sortPartialFilledKeys<T extends TableEntry<TableRecord>>(data: Partial<T>) {
    return (k1: keyof T, k2: keyof T) => {
        if (data[k1] === undefined && data[k2] !== undefined) {
            return 1
        }
        if (data[k1] !== undefined && data[k2] === undefined) {
            return -1
        }
        return 0
    }
}

export function stringInputNode<T extends TableEntry<TableRecord>, K extends keyof T>({
    required = true,
    onChange,
    sx,
}: {
    required?: boolean
    onChange?: (value: T[K] | null) => void
} & BaseProps = {}) {
    return (
        key: K,
        title: string,
        value: T[K] extends string | null | undefined ? string | null | undefined : never,
        edits: Partial<T>
    ) => (
        <Input
            placeholder={title + (required ? " *" : "")}
            defaultValue={value ?? undefined}
            required={required}
            sx={sx}
            onChange={async e => {
                const value = transformStringValue(e.target.value) as T[K]
                edits[key] = value
                if (onChange !== undefined) {
                    await onChange(value)
                }
            }}
        />
    )
}

export function numberInputNode<T extends TableEntry<TableRecord>, K extends keyof T>({
    required = true,
    onChange,
    sx,
}: {
    required?: boolean
    onChange?: (value: T[K] | null) => void
} & BaseProps = {}) {
    return (
        key: K,
        title: string,
        value: T[K] extends number | null | undefined ? number | null | undefined : never,
        edits: Partial<T>
    ) => (
        <Input
            placeholder={title + (required ? " *" : "")}
            defaultValue={value ?? undefined}
            required={required}
            sx={sx}
            type="number"
            onChange={async e => {
                const stringValue = transformStringValue(e.target.value)
                const value = (stringValue === null ? null : Number(stringValue)) as T[K]
                edits[key] = value
                if (onChange !== undefined) {
                    await onChange(value)
                }
            }}
        />
    )
}

export function booleanInputNode<T extends TableEntry<TableRecord>, K extends keyof T>({
    onChange,
    sx,
}: {
    onChange?: (value: T[K]) => void
} & BaseProps = {}) {
    return (
        key: K,
        _title: string,
        value: T[K] extends boolean | undefined ? boolean | undefined : never,
        edits: Partial<T>
    ) => (
        <Checkbox
            defaultChecked={value}
            sx={sx}
            onChange={async e => {
                const value = e.target.checked as T[K]
                edits[key] = value
                if (onChange !== undefined) {
                    await onChange(value)
                }
            }}
        />
    )
}

export function textInputNode<T extends TableEntry<TableRecord>, K extends keyof T>({
    required = true,
    onChange,
    sx,
}: {
    required?: boolean
    onChange?: (value: T[K] | null) => void

} & BaseProps = {}) {
    return (
        key: K,
        title: string,
        value: T[K] extends string | null | undefined ? string | null | undefined : never,
        edits: Partial<T>
    ) => (
        <Textarea
            placeholder={title + (required ? " *" : "")}
            defaultValue={value ?? undefined}
            required={required}
            sx={sx}
            onChange={async e => {
                const value = transformStringValue(e.target.value) as T[K]
                edits[key] = value
                if (onChange !== undefined) {
                    await onChange(value)
                }
            }}
        />
    )
}

export function selectInputNode<
    T extends TableEntry<TableRecord>,
    V extends ColumnValue,
    K extends keyof T,
>(
    values: V[],
    {
        required = true,
        onChange,
        sx,
    }: {
        required?: boolean
        onChange?: (value: T[K] | null) => void
    } & BaseProps = {},
) {
    return (
        key: K,
        title: string,
        value: T[K] extends V | null | undefined ? V | null | undefined : never,
        edits: Partial<T>
    ) => {

        return (
            <ControlledSelect
                values={values}
                map={(x) => x}
                required={required}
                placeholder={title + (required ? " *" : "")}
                defaultValue={value}
                sx={sx}
                onChange={async (selected) => {
                    const value = selected as T[K]
                    edits[key] = value
                    if (onChange !== undefined) {
                        await onChange(value)
                    }
                }} />
        )
    }
}

export function dateInputNode<T extends TableEntry<TableRecord>, K extends keyof T>({
    required = true,
    includeTime = true,
    onChange,
    sx,
}: {
    required?: boolean
    includeTime?: boolean
    onChange?: (date: Date | null, value: T[K] | null) => void
} & BaseProps = {}) {
    const dateFormat = includeTime ? MYSQL_DATETIME_FORMAT : MYSQL_DATE_FORMAT
    const timeFormat = MYSQL_TIME_FORMAT
    return (
        key: K,
        title: string,
        value: T[K] extends string | null | undefined ? string | null | undefined : never,
        edits: Partial<T>
    ) => (
        <ControlledDatePicker
            required={required}
            placeholder={`${title} (${dateFormat})` + (required ? " *" : "")}
            defaultValue={value === undefined || value === null ? value : dates.parse(value, dateFormat)}
            includeTime={includeTime}
            dateFormat={dateFormat}
            timeFormat={timeFormat}
            sx={sx}
            onChange={date => {
                const value = (date === null ? null : dates.format(date, dateFormat)) as T[K]
                edits[key] = value
                if (onChange !== undefined) {
                    onChange(date, value)
                }
            }}
        />
    )
}
