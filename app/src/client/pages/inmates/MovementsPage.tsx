import { MOVEMENTS_STRUCTURE } from "../../../common/structures"
import DBTablePage from "../../components/tables/DBTablePage"
import { useMovementsDisplay } from "../../core/display/displays"

export default function InmatesPage() {
    const display = useMovementsDisplay()

    return (
        <DBTablePage
            apiRoute="/movements"
            display={display}
            structure={MOVEMENTS_STRUCTURE}
        />
    )
}
