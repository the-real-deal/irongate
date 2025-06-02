import { useEffect, useState } from "react"
import { HttpMethod } from "../../common/http"
import { EnumEntry, EnumTable } from "../../common/structures"
import { fetchJSON } from "./server"
import { TableEntry, TableRecord } from "../../common/db"


export function useDataReference<T extends TableEntry<TableRecord>>(
    apiRoute: string,
    mapTo: keyof T,
): T[typeof mapTo][] {
    const [values, setValues] = useState<T[typeof mapTo][]>([])

    useEffect(() => {
        (async () => {
            const data = await fetchJSON<T[]>(
                HttpMethod.GET,
                apiRoute,
            )
            setValues(data.map(x => x[mapTo]))
        })()
        return () => setValues([])
    }, [apiRoute, mapTo])

    return values
}

export function useEnumReference(table: EnumTable): string[] {
    return useDataReference<EnumEntry>(`/enums/${table.toLowerCase()}`, "ID")
}