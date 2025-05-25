import { Box, CssBaseline, CssVarsProvider, extendTheme, Typography } from "@mui/joy"
import OverviewPage from "./pages/overview/OverviewPage"
import { MdApartment, MdBarChart, MdClass, MdGroup, MdLocalPolice, MdLocalShipping, MdMenu, MdPestControlRodent } from "react-icons/md"
import InfrastructurePage from "./pages/infrastructure/InfrastructurePage"
import PeoplePage from "./pages/people/PeoplePage"
import InmatesPage from "./pages/inmates/InmatesPage"
import PersonnelPage from "./pages/personnel/PersonnelPage"
import DeliveriesPage from "./pages/deliveries/DeliveriesPage"
import ActivitiesPage from "./pages/activities/ActivitiesPage"
import ThemeSwitcher from "./components/core/ThemeSwitcher"
import Sidebar from "./components/core/Sidebar"
import { useEffect, useState } from "react"
import ErrorNotification from "./components/errors/ErrorNotification"

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

const THEME = extendTheme({
    "colorSchemes": {
        "light": {
            "palette": {
                "primary": {
                    "50": "#e0f2f1",
                    "100": "#b2dfdb",
                    "200": "#80cbc4",
                    "300": "#4db6ac",
                    "400": "#26a69a",
                    "500": "#009688",
                    "600": "#00897b",
                    "700": "#00796b",
                    "800": "#00695c",
                    "900": "#004d40"
                },
                "neutral": {
                    "50": "#f8fafc",
                    "100": "#f1f5f9",
                    "200": "#e2e8f0",
                    "300": "#cbd5e1",
                    "400": "#94a3b8",
                    "500": "#64748b",
                    "600": "#475569",
                    "700": "#334155",
                    "800": "#1e293b",
                    "900": "#0f172a"
                }
            }
        },
        "dark": {
            "palette": {
                "primary": {
                    "50": "#e0f2f1",
                    "100": "#b2dfdb",
                    "200": "#80cbc4",
                    "300": "#4db6ac",
                    "400": "#26a69a",
                    "500": "#009688",
                    "600": "#00897b",
                    "700": "#00796b",
                    "800": "#00695c",
                    "900": "#004d40"
                },
                "neutral": {
                    "50": "#f8fafc",
                    "100": "#f1f5f9",
                    "200": "#e2e8f0",
                    "300": "#cbd5e1",
                    "400": "#94a3b8",
                    "500": "#64748b",
                    "600": "#475569",
                    "700": "#334155",
                    "800": "#1e293b",
                    "900": "#0f172a"
                }
            }
        }
    }
})

export default function App() {
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        function handleError({ error }: ErrorEvent) {
            setError(error)
        }

        window.addEventListener("error", handleError)

        return () => {
            window.removeEventListener("error", handleError)
        }
    }, [])

    return (
        <CssVarsProvider theme={THEME}>
            <CssBaseline />
            <ErrorNotification
                error={error}
                onClose={() => setError(null)}
            />
            <Box sx={{
                height: '100dvh',
                width: '100dvw',
                padding: 0,
                margin: 0
            }}>
                <Sidebar
                    tabs={TABS}
                    expandButtonContent={<MdMenu />}>
                    <Box sx={{
                        width: "100%",
                        padding: "1em"
                    }}>
                        <Typography
                            level="h4">
                            Theme
                        </Typography>
                        <ThemeSwitcher sx={{
                            width: "100%",
                            marginTop: "0.5em",
                        }} />
                    </Box>
                </Sidebar>
            </Box>
        </CssVarsProvider >
    )
}
