import { formatDate, parse as parseDate } from "date-fns"

export const MYSQL_DATE_FORMAT = "yyyy-MM-dd" as const
export const MYSQL_TIME_FORMAT = "HH:mm:ss" as const
export const MYSQL_DATETIME_FORMAT = `${MYSQL_DATE_FORMAT} ${MYSQL_TIME_FORMAT}` as const

function format(date: Date, fmt: string): string {
    return formatDate(date, fmt)
}

function parse(value: string, fmt: string): Date {
    return parseDate(value, fmt, new Date())
}

export default { format, parse }
