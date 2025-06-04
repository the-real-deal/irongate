import { INMATES_STRUCTURE, InmatesEntry } from "../../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { useInmatesDisplay } from "../../../core/display/displays"
import MovementsPage from "./MovementsPage"
import ScrollFillBox from "../../../components/ScrollFillBox"
import { tableDetailsViewProps, tablePageViewProps } from "../../../core/utils"
import PeoplePage from "../PeoplePage"

export type InmatesPageProps = Partial<DBTablePageProps<InmatesEntry>>

export default function InmatesPage(props: InmatesPageProps) {
    const display = useInmatesDisplay()

    return (
        <DBTablePage
            route="/inmates"
            display={display}
            structure={INMATES_STRUCTURE}
            hiddenTableColumns={["CriminalRecord"]}
            detailsBody={({ DocumentID, Number }) => (
                <ScrollFillBox>
                    <PeoplePage
                        {...tableDetailsViewProps()}
                        fixedData={{ DocumentID }}
                    />
                    <MovementsPage
                        {...tablePageViewProps()}
                        fixedData={{ InmateNumber: Number }}
                    />
                </ScrollFillBox>
            )}
            {...props}
        />
    )
}
