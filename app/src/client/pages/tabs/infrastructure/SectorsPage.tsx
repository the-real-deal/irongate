import { SECTORS_STRUCTURE, SectorsEntry } from "../../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { useSectorsDisplay } from "../../../core/display/displays"

export type SectorsPageProps = Partial<DBTablePageProps<SectorsEntry>>

export default function SectorsPage(props: SectorsPageProps) {
    const display = useSectorsDisplay()

    return (
        <DBTablePage
            apiRoot="/sectors"
            display={display}
            structure={SECTORS_STRUCTURE}
            {...props}
        />
    )
}