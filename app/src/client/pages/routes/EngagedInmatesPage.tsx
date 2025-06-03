import { ENGAGED_INMATES_STRUCTURE, EngagedInmatesEntry } from "../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import { useEngagedInmatesDisplay } from "../../core/display/displays"

export type EngagedInmatesPageProps = Partial<DBTablePageProps<EngagedInmatesEntry>>

export default function EngagedInmatesPage(props: EngagedInmatesPageProps) {
    const display = useEngagedInmatesDisplay()

    return (
        <DBTablePage
            apiRoot="/engaged-inmates"
            display={display}
            structure={ENGAGED_INMATES_STRUCTURE}
            {...props}
        />
    )
}