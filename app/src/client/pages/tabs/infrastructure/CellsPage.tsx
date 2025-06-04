import { CELLS_STRUCTURE, CellsEntry } from "../../../../common/structures"
import ScrollFillBox from "../../../components/ScrollFillBox"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { useCellsDisplay } from "../../../core/display/displays"
import { tableDetailsViewProps, tablePageViewProps } from "../../../core/utils"
import InmatesPage from "../inmates/InmatesPage"
import SectorsPage from "./SectorsPage"

export type CellsPageProps = Partial<DBTablePageProps<CellsEntry>>

export default function PeoplePage(props: CellsPageProps) {
    const display = useCellsDisplay()

    return (
        <DBTablePage
            route="/cells"
            display={display}
            structure={CELLS_STRUCTURE}
            detailsBody={({ SectorID, Number }) => (
                <ScrollFillBox>
                    <SectorsPage
                        {...tableDetailsViewProps()}
                        fixedData={{ ID: SectorID }}
                    />
                    <InmatesPage
                        {...tablePageViewProps()}
                        fixedData={{ CellSectorID: SectorID, CellNumber: Number }}
                    />
                </ScrollFillBox>
            )}
            {...props}
        />
    )
}
