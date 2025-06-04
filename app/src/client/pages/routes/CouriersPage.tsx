import { COURIERS_STRUCTURE, CouriersEntry } from "../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import { useCouriersDisplay } from "../../core/display/displays"
import { tableDetailsViewProps } from "../../core/utils"
import PeoplePage from "../tabs/PeoplePage"

export type CouriersPageProps = Partial<DBTablePageProps<CouriersEntry>>

export default function CouriersPage(props: CouriersPageProps) {
    const display = useCouriersDisplay()

    return (
        <DBTablePage
            route="/couriers"
            display={display}
            structure={COURIERS_STRUCTURE}
            detailsBody={({ DocumentID }) => (
                <PeoplePage
                    {...tableDetailsViewProps()}
                    fixedData={{ DocumentID }}
                />
            )}
            {...props}
        />
    )
}
