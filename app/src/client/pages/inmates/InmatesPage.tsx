import { Box, Divider } from "@mui/joy"
import { INMATES_STRUCTURE } from "../../../common/structures"
import DBTablePage from "../../components/tables/DBTablePage"
import { useInmatesDisplay } from "../../core/display/displays"
import MovementsPage from "./MovementsPage"

export default function InmatesPage() {
    const display = useInmatesDisplay()

    return (
        <DBTablePage
            route="/inmates"
            display={display}
            structure={INMATES_STRUCTURE}
            extraDetails={(inmate) => (
                <Box sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1em"
                }}>
                    <MovementsPage
                        fixedData={{
                            InmateNumber: inmate.Number
                        }}
                        sx={{
                            flex: 1
                        }}
                    />
                    <Divider orientation="vertical" />
                    <MovementsPage
                        fixedData={{
                            InmateNumber: inmate.Number
                        }}
                        sx={{
                            flex: 1
                        }}
                    />
                </Box>
            )}
        />
    )
}
