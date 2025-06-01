import { useEffect, useState } from "react"
import { ENUM_TABLES, EnumEntry } from "../../common/tables/enums"
import server from "./server"

export function useEnum(table: (typeof ENUM_TABLES)[number]): string[] {
    const [values, setValues] = useState<string[]>([])

    useEffect(() => {
        (async () => {
            const data = await server.fetchJSON(
                `/enums/${table.toLowerCase()}`,
                {
                    method: "GET",
                }
            ) as EnumEntry[]
            setValues(data.map(x => x.ID).sort())
        })()
    }, [table])

    return values
}