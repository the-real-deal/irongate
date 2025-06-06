import { VISITS_STRUCTURE, VisitsEntry } from "../../../common/structures"
import { useVisitsDisplay } from "../../core/tables"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import VisitorsPage from "./VisitorsPage"

export type VisitsPageProps = Partial<DBTablePageProps<VisitsEntry>>

export default function VisitsPage(props: VisitsPageProps) {
    const display = useVisitsDisplay()

    return (
        <DBTablePage
            route="/visits"
            display={display}
            structure={VISITS_STRUCTURE}
            detailsBody={({ Datetime, InmateNumber }) => (
                <VisitorsPage fixedData={{ VisitDatetime: Datetime, VisitInmateNumber: InmateNumber }} />
            )}
            {...props}
        />
    )
}