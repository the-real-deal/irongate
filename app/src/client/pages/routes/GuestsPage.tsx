import { GUESTS_STRUCTURE, GuestsEntry } from "../../../common/structures"
import { useGuestsDisplay } from "../../core/tables"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import PeoplePage from "../tabs/PeoplePage"
import { tableDetailsViewProps } from "../../core/utils"

export type GuestsPageProps = Partial<DBTablePageProps<GuestsEntry>>

export default function GuestsPage(props: GuestsPageProps) {
    const display = useGuestsDisplay()

    return (
        <DBTablePage
            route="/guests"
            display={display}
            structure={GUESTS_STRUCTURE}
            detailsBody={({ DocumentID }) => (
                <PeoplePage
                    {...tableDetailsViewProps()}
                    fixedData={{ DocumentID }}
                />
            )}
            {...props}
        />
    )
}