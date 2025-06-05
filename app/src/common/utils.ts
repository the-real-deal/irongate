import { JSONstring } from "./json"

function removeUndefinedKeys<T extends object>(obj: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(obj).filter(([, value]) => value !== undefined)
    ) as Partial<T>
}

function isPlainObject<T>(value: unknown): value is Record<string, T> {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        Object.prototype.toString.call(value) === "[object Object]"
    )
}

function debugAlert<T>(value: T): T {
    alert(typeof value === "object" || Array.isArray(value) ? JSONstring(value) : String(value))
    return value
}

function areObjectsEqual<K extends string | number | symbol, T>(a: Record<K, T>, b: Record<K, T>): boolean {
    const aKeys = Object.keys(a)
    const bKeys = Object.keys(b)

    if (aKeys.length !== bKeys.length) return false


    return aKeys.every(key => {
        return Object.prototype.hasOwnProperty.call(b, key) && a[key as keyof typeof a] === b[key as keyof typeof b]
    })
}

export default { removeUndefinedKeys, isPlainObject, debugAlert, areObjectsEqual }
