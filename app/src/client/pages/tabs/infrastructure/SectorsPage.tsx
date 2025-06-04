import { SECTORS_STRUCTURE, SectorsEntry } from "../../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { useSectorsDisplay } from "../../../core/display/displays"
import { AvailabilitiesPage } from "../../routes/AvailabilitiesPage"

export type SectorsPageProps = Partial<DBTablePageProps<SectorsEntry>>

export default function SectorsPage(props: SectorsPageProps) {
    const display = useSectorsDisplay()

    return (
        <DBTablePage
            route="/sectors"
            display={display}
            structure={SECTORS_STRUCTURE}
            detailsBody={({ SecurityLevelID }) => (
                <AvailabilitiesPage fixedData={{ SecurityLevelID }} />
            )}
            {...props}
        />
    )
}