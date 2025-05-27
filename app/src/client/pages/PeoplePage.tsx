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
        <TableView
            title="People"
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
            onExpand={(e) => alert(`EXPAND: ${JSON.stringify(e, undefined, 2)}`)}
            onDelete={(e) => alert(`DELETE: ${JSON.stringify(e, undefined, 2)}`)}
        />
    )
}
