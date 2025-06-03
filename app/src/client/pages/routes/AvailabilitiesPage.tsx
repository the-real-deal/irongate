import { AVAILABILITIES_STRUCTURE, AvailabilitiesEntry } from "../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import { useAvailabilitiesDisplay } from "../../core/display/displays"

export type AvailabilitiesPageProps = Partial<DBTablePageProps<AvailabilitiesEntry>>

export function AvailabilitiesPage(props: AvailabilitiesPageProps) {
    const display = useAvailabilitiesDisplay()

    return (
        <DBTablePage
            apiRoot="/availabilities"
            display={display}
            structure={AVAILABILITIES_STRUCTURE}
            {...props}
        />
    )
}