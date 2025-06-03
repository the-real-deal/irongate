import { ENGAGED_DEVICES_STRUCTURE, EngagedDevicesEntry } from "../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import { useEngagedDevicesDisplay } from "../../core/display/displays"

export type EngagedDevicesPageProps = Partial<DBTablePageProps<EngagedDevicesEntry>>

export default function EngagedDevicesPage(props: EngagedDevicesPageProps) {
    const display = useEngagedDevicesDisplay()

    return (
        <DBTablePage
            apiRoot="/engaged-devices"
            display={display}
            structure={ENGAGED_DEVICES_STRUCTURE}
            {...props}
        />
    )
}