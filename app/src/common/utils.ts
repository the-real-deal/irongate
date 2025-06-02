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

function generateUUID() {
    const bytes = crypto.getRandomValues(new Uint8Array(16))

    // Set version (4) and variant (RFC 4122)
    bytes[6] = (bytes[6] & 0x0f) | 0x40
    bytes[8] = (bytes[8] & 0x3f) | 0x80

    const toHex = (b: number) => b.toString(16).padStart(2, '0')

    return (
        toHex(bytes[0]) + toHex(bytes[1]) + toHex(bytes[2]) + toHex(bytes[3]) + '-' +
        toHex(bytes[4]) + toHex(bytes[5]) + '-' +
        toHex(bytes[6]) + toHex(bytes[7]) + '-' +
        toHex(bytes[8]) + toHex(bytes[9]) + '-' +
        toHex(bytes[10]) + toHex(bytes[11]) + toHex(bytes[12]) + toHex(bytes[13]) + toHex(bytes[14]) + toHex(bytes[15])
    )
}

export default { removeUndefinedKeys, isPlainObject, debugAlert, areObjectsEqual, generateUUID }
