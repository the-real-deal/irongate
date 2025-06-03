import { VISITORS_STRUCTURE, VisitorsEntry } from "../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import { useVisitorsDisplay } from "../../core/display/displays"

export type VisitorsPageProps = Partial<DBTablePageProps<VisitorsEntry>>

export default function VisitorsPage(props: VisitorsPageProps) {
    const display = useVisitorsDisplay()

    return (
        <DBTablePage
            apiRoot="/visitors"
            display={display}
            structure={VISITORS_STRUCTURE}
            {...props}
        />
    )
}