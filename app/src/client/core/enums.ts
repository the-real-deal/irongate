import { useEffect, useState } from "react"
import { ENUM_TABLES, EnumEntry } from "../../common/tables/enums"
import server from "./server"
import { HttpMethod } from "../../common/http"

export function useEnum(table: (typeof ENUM_TABLES)[number]): string[] {
    const [values, setValues] = useState<string[]>([])

    useEffect(() => {
        (async () => {
            const data = await server.fetchJSON(
                HttpMethod.GET,
                `/enums/${table.toLowerCase()}`
            ) as EnumEntry[]
            setValues(data.map(x => x.ID).sort())
        })()
        return () => setValues([])
    }, [table])

    return values
}