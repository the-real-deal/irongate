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



export default { removeUndefinedKeys, isPlainObject }
