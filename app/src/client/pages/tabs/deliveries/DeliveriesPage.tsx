import { DELIVERIES_STRUCTURE, DeliveriesEntry } from "../../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { useDeliveriesDisplay } from "../../../core/display/displays"

export type DeliveriesPageProps = Partial<DBTablePageProps<DeliveriesEntry>>

export default function DeliveriesPage(props: DeliveriesPageProps) {
    const display = useDeliveriesDisplay()

    return (
        <DBTablePage
            apiRoot="/deliveries"
            display={display}
            structure={DELIVERIES_STRUCTURE}
            {...props}
        />
    )
}
