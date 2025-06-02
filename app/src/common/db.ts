import { parseJSONPrimitive } from "./json"

export type ColumnValue = string | number | boolean | null

export type TableRecord = {
    [k: string]: ColumnValue
}

export type TableEntry<T extends TableRecord> = {
    [K in keyof T]: T[K]
}

export type TableStructure<T extends TableEntry<TableRecord>> = {
    [K in keyof T]: {
        isPrimaryKey: boolean
        generate: (() => T[K] | Promise<T[K]>) | boolean
    }
}

export function createTableStructure<T extends TableEntry<TableRecord>>(
    structure: {
        [K in keyof T]: {
            primaryKey?: boolean
            generate?: (() => T[K] | Promise<T[K]>) | boolean
        }
    }
): TableStructure<T> {
    return Object.fromEntries((Object.keys(structure) as (keyof T)[]).map(key => {
        const val = structure[key]
        const isPrimaryKey = val.primaryKey ?? false
        const generate = val.generate ?? false
        return [key, { isPrimaryKey, generate }]
    })) as TableStructure<T>
}

export function tableStructurePrimaryKey<U extends TableEntry<TableRecord>, T extends TableStructure<U>>(structure: T): Partial<T> {
    return Object.fromEntries(
        (Object.keys(structure) as (keyof T)[])
            .filter(key => structure[key].isPrimaryKey)
            .map(key => [key, structure[key]])
    ) as Partial<T>
}

export function recordEntry<T extends TableEntry<TableRecord>>(
    source: Record<string, string>,
    structure: TableStructure<T>,
): Partial<T> {
    return Object.fromEntries(
        Object.keys(structure)
            .map(key => [key, source[key] === undefined ? source[key] : parseJSONPrimitive(source[key])])
    ) as Partial<T>
}

export function recordPrimaryKey<T extends TableEntry<TableRecord>>(
    source: Record<string, string>,
    structure: TableStructure<T>,
): Partial<T> {
    const entry = recordEntry(source, structure)
    return Object.fromEntries(
        (Object.keys(entry) as (keyof T)[])
            .filter(key => structure[key].isPrimaryKey)
            .map(key => [key, entry[key]])
    ) as Partial<T>
}

export function entryPrimaryKey<T extends TableEntry<TableRecord>>(
    source: Partial<T>,
    structure: TableStructure<T>,
): Partial<T> {
    return Object.fromEntries(
        Object.keys(tableStructurePrimaryKey<T, typeof structure>(structure))
            .map(key => [key, source[key]])
    ) as Partial<T>
}

export function entryRecord<T extends TableEntry<TableRecord>>(entry: Partial<T>): Record<string, string> {
    const params: Record<string, string> = {}
    for (const key of (Object.keys(entry) as (keyof T)[])) {
        const val = entry[key]
        if (val !== undefined) {
            params[String(key)] = String(val)
        }
    }
    return params
}
