import { ReactNode } from "react"
import { DBTable, TableRecord } from "../../common/db"
import { Input, Select, Option, Textarea } from "@mui/joy"
import dates, { MYSQL_DATE_FORMAT, MYSQL_DATETIME_FORMAT, MYSQL_TIME_FORMAT } from "../../common/dates"
import JoyDatePicker from "../components/JoyDatePicker"

export interface KeyDisplay<T extends DBTable<TableRecord>, K extends keyof T> {
    title: string
    defaultNode: (key: K, title: string, value: T[K]) => ReactNode
    inputNode: (key: K, title: string, value: T[K] | undefined, edits: Partial<T>) => ReactNode
}

export type TableStructureDisplay<T extends DBTable<TableRecord>> = {
    title: string,
    keys: {
        [K in keyof T]: KeyDisplay<T, K>
    }
}

export function createDisplay<T extends DBTable<TableRecord>>(
    title: string,
    keys: {
        [K in keyof T]: Partial<KeyDisplay<T, K>>
    }
): TableStructureDisplay<T> {
    const filledKeys = Object.fromEntries(
        (Object.keys(keys) as (keyof T)[]).map(key => {
            const keyDisplay = keys[key] ?? {}
            const title = keyDisplay.title ?? key.toString()
            const defaultNode = keyDisplay.defaultNode ?? ((_key, _title, value) => value)
            const inputNode = keyDisplay.inputNode ?? (() => null)
            return [key, { title, defaultNode, inputNode }]
        })
    ) as unknown as { [K in keyof T]: KeyDisplay<T, K> }

    return { title, keys: filledKeys }
}

export function stringInputNode<T extends DBTable<TableRecord>>(
    required: boolean = true,
) {
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
            onChange={e => {
                edits[key] = e.target.value as T[K]
            }}
        />
    )
}

export function textInputNode<T extends DBTable<TableRecord>>(
    required: boolean = true,
) {
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
            onChange={e => {
                edits[key] = e.target.value as T[K]
            }}
        />
    )
}

export function selectInputNode<T extends DBTable<TableRecord>, V extends string>(
    values: readonly V[],
    required: boolean = true,
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
            onChange={(_, selected) => {
                if (selected === null) {
                    return
                }
                edits[key] = selected as unknown as T[K]
            }}>
            {
                values.map(x => (
                    <Option value={x}>{x}</Option>
                ))
            }
        </Select>
    )
}

export function dateInputNode<T extends DBTable<TableRecord>>(
    includeTime: boolean = true,
    required: boolean = true,
) {
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
            onChange={val => {
                edits[key] = dates.format(val, dateFormat) as T[K]
            }}
        />
    )
}
