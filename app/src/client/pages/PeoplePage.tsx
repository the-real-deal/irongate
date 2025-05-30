import DBTable from "../components/tables/DBTable"
import { useCallback, useEffect, useState } from "react"
import server from "../core/server"
import { useSearchParams } from "react-router"
import { createDisplay, dateInputNode, selectInputNode, stringInputNode } from "../core/tableDisplay"
import DBEntryDetails from "../components/tables/DBEntryDetails"
import { Box, Button, DialogActions, DialogContent, DialogTitle, Divider, Input, Modal, ModalDialog } from "@mui/joy"
import { PeopleEntry } from "../../common/tables/people"
import { GENDERS } from "../../common/tables/enums"
import DBEntryCreation from "../components/tables/DBEntryCreation"
import utils from "../../common/utils"

export default function PeoplePage() {
    const [data, setData] = useState<PeopleEntry[] | PeopleEntry | null>(null)
    const [deleteCandidate, setDeleteCandidate] = useState<PeopleEntry | null>(null)
    const [showCreationModal, setShowCreationModal] = useState(false)
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
            inputNode: stringInputNode()
        },
        Surname: {
            inputNode: stringInputNode()
        },
        GenderID: {
            title: "Gender",
            inputNode: selectInputNode(GENDERS)
        },
        Birthday: {
            inputNode: dateInputNode(false)

        },
        BirthPlace: {
            inputNode: (key, title, value, edits) => (
                <Input
                    placeholder={title}
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
                    <DBTable
                        display={display}
                        data={data ?? []}
                        onExpand={({ DocumentID }) => setSearchParams({ id: DocumentID })}
                        onDelete={setDeleteCandidate}
                        onCreate={() => setShowCreationModal(true)}
                    /> :
                    <DBEntryDetails
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
            <Modal
                open={showCreationModal}
                onClose={() => setShowCreationModal(false)}>
                <ModalDialog
                    sx={{
                        minWidth: "50%"
                    }}>
                    <DBEntryCreation
                        display={display}
                        open={showCreationModal}
                        InputsContainer={DialogContent}
                        ButtonsContainer={DialogActions}
                        onConfirm={(data) => {
                            utils.debugAlert(data)
                            setShowCreationModal(false)
                        }}
                        onClose={() => setShowCreationModal(false)}
                    />
                </ModalDialog>
            </Modal>
        </Box>
    )
}
