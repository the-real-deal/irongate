import { parseJSONPrimitive } from "./json"

export type ColumnValue = string | number | boolean | null

export type TableRecord = Record<string, ColumnValue>

export type TableEntry<T extends TableRecord> = {
    [K in keyof T]: T[K]
}

export type TableStructure<T extends TableEntry<TableRecord>> = {
    table: string,
    keys: {
        [K in keyof T]: {
            primaryKey: boolean
            generated: boolean
        }
    }
}

export function createTableStructure<T extends TableEntry<TableRecord>>(
    table: string,
    structure: {
        [K in keyof T]: Partial<TableStructure<T>["keys"][K]>
    }
): TableStructure<T> {
    return {
        table,
        keys: Object.fromEntries((Object.keys(structure) as (keyof T)[]).map(key => {
            const val = structure[key]
            const primaryKey = val.primaryKey ?? false
            const generated = val.generated ?? false
            return [key, { primaryKey, generated }]
        })) as TableStructure<T>["keys"]
    }
}

export function tableStructurePrimaryKey<
    U extends TableEntry<TableRecord>,
    T extends TableStructure<U>
>(structure: T): Partial<T["keys"]> {
    return Object.fromEntries(
        (Object.keys(structure.keys) as (keyof U)[])
            .filter(key => structure.keys[key].primaryKey)
            .map(key => [key, structure.keys[key]])
    ) as Partial<T["keys"]>
}

export function recordEntry<T extends TableEntry<TableRecord>>(
    source: Record<string, string>,
    structure: TableStructure<T>,
): Partial<T> {
    return Object.fromEntries(
        Object.keys(structure.keys)
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
            .filter(key => structure.keys[key].primaryKey)
            .map(key => [key, entry[key]])
    ) as Partial<T>
}

export function entryPrimaryKey<T extends TableEntry<TableRecord>>(
    source: Partial<T>,
    structure: TableStructure<T>,
): Partial<T> {
    return Object.fromEntries(
        Object.keys(tableStructurePrimaryKey(structure))
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
