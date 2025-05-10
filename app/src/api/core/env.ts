export type EnvValueType = "string" | "number" | "boolean"
type EnvTypeMap = {
    string: string
    number: number
    boolean: boolean
}

function get<K extends EnvValueType>(key: string, type: K): EnvTypeMap[K] | undefined {
    const value = process.env[key]
    if (value === undefined) {
        return undefined
    }

    switch (type) {
        case "string":
            return value as EnvTypeMap[K]
        case "number":
            const parsed = Number(value)
            if (isNaN(parsed)) {
                throw new Error(`env variable ${key}=${value} is not a valid number`)
            }
            return parsed as EnvTypeMap[K]
        case "boolean":
            if (value.toLowerCase() === "true" || value === "1") {
                return true as EnvTypeMap[K]
            } else if (value.toLowerCase() === "false" || value === "0") {
                return false as EnvTypeMap[K]
            } else {
                throw new Error(`env variable ${key}=${value} is not a valid boolean`)
            }
    }
}

function getRequired<K extends EnvValueType>(key: string, type: K): EnvTypeMap[K] {
    const value = get(key, type)
    if (value === undefined) {
        throw new Error(`env variable ${key} is undefined`)
    }
    return value
}

export default { get, getRequired }
