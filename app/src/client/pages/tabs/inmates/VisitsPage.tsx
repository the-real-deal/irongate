import { VISITS_STRUCTURE, VisitsEntry } from "../../../../common/structures"
import { useVisitsDisplay } from "../../../core/display/displays"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"

export type VisitsPageProps = Partial<DBTablePageProps<VisitsEntry>>

export default function VisitsPage(props: VisitsPageProps) {
    const display = useVisitsDisplay()

    return (
        <DBTablePage
            apiRoot="/visits"
            display={display}
            structure={VISITS_STRUCTURE}
            {...props}
        />
    )
}