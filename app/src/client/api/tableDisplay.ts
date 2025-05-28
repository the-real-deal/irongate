import { QueryEntry, TableStructure } from "../../server/core/db"
import { ReactNode } from "react"

export interface KeyDisplay<T extends QueryEntry<TableStructure>, K extends keyof T> {
    title?: string
    defaultNode?: (value: T[K]) => ReactNode
    editNode?: (value: T[K], edits: Partial<T>) => ReactNode
}

export type TableStructureDisplay<T extends QueryEntry<TableStructure>> = {
    readonly title: string,
    readonly keys: {
        readonly [K in keyof T]?: KeyDisplay<T, K>
    }
}

export function getKeyDisplays<
    U extends QueryEntry<TableStructure>,
    T extends TableStructureDisplay<U>,
>(
    display: T,
) {
    return Object.fromEntries((Object.keys(display.keys) as [keyof U]).map(key => {
        const keyDisplay = display.keys[key] ?? {}
        const title = keyDisplay.title ?? key.toString()
        const defaultNode = keyDisplay.defaultNode ?? ((value) => value)
        const editNode = keyDisplay.editNode ?? defaultNode
        return [key, { title, defaultNode, editNode }]
    }))
}
