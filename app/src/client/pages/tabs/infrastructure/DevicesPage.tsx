import { DEVICES_STRUCTURE, DevicesEntry } from "../../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { useDevicesDisplay } from "../../../core/tables"
import { tableDetailsViewProps } from "../../../core/utils"
import SectorsPage from "./SectorsPage"

export type DevicesPageProps = Partial<DBTablePageProps<DevicesEntry>>

export default function DevicesPage(props: DevicesPageProps) {
    const display = useDevicesDisplay()

    return (
        <DBTablePage
            route="/devices"
            display={display}
            structure={DEVICES_STRUCTURE}
            detailsBody={({ SectorID }) => (
                <SectorsPage
                    {...tableDetailsViewProps()}
                    fixedData={{ ID: SectorID }}
                />
            )}
            {...props}
        />
    )
}