import { Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog, Table } from "@mui/joy"
import { TableRecord, TableEntry, TableStructure } from "../../../common/db"
import { sortPartialFilledKeys, TableDisplay } from "../../core/tableDisplay"
import { BaseProps } from "../../core/utils"
import { useState } from "react"

export interface DBEntryCreationModalProps<T extends TableEntry<TableRecord>> extends BaseProps {
    open: boolean
    display: TableDisplay<T>
    structure: TableStructure<T>
    onConfirm: (data: Partial<T>) => void
    onClose: () => void
    defaultData?: Partial<T>
}

export default function DBEntryCreationModal<T extends TableEntry<TableRecord>>({
    open,
    display,
    structure,
    onConfirm,
    onClose,
    defaultData = {},
    sx,
}: DBEntryCreationModalProps<T>) {
    const initialData = Object.fromEntries(
        (Object.keys(display.keys) as (keyof T)[])
            .filter(key => !structure.keys[key].generated)
            .sort(sortPartialFilledKeys(defaultData))
            .map(key => [key, defaultData[key] ?? null])
    ) as Partial<T>

    const [data,] = useState<Partial<T>>(initialData)

    async function fullClose() {
        await onClose()
    }

    return (
        <Modal
            open={open}
            onClose={onClose}>
            <ModalDialog
                variant="outlined"
                sx={{
                    minWidth: "40%",
                    display: "flex",
                    flexDirection: "column",
                    ...sx,
                }}>
                <DialogTitle>
                    Create new entry
                </DialogTitle>
                <Divider />
                <form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        maxHeight: "100%",
                        overflowY: "scroll",
                    }}
                    onSubmit={async (e) => {
                        e.preventDefault()
                        await onConfirm(data)
                        await fullClose()
                    }}
                    onReset={async (e) => {
                        e.preventDefault()
                        await fullClose()
                    }}>
                    <DialogContent>

                        <Table
                            variant="soft"
                            borderAxis="none"
                            sx={{
                                tableLayout: "auto",
                                overflow: "scroll",
                            }}>
                            <tbody>
                                {
                                    (Object.keys(initialData) as (keyof T)[])
                                        .map(key => (
                                            <tr>
                                                <th
                                                    style={{
                                                        width: 0,
                                                        whiteSpace: "nowrap",
                                                        verticalAlign: "top",
                                                    }}>
                                                    {display.keys[key].title}
                                                </th>
                                                <td style={{
                                                    backgroundColor: "var(--TableCell-headBackground)"
                                                }}>
                                                    {
                                                        initialData[key] === null ?
                                                            display.keys[key].inputNode(
                                                                key,
                                                                display.keys[key].title,
                                                                undefined,
                                                                data
                                                            ) :
                                                            initialData[key]
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </Table>

                    </DialogContent>
                    <DialogActions sx={{
                        flex: 0
                    }}>
                        <Button
                            variant="solid"
                            color="primary"
                            type="submit">
                            Create
                        </Button>
                        <Button
                            variant="plain"
                            color="neutral"
                            type="reset">
                            Cancel
                        </Button>
                    </DialogActions>
                </form>
            </ModalDialog>
        </Modal >
    )
}
