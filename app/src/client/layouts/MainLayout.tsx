import { MdApartment, MdBarChart, MdClass, MdGroup, MdLocalPolice, MdLocalShipping, MdPestControlRodent } from 'react-icons/md'
import { Outlet, useLocation, useNavigate, matchPath } from 'react-router'
import Sidebar, { TabStructure } from '../components/layout/Sidebar'
import { Box, Sheet } from '@mui/joy'
import { SyntheticEvent, useEffect, useState } from 'react'

const TABS: TabStructure[] = [
    {
        // statistiche
        title: "Overview",
        icon: <MdBarChart />,
        routes: "/overview",
    },
    {
        // settori, celle, zone, dispositivi
        title: "Infrastructure",
        icon: <MdApartment />,
        routes: [
            {
                title: "Sectors",
                route: "/sectors",
            },
            {
                title: "Cells",
                route: "/cells",
            },
            {
                title: "Zones",
                route: "/zones",
            },
            {
                title: "Devices",
                route: "/devices",
            },
        ],
    },
    {
        // dati anagrafici + tipo di persona
        title: "People",
        icon: <MdGroup />,
        routes: "/people",
    },
    {
        // prigionieri, movimenti di celle, visite
        title: "Inmates",
        icon: <MdPestControlRodent />,
        routes: "/inmates",
    },
    {
        // personale, report
        title: "Personnel",
        icon: <MdLocalPolice />,
        routes: [
            {
                title: "Personnel",
                route: "/personnel"
            },
            {
                title: "Reports",
                route: "/reports"
            },
        ],
    },
    {
        // consegne, corrieri, veicoli
        title: "Deliveries",
        icon: <MdLocalShipping />,
        routes: [
            {
                title: "Deliveries",
                route: "/deliveries"
            },
            {
                title: "Couriers",
                route: "/couriers"
            },
            {
                title: "Vehicles",
                route: "/vehicles"
            },
        ],
    },
    {
        // attività, routine, 
        title: "Activities",
        icon: <MdClass />,
        routes: [
            {
                title: "Activities",
                route: "/activities"
            },
            {
                title: "Routines",
                route: "/routines"
            },
        ],
    },
]

export default function MainLayout() {
    const location = useLocation()
    const navigate = useNavigate()

    const [currentRoute, setCurrentRoute] = useState<string | null>(null)

    useEffect(() => {
        const route = TABS
            .flatMap(t => Array.isArray(t.routes) ? t.routes.map(r => r.route) : [t.routes])
            .find(path => matchPath({ path, end: false }, location.pathname))
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
                onChange={handleChange} />
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
