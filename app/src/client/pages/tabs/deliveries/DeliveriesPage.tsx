import { DELIVERIES_STRUCTURE, DeliveriesEntry } from "../../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { useDeliveriesDisplay } from "../../../core/display/displays"
import { tableDetailsViewProps } from "../../../core/utils"
import VehiclesPage from "../../routes/VehiclesPage"

export type DeliveriesPageProps = Partial<DBTablePageProps<DeliveriesEntry>>

export default function DeliveriesPage(props: DeliveriesPageProps) {
    const display = useDeliveriesDisplay()

    return (
        <DBTablePage
            route="/deliveries"
            display={display}
            structure={DELIVERIES_STRUCTURE}
            detailsBody={({ VehiclePlateNumber }) => (
                <VehiclesPage
                    {...tableDetailsViewProps()}
                    fixedData={{ PlateNumber: VehiclePlateNumber }}
                />
            )}
            {...props}
        />
    )
}
