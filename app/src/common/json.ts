export type JSONPrimitive = string | number | boolean | null
export type JSONObject = { [key: string]: JSONType }
export type JSONType = JSONPrimitive | JSONObject | JSONType[]

export function parseJSONPrimitive(value: string): JSONPrimitive {
    if (value === "true") return true
    if (value === "false") return false
    if (value === "null") return null
    if (!isNaN(Number(value))) return Number(value)
    try {
        return JSON.parse(value)
    } catch {
        return value
    }
}

export function JSONstring<T>(value: T): string {
    return JSON.stringify(value, undefined, 2)
}
