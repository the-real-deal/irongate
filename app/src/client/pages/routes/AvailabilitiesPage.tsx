import { AVAILABILITIES_STRUCTURE, AvailabilitiesEntry } from "../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import { useAvailabilitiesDisplay } from "../../core/tables"
import { tableDetailsViewProps } from "../../core/utils"
import ActivitiesPage from "../tabs/activities/ActivitiesPage"

export type AvailabilitiesPageProps = Partial<DBTablePageProps<AvailabilitiesEntry>>

export function AvailabilitiesPage(props: AvailabilitiesPageProps) {
    const display = useAvailabilitiesDisplay()

    return (
        <DBTablePage
            route="/availabilities"
            display={display}
            structure={AVAILABILITIES_STRUCTURE}
            detailsBody={({ ActivityID }) => (
                <ActivitiesPage
                    {...tableDetailsViewProps()}
                    fixedData={{ ID: ActivityID }}
                />
            )}
            {...props}
        />
    )
}