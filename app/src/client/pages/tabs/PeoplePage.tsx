import { PEOPLE_STRUCTURE, PeopleEntry } from "../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import { usePeopleDisplay } from "../../core/tables"

export type PeoplePageProps = Partial<DBTablePageProps<PeopleEntry>>

export default function PeoplePage(props: PeoplePageProps) {
    const display = usePeopleDisplay()

    return (
        <DBTablePage
            route="/people"
            display={display}
            structure={PEOPLE_STRUCTURE}
            {...props}
        />
    )
}
