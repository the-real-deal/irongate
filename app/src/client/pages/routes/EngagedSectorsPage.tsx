import { ENGAGED_SECTORS_STRUCTURE, EngagedSectorsEntry } from "../../../common/structures"
import DBTablePage, { DBTablePageProps } from "../../components/tables/DBTablePage"
import { useEngagedSectorsDisplay } from "../../core/tables"
import { tableDetailsViewProps } from "../../core/utils"
import SectorsPage from "../tabs/infrastructure/SectorsPage"

export type EngagedSectorsPageProps = Partial<DBTablePageProps<EngagedSectorsEntry>>

export default function EngagedSectorsPage(props: EngagedSectorsPageProps) {
    const display = useEngagedSectorsDisplay()

    return (
        <DBTablePage
            route="/engaged-sectors"
            display={display}
            structure={ENGAGED_SECTORS_STRUCTURE}
            detailsBody={({ SectorID }) => (
                <SectorsPage
                    {...tableDetailsViewProps()}
                    fixedData={{ ID: SectorID }}
                />
            )}
            {...props}
        />
    )
}