import { VEHICLES_STRUCTURE, VehiclesEntry } from "../../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { useVehiclesDisplay } from "../../../core/display/displays"

export type VehiclesPageProps = Partial<DBTablePageProps<VehiclesEntry>>

export default function VehiclesPage(props: VehiclesPageProps) {
    const display = useVehiclesDisplay()

    return (
        <DBTablePage
            apiRoot="/vehicles"
            display={display}
            structure={VEHICLES_STRUCTURE}
            {...props}
        />
    )
}
