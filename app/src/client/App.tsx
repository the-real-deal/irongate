import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy"
import { useEffect, useState } from "react"
import ErrorNotification from "./components/errors/ErrorNotification"
import { Route, BrowserRouter, Routes, Navigate } from "react-router"
import MainLayout from "./layouts/MainLayout"
import OverviewPage from "./pages/OverviewPage"
import PeoplePage from "./pages/PeoplePage"
import { MdApartment, MdBarChart, MdClass, MdGroup, MdLocalPolice, MdLocalShipping, MdPestControlRodent } from 'react-icons/md'
import CellsPage from "./pages/infrastructure/CellsPage"
import { getTabsRoutes, TabStructure } from "./core/routing"
import SectorsPage from "./pages/infrastructure/SectorsPage"
import InmatesPage from "./pages/inmates/InmatesPage"
import MovementsPage from "./pages/inmates/MovementsPage"

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    50: "#e0f2f1",
                    100: "#b2dfdb",
                    200: "#80cbc4",
                    300: "#4db6ac",
                    400: "#26a69a",
                    500: "#009688",
                    600: "#00897b",
                    700: "#00796b",
                    800: "#00695c",
                    900: "#004d40"
                },
                neutral: {
                    50: "#f8fafc",
                    100: "#f1f5f9",
                    200: "#e2e8f0",
                    300: "#cbd5e1",
                    400: "#94a3b8",
                    500: "#64748b",
                    600: "#475569",
                    700: "#334155",
                    800: "#1e293b",
                    900: "#0f172a"
                }
            }
        },
        dark: {
            palette: {
                primary: {
                    50: "#e0f2f1",
                    100: "#b2dfdb",
                    200: "#80cbc4",
                    300: "#4db6ac",
                    400: "#26a69a",
                    500: "#009688",
                    600: "#00897b",
                    700: "#00796b",
                    800: "#00695c",
                    900: "#004d40"
                },
                neutral: {
                    50: "#f8fafc",
                    100: "#f1f5f9",
                    200: "#e2e8f0",
                    300: "#cbd5e1",
                    400: "#94a3b8",
                    500: "#64748b",
                    600: "#475569",
                    700: "#334155",
                    800: "#1e293b",
                    900: "#0f172a"
                }
            }
        }
    }
})

const tabs: TabStructure[] = [
    {
        title: "Overview",
        icon: <MdBarChart />,
        routes: {
            path: "/overview",
            page: <OverviewPage />,
        },
    },
    {
        title: "Infrastructure",
        icon: <MdApartment />,
        routes: [
            {
                title: "Sectors",
                route: {
                    path: "/sectors",
                    page: <SectorsPage />,
                },
            },
            {
                title: "Cells",
                route: {
                    path: "/cells",
                    page: <CellsPage />,
                },
            },
            {
                title: "Zones",
                route: {
                    path: "/zones",
                    page: null,
                },
            },
            {
                title: "Devices",
                route: {
                    path: "/devices",
                    page: null,
                },
            },
        ],
    },
    {
        title: "People",
        icon: <MdGroup />,
        routes: {
            path: "/people",
            page: <PeoplePage />,
        },
    },
    {
        title: "Inmates",
        icon: <MdPestControlRodent />,
        routes: [
            {
                title: "Inmates",
                route: {
                    path: "/inmates",
                    page: <InmatesPage />,
                },
            },
            {
                title: "Movements",
                route: {
                    path: "/movements",
                    page: <MovementsPage />,
                },
            },
            {
                title: "Visits",
                route: {
                    path: "/visits",
                    page: null,
                },
            },
        ],
    },
    {
        title: "Personnel",
        icon: <MdLocalPolice />,
        routes: [
            {
                title: "Personnel",
                route: {
                    path: "/personnel",
                    page: null,
                }
            },
            {
                title: "Reports",
                route: {
                    path: "/reports",
                    page: null,
                }
            },
        ],
    },
    {
        title: "Deliveries",
        icon: <MdLocalShipping />,
        routes: [
            {
                title: "Deliveries",
                route: {
                    path: "/deliveries",
                    page: null,
                }
            },
            {
                title: "Couriers",
                route: {
                    path: "/couriers",
                    page: null,
                }
            },
            {
                title: "Vehicles",
                route: {
                    path: "/vehicles",
                    page: null,
                }
            },
        ],
    },
    {
        title: "Activities",
        icon: <MdClass />,
        routes: [
            {
                title: "Activities",
                route: {
                    path: "/activities",
                    page: null,
                }
            },
            {
                title: "Routines",
                route: {
                    path: "/routines",
                    page: null,
                }
            },
        ],
    },
]

export default function App() {
    const [error, setError] = useState<Error | null>(null)

    function handleError(e: ErrorEvent | PromiseRejectionEvent) {
        if ("error" in e) {
            setError(e.error)
        } else if ("reason" in e) {
            setError(e.reason)
        } else {
            setError(new Error("Unknown error"))
        }
    }

    useEffect(() => {
        window.addEventListener("error", handleError)
        window.addEventListener("unhandledrejection", handleError)
        return () => {
            window.removeEventListener("error", handleError)
            window.removeEventListener("unhandledrejection", handleError)
        }
    }, [])

    const routes = getTabsRoutes(tabs)
    const defaultRoute = routes[0]

    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline />
            <ErrorNotification
                error={error}
                onClose={() => setError(null)}
            />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout tabs={tabs} />}>
                        {
                            <Route index element={defaultRoute === undefined ? null : <Navigate to={defaultRoute.path} replace />} />
                        }
                        {
                            routes.map(r => <Route path={r.path} element={r.page} />)
                        }
                    </Route>
                </Routes>
            </BrowserRouter>
        </CssVarsProvider >
    )
}
