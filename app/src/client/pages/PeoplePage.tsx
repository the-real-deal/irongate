import { createDisplay, dateInputNode, selectInputNode, stringInputNode } from "../core/tableDisplay"
import { PEOPLE_STRUCTURE, PeopleTable } from "../../common/tables/people"
import { GENDERS } from "../../common/tables/enums"
import DBTablePage from "../components/tables/DBTablePage"

const DISPLAY = createDisplay<PeopleTable>("People", {
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
        inputNode: selectInputNode(GENDERS),
    },
    Birthday: {
        inputNode: dateInputNode(false),

    },
    BirthPlace: {
        inputNode: stringInputNode(),
    }
})

export default function PeoplePage() {
    return (
        <DBTablePage
            apiRoute="/people"
            display={DISPLAY}
            structure={PEOPLE_STRUCTURE}
        />
    )
}
