import { COURIERS_STRUCTURE, CouriersEntry } from "../../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { useCouriersDisplay } from "../../../core/display/displays"

export type CouriersPageProps = Partial<DBTablePageProps<CouriersEntry>>

export default function CouriersPage(props: CouriersPageProps) {
    const display = useCouriersDisplay()

    return (
        <DBTablePage
            apiRoot="/couriers"
            display={display}
            structure={COURIERS_STRUCTURE}
            {...props}
        />
    )
}
