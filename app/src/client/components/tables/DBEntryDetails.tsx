import { Box, Button, Sheet, Table, Typography } from "@mui/joy"
import { BaseProps } from "../../core/utils"
import { restrictEntry, TableDisplay } from "../../core/display/tableDisplay"
import { MdCheck, MdClear, MdDelete, MdEdit } from "react-icons/md"
import { useState } from "react"
import { TableEntry, TableRecord, TableStructure } from "../../../common/db"

export interface DBEntryDetailsProps<T extends TableEntry<TableRecord>> extends BaseProps {
    display: TableDisplay<T>
    structure: TableStructure<T>
    data?: T
    onEdit?: (old: T, edits: Partial<T>) => void
    onDelete?: (data: T) => void
}

export default function DBEntryDetails<T extends TableEntry<TableRecord>>({
    display,
    structure,
    data,
    onEdit,
    onDelete,
    sx,
}: DBEntryDetailsProps<T>) {
    const [editing, setEditing] = useState(false)
    const [edits, setEdits] = useState({})

    function resetEditing() {
        setEditing(false)
        setEdits({})
    }

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()
                if (data === undefined || onEdit === undefined) {
                    return
                }
                await onEdit(data, edits)
                resetEditing()
            }}
            onReset={(e) => {
                e.preventDefault()
                resetEditing()
            }}>
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
                        justifyContent: "end",
                        alignItems: "center",
                        gap: ".5em",
                    }}>
                        {
                            onEdit !== undefined ?
                                (
                                    editing ?
                                        <Box sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "end",
                                            alignItems: "center",
                                            gap: ".5em",
                                        }}>
                                            <Button
                                                color="primary"
                                                type="submit">
                                                <MdCheck />
                                            </Button>
                                            <Button
                                                color="danger"
                                                type="reset">
                                                <MdClear />
                                            </Button>
                                        </Box>
                                        :
                                        <Button
                                            color="primary"
                                            onClick={() => setEditing(true)}>
                                            <MdEdit />
                                        </Button>

                                ) :
                                null
                        }
                        {
                            onDelete !== undefined && !editing ?
                                <Button
                                    color="danger"
                                    onClick={async () => {
                                        if (data === undefined) {
                                            return
                                        }
                                        await onDelete(data)
                                    }}>
                                    <MdDelete />
                                </Button> :
                                null
                        }
                    </Box>
                </Box>
                <Sheet variant="outlined">
                    {
                        data !== undefined ?
                            <Table
                                variant="soft"
                                borderAxis="yBetween"
                                sx={{
                                    tableLayout: "auto",
                                    overflow: "scroll",
                                }}>
                                <tbody>
                                    {
                                        (Object.keys(restrictEntry(data, display)) as (keyof T)[]).map(key => {
                                            return (
                                                <tr>
                                                    <th style={{
                                                        width: "0.1%",
                                                        whiteSpace: "nowrap",
                                                    }}>
                                                        {display.keys[key].title}
                                                    </th>
                                                    <td>
                                                        {
                                                            !editing || structure[key].generate !== false ?
                                                                data[key] :
                                                                display.keys[key].inputNode(
                                                                    key,
                                                                    display.keys[key].title,
                                                                    data[key],
                                                                    edits
                                                                )
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table> :
                            null
                    }
                </Sheet>
            </Sheet>
        </form >
    )
}