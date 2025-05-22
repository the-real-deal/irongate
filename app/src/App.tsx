import { Box, CssBaseline, CssVarsProvider, extendTheme, Typography } from "@mui/joy"
import OverviewPage from "./pages/OverviewPage"
import { FC } from "react"
import { MdApartment, MdBarChart, MdClass, MdGroup, MdLocalPolice, MdLocalShipping, MdMenu, MdPestControlRodent } from "react-icons/md"
import InfrastructurePage from "./pages/InfrastructurePage"
import PeoplePage from "./pages/PeoplePage"
import InmatesPage from "./pages/InmatesPage"
import PersonnelPage from "./pages/PersonnelPage"
import DeliveriesPage from "./pages/DeliveriesPage"
import ActivitiesPage from "./pages/ActivitiesPage"
import ThemeSwitcher from "./components/ThemeSwitcher"
import Sidebar from "./components/Sidebar"

const TABS = [
    {
        // statistiche
        title: "Overview",
        icon: <MdBarChart />,
        content: <OverviewPage />
    },
    {
        // settori, celle, zone, dispositivi
        title: "Infrastructure",
        icon: <MdApartment />,
        content: <InfrastructurePage />
    },
    {
        // dati anagrafici + tipo di persona
        title: "People",
        icon: <MdGroup />,
        content: <PeoplePage />
    },
    {
        // prigionieri, movimenti di celle, visite
        title: "Inmates",
        icon: <MdPestControlRodent />,
        content: <InmatesPage />
    },
    {
        // personale, report
        title: "Personnel",
        icon: <MdLocalPolice />,
        content: <PersonnelPage />
    },
    {
        // consegne, corrieri, veicoli
        title: "Deliveries",
        icon: <MdLocalShipping />,
        content: <DeliveriesPage />
    },
    {
        // attività, routine, 
        title: "Activities",
        icon: <MdClass />,
        content: <ActivitiesPage />
    }
]

const THEME = extendTheme()

const App: FC = () => {
    return (
        <CssVarsProvider theme={THEME}>
            <CssBaseline />
            <Box sx={{
                height: '100dvh',
                width: '100dvw',
                padding: 0,
                margin: 0
            }}>
                <Sidebar tabs={TABS} expandButtonContent={<MdMenu />}>
                    <Box sx={{
                        width: "100%",
                        padding: "1em"
                    }}>
                        <Typography sx={{ fontWeight: "bold" }}>Theme</Typography>
                        <ThemeSwitcher sx={{
                            width: "100%",
                        }} />
                    </Box>
                </Sidebar>
            </Box>
        </CssVarsProvider >
    )
}

export default App