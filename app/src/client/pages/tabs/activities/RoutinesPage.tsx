import { ROUTINES_STRUCTURE, RoutinesEntry } from "../../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { useRoutinesDisplay } from "../../../core/display/displays"

export type RoutinesPageProps = Partial<DBTablePageProps<RoutinesEntry>>

export default function RoutinesPage(props: RoutinesPageProps) {
    const display = useRoutinesDisplay()

    return (
        <DBTablePage
            apiRoot="/routines"
            display={display}
            structure={ROUTINES_STRUCTURE}
            {...props}
        />
    )
}
