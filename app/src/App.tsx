import * as Icons from "@mui/icons-material"
import { Box, CssBaseline, CssVarsProvider, extendTheme, Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy"
import Home from "./pages/Home"
import { JSX } from "react"

interface TabStructure {
    title: string
    icon: JSX.Element
    content: JSX.Element
}

const TABS: TabStructure[] = [
    {
        // statistiche
        title: "Overview",
        icon: <Icons.BarChart />,
        content: <Home />
    },
    {
        // settori, celle, zone, dispositivi
        title: "Infrastructure",
        icon: <Icons.Apartment />,
        content: <Home />
    },
    {
        // dati anagrafici + tipo di persona
        title: "People",
        icon: <Icons.Group />,
        content: <Home />
    },
    {
        // prigionieri, movimenti di celle, visite
        title: "Inmates",
        icon: <Icons.PestControlRodent />,
        content: <Home />
    },
    {
        // personale, report
        title: "Personnel",
        icon: <Icons.LocalPolice />,
        content: <Home />
    },
    {
        // consegne, corrieri, veicoli
        title: "Deliveries",
        icon: <Icons.LocalShipping />,
        content: <Home />
    },
    {
        // attività, routine, 
        title: "Activities",
        icon: <Icons.Class />,
        content: <Home />
    }
]

const THEME = extendTheme()

export default function App() {
    return (
        <CssVarsProvider theme={THEME}>
            <CssBaseline />
            <Box sx={{
                height: '100dvh',
                width: '100dvw',
                padding: 0,
                margin: 0
            }}>
                <Tabs orientation="horizontal" sx={{
                    height: '100%',
                }}>
                    <TabList>
                        {
                            TABS.map(t => (
                                <Tab
                                    variant="plain"
                                    color="neutral"
                                    indicatorInset>
                                    <Typography sx={{ fontWeight: "bold" }} startDecorator={t.icon}>{t.title}</Typography>
                                </Tab>
                            ))
                        }
                    </TabList>
                    {
                        TABS.map((t, i) => (
                            <TabPanel sx={{ padding: 0 }} value={i}>{t.content}</TabPanel>
                        ))
                    }
                </Tabs>
            </Box>
        </CssVarsProvider>
    )
}