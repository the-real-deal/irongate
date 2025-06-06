import { PARTECIPATIONS_STRUCTURE, PartecipationsEntry } from "../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import { usePartecipationsDisplay } from "../../core/tables"
import { tableDetailsViewProps } from "../../core/utils"
import SectorsPage from "../tabs/infrastructure/SectorsPage"

export type PartecipationsPageProps = Partial<DBTablePageProps<PartecipationsEntry>>

export default function PartecipationsPage(props: PartecipationsPageProps) {
    const display = usePartecipationsDisplay()

    return (
        <DBTablePage
            route="/partecipations"
            display={display}
            structure={PARTECIPATIONS_STRUCTURE}
            detailsBody={({ SectorID }) => (
                <SectorsPage
                    {...tableDetailsViewProps()}
                    fixedData={{ ID: SectorID }}
                />
            )}
            {...props}
        />
    )
}
