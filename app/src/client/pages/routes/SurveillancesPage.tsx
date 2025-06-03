import { SURVEILLANCES_STRUCTURE, SurveillancesEntry } from "../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import { useSurveillancesDisplay } from "../../core/display/displays"

export type SurveillancesPageProps = Partial<DBTablePageProps<SurveillancesEntry>>

export default function SurveillancesPage(props: SurveillancesPageProps) {
    const display = useSurveillancesDisplay()

    return (
        <DBTablePage
            apiRoot="/surveillances"
            display={display}
            structure={SURVEILLANCES_STRUCTURE}
            {...props}
        />
    )
}
