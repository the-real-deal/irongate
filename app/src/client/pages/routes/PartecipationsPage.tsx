import { PARTECIPATIONS_STRUCTURE, PartecipationsEntry } from "../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import { usePartecipationsDisplay } from "../../core/display/displays"

export type PartecipationsPageProps = Partial<DBTablePageProps<PartecipationsEntry>>

export default function PartecipationsPage(props: PartecipationsPageProps) {
    const display = usePartecipationsDisplay()

    return (
        <DBTablePage
            apiRoot="/partecipations"
            display={display}
            structure={PARTECIPATIONS_STRUCTURE}
            {...props}
        />
    )
}
