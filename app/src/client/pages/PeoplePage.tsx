import { createDisplay, dateInputNode, selectInputNode, stringInputNode } from "../core/tableDisplay"
import { PEOPLE_STRUCTURE, PeopleEntry } from "../../common/tables/people"
import DBTablePage from "../components/tables/DBTablePage"
import { useEnum } from "../core/enums"

export default function PeoplePage() {
    const genders = useEnum("Genders")

    const display = createDisplay<PeopleEntry>("People", {
        DocumentID: {
            title: "Document ID",
            inputNode: stringInputNode(),
        },
        Name: {
            inputNode: stringInputNode(),
        },
        Surname: {
            inputNode: stringInputNode(),
        },
        GenderID: {
            title: "Gender",
            inputNode: selectInputNode(genders),
        },
        Birthday: {
            inputNode: dateInputNode({ includeTime: false }),

        },
        BirthPlace: {
            inputNode: stringInputNode(),
        }
    })

    return (
        <DBTablePage
            apiRoute="/people"
            display={display}
            structure={PEOPLE_STRUCTURE}
        />
    )
}
