import { INMATES_STRUCTURE, InmatesEntry } from "../../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { useInmatesDisplay } from "../../../core/display/displays"
import MovementsPage from "./MovementsPage"

export type InmatesPageProps = Partial<DBTablePageProps<InmatesEntry>>

export default function InmatesPage(props: InmatesPageProps) {
    const display = useInmatesDisplay()

    return (
        <DBTablePage
            apiRoot="/inmates"
            display={display}
            structure={INMATES_STRUCTURE}
            extraDetails={(inmate) => (
                <MovementsPage
                    fixedData={{
                        InmateNumber: inmate.Number
                    }}
                    sx={{
                        flex: 1
                    }}
                />
            )}
            {...props}
        />
    )
}
