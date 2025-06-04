import { REPORTS_STRUCTURE, ReportsEntry } from "../../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { useReportsDisplay } from "../../../core/display/displays"
import EngagedInmatesPage from "../../routes/EngagedInmatesPage"
import EngagedPersonnelPage from "../../routes/EngagedPersonnelPage"
import EngagedSectorsPage from "../../routes/EngagedSectorsPage"
import EngagedDevicesPage from "../../routes/EngagedDevicesPage"
import ScrollFillBox from "../../../components/ScrollFillBox"

export type ReportsPageProps = Partial<DBTablePageProps<ReportsEntry>>

export default function ReportsPage(props: ReportsPageProps) {
    const display = useReportsDisplay()

    return (
        <DBTablePage
            route="/reports"
            display={display}
            structure={REPORTS_STRUCTURE}
            hiddenTableColumns={["Description"]}
            detailsBody={({ ID }) => (
                <ScrollFillBox>
                    <EngagedInmatesPage search={false} fixedData={{ ReportID: ID }} />
                    <EngagedPersonnelPage search={false} fixedData={{ ReportID: ID }} />
                    <EngagedSectorsPage search={false} fixedData={{ ReportID: ID }} />
                    <EngagedDevicesPage search={false} fixedData={{ ReportID: ID }} />
                </ScrollFillBox>
            )}
            {...props}
        />
    )


}