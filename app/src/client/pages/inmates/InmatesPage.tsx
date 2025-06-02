import { INMATES_STRUCTURE } from "../../../common/structures"
import DBTablePage from "../../components/tables/DBTablePage"
import { useInmatesDisplay } from "../../core/display/displays"

export default function InmatesPage() {
    const display = useInmatesDisplay()

    return (
        <DBTablePage
            apiRoute="/inmates"
            display={display}
            structure={INMATES_STRUCTURE}
        />
    )
}
