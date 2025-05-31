export type ColumnValue = string | number | boolean | null

export type TableRecord = {
    [k: string]: ColumnValue
}

export type DBTable<T extends TableRecord> = {
    [K in keyof T]: T[K]
}

export type TableStructure<T extends DBTable<TableRecord>> = {
    [K in keyof T]: {
        isPrimaryKey: boolean
        generate?: (data: Partial<T>) => T[K] | undefined // undefined to remove it and let it generate inside the DB (ex. auto increment)
    }
}

export function createTableStructure<T extends DBTable<TableRecord>>(
    structure: {
        [K in keyof T]: {
            isPrimaryKey?: boolean
            generate?: (data: Partial<T>) => T[K] | undefined
        }
    }
): TableStructure<T> {
    return Object.fromEntries((Object.keys(structure) as (keyof T)[]).map(key => {
        const val = structure[key]
        const isPrimaryKey = val.isPrimaryKey ?? false
        const generate = val.generate
        return [key, { isPrimaryKey, generate }]
    })) as TableStructure<T>
}
