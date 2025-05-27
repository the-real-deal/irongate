import { QueryEntry, TableStructure } from "../../server/core/db"
import { ReactNode } from "react"

export type TableStructureDisplay<T extends QueryEntry<TableStructure>> = {
    title: string,
    keys: {
        [K in keyof T]?: {
            title?: string
            map?: (value: T[K]) => ReactNode
        }
    }
}

export function tableDisplayTitles<U extends QueryEntry<TableStructure>, T extends TableStructureDisplay<U>>(display: T): string[] {
    return (Object.keys(display.keys)).map(
        key => display.keys[key]?.title ?? key.toString()
    )
}

export function tableDisplayNodes<U extends QueryEntry<TableStructure>, T extends TableStructureDisplay<U>>(
    data: U,
    display: T,
): ReactNode[] {
    return (Object.keys(display.keys) as [keyof U]).map(key => {
        const value = data[key]
        const map = display.keys[key]?.map
        return (
            map === undefined ?
                value :
                map(value)
        )
    })
}

export function tableDisplayObject<U extends QueryEntry<TableStructure>, T extends TableStructureDisplay<U>>(
    data: U,
    display: T,
): Record<string, ReactNode> {
    const keys = tableDisplayTitles<U, T>(display)
    const values = tableDisplayNodes(data, display)
    return Object.fromEntries(
        keys.map((key, i) => [key, values[i]])
    )
}
