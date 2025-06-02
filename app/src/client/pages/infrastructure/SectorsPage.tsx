import { SECTORS_STRUCTURE } from "../../../common/structures"
import DBTablePage from "../../components/tables/DBTablePage"
import { useSectorsDisplay } from "../../core/display/displays"

export default function SectorsPage() {
    const display = useSectorsDisplay()

    return (
        <DBTablePage
            route="/sectors"
            display={display}
            structure={SECTORS_STRUCTURE}
        />
    )
}