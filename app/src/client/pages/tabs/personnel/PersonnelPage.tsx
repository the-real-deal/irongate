import { usePersonnelDisplay } from "../../../core/display/displays"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { PERSONNEL_STRUCTURE, PersonnelEntry } from "../../../../common/structures"

export type PersonnelPageProps = Partial<DBTablePageProps<PersonnelEntry>>

export default function PersonnelPage(props: PersonnelPageProps) {
    const display = usePersonnelDisplay()

    return (
        <DBTablePage
            apiRoot="/personnel"
            display={display}
            structure={PERSONNEL_STRUCTURE}
            {...props}
        />
    )
}
