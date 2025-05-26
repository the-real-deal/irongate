import { Box, Typography } from "@mui/joy"
import TableView from "../components/core/TableView"
import { PeopleEntry } from "../../server/tables/people"
import { useEffect, useState } from "react"
import server from "../api/server"

export default function PeoplePage() {
    const [people, setPeople] = useState<PeopleEntry[] | null>(null)

    useEffect(() => {
        (async () => {
            const res = await server.fetchJSON<PeopleEntry[]>("/people")
            setPeople(res)
        })()
        return () => {
            setPeople(null)
        }
    }, [])

    return (
        <Box>
            <Typography level="h1" paddingBottom={"0.5em"}>People</Typography>
            <TableView<PeopleEntry>
                structure={{
                    DocumentID: {
                        title: "Document ID"
                    },
                    Name: {},
                    Surname: {},
                    Gender: {
                        title: "Gender"
                    }
                }}
                data={people ?? []}
            />
        </Box>
    )
}
