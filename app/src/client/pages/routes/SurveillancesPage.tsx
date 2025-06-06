import { SURVEILLANCES_STRUCTURE, SurveillancesEntry } from "../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import { useSurveillancesDisplay } from "../../core/tables"
import { tableDetailsViewProps } from "../../core/utils"
import PersonnelPage from "../tabs/personnel/PersonnelPage"

export type SurveillancesPageProps = Partial<DBTablePageProps<SurveillancesEntry>>

export default function SurveillancesPage(props: SurveillancesPageProps) {
    const display = useSurveillancesDisplay()

    return (
        <DBTablePage
            route="/surveillances"
            display={display}
            structure={SURVEILLANCES_STRUCTURE}
            detailsBody={({ PersonnelID }) => (
                <PersonnelPage
                    {...tableDetailsViewProps()}
                    fixedData={{ ID: PersonnelID }}
                />
            )}
            {...props}
        />
    )
}
