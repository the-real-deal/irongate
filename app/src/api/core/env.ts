type EnvValueType = "string" | "number" | "boolean"
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
    const parsed = JSON.parse(value)
    console.log(parsed)
    const parsedType = typeof parsed
    if (parsedType === type) {
        return parsed
    }
    throw new Error(`Env variable ${key}=${parsed} is not of type ${type}`)
}

function getRequired<K extends EnvValueType>(key: string, type: K): EnvTypeMap[K] {
    const value = get(key, type)
    if (value === undefined) {
        throw new Error(`env variable ${key} is undefined`)
    }
    return value
}

export default { get, getRequired }