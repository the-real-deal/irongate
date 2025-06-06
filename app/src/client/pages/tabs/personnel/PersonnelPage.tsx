import { usePersonnelDisplay } from "../../../core/tables"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { PERSONNEL_STRUCTURE, PersonnelEntry } from "../../../../common/structures"
import ScrollFillBox from "../../../components/ScrollFillBox"
import PeoplePage from "../PeoplePage"
import { tableDetailsViewProps } from "../../../core/utils"

export type PersonnelPageProps = Partial<DBTablePageProps<PersonnelEntry>>

export default function PersonnelPage(props: PersonnelPageProps) {
    const display = usePersonnelDisplay()

    return (
        <DBTablePage
            route="/personnel"
            display={display}
            structure={PERSONNEL_STRUCTURE}
            detailsBody={({ DocumentID }) => (
                <ScrollFillBox>
                    <PeoplePage
                        {...tableDetailsViewProps()}
                        fixedData={{ DocumentID }}
                    />
                </ScrollFillBox>
            )}
            {...props}
        />
    )
}
