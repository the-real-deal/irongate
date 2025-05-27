import { MdApartment, MdBarChart, MdClass, MdGroup, MdLocalPolice, MdLocalShipping, MdMenu, MdPestControlRodent } from 'react-icons/md'
import { Outlet, useLocation, useNavigate, matchPath } from 'react-router'
import Sidebar, { TabStructure } from '../components/core/Sidebar'
import { Box, Typography, Sheet } from '@mui/joy'
import ThemeSwitcher from '../components/core/ThemeSwitcher'
import { SyntheticEvent, useEffect, useState } from 'react'

const TABS: TabStructure[] = [
    {
        // statistiche
        title: "Overview",
        route: "/overview",
        icon: <MdBarChart />,
    },
    {
        // settori, celle, zone, dispositivi
        title: "Infrastructure",
        route: "/infrastructure",
        icon: <MdApartment />,
    },
    {
        // dati anagrafici + tipo di persona
        title: "People",
        route: "/people",
        icon: <MdGroup />,
    },
    {
        // prigionieri, movimenti di celle, visite
        title: "Inmates",
        route: "/inmates",
        icon: <MdPestControlRodent />,
    },
    {
        // personale, report
        title: "Personnel",
        route: "/personnel",
        icon: <MdLocalPolice />,
    },
    {
        // consegne, corrieri, veicoli
        title: "Deliveries",
        route: "/deliveries",
        icon: <MdLocalShipping />,
    },
    {
        // attività, routine, 
        title: "Activities",
        route: "/activities",
        icon: <MdClass />,
    }
]

export default function MainLayout() {
    const location = useLocation()
    const navigate = useNavigate()

    const [currentRoute, setCurrentRoute] = useState<string | null>(null)

    useEffect(() => {
        const route = TABS.map(t => t.route).find((path) =>
            matchPath({ path, end: false }, location.pathname)
        )
        setCurrentRoute(route ?? null)
        return () => {
            setCurrentRoute(null)
        }
    }, [location.pathname])

    function handleChange(_: SyntheticEvent | null, newRoute: string | null) {
        setCurrentRoute(newRoute)
        if (newRoute !== null) {
            navigate(newRoute)
        }
    }

    return (
        <Box sx={{
            height: "100dvh",
            width: "100dvw",
            display: "flex",
            padding: 0,
            margin: 0,
        }}>
            <Sidebar
                tabs={TABS}
                currentRoute={currentRoute}
                expandButtonContent={<MdMenu />}
                onChange={handleChange}>
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
            <Sheet sx={{
                width: "100%",
                height: "100%",
                padding: "1em",
            }}>
                <Outlet />
            </Sheet>
        </Box>
    )
}
