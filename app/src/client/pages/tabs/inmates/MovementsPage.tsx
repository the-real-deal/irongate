import { MOVEMENTS_STRUCTURE, MovementsEntry } from "../../../../common/structures"
import ScrollFillBox from "../../../components/ScrollFillBox"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { useMovementsDisplay } from "../../../core/display/displays"
import { tableDetailsViewProps } from "../../../core/utils"
import CellsPage from "../infrastructure/CellsPage"
import InmatesPage from "./InmatesPage"

export type MovementsPageProps = Partial<DBTablePageProps<MovementsEntry>>

export default function MovementsPage(props: MovementsPageProps) {
    const display = useMovementsDisplay()

    return (
        <DBTablePage
            route="/movements"
            display={display}
            structure={MOVEMENTS_STRUCTURE}
            detailsBody={({ CellSectorID, CellNumber, InmateNumber }) => (
                <ScrollFillBox>
                    <InmatesPage
                        {...tableDetailsViewProps()}
                        fixedData={{ Number: InmateNumber }}
                    />
                    <CellsPage
                        {...tableDetailsViewProps()}
                        fixedData={{
                            SectorID: CellSectorID,
                            Number: CellNumber,
                        }}
                    />
                </ScrollFillBox>
            )}
            {...props}
        />
    )
}
