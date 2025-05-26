import { Sheet, Table, Typography } from "@mui/joy"
import { BaseProps } from "../../utils"
import { QueryEntry, TableStructure } from "../../../server/core/db"
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

export default function TableView<T extends QueryEntry<TableStructure>>({
    structure,
    data,
    sx,
}: Props<T>) {
    return (
        <Sheet variant="outlined" sx={{
            height: "100%",
            overflow: "scroll"
        }}>
            <Table
                stickyFooter
                stickyHeader
                hoverRow
                variant="plain"
                sx={{
                    "& thead": {
                        background: "background.neutral"
                    },
                    // "& tr > *:last-child": {
                    //     position: "sticky",
                    //     right: 0,
                    //     bgcolor: "var(--TableCell-headBackground)",
                    // },
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
                                                            value :
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
        </Sheet>
    )
}
