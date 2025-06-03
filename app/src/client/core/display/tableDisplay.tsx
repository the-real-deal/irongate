import { ReactElement } from "react"
import { ColumnValue, TableEntry, TableRecord, TableStructure } from "../../../common/db"
import { Input, Textarea, Checkbox } from "@mui/joy"
import dates, { MYSQL_DATE_FORMAT, MYSQL_DATETIME_FORMAT, MYSQL_TIME_FORMAT } from "../../../common/dates"
import JoyDatePicker from "../../components/JoyDatePicker"
import { BaseProps } from "../utils"
import ControlledSelect from "../../components/ControlledSelect"

export interface KeyDisplay<T extends TableEntry<TableRecord>, K extends keyof T> {
    title: string
    inputNode: (key: K, title: string, value: T[K] | undefined, edits: Partial<T>) => ReactElement
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
            [K in keyof T]: Omit<KeyDisplay<T, K>, "title"> & {
                title?: KeyDisplay<T, K>["title"]
            }
        }
    }): TableDisplay<T> {
    const filledKeys = Object.fromEntries(
        (Object.keys(keys) as (keyof T)[]).map(key => {
            const title = keys[key].title ?? key.toString()
            const inputNode = keys[key].inputNode
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

export function stringInputNode<T extends TableEntry<TableRecord>>({
    required = true,
    sx,
}: {
    required?: boolean,
} & BaseProps = {}) {
    return <K extends keyof T>(
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
            onChange={e => {
                edits[key] = transformStringValue(e.target.value) as T[K]
            }}
        />
    )
}

export function numberInputNode<T extends TableEntry<TableRecord>>({
    required = true,
    sx,
}: {
    required?: boolean,
} & BaseProps = {}) {
    return <K extends keyof T>(
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
            onChange={e => {
                const value = transformStringValue(e.target.value)
                edits[key] = (value === null ? null : Number(value)) as T[K]
            }}
        />
    )
}

export function booleanInputNode<T extends TableEntry<TableRecord>>({
    sx,
}: {
    required?: boolean,
} & BaseProps = {}) {
    return <K extends keyof T>(
        key: K,
        _title: string,
        value: T[K] extends boolean | undefined ? boolean | undefined : never,
        edits: Partial<T>
    ) => (
        <Checkbox
            defaultChecked={value}
            sx={sx}
            onChange={e => {
                edits[key] = e.target.checked as T[K]
            }}
        />
    )
}

export function textInputNode<T extends TableEntry<TableRecord>>({
    required = true,
    sx,
}: {
    required?: boolean,
} & BaseProps = {}) {
    return <K extends keyof T>(
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
            onChange={e => {
                edits[key] = transformStringValue(e.target.value) as T[K]
            }}
        />
    )
}

export function selectInputNode<
    T extends TableEntry<TableRecord>,
    V extends ColumnValue,
>(
    values: V[],
    {
        required = true,
        onChange,
        sx,
    }: {
        required?: boolean,
        onChange?: (selected: V | null) => void
    } & BaseProps = {},
) {
    return <K extends keyof T>(
        key: K,
        title: string,
        value: T[K] extends V | null | undefined ? V | null | undefined : never,
        edits: Partial<T>
    ) => {
        async function handleChange(selected: V | null) {
            edits[key] = selected as T[K]
            if (onChange !== undefined) {
                await onChange(selected)
            }
        }

        return (
            <ControlledSelect
                values={values}
                required={required}
                placeholder={title}
                defaultValue={value}
                sx={sx}
                onChange={handleChange} />
        )
    }
}

export function dateInputNode<T extends TableEntry<TableRecord>>({
    required = true,
    includeTime = true,
    sx,
}: {
    required?: boolean,
    includeTime?: boolean,
} & BaseProps = {}) {
    const dateFormat = includeTime ? MYSQL_DATETIME_FORMAT : MYSQL_DATE_FORMAT
    const timeFormat = MYSQL_TIME_FORMAT
    return <K extends keyof T>(
        key: K,
        title: string,
        value: T[K] extends string | undefined ? string | undefined : never,
        edits: Partial<T>
    ) => (
        <JoyDatePicker
            required={required}
            placeholder={`${title} (${dateFormat})` + (required ? " *" : "")}
            defaultValue={value === undefined ? value : dates.parse(value, dateFormat)}
            includeTime={includeTime}
            dateFormat={dateFormat}
            timeFormat={timeFormat}
            sx={sx}
            onChange={val => {
                edits[key] = dates.format(val, dateFormat) as T[K]
            }}
        />
    )
}
