import { ReactElement } from "react"
import { TableEntry, TableRecord } from "../../../common/db"
import { Input, Select, Option, Textarea, Checkbox } from "@mui/joy"
import dates, { MYSQL_DATE_FORMAT, MYSQL_DATETIME_FORMAT, MYSQL_TIME_FORMAT } from "../../../common/dates"
import JoyDatePicker from "../../components/JoyDatePicker"
import { BaseProps } from "../utils"
import { EnumEntry } from "../../../common/structures"
import ClearableSelect from "../../components/CleareableSelect"

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

export function createDisplay<T extends TableEntry<TableRecord>>({
    tableTitle,
    detailTitle,
    keys,
}: Omit<TableDisplay<T>, "keys"> & {
    keys: {
        [K in keyof T]: Omit<KeyDisplay<T, K>, "title" | "hide"> & {
            title?: KeyDisplay<T, K>["title"]
        }
    }
}): TableDisplay<T> {
    const filledKeys = Object.fromEntries(
        (Object.keys(keys) as (keyof T)[]).map(key => {
            const keyDisplay = keys[key] ?? {}
            const title = keyDisplay.title ?? key.toString()
            const inputNode = keyDisplay.inputNode
            return [key, { title, inputNode }]
        })
    ) as unknown as { [K in keyof T]: KeyDisplay<T, K> }

    return { tableTitle, detailTitle, keys: filledKeys }
}

export function adaptKeyDisplay<
    FromT extends TableEntry<TableRecord>,
    FromK extends keyof FromT,
    ToT extends TableEntry<TableRecord>,
    ToK extends keyof ToT
>(
    display: TableDisplay<FromT>,
    key: FromK
): FromT[FromK] extends ToT[ToK]
    ? (ToT[ToK] extends FromT[FromK] ? KeyDisplay<ToT, ToK> : never)
    : never {
    const from = display.keys[key]
    return { ...from } as unknown as FromT[FromK] extends ToT[ToK]
        ? (ToT[ToK] extends FromT[FromK] ? KeyDisplay<ToT, ToK> : never)
        : never
}

export function adaptEnumDisplay(
    display: TableDisplay<EnumEntry>,
) {
    return adaptKeyDisplay(display, "ID")
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

export function numberInputNode<T extends TableEntry<TableRecord>>({
    required = true,
    sx,
}: {
    required?: boolean,
} & BaseProps = {}) {
    return <K extends keyof T>(
        key: K,
        title: string,
        value: T[K] extends number | undefined ? number | undefined : never,
        edits: Partial<T>
    ) => (
        <Input
            placeholder={title}
            defaultValue={value}
            required={required}
            sx={sx}
            type="number"
            onChange={e => {
                edits[key] = e.target.value as T[K]
            }}
        />
    )
}

export function booleanInputNode<T extends TableEntry<TableRecord>>({
    required = true,
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

export function selectInputNode<T extends TableEntry<TableRecord>, V extends string>(
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
    ) => {
        function handleChange(selected: V | null) {
            if (selected === null) {
                return
            }
            edits[key] = selected as unknown as T[K]
        }

        return (
            required ?
                <Select<V>
                    multiple={false}
                    placeholder={title}
                    defaultValue={value}
                    required={true}
                    sx={sx}
                    onChange={(_, selected) => handleChange(selected)}>
                    {
                        values.map(x => (
                            <Option value={x}>{x}</Option>
                        ))
                    }
                </Select> :
                <ClearableSelect
                    placeholder={title}
                    defaultValue={value}
                    sx={sx}
                    onChange={handleChange}>
                    {
                        values.map(x => (
                            <Option value={x}>{x}</Option>
                        ))
                    }
                </ClearableSelect>
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
