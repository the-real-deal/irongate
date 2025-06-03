import { REPORTS_STRUCTURE, ReportsEntry } from "../../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { useReportsDisplay } from "../../../core/display/displays"

export type ReportsPageProps = Partial<DBTablePageProps<ReportsEntry>>

export default function ReportsPage(props: ReportsPageProps) {
    const display = useReportsDisplay()

    return (
        <DBTablePage
            apiRoot="/reports"
            display={display}
            structure={REPORTS_STRUCTURE}
            hiddenTableColumns={["Description"]}
            {...props}
        />
    )


}