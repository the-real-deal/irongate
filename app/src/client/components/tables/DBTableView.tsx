import { Box, Button, Sheet, Table, Typography } from "@mui/joy"
import { BaseProps } from "../../core/utils"
import { useCallback, useEffect, useState } from "react"
import { MdAdd, MdDelete, MdVisibility } from "react-icons/md"
import SearchBar from "../SearchBar"
import { TableDisplay } from "../../core/display/tableDisplay"
import { TableEntry, TableRecord } from "../../../common/db"

export interface DBTableViewProps<T extends TableEntry<TableRecord>> extends BaseProps {
    display: TableDisplay<T>
    data: T[]
    search?: boolean
    hiddenKeys?: (keyof T)[]
    onExpand?: (entry: T) => void
    onDelete?: (entry: T) => void
    onCreate?: () => void
}

export default function DBTableView<T extends TableEntry<TableRecord>>({
    display,
    data,
    search = true,
    hiddenKeys,
    onDelete,
    onExpand,
    onCreate,
    sx,
}: DBTableViewProps<T>) {
    const lastColumn = onDelete != undefined || onExpand != undefined

    const [rows, setRows] = useState<[Partial<T>, T][]>([])

    function searchNormalize(str: string): string {
        return str.toLowerCase().replace(/\s+/g, " ").trim()
    }

    const filterVisibleKeys = useCallback((key: keyof T) => {
        return hiddenKeys === undefined || !hiddenKeys.includes(key)
    }, [hiddenKeys])

    const toRows = useCallback((data: T[], query: string): [Partial<T>, T][] => {
        const q = searchNormalize(query).split(" ")
        return data
            .map(dataRow => [
                Object.fromEntries(
                    (Object.keys(dataRow) as (keyof T)[])
                        .filter(filterVisibleKeys)
                        .map(key => [key, dataRow[key]])
                ),
                dataRow
            ] as [Partial<T>, T])
            .filter(([row, _]) => {
                const haystack = searchNormalize(Object.values(row).join(" "))
                return q.every(term => haystack.includes(term))
            })
    }, [filterVisibleKeys])

    useEffect(() => {
        setRows(toRows(data, ""))
        return () => {
            setRows([])
        }
    }, [data, display, toRows])

    return (
        <Box sx={{
            height: "100%",
            maxHeight: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            ...sx
        }}>
            <Box sx={{
                width: "100%",
                maxHeight: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Typography level="h1">{display.tableTitle}: {rows.length}</Typography>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    alignItems: "center",
                    gap: "1em"
                }}>
                    {
                        onCreate !== undefined ?
                            <Button
                                onClick={onCreate}>
                                <MdAdd />
                            </Button> :
                            null
                    }
                    {
                        search ?
                            <SearchBar onChange={async (query) => {
                                setRows(toRows(data, query))
                            }} /> :
                            null
                    }
                </Box>
            </Box>
            <Sheet
                variant="outlined"
                sx={{
                    maxHeight: "100%",
                    overflow: "scroll",
                }}>
                <Table
                    stickyFooter
                    stickyHeader
                    hoverRow
                    variant="plain"
                    borderAxis="bothBetween"
                    sx={theme => ({
                        tableLayout: "auto",
                        height: "100%",
                        "&": {
                            "--TableCell-headBackground": theme.getCssVar("palette-background-level2")
                        }
                    })}>
                    <thead>
                        <tr>
                            {
                                (Object.keys(display.keys) as (keyof T)[])
                                    .filter(filterVisibleKeys)
                                    .map((key, _, arr) => {
                                        return (
                                            <th style={{
                                                width: `${100 / arr.length}%`,
                                            }}>
                                                {display.keys[key].title}
                                            </th>
                                        )
                                    })
                            }
                            {
                                lastColumn ?
                                    <th style={{
                                        position: "sticky",
                                        right: 0,
                                        width: 0,
                                        whiteSpace: "nowrap",
                                    }} /> :
                                    null
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows.map(([row, data]) => {
                                return (
                                    <tr>
                                        {
                                            (Object.keys(row) as (keyof T)[]).map(key => {
                                                return (
                                                    <td>{row[key]}</td>
                                                )
                                            })
                                        }
                                        {
                                            lastColumn ?
                                                <td style={{
                                                    position: "sticky",
                                                    right: 0,
                                                    width: "0.1%",
                                                    whiteSpace: "nowrap",
                                                    backgroundColor: "var(--TableCell-headBackground)",
                                                }}>
                                                    <Box sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent: "end",
                                                        gap: "0.5em",
                                                    }}>
                                                        {
                                                            onExpand !== undefined ?
                                                                <Button
                                                                    onClick={async () => await onExpand(data)}>
                                                                    <MdVisibility />
                                                                </Button> :
                                                                null
                                                        }
                                                        {
                                                            onDelete !== undefined ?
                                                                <Button
                                                                    color="danger"
                                                                    onClick={async () => await onDelete(data)}>
                                                                    <MdDelete />
                                                                </Button> :
                                                                null
                                                        }
                                                    </Box>
                                                </td> :
                                                null
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Sheet>
        </Box>
    )
}
