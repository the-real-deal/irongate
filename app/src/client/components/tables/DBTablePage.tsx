import { useCallback, useEffect, useState } from "react"
import { DBTable, entryPrimaryKey, entryRecord, entryString, recordPrimaryKey, TableRecord, TableStructure } from "../../../common/db"
import { TableDisplay } from "../../core/tableDisplay"
import { BaseProps } from "../../core/utils"
import { useSearchParams } from "react-router"
import server from "../../core/server"
import { Box, Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog, Table } from "@mui/joy"
import DBTableView from "./DBTableView"
import DBEntryDetails from "./DBEntryDetails"
import { JSONObject } from "../../../common/json"
import DBEntryCreation from "./DBEntryCreation"
import utils from "../../../common/utils"

export interface DBTablePage<T extends DBTable<TableRecord>> extends BaseProps {
    apiRoute: string,
    display: TableDisplay<T>,
    structure: TableStructure<T>,
}

function searchParamsRecord(searchParams: URLSearchParams): Record<string, string> {
    return Object.fromEntries(searchParams.entries())
}

export default function DBTablePage<T extends DBTable<TableRecord>>({
    apiRoute: route,
    display,
    structure,
    sx,
}: DBTablePage<T>) {
    const [data, setData] = useState<T[] | T | null>(null)
    const [deleteCandidate, setDeleteCandidate] = useState<T | null>(null)
    const [showCreationModal, setShowCreationModal] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    const fetchData = useCallback(async () => {
        const primaryKey = recordPrimaryKey(searchParamsRecord(searchParams), structure)
        const data = await server.fetchJSON(
            route,
            {
                method: "GET",
                params: entryRecord(primaryKey)
            }
        ) as T[] | T
        setData(data)
    }, [searchParams, route, structure])

    useEffect(() => {
        fetchData()
        return () => {
            setData(null)
        }
    }, [fetchData])

    return (
        <Box sx={{
            height: "100%",
            ...sx,
        }}>
            {
                Array.isArray(data) ?
                    <DBTableView
                        display={display}
                        data={data ?? []}
                        onExpand={entry => {
                            const primaryKey = entryPrimaryKey(entry, structure)
                            setSearchParams(entryRecord(primaryKey))
                        }}
                        onDelete={setDeleteCandidate}
                        onCreate={() => setShowCreationModal(true)}
                    /> :
                    <DBEntryDetails
                        data={data ?? undefined}
                        display={{
                            ...display,
                            title: display.title + (
                                data === null ? "" : `: ${entryString(entryPrimaryKey(data, structure))}`
                            )
                        }}
                        onDelete={setDeleteCandidate}
                        onEdit={async (old, edits) => {
                            const primaryKey = entryPrimaryKey(old, structure)
                            await server.fetchAPI(
                                route,
                                {
                                    method: "PUT",
                                    params: entryRecord(primaryKey),
                                    body: edits as JSONObject
                                }
                            )
                            const newPrimaryKey = entryPrimaryKey({ ...old, ...edits }, structure)
                            if (utils.areObjectsEqual(entryRecord(primaryKey), entryRecord(newPrimaryKey))) {
                                await fetchData()
                            } else {
                                setSearchParams(entryRecord(newPrimaryKey), { replace: true })
                            }
                        }}
                    />
            }
            <Modal
                open={deleteCandidate !== null}
                onClose={() => setDeleteCandidate(null)}>
                <ModalDialog
                    variant="outlined"
                    role="alertdialog">
                    <DialogTitle>
                        Confirm deletion
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        {
                            deleteCandidate !== null ?
                                <Table
                                    variant="soft"
                                    borderAxis="none"
                                    sx={{
                                        tableLayout: "auto",
                                        overflow: "scroll",
                                    }}>
                                    <tbody>
                                        {

                                            (Object.keys(display.keys) as (keyof T)[]).map(key => (
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
                                                        {deleteCandidate[key]}
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table> :
                                null
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="solid"
                            color="danger"
                            onClick={async () => {
                                if (deleteCandidate == null) {
                                    return
                                }
                                const primaryKey = entryPrimaryKey(deleteCandidate, structure)
                                await server.fetchAPI(
                                    route,
                                    {
                                        method: "DELETE",
                                        params: entryRecord(primaryKey)
                                    }
                                )
                                setDeleteCandidate(null)
                                if (searchParams.size !== 0) {
                                    setSearchParams({})
                                } else {
                                    await fetchData()
                                }
                            }}>
                            Delete
                        </Button>
                        <Button
                            variant="plain"
                            color="neutral"
                            onClick={() => setDeleteCandidate(null)}>
                            Cancel
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
            <Modal
                open={showCreationModal}
                onClose={() => setShowCreationModal(false)}>
                <ModalDialog
                    variant="outlined"
                    sx={{
                        minWidth: "50%"
                    }}>
                    <DialogTitle>
                        Create new entry
                    </DialogTitle>
                    <Divider />
                    <DBEntryCreation
                        display={display}
                        open={showCreationModal}
                        InputsContainer={DialogContent}
                        ButtonsContainer={DialogActions}
                        onConfirm={async (data) => {
                            await server.fetchAPI(
                                route,
                                {
                                    method: "POST",
                                    body: data as JSONObject
                                }
                            )
                            setShowCreationModal(false)
                            await fetchData()
                        }}
                        onClose={() => setShowCreationModal(false)}
                    />
                </ModalDialog>
            </Modal>
        </Box>
    )
}
