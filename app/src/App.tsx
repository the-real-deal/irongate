import { Box, CssBaseline, CssVarsProvider, extendTheme, GlobalStyles, Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy"
import OverviewPage from "./pages/OverviewPage"
import { JSX } from "react"
import { MdApartment, MdBarChart, MdClass, MdGroup, MdLocalPolice, MdLocalShipping, MdPestControlRodent } from "react-icons/md"
import InfrastructurePage from "./pages/InfrastructurePage"
import PeoplePage from "./pages/PeoplePage"
import InmatesPage from "./pages/InmatesPage"
import PersonnelPage from "./pages/PersonnelPage"
import DeliveriesPage from "./pages/DeliveriesPage"
import ActivitiesPage from "./pages/ActivitiesPage"
import ThemeSwitcher from "./components/ThemeSwitcher"

interface TabStructure {
    title: string
    icon: JSX.Element
    content: JSX.Element
}

const TABS: TabStructure[] = [
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

export default function App() {
    return (
        <CssVarsProvider theme={THEME}>
            <CssBaseline />
            <GlobalStyles styles={{
                // The {selector} is the CSS selector to target the icon.
                // We recommend using a class over a tag if possible.
                '{selector}': {
                    color: "var(--Icon-color)",
                    margin: "var(--Icon-margin)",
                    fontSize: "var(--Icon-fontSize, 20px)",
                    width: "1em",
                    height: "1em"
                }
            }} />
            <Box sx={{
                height: '100dvh',
                width: '100dvw',
                padding: 0,
                margin: 0
            }}>
                <Tabs orientation="vertical" sx={{
                    height: '100%',
                }}>
                    <TabList sx={{
                        overflow: 'auto',
                        scrollSnapType: 'x mandatory',
                        '&::-webkit-scrollbar': { display: 'none' },
                    }}>
                        <Box
                            sx={{
                                // background: "red",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                height: "100%",
                            }}
                        >
                            <Box>
                                {
                                    TABS.map((t, i) => (
                                        <Tab
                                            key={i}
                                            variant="plain"
                                            color="neutral"
                                            indicatorInset
                                            sx={{
                                                width: "100%",
                                                flex: 'none',
                                                scrollSnapAlign: 'start'
                                            }}
                                        >
                                            <Typography sx={{ fontWeight: "bold" }} startDecorator={t.icon}>{t.title}</Typography>
                                        </Tab>
                                    ))
                                }
                            </Box>
                            <Box sx={{
                                width: "100%",
                                padding: "1em"
                            }}>
                                <Typography sx={{ fontWeight: "bold" }}>Theme</Typography>
                                <ThemeSwitcher sx={{
                                    width: "100%",

                                }} />
                            </Box>
                        </Box>
                    </TabList>
                    {
                        TABS.map((t, i) => (
                            <TabPanel value={i}>{t.content}</TabPanel>
                        ))
                    }
                </Tabs>
            </Box>
        </CssVarsProvider>
    )
}