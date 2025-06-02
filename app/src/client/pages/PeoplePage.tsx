import { PEOPLE_STRUCTURE } from "../../common/structures"
import DBTablePage from "../components/tables/DBTablePage"
import { usePeopleDisplay } from "../core/display/displays"

export default function PeoplePage() {
    const display = usePeopleDisplay()

    return (
        <DBTablePage
            route="/people"
            display={display}
            structure={PEOPLE_STRUCTURE}
        />
    )
}
