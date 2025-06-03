import { ZONES_STRUCTURE, ZonesEntry } from "../../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { useZonesDisplay } from "../../../core/display/displays"

export type ZonesPageProps = Partial<DBTablePageProps<ZonesEntry>>

export default function ZonesPage(props: ZonesPageProps) {
    const display = useZonesDisplay()

    return (
        <DBTablePage
            apiRoot="/zones"
            display={display}
            structure={ZONES_STRUCTURE}
            {...props}
        />
    )
}