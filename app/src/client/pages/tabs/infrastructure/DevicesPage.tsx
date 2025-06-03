import { DEVICES_STRUCTURE, DevicesEntry } from "../../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { useDevicesDisplay } from "../../../core/display/displays"

export type DevicesPageProps = Partial<DBTablePageProps<DevicesEntry>>

export default function DevicesPage(props: DevicesPageProps) {
    const display = useDevicesDisplay()

    return (
        <DBTablePage
            apiRoot="/devices"
            display={display}
            structure={DEVICES_STRUCTURE}
            {...props}
        />
    )
}