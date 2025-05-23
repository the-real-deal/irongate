import { Table, Typography } from "@mui/joy"
import { BaseProps } from "../../api/ui/components"
import { ColumnValue, QueryEntry, TableStructure } from "../../api/core/db"
import { ReactNode } from "react"

export interface Props<T extends QueryEntry<TableStructure>> extends BaseProps {
    structure: {
        [K in keyof T]?: {
            title?: string
            map?: (value: T[K]) => ReactNode
        }
    }
    data: T[]
}

function defaultMap(value: ColumnValue): ReactNode {
    return value instanceof Date ? value.toLocaleString() : String(value)
}

export default function TableView<T extends QueryEntry<TableStructure>>({
    structure,
    data,
    sx,
}: Props<T>) {
    return (
        <Table
            stickyFooter
            stickyHeader
            hoverRow
            variant="outlined"
            sx={{
                "& tr > *:last-child": {
                    position: "sticky",
                    right: 0,
                    bgcolor: "var(--TableCell-headBackground)",
                },
                ...sx
            }}>
            <thead>
                <tr>
                    {
                        (Object.keys(structure) as [keyof T]).map(key => {
                            const title = structure[key]?.title
                            return <th key={key.toString()}>{title ?? key.toString()}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.length == 0 ?
                        <tr>
                            <td colSpan={Object.keys(structure).length}>
                                <Typography
                                    level="title-lg"
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "100%"
                                    }}>
                                    No data found
                                </Typography>
                            </td>
                        </tr> :
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {
                                    (Object.keys(structure) as [keyof T]).map(key => {
                                        const value = row[key]
                                        const map = structure[key]?.map
                                        return (
                                            <td key={key.toString()}>
                                                {
                                                    map === undefined ?
                                                        defaultMap(value) :
                                                        map(value)
                                                }
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        ))
                }
            </tbody>
        </Table>
    )
}
