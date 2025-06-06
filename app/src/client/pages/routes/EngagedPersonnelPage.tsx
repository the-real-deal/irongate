import { ENGAGED_PERSONNEL_STRUCTURE, EngagedPersonnelEntry } from "../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import { useEngagedPersonnelDisplay } from "../../core/tables"
import { tableDetailsViewProps } from "../../core/utils"
import PersonnelPage from "../tabs/personnel/PersonnelPage"

export type EngagedPersonnelPageProps = Partial<DBTablePageProps<EngagedPersonnelEntry>>

export default function EngagedPersonnelPage(props: EngagedPersonnelPageProps) {
    const display = useEngagedPersonnelDisplay()

    return (
        <DBTablePage
            route="/engaged-personnel"
            display={display}
            structure={ENGAGED_PERSONNEL_STRUCTURE}
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