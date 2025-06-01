import { ReactNode } from "react"
import { TableEntry, entryString, TableRecord } from "../../common/db"
import { Input, Select, Option, Textarea } from "@mui/joy"
import dates, { MYSQL_DATE_FORMAT, MYSQL_DATETIME_FORMAT, MYSQL_TIME_FORMAT } from "../../common/dates"
import JoyDatePicker from "../components/JoyDatePicker"
import { BaseProps } from "./utils"

export interface KeyDisplay<T extends TableEntry<TableRecord>, K extends keyof T> {
    title: string
    inputNode: (key: K, title: string, value: T[K] | undefined, edits: Partial<T>) => ReactNode
}

export type TableDisplay<T extends TableEntry<TableRecord>> = {
    title: string,
    keys: {
        [K in keyof T]: KeyDisplay<T, K>
    }
}

export function createDisplay<T extends TableEntry<TableRecord>>(
    title: string,
    keys: {
        [K in keyof T]: Partial<KeyDisplay<T, K>>
    }
): TableDisplay<T> {
    const filledKeys = Object.fromEntries(
        (Object.keys(keys) as (keyof T)[]).map(key => {
            const keyDisplay = keys[key] ?? {}
            const title = keyDisplay.title ?? key.toString()
            const inputNode = keyDisplay.inputNode ?? (() => null)
            return [key, { title, inputNode }]
        })
    ) as unknown as { [K in keyof T]: KeyDisplay<T, K> }

    return { title, keys: filledKeys }
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
        value: T[K] extends string | undefined ? string | undefined : never,
        edits: Partial<T>
    ) => (
        <Input
            placeholder={title}
            defaultValue={value}
            required={required}
            sx={sx}
            onChange={e => {
                edits[key] = e.target.value as T[K]
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
        value: T[K] extends string | undefined ? string | undefined : never,
        edits: Partial<T>
    ) => (
        <Textarea
            placeholder={title}
            defaultValue={value}
            required={required}
            sx={sx}
            onChange={e => {
                edits[key] = e.target.value as T[K]
            }}
        />
    )
}

export function selectInputNode<T extends TableEntry<TableRecord>, V extends (string | Partial<T>)>(
    values: V[],
    {
        required = true,
        sx,
    }: {
        required?: boolean,
    } & BaseProps = {},
) {
    return <K extends keyof T>(
        key: K,
        title: string,
        value: T[K] extends V | undefined ? V | undefined : never,
        edits: Partial<T>
    ) => (
        <Select<V>
            multiple={false}
            placeholder={title}
            defaultValue={value}
            required={required}
            sx={sx}
            onChange={(_, selected) => {
                if (selected === null) {
                    return
                }
                edits[key] = selected as unknown as T[K]
            }}>
            {
                values.map(x => (
                    <Option value={x}>
                        {typeof x === "string" ? x : entryString(x as Partial<T>)}
                    </Option>
                ))
            }
        </Select>
    )
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
            placeholder={`${title} (${dateFormat})`}
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
