import { HttpMethod } from "../../common/http"
import { fetchJSON } from "./server"
import { entryRecord, TableEntry, TableRecord } from "../../common/db"
import { useEffect, useMemo, useState } from "react"

export interface TableReferenceFilter<T extends TableEntry<TableRecord>> {
    condition?: boolean
    filter?: Partial<T>
}

export function useTableReference<
    T extends TableEntry<TableRecord>,
    K extends keyof T,
>(
    apiRoute: string,
    key: K,
    {
        fetchFilter,
        apiRoot = "/crud",
    }: {
        fetchFilter?: TableReferenceFilter<T>
        apiRoot?: string
    } = {}
): T[K][] {
    const [result, setResult] = useState<T[K][]>([])

    const { condition = true, filter } = fetchFilter ?? {}

    useEffect(() => {
        (async () => {
            if (condition) {
                const fetchData = await fetchJSON<T[]>(
                    HttpMethod.GET,
                    `${apiRoot}${apiRoute}`,
                    {
                        params: filter === undefined ? undefined : entryRecord(filter)
                    }
                )
                setResult(fetchData.map(entry => entry[key]))
            } else {
                setResult([])
            }
        })()
        return () => setResult([])
    }, [apiRoute, key, condition, filter, apiRoot])

    return result
}

export function useTableReferenceFilter<
    T extends TableEntry<TableRecord>,
    K extends keyof T,
>(
    key: K,
    fetchNull: boolean = false
) {
    const [value, setValue] = useState<T[K] | null>(null)
    const fetchFilter = useMemo(
        () => ({
            condition: fetchNull ? true : value !== null,
            filter: value === null ? undefined : { [key]: value }
        }),
        [value, fetchNull, key]
    )
    return { setValue, fetchFilter }
}
