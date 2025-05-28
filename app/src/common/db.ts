export type ColumnValue = string | number | boolean | null
export type TableStructure = { [key: string]: ColumnValue }
export type QueryEntry<T extends TableStructure> = {
    [K in keyof T]: T[K]
}