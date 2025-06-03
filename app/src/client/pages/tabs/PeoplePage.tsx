import { PEOPLE_STRUCTURE, PeopleEntry } from "../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import { usePeopleDisplay } from "../../core/display/displays"

export type PeoplePageProps = Partial<DBTablePageProps<PeopleEntry>>

export default function PeoplePage(props: PeoplePageProps) {
    const display = usePeopleDisplay()

    return (
        <DBTablePage
            apiRoot="/people"
            display={display}
            structure={PEOPLE_STRUCTURE}
            {...props}
        />
    )
}
