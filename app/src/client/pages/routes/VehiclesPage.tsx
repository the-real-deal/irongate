import { VEHICLES_STRUCTURE, VehiclesEntry } from "../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import { useVehiclesDisplay } from "../../core/display/displays"
import { tableDetailsViewProps } from "../../core/utils"
import PeoplePage from "../tabs/PeoplePage"

export type VehiclesPageProps = Partial<DBTablePageProps<VehiclesEntry>>

export default function VehiclesPage(props: VehiclesPageProps) {
    const display = useVehiclesDisplay()

    return (
        <DBTablePage
            route="/vehicles"
            display={display}
            structure={VEHICLES_STRUCTURE}
            detailsBody={({ CourierDocumentID }) => (
                <PeoplePage
                    {...tableDetailsViewProps()}
                    fixedData={{ DocumentID: CourierDocumentID }}
                />
            )}
            {...props}
        />
    )
}
