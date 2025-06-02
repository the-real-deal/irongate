import { Box, Button, Table } from "@mui/joy"
import { TableRecord, TableEntry, TableStructure } from "../../../common/db"
import { TableDisplay } from "../../core/display/tableDisplay"
import { BaseProps } from "../../core/utils"
import { ComponentType, PropsWithChildren, useState } from "react"

// TODO fix data all null + redirect to ?

export interface DBEntryCreationProps<T extends TableEntry<TableRecord>> extends BaseProps {
    display: TableDisplay<T>
    structure: TableStructure<T>
    onConfirm: (data: Partial<T>) => void
    onClose: () => void
    defaultData?: Partial<T>
    InputsContainer?: ComponentType<PropsWithChildren>
    ButtonsContainer?: ComponentType<PropsWithChildren>
}

export default function DBEntryCreation<T extends TableEntry<TableRecord>>({
    display,
    structure,
    InputsContainer = Box,
    ButtonsContainer = Box,
    onConfirm,
    onClose,
    defaultData = {}
}: DBEntryCreationProps<T>) {
    const initialData = Object.fromEntries(
        (Object.keys(display.keys) as (keyof T)[])
            .filter(key => structure[key].generate === false)
            .map(key => [key, defaultData[key] ?? null])
    ) as Partial<T>

    const [data,] = useState<Partial<T>>(initialData)

    async function fullClose() {
        await onClose()
    }

    return (
        <Box>
            <form
                onSubmit={async (e) => {
                    e.preventDefault()
                    await onConfirm(data)
                    await fullClose()
                }}
                onReset={async (e) => {
                    e.preventDefault()
                    await fullClose()
                }}>
                <InputsContainer>
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
                                                    width: "0.1%",
                                                    whiteSpace: "nowrap",
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
                </InputsContainer>
                <ButtonsContainer>
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
                </ButtonsContainer>
            </form>
        </Box>
    )
}
