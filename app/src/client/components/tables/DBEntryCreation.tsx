import { Box, Button, Table } from "@mui/joy"
import { QueryEntry, TableStructure } from "../../../common/db"
import { TableStructureDisplay } from "../../core/tableDisplay"
import { BaseProps } from "../../core/utils"
import { ComponentType, ReactNode, useEffect, useState } from "react"

export interface DBEntryCreationProps<T extends QueryEntry<TableStructure>> extends BaseProps {
    display: TableStructureDisplay<T>
    open: boolean
    onConfirm: (data: Partial<T>) => void
    onClose: () => void
    InputsContainer?: ComponentType<{ children: ReactNode }>
    ButtonsContainer?: ComponentType<{ children: ReactNode }>
}

export default function DBEntryCreation<T extends QueryEntry<TableStructure>>({
    display,
    open,
    InputsContainer = Box,
    ButtonsContainer = Box,
    onConfirm,
    onClose,
}: DBEntryCreationProps<T>) {
    const [data, setData] = useState<Partial<T>>({})

    function fullClose() {
        setData({})
        onClose()
    }

    useEffect(() => {
        setData({})
    }, [open])

    return (
        <Box>
            <form
                onSubmit={() => {
                    onConfirm(data)
                    fullClose()
                }}
                onReset={fullClose}>
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
                                (Object.keys(display.keys) as (keyof T)[]).map(key => {
                                    const inputNode = display.keys[key].inputNode(
                                        key,
                                        display.keys[key].title,
                                        undefined,
                                        data
                                    )
                                    return (
                                        inputNode === null ?
                                            null :
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
                                                    {inputNode}
                                                </td>
                                            </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </InputsContainer>
                <ButtonsContainer>
                    <Button
                        variant="solid"
                        color="primary"
                        type="submit">
                        Confirm
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
