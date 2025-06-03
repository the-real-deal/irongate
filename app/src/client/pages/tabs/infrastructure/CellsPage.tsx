import { CELLS_STRUCTURE, CellsEntry } from "../../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { useCellsDisplay } from "../../../core/display/displays"

export type CellsPageProps = Partial<DBTablePageProps<CellsEntry>>

export default function PeoplePage(props: CellsPageProps) {
    const display = useCellsDisplay()

    return (
        <DBTablePage
            apiRoot="/cells"
            display={display}
            structure={CELLS_STRUCTURE}
            {...props}
        />
    )
}
