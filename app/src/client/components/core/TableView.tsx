import { Box, Button, Sheet, Table, Typography } from "@mui/joy"
import { BaseProps } from "../../utils"
import { QueryEntry, TableStructure } from "../../../server/core/db"
import { ReactNode, useEffect, useState } from "react"
import { MdDelete, MdVisibility } from "react-icons/md"
import SearchBar from "./SearchBar"

export interface TableViewProps<T extends QueryEntry<TableStructure>> extends BaseProps {
    title: string,
    structure: {
        [K in keyof T]?: {
            title?: string
            map?: (value: T[K]) => ReactNode
        }
    }
    data: T[]
    search?: boolean
    onExpand?: (entry: T) => void
    onDelete?: (entry: T) => void
}

export default function TableView<T extends QueryEntry<TableStructure>>({
    title,
    structure,
    data,
    search = true,
    onDelete,
    onExpand,
    sx,
}: TableViewProps<T>) {
    const lastColumn = onDelete != undefined || onExpand != undefined

    const [rows, setRows] = useState<T[]>([])

    useEffect(() => {
        setRows(data)
        return () => {
            setRows([])
        }
    }, [data])

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
            gap: "0.5em"
        }}>
            <Box sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Typography level="h1">{title}</Typography>
                {
                    search ?
                        <SearchBar onChange={async (query) => {
                            setRows(filterRows(query))
                        }} /> :
                        null
                }
            </Box>
            <Sheet variant="outlined" sx={{
                maxHeight: "100%",
                overflow: "scroll"
            }}>
                <Table
                    stickyFooter
                    stickyHeader
                    hoverRow
                    variant="plain"
                    sx={{
                        tableLayout: "auto",
                        overflowX: "scroll",
                        ...sx
                    }}>
                    <thead>
                        <tr>
                            {
                                (Object.keys(structure) as [keyof T]).map(key => {
                                    const title = structure[key]?.title ?? key.toString()
                                    return (
                                        <th>{title}</th>
                                    )
                                })
                            }
                            {
                                lastColumn ?
                                    <th style={{
                                        width: "0.1%",
                                        whiteSpace: "nowrap",
                                    }}></th> :
                                    null
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows.length == 0 ?
                                <tr>
                                    <th
                                        colSpan={Object.keys(structure).length}
                                        scope="row">
                                        <Box sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%",
                                            height: "100%",
                                        }}>
                                            <Typography level="title-lg">
                                                No data found
                                            </Typography>
                                        </Box>
                                    </th>
                                </tr> :
                                rows.map(row => (
                                    <tr>
                                        {
                                            (Object.keys(structure) as [keyof T]).map(key => {
                                                const value = row[key]
                                                const map = structure[key]?.map
                                                return (
                                                    <td>
                                                        {
                                                            map === undefined ?
                                                                value :
                                                                map(value)
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
                                ))
                        }
                    </tbody>
                </Table>
            </Sheet>
        </Box>
    )
}
