import { ACTIVITIES_STRUCTURE, ActivitiesEntry } from "../../../../common/structures"
import ScrollFillBox from "../../../components/ScrollFillBox"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { useActivitiesDisplay } from "../../../core/tables"
import { tablePageViewProps } from "../../../core/utils"
import { AvailabilitiesPage } from "../../routes/AvailabilitiesPage"
import RoutinesPage from "./RoutinesPage"

export type ActivitiesPageProps = Partial<DBTablePageProps<ActivitiesEntry>>

export default function ActivitiesPage(props: ActivitiesPageProps) {
    const display = useActivitiesDisplay()

    return (
        <DBTablePage
            route="/activities"
            display={display}
            structure={ACTIVITIES_STRUCTURE}
            detailsBody={({ ID }) => (
                <ScrollFillBox>
                    <AvailabilitiesPage
                        {...tablePageViewProps()}
                        fixedData={{ ActivityID: ID }}
                    />
                    <RoutinesPage
                        {...tablePageViewProps()}
                        fixedData={{ ActivityID: ID }}
                    />
                </ScrollFillBox>
            )}
            {...props}
        />
    )
}
