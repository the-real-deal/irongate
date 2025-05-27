import { Sheet, Table, Typography } from "@mui/joy"
import { QueryEntry, TableStructure } from "../../../server/core/db"
import { BaseProps } from "../../api/utils"
import { tableDisplayObject, TableStructureDisplay } from "../../api/display"

export interface DetailViewProps<T extends QueryEntry<TableStructure>> extends BaseProps {
    display: TableStructureDisplay<T>
    data: T
}

export default function DetailView<T extends QueryEntry<TableStructure>>({
    display,
    data,
    sx,
}: DetailViewProps<T>) {
    return (
        <Sheet sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            ...sx
        }}>
            <Typography level="h1">{display.title}</Typography>
            <Sheet variant="outlined">
                <Table
                    variant="soft"
                    borderAxis="yBetween"
                    sx={{
                        tableLayout: "auto",
                        overflow: "scroll",
                    }}>
                    <tbody>
                        {
                            Object.entries(tableDisplayObject(data, display)).map(([title, node]) => (
                                <tr>
                                    <th style={{
                                        width: "0.1%",
                                        whiteSpace: "nowrap",
                                    }}>
                                        {title}
                                    </th>
                                    <td>{node}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Sheet>
        </Sheet>
    )
}