import TableView from "../components/tables/TableView"
import { useCallback, useEffect, useState } from "react"
import server from "../api/server"
import { useSearchParams } from "react-router"
import { createDisplay } from "../api/tableDisplay"
import DetailView from "../components/tables/DetailView"
import { Box, Button, DialogActions, DialogContent, DialogTitle, Divider, Input, Modal, ModalDialog } from "@mui/joy"
import { PeopleEntry } from "../../common/tables/people"
import JoyDatePicker from "../components/JoyDatePicker"
import dates, { MYSQL_DATE_FORMAT } from "../../common/dates"

export default function PeoplePage() {
    const [data, setData] = useState<PeopleEntry[] | PeopleEntry | null>(null)
    const [deleteCandidate, setDeleteCandidate] = useState<PeopleEntry | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const fetchData = useCallback(async () => {
        const id = searchParams.get("id") ?? undefined
        const data = await server.fetchJSON(
            "/people",
            {
                params: { id }
            }
        ) as PeopleEntry[] | PeopleEntry
        setData(data)
    }, [searchParams])

    useEffect(() => {
        fetchData()
        return () => {
            setData(null)
        }
    }, [fetchData])

    const display = createDisplay<PeopleEntry>("People", {
        DocumentID: {
            title: "Document ID"
        },
        Name: {
            inputNode: (key, value, edits) => (
                <Input
                    key={key}
                    defaultValue={value}
                    onChange={e => {
                        edits[key] = e.target.value
                    }}
                />
            )
        },
        Surname: {
            inputNode: (key, value, edits) => (
                <Input
                    key={key}
                    defaultValue={value}
                    onChange={e => {
                        edits[key] = e.target.value
                    }}
                />
            )
        },
        Gender: {
            title: "Gender",
            inputNode: (key, value, edits) => (
                <Input
                    key={key}
                    defaultValue={value}
                    onChange={e => {
                        edits[key] = e.target.value
                    }}
                />
            )
        },
        Birthday: {
            inputNode: (key, value, edits) => (
                <JoyDatePicker
                    defaultValue={dates.parse(value, MYSQL_DATE_FORMAT)}
                    timeSelect={false}
                    placeholder={key}
                    onChange={val => {
                        edits[key] = dates.format(val, MYSQL_DATE_FORMAT)
                    }}
                />
            )

        },
        BirthPlace: {
            inputNode: (key, value, edits) => (
                <Input
                    key={key}
                    defaultValue={value}
                    onChange={e => {
                        edits[key] = e.target.value
                    }}
                />
            )
        }
    })

    if (data === null) {
        return null
    }

    return (
        <Box sx={{
            height: "100%"
        }}>
            {
                Array.isArray(data) ?
                    <TableView
                        display={display}
                        data={data ?? []}
                        onExpand={({ DocumentID }) => setSearchParams({ id: DocumentID })}
                        onDelete={setDeleteCandidate}
                        onCreate={() => null}
                    /> :
                    <DetailView
                        data={data}
                        display={display}
                        onDelete={setDeleteCandidate}
                        onEdit={async (old, edits) => {
                            await server.fetchAPI(
                                "/people",
                                {
                                    method: "PUT",
                                    params: { id: old.DocumentID },
                                    body: edits
                                }
                            )
                            await fetchData()
                        }}
                    />
            }
            <Modal
                open={deleteCandidate !== null}
                onClose={() => setDeleteCandidate(null)}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        Confirmation
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        Are you sure you want to delete {deleteCandidate?.Name} {deleteCandidate?.Surname} ({deleteCandidate?.DocumentID})?
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="solid"
                            color="danger"
                            onClick={async () => {
                                if (deleteCandidate == null) {
                                    return
                                }
                                await server.fetchAPI(
                                    "/people",
                                    {
                                        method: "DELETE",
                                        params: { id: deleteCandidate.DocumentID }
                                    }
                                )
                                setDeleteCandidate(null)
                                if (searchParams.get("id") !== null) {
                                    setSearchParams({})
                                } else {
                                    await fetchData()
                                }
                            }}>
                            Confirm
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
        </Box>
    )
}
