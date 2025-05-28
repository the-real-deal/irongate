import { Box, Button, Sheet, Table, Typography } from "@mui/joy"
import { QueryEntry, TableStructure } from "../../../server/core/db"
import { BaseProps } from "../../api/utils"
import { tableDisplayObject, TableStructureDisplay } from "../../api/tableDisplay"
import { MdDelete } from "react-icons/md"

export interface DetailViewProps<T extends QueryEntry<TableStructure>> extends BaseProps {
    display: TableStructureDisplay<T>
    data: T
    onEdit?: (old: T, edits: Partial<T>) => void
    onDelete?: (data: T) => void
}

export default function DetailView<T extends QueryEntry<TableStructure>>({
    display,
    data,
    onEdit,
    onDelete,
    sx,
}: DetailViewProps<T>) {
    return (
        <Sheet sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            ...sx
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <Typography level="h1">{display.title}</Typography>
                <Box>
                    {
                        onDelete !== undefined ?
                            <Button
                                color="danger"
                                onClick={() => onDelete(data)}>
                                <MdDelete />
                            </Button> :
                            null
                    }
                </Box>
            </Box>
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