import { ReactNode, useCallback, useEffect, useState } from "react"
import { TableEntry, entryPrimaryKey, entryRecord, recordPrimaryKey, TableRecord, TableStructure } from "../../../common/db"
import { TableDisplay } from "../../core/display/tableDisplay"
import { BaseProps } from "../../core/utils"
import { useNavigate, useSearchParams } from "react-router"
import { Box, Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog, Sheet, Table } from "@mui/joy"
import DBTableView from "./DBTableView"
import DBEntryDetails from "./DBEntryDetails"
import { JSONObject } from "../../../common/json"
import DBEntryCreation from "./DBEntryCreation"
import utils from "../../../common/utils"
import { HttpMethod } from "../../../common/http"
import { fetchAPI, fetchJSON } from "../../core/server"

export interface DBTablePageProps<T extends TableEntry<TableRecord>> extends BaseProps {
    route: string
    display: TableDisplay<T>
    structure: TableStructure<T>
    fixedData?: Partial<T>
    dataFetchFilter?: Partial<T>
    extraDetails?: (data: T) => ReactNode
    expand?: boolean
    remove?: boolean
    create?: boolean
}

function searchParamsRecord(searchParams: URLSearchParams): Record<string, string> {
    return Object.fromEntries(searchParams.entries())
}

export default function DBTablePage<T extends TableEntry<TableRecord>>({
    route,
    display,
    structure,
    fixedData,
    dataFetchFilter,
    extraDetails,
    expand = true,
    remove = true,
    create = true,
    sx,
}: DBTablePageProps<T>) {
    const [deleteCandidate, setDeleteCandidate] = useState<T | null>(null)
    const [showCreationModal, setShowCreationModal] = useState(false)
    const [searchParams,] = useSearchParams()
    const navigate = useNavigate()

    const getDefaultData = useCallback(() => {
        return searchParams.size === 0 ? [] : null
    }, [searchParams])

    const [data, setData] = useState<T[] | T | null>(getDefaultData())

    const fetchData = useCallback(async () => {
        const primaryKey = window.location.pathname !== route || searchParams.size === 0 ?
            undefined :
            entryRecord(recordPrimaryKey(searchParamsRecord(searchParams), structure))
        const data = await fetchJSON<T[]>(
            HttpMethod.GET,
            route,
            {
                params: primaryKey === undefined ?
                    (
                        dataFetchFilter === undefined ?
                            (
                                fixedData === undefined ?
                                    undefined : entryRecord(fixedData)
                            ) : entryRecord(dataFetchFilter)
                    ) : primaryKey
            }
        )
        setData(primaryKey === undefined ? data : data[0] ?? getDefaultData())
    }, [searchParams, route, structure, getDefaultData, dataFetchFilter, fixedData])

    useEffect(() => {
        fetchData()
        return () => {
            setData(getDefaultData())
        }
    }, [fetchData, getDefaultData])

    return (
        <Box sx={{
            height: "100%",
            maxHeight: "100%",
            ...sx,
        }}>
            {
                Array.isArray(data) ?
                    <DBTableView
                        display={{
                            ...display,
                        }}
                        hiddenKeys={fixedData === undefined ? undefined : Object.keys(fixedData)}
                        data={data ?? []}
                        onExpand={expand ? (entry => {
                            const primaryKey = entryPrimaryKey(entry, structure)
                            navigate(`${route}?${new URLSearchParams(entryRecord(primaryKey))}`)
                        }) : undefined}
                        onDelete={remove ? setDeleteCandidate : undefined}
                        onCreate={create ? (() => setShowCreationModal(true)) : undefined}
                    /> :
                    <Sheet sx={{
                        width: "100%",
                        height: "100%",
                        maxHeight: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <DBEntryDetails
                            data={data ?? undefined}
                            display={display}
                            structure={structure}
                            onDelete={setDeleteCandidate}
                            onEdit={async (old, edits) => {
                                const primaryKey = entryPrimaryKey(old, structure)
                                await fetchAPI(
                                    HttpMethod.PUT,
                                    route,
                                    {
                                        params: entryRecord(primaryKey),
                                        body: edits as JSONObject
                                    }
                                )
                                const newPrimaryKey = entryPrimaryKey({ ...old, ...edits }, structure)
                                if (utils.areObjectsEqual(entryRecord(primaryKey), entryRecord(newPrimaryKey))) {
                                    await fetchData()
                                } else {
                                    navigate(`${route}?${new URLSearchParams(entryRecord(newPrimaryKey))}`, {
                                        replace: true
                                    })
                                }
                            }}
                        />
                        {
                            data !== null && extraDetails !== undefined ?
                                <Sheet sx={{
                                    width: "100%",
                                    height: 0,
                                    flexGrow: 1,
                                    paddingTop: "1em"
                                }}>
                                    {extraDetails(data)}
                                </Sheet> :
                                null
                        }
                    </Sheet>
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
                                await fetchAPI(
                                    HttpMethod.DELETE,
                                    route,
                                    {
                                        params: entryRecord(primaryKey)
                                    }
                                )
                                setDeleteCandidate(null)
                                if (searchParams.size !== 0) {
                                    navigate(-1)
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
                        minWidth: "40%"
                    }}>
                    <DialogTitle>
                        Create new entry
                    </DialogTitle>
                    <Divider />
                    {
                        showCreationModal ?
                            <DBEntryCreation
                                display={display}
                                structure={structure}
                                defaultData={fixedData}
                                InputsContainer={DialogContent}
                                ButtonsContainer={DialogActions}
                                onConfirm={async (data) => {
                                    await fetchAPI(
                                        HttpMethod.POST,
                                        route,
                                        {
                                            body: data as JSONObject
                                        }
                                    )
                                    setShowCreationModal(false)
                                    await fetchData()
                                }}
                                onClose={() => setShowCreationModal(false)}
                            /> : null
                    }
                </ModalDialog>
            </Modal>
        </Box>
    )
}
