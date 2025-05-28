import { Box, Button, Sheet, Table, Typography } from "@mui/joy"
import { QueryEntry, TableStructure } from "../../../server/core/db"
import { BaseProps } from "../../api/utils"
import { getKeyDisplays, TableStructureDisplay } from "../../api/tableDisplay"
import { MdCheck, MdClear, MdDelete, MdEdit } from "react-icons/md"
import { useState } from "react"

export interface DetailViewProps<U extends QueryEntry<TableStructure>, T extends TableStructureDisplay<U>> extends BaseProps {
    display: T
    data: U
    onEdit?: (old: U, edits: Partial<U>) => void
    onDelete?: (data: U) => void
}

export default function DetailView<U extends QueryEntry<TableStructure>, T extends TableStructureDisplay<U>>({
    display,
    data,
    onEdit,
    onDelete,
    sx,
}: DetailViewProps<U, T>) {
    const keyDisplays = getKeyDisplays<U, T>(display)

    const [editing, setEditing] = useState(false)
    const [edits, setEdits] = useState({})

    function resetEditing() {
        setEditing(false)
        setEdits({})
    }

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
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: ".5em",
                }}>
                    {
                        onEdit !== undefined ?
                            <Button
                                color="primary"
                                onClick={() => {
                                    if (editing) {
                                        onEdit(data, edits)
                                        resetEditing()
                                    } else {
                                        setEditing(true)
                                    }
                                }}>
                                {editing ? <MdCheck /> : <MdEdit />}
                            </Button> :
                            null
                    }
                    {
                        onDelete !== undefined ?
                            <Button
                                color="danger"
                                onClick={() => {
                                    if (editing) {
                                        resetEditing()
                                    } else {
                                        onDelete(data)
                                    }
                                }}>
                                {editing ? <MdClear /> : <MdDelete />}
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
                            (Object.keys(keyDisplays)).map(key => {
                                return <tr>
                                    <th style={{
                                        width: "0.1%",
                                        whiteSpace: "nowrap",
                                    }}>
                                        {keyDisplays[key].title}
                                    </th>
                                    <td>
                                        {
                                            editing ?
                                                keyDisplays[key].editNode(key as keyof U, data[key as keyof U], edits) :
                                                keyDisplays[key].defaultNode(key as keyof U, data[key as keyof U])
                                        }
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </Sheet>
        </Sheet>
    )
}