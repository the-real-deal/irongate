import { ROUTINES_STRUCTURE, RoutinesEntry } from "../../../../common/structures"
import ScrollFillBox from "../../../components/ScrollFillBox"
import DBTablePage, { DBTablePageProps } from "../../../components/tables/DBTablePage"
import { useRoutinesDisplay } from "../../../core/tables"
import { tablePageViewProps } from "../../../core/utils"
import PartecipationsPage from "../../routes/PartecipationsPage"
import SurveillancesPage from "../../routes/SurveillancesPage"

export type RoutinesPageProps = Partial<DBTablePageProps<RoutinesEntry>>

export default function RoutinesPage(props: RoutinesPageProps) {
    const display = useRoutinesDisplay()

    return (
        <DBTablePage
            route="/routines"
            display={display}
            structure={ROUTINES_STRUCTURE}
            detailsBody={({ Datetime, ZoneSectorID, ZoneNumber }) => (
                <ScrollFillBox>
                    <PartecipationsPage
                        {...tablePageViewProps()}
                        fixedData={{
                            RoutineDatetime: Datetime,
                            RoutineZoneSectorID: ZoneSectorID,
                            RoutineZoneNumber: ZoneNumber,
                        }}
                    />
                    <SurveillancesPage
                        {...tablePageViewProps()}
                        fixedData={{
                            RoutineDatetime: Datetime,
                            RoutineZoneSectorID: ZoneSectorID,
                            RoutineZoneNumber: ZoneNumber,
                        }}
                    />
                </ScrollFillBox>
            )}
            {...props}
        />
    )
}
