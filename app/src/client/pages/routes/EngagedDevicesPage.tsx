import { ENGAGED_DEVICES_STRUCTURE, EngagedDevicesEntry } from "../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import { useEngagedDevicesDisplay } from "../../core/display/displays"
import { tableDetailsViewProps } from "../../core/utils"
import DevicesPage from "../tabs/infrastructure/DevicesPage"

export type EngagedDevicesPageProps = Partial<DBTablePageProps<EngagedDevicesEntry>>

export default function EngagedDevicesPage(props: EngagedDevicesPageProps) {
    const display = useEngagedDevicesDisplay()

    return (
        <DBTablePage
            route="/engaged-devices"
            display={display}
            structure={ENGAGED_DEVICES_STRUCTURE}
            detailsBody={({ DeviceSerial }) => (
                <DevicesPage
                    {...tableDetailsViewProps()}
                    fixedData={{ Serial: DeviceSerial }}
                />
            )}
            {...props}
        />
    )
}