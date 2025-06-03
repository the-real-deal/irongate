import { ACTIVITIES_STRUCTURE, ActivitiesEntry } from "../../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { useActivitiesDisplay } from "../../../core/display/displays"

export type ActivitiesPageProps = Partial<DBTablePageProps<ActivitiesEntry>>

export default function ActivitiesPage(props: ActivitiesPageProps) {
    const display = useActivitiesDisplay()

    return (
        <DBTablePage
            apiRoot="/activities"
            display={display}
            structure={ACTIVITIES_STRUCTURE}
            {...props}
        />
    )
}
