import { GUESTS_STRUCTURE, GuestsEntry } from "../../../common/structures"
import { useGuestsDisplay } from "../../core/display/displays"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"

export type GuestsPageProps = Partial<DBTablePageProps<GuestsEntry>>

export default function GuestsPage(props: GuestsPageProps) {
    const display = useGuestsDisplay()

    return (
        <DBTablePage
            apiRoot="/guests"
            display={display}
            structure={GUESTS_STRUCTURE}
            {...props}
        />
    )
}