import { VISITORS_STRUCTURE, VisitorsEntry } from "../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import { useVisitorsDisplay } from "../../core/tables"
import { tableDetailsViewProps } from "../../core/utils"
import PeoplePage from "../tabs/PeoplePage"

export type VisitorsPageProps = Partial<DBTablePageProps<VisitorsEntry>>

export default function VisitorsPage(props: VisitorsPageProps) {
    const display = useVisitorsDisplay()

    return (
        <DBTablePage
            route="/visitors"
            display={display}
            structure={VISITORS_STRUCTURE}
            detailsBody={({ GuestDocumentID }) => (
                <PeoplePage
                    {...tableDetailsViewProps()}
                    fixedData={{ DocumentID: GuestDocumentID }}
                />
            )}
            {...props}
        />
    )
}