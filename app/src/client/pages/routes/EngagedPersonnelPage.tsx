import { ENGAGED_PERSONNEL_STRUCTURE, EngagedPersonnelEntry } from "../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import { useEngagedPersonnelDisplay } from "../../core/display/displays"

export type EngagedPersonnelPageProps = Partial<DBTablePageProps<EngagedPersonnelEntry>>

export default function EngagedPersonnelPage(props: EngagedPersonnelPageProps) {
    const display = useEngagedPersonnelDisplay()

    return (
        <DBTablePage
            apiRoot="/engaged-personnel"
            display={display}
            structure={ENGAGED_PERSONNEL_STRUCTURE}
            {...props}
        />
    )
}