import { MOVEMENTS_STRUCTURE, MovementsEntry } from "../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import { useMovementsDisplay } from "../../core/display/displays"

export type MovementsPageProps = Partial<DBTablePageProps<MovementsEntry>> & {

}

export default function MovementsPage(props: MovementsPageProps) {
    const display = useMovementsDisplay()

    return (
        <DBTablePage
            route="/movements"
            display={display}
            structure={MOVEMENTS_STRUCTURE}
            {...props}
        />
    )
}
