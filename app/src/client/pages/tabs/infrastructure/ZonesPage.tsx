import { ZONES_STRUCTURE, ZonesEntry } from "../../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { useZonesDisplay } from "../../../core/display/displays"
import { tableDetailsViewProps } from "../../../core/utils"
import SectorsPage from "./SectorsPage"

export type ZonesPageProps = Partial<DBTablePageProps<ZonesEntry>>

export default function ZonesPage(props: ZonesPageProps) {
    const display = useZonesDisplay()

    return (
        <DBTablePage
            route="/zones"
            display={display}
            structure={ZONES_STRUCTURE}
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