import { ReactNode, useCallback, useEffect, useState } from "react"
import { TableEntry, entryPrimaryKey, entryRecord, recordPrimaryKey, TableRecord, TableStructure } from "../../../common/db"
import { TableDisplay } from "../../core/display/tableDisplay"
import { BaseProps } from "../../core/utils"
import { useNavigate, useSearchParams } from "react-router"
import { Box, Button, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Modal, ModalDialog, Sheet, Table } from "@mui/joy"
import DBTableView from "./DBTableView"
import DBEntryDetails from "./DBEntryDetails"
import { JSONObject } from "../../../common/json"
import DBEntryCreationModal from "./DBEntryCreationModal"
import utils from "../../../common/utils"
import { HttpMethod } from "../../../common/http"
import { fetchAPI, fetchJSON } from "../../core/server"
import { MdOpenInNew } from "react-icons/md"

export interface DBTablePageProps<T extends TableEntry<TableRecord>> extends BaseProps {
    route: string
    display: TableDisplay<T>
    structure: TableStructure<T>
    fixedData?: Partial<T>
    dataFetchFilter?: Partial<T>
    hiddenTableColumns?: (keyof T)[]
    detailsLink?: boolean
    detailsBody?: (data: T) => ReactNode
    defaultDetails?: boolean
    search?: boolean
    expand?: boolean
    edit?: boolean
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
    hiddenTableColumns,
    detailsLink = false,
    detailsBody,
    defaultDetails = false,
    search = true,
    expand = true,
    edit = true,
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
            `/crud${route}`,
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
        setData(primaryKey !== undefined || defaultDetails ? (data[0] ?? getDefaultData()) : data)
    }, [searchParams, route, structure, getDefaultData, dataFetchFilter, fixedData, defaultDetails])

    useEffect(() => {
        fetchData()
        return () => {
            setData(getDefaultData())
        }
    }, [fetchData, getDefaultData])

    function expandEntry(entry: T) {
        const primaryKey = entryPrimaryKey(entry, structure)
        navigate(`${route}?${new URLSearchParams(entryRecord(primaryKey))}`)
    }

    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            ...sx,
        }}>
            {
                Array.isArray(data) ?
                    <DBTableView
                        display={{
                            ...display,
                        }}
                        hiddenKeys={[
                            ...(hiddenTableColumns ?? []),
                            ...(
                                fixedData === undefined ? [] : Object.keys(fixedData)
                            )
                        ]}
                        search={search}
                        data={data ?? []}
                        onExpand={expand ? expandEntry : undefined}
                        onDelete={remove ? setDeleteCandidate : undefined}
                        onCreate={create ? (() => setShowCreationModal(true)) : undefined}
                    /> :
                    <Sheet sx={{
                        width: "100%",
                        minHeight: "100%",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "scroll",
                        gap: "1em"
                    }}>
                        <DBEntryDetails
                            data={data ?? undefined}
                            display={display}
                            structure={structure}
                            header={
                                detailsLink && data !== undefined && data !== null ?
                                    <IconButton
                                        component="a"
                                        onClick={() => expandEntry(data)}>
                                        <MdOpenInNew />
                                    </IconButton>
                                    : null
                            }
                            onDelete={remove ? setDeleteCandidate : undefined}
                            onEdit={edit ? async (old, edits) => {
                                const primaryKey = entryPrimaryKey(old, structure)
                                for (const key of (Object.keys(edits) as (keyof T)[])) {
                                    if (edits[key] === old[key]) {
                                        delete edits[key]
                                    }
                                }
                                utils.debugAlert({ primaryKey, old, edits })
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
                            } : undefined}
                        />
                        {
                            data !== null && detailsBody !== undefined ?
                                <Sheet sx={{
                                    width: "100%",
                                    height: "40dvh",
                                    flexGrow: 1,
                                    overflow: "scroll",
                                }}>
                                    {detailsBody(data)}
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
                                if (Array.isArray(data)) {
                                    await fetchData()
                                } else {
                                    navigate(-1)
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
            <DBEntryCreationModal
                open={showCreationModal}
                onClose={() => setShowCreationModal(false)}
                display={display}
                structure={structure}
                defaultData={fixedData}
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
            />
        </Box>
    )
}
