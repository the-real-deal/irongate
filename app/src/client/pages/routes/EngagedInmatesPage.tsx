import { ENGAGED_INMATES_STRUCTURE, EngagedInmatesEntry } from "../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import { useEngagedInmatesDisplay } from "../../core/display/displays"
import { tableDetailsViewProps } from "../../core/utils"
import InmatesPage from "../tabs/inmates/InmatesPage"

export type EngagedInmatesPageProps = Partial<DBTablePageProps<EngagedInmatesEntry>>

export default function EngagedInmatesPage(props: EngagedInmatesPageProps) {
    const display = useEngagedInmatesDisplay()

    return (
        <DBTablePage
            route="/engaged-inmates"
            display={display}
            structure={ENGAGED_INMATES_STRUCTURE}
            detailsBody={({ InmateNumber }) => (
                <InmatesPage
                    {...tableDetailsViewProps()}
                    fixedData={{ Number: InmateNumber }}
                />
            )}
            {...props}
        />
    )
}