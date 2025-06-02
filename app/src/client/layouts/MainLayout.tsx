import { Outlet, useLocation, useNavigate, matchPath } from 'react-router'
import Sidebar from '../components/layout/Sidebar'
import { Box, Sheet } from '@mui/joy'
import { SyntheticEvent, useEffect, useState } from 'react'
import { getTabsRoutes, TabStructure } from '../core/routing'

export interface MainLayoutProps {
    tabs: TabStructure[]
}

export default function MainLayout({
    tabs
}: MainLayoutProps) {
    const location = useLocation()
    const navigate = useNavigate()

    const [currentRoute, setCurrentRoute] = useState<string | null>(null)

    useEffect(() => {
        const route = getTabsRoutes(tabs)
            .find(({ path }) => matchPath({ path, end: false }, location.pathname))
        setCurrentRoute(route?.path ?? null)
        return () => {
            setCurrentRoute(null)
        }
    }, [location.pathname, tabs])

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
            margin: 0,
        }}>
            <Sidebar
                tabs={tabs}
                currentRoute={currentRoute}
                onChange={handleChange} />
            <Sheet sx={{
                width: "100%",
                height: "100%",
                padding: "1em",
                paddingInlineStart: "3em",
            }}>
                <Outlet />
            </Sheet>
        </Box>
    )
}
