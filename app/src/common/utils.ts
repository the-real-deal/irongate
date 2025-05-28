function removeUndefinedKeys<T extends object>(obj: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(obj).filter(([, value]) => value !== undefined)
    ) as Partial<T>
}

function dateMySQLFormat(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    let res = `${year}-${month}-${day}`
    if (hours !== 0 || minutes !== 0 || seconds !== 0) {
        const hh: string = String(hours).padStart(2, '0')
        const mm: string = String(minutes).padStart(2, '0')
        const ss: string = String(seconds).padStart(2, '0')
        res += ` ${hh}:${mm}:${ss}`
    }
    return res
}


export default { removeUndefinedKeys, dateMySQLFormat }
