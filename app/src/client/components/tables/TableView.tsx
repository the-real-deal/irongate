import { Box, Button, Sheet, Table, Typography } from "@mui/joy"
import { BaseProps } from "../../api/utils"
import { useEffect, useState } from "react"
import { MdDelete, MdVisibility } from "react-icons/md"
import SearchBar from "../SearchBar"
import { getKeyDisplays, TableStructureDisplay } from "../../api/tableDisplay"
import { QueryEntry, TableStructure } from "../../../common/db"

export interface TableViewProps<U extends QueryEntry<TableStructure>, T extends TableStructureDisplay<U>> extends BaseProps {
    display: T
    data: U[]
    search?: boolean
    onExpand?: (entry: U) => void
    onDelete?: (entry: U) => void
}

export default function TableView<U extends QueryEntry<TableStructure>, T extends TableStructureDisplay<U>>({
    display,
    data,
    search = true,
    onDelete,
    onExpand,
    sx,
}: TableViewProps<U, T>) {
    const keyDisplays = getKeyDisplays<U, T>(display)
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
                {
                    search ?
                        <SearchBar onChange={async (query) => {
                            setRows(filterRows(query))
                        }} /> :
                        null
                }
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
                    variant="plain"
                    borderAxis="both"
                    sx={{
                        tableLayout: "auto",
                        overflow: "scroll",
                    }}>
                    <thead>
                        <tr>
                            {
                                (Object.keys(keyDisplays)).map(key => {
                                    return (
                                        <th>
                                            {keyDisplays[key].title}
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
                            rows.length == 0 ?
                                <tr>
                                    <th colSpan={Object.keys(display.keys).length}>
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
                                            (Object.keys(keyDisplays)).map(key => {
                                                return (
                                                    <td>
                                                        {
                                                            keyDisplays[key]
                                                                .defaultNode(key as keyof U, row[key as keyof U])
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
                                ))
                        }
                    </tbody>
                </Table>
            </Sheet>
        </Box >
    )
}
