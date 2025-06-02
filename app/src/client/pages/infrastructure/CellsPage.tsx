import { CELLS_STRUCTURE } from "../../../common/structures"
import DBTablePage from "../../components/tables/DBTablePage"
import { useCellsDisplay } from "../../core/display/displays"

export default function PeoplePage() {
    const display = useCellsDisplay()

    return (
        <DBTablePage
            route="/cells"
            display={display}
            structure={CELLS_STRUCTURE}
        />
    )
}
