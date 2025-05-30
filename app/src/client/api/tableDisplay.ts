import { ReactNode } from "react"
import { QueryEntry, TableStructure } from "../../common/db"

export interface KeyDisplay<T extends QueryEntry<TableStructure>, K extends keyof T> {
    title: string
    defaultNode: (key: K, value: T[K]) => ReactNode
    inputNode: (key: K, value: T[K] | undefined, edits: Partial<T>) => ReactNode
}

export type TableStructureDisplay<T extends QueryEntry<TableStructure>> = {
    title: string,
    keys: {
        [K in keyof T]: KeyDisplay<T, K>
    }
}

export function createDisplay<T extends QueryEntry<TableStructure>>(
    title: string,
    keys: {
        [K in keyof T]: Partial<KeyDisplay<T, K>>
    }
): TableStructureDisplay<T> {
    const filledKeys = Object.fromEntries(
        (Object.keys(keys) as (keyof T)[]).map(key => {
            const keyDisplay = keys[key] ?? {}
            const title = keyDisplay.title ?? key.toString()
            const defaultNode = keyDisplay.defaultNode ?? ((_, value) => value)
            const inputNode = keyDisplay.inputNode ?? (() => null)
            return [key, { title, defaultNode, inputNode }]
        })
    ) as unknown as { [K in keyof T]: KeyDisplay<T, K> }

    return { title, keys: filledKeys }
}

