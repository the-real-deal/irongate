import TableView from "../components/core/TableView"
import { PeopleEntry } from "../../server/tables/people"
import { useCallback, useEffect, useState } from "react"
import server from "../api/server"
import { useSearchParams } from "react-router"
import { TableStructureDisplay } from "../api/tableDisplay"
import DetailView from "../components/core/DetailView"
import { Box, Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from "@mui/joy"

export default function PeoplePage() {
    const [data, setData] = useState<PeopleEntry[] | PeopleEntry | null>(null)
    const [deleteCandidate, setDeleteCandidate] = useState<PeopleEntry | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const fetchData = useCallback(async () => {
        const detailID = searchParams.get("id")
        const baseUri = "/people"
        setData(await server.fetchJSON<PeopleEntry[] | PeopleEntry>(
            baseUri + (detailID === null ? "" : `?id=${detailID}`)
        ))
    }, [searchParams])

    useEffect(() => {
        fetchData()
        return () => {
            setData(null)
        }
    }, [fetchData])

    const display: TableStructureDisplay<PeopleEntry> = {
        title: "People",
        keys: {
            DocumentID: {
                title: "Document ID"
            },
            Name: {},
            Surname: {},
            Gender: {
                title: "Gender"
            },
            Birthday: {
                map: (value) => new Date(value).toLocaleDateString()
            },
            BirthPlace: {}
        }
    }

    if (data === null) {
        return null
    }

    return (
        Array.isArray(data) ?
            <Box height={"100%"}>
                <TableView
                    display={display}
                    data={data ?? []}
                    onExpand={({ DocumentID }) => setSearchParams({ id: DocumentID })}
                    onDelete={(e) => setDeleteCandidate(e)}
                />
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
                                        `/people?id=${deleteCandidate.DocumentID}`,
                                        {
                                            method: "DELETE",
                                        }
                                    )
                                    await fetchData()
                                    setDeleteCandidate(null)
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
            </Box> :
            <DetailView
                data={data}
                display={display}
            />
    )
}
