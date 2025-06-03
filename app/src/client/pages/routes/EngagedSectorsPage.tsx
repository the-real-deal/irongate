import { ENGAGED_SECTORS_STRUCTURE, EngagedSectorsEntry } from "../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import { useEngagedSectorsDisplay } from "../../core/display/displays"

export type EngagedSectorsPageProps = Partial<DBTablePageProps<EngagedSectorsEntry>>

export default function EngagedSectorsPage(props: EngagedSectorsPageProps) {
    const display = useEngagedSectorsDisplay()

    return (
        <DBTablePage
            apiRoot="/engaged-sectors"
            display={display}
            structure={ENGAGED_SECTORS_STRUCTURE}
            {...props}
        />
    )
}