import { Box, Button, Sheet, Table, Typography } from "@mui/joy"
import { BaseProps } from "../../core/utils"
import { useEffect, useState } from "react"
import { MdAdd, MdDelete, MdVisibility } from "react-icons/md"
import SearchBar from "../SearchBar"
import { TableDisplay } from "../../core/tableDisplay"
import { DBTable, TableRecord } from "../../../common/db"

export interface DBTableViewProps<U extends DBTable<TableRecord>, T extends TableDisplay<U>> extends BaseProps {
    display: T
    data: U[]
    search?: boolean
    onExpand?: (entry: U) => void
    onDelete?: (entry: U) => void
    onCreate?: () => void
}

export default function DBTableView<U extends DBTable<TableRecord>, T extends TableDisplay<U>>({
    display,
    data,
    search = true,
    onDelete,
    onExpand,
    onCreate,
    sx,
}: DBTableViewProps<U, T>) {
    const lastColumn = onDelete != undefined || onExpand != undefined

    const [rows, setRows] = useState<U[]>([])

    useEffect(() => {
        setRows(data)
        return () => {
            setRows([])
        }
    }, [data, display])

    function searchNormalize(str: string): string {
        return str.toLowerCase().replace(/\s+/g, " ").trim()
    }

    function filterRows(query: string) {
        const q = searchNormalize(query).split(" ")
        return data.filter(row => {
            const haystack = searchNormalize(Object.values(row).join(" "))
            return q.every(term => haystack.includes(term))
        })
    }

    return (
        <Box sx={{
            height: "100%",
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
                <Typography level="h1">{display.title}</Typography>
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
                                setRows(filterRows(query))
                            }} /> :
                            null
                    }
                </Box>
            </Box>
            <Sheet
                variant="outlined"
                sx={{
                    overflow: "scroll"
                }}>
                <Table
                    stickyFooter
                    stickyHeader
                    hoverRow
                    variant="soft"
                    borderAxis="bothBetween"
                    sx={{
                        tableLayout: "auto",
                        overflow: "scroll",
                    }}>
                    <thead>
                        <tr>
                            {
                                (Object.keys(display.keys) as (keyof U)[]).map(key => {
                                    return (
                                        <th>
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
                                        width: "0.1%",
                                        whiteSpace: "nowrap",
                                    }}></th> :
                                    null
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows.map(row => {
                                return (
                                    <tr>
                                        {
                                            (Object.keys(display.keys) as (keyof U)[]).map(key => {
                                                return (
                                                    <td>
                                                        {
                                                            display.keys[key].defaultNode(
                                                                key,
                                                                display.keys[key].title,
                                                                row[key]
                                                            )
                                                        }
                                                    </td>
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
                                                                    onClick={() => onExpand(row)}>
                                                                    <MdVisibility />
                                                                </Button> :
                                                                null
                                                        }
                                                        {
                                                            onDelete !== undefined ?
                                                                <Button
                                                                    color="danger"
                                                                    onClick={() => onDelete(row)}>
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
        </Box >
    )
}
