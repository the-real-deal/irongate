import { useEffect, useState } from "react"
import { HttpMethod } from "../../common/http"
import { EnumEntry, EnumTable } from "../../common/structures"
import { fetchJSON } from "./server"
import { entryRecord, TableEntry, TableRecord } from "../../common/db"


export function useTableReference<
    T extends TableEntry<TableRecord>,
    K extends keyof T,
>(
    apiRoute: string,
    mapTo: K,
    fetchFilter?: Partial<T>
): T[K][] {
    const [values, setValues] = useState<T[K][]>([])

    useEffect(() => {
        (async () => {
            const data = await fetchJSON<T[]>(
                HttpMethod.GET,
                `/crud${apiRoute}`,
                {
                    params: fetchFilter === undefined ? undefined : entryRecord(fetchFilter)
                }
            )
            setValues(data.map(x => x[mapTo]))
        })()
        return () => setValues([])
    }, [apiRoute, mapTo, fetchFilter])

    return values
}

export function useEnumReference(table: EnumTable): EnumEntry["ID"][] {
    return useTableReference<EnumEntry, "ID">(`/enums/${table.toLowerCase()}`, "ID")
}