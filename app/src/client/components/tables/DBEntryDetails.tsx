import { Box, Button, Sheet, Table, Typography } from "@mui/joy"
import { BaseProps } from "../../core/utils"
import { TableDisplay } from "../../core/tableDisplay"
import { MdCheck, MdClear, MdDelete, MdEdit } from "react-icons/md"
import { useState } from "react"
import { TableEntry, TableRecord } from "../../../common/db"

export interface DBEntryDetailsProps<U extends TableEntry<TableRecord>, T extends TableDisplay<U>> extends BaseProps {
    display: T
    data?: U
    onEdit?: (old: U, edits: Partial<U>) => void
    onDelete?: (data: U) => void
}

export default function DBEntryDetails<U extends TableEntry<TableRecord>, T extends TableDisplay<U>>({
    display,
    data,
    onEdit,
    onDelete,
    sx,
}: DBEntryDetailsProps<U, T>) {
    const [editing, setEditing] = useState(false)
    const [edits, setEdits] = useState({})

    function resetEditing() {
        setEditing(false)
        setEdits({})
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                if (data === undefined || onEdit === undefined) {
                    return
                }
                onEdit(data, edits)
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
                                    onClick={() => {
                                        if (data === undefined) {
                                            return
                                        }
                                        onDelete(data)
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
                                        (Object.keys(display.keys) as (keyof U)[]).map(key => {
                                            const inputNode = display.keys[key].inputNode(
                                                key,
                                                display.keys[key].title,
                                                data[key],
                                                edits
                                            )
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
                                                            editing ?
                                                                inputNode ?? data[key] :
                                                                data[key]
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