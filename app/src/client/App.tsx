import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy"
import { useEffect, useState } from "react"
import ErrorNotification from "./components/errors/ErrorNotification"
import { Route, BrowserRouter, Routes, Navigate } from "react-router"
import MainLayout from "./layouts/MainLayout"
import OverviewPage from "./pages/tabs/OverviewPage"
import PeoplePage from "./pages/tabs/PeoplePage"
import { MdApartment, MdBarChart, MdClass, MdGroup, MdLocalPolice, MdLocalShipping, MdPestControlRodent } from 'react-icons/md'
import CellsPage from "./pages/tabs/infrastructure/CellsPage"
import { getRouteStructure, TabStructure } from "./core/routing"
import SectorsPage from "./pages/tabs/infrastructure/SectorsPage"
import InmatesPage from "./pages/tabs/inmates/InmatesPage"
import MovementsPage from "./pages/tabs/inmates/MovementsPage"
import PersonnelPage from "./pages/tabs/personnel/PersonnelPage"
import DeliveriesPage from "./pages/tabs/deliveries/DeliveriesPage"
import ActivitiesPage from "./pages/tabs/activities/ActivitiesPage"
import NotFountPage from "./pages/NotFoundPage"
import GuestsPage from "./pages/routes/GuestsPage"
import VisitsPage from "./pages/routes/VisitsPage"
import VisitorsPage from "./pages/routes/VisitorsPage"
import DevicesPage from "./pages/tabs/infrastructure/DevicesPage"
import ReportsPage from "./pages/tabs/personnel/ReportsPage"
import EngagedInmatesPage from "./pages/routes/EngagedInmatesPage"
import EngagedPersonnelPage from "./pages/routes/EngagedPersonnelPage"
import EngagedSectorsPage from "./pages/routes/EngagedSectorsPage"
import EngagedDevicesPage from "./pages/routes/EngagedDevicesPage"
import CouriersPage from "./pages/routes/CouriersPage"
import VehiclesPage from "./pages/routes/VehiclesPage"
import { AvailabilitiesPage } from "./pages/routes/AvailabilitiesPage"
import ZonesPage from "./pages/tabs/infrastructure/ZonesPage"
import RoutinesPage from "./pages/tabs/activities/RoutinesPage"
import PartecipationsPage from "./pages/routes/PartecipationsPage"
import SurveillancesPage from "./pages/routes/SurveillancesPage"
import VisitsAndGuestsPage from "./pages/tabs/inmates/VisitsAndGuestsPage"
import CouriersAndVehiclesPage from "./pages/tabs/deliveries/CouriersAndVehiclesPage"

const routes = {
    // api
    "/people": <PeoplePage />,
    "/sectors": <SectorsPage />,
    "/cells": <CellsPage />,
    "/inmates": <InmatesPage />,
    "/movements": <MovementsPage />,
    "/guests": <GuestsPage />,
    "/visits": <VisitsPage />,
    "/visitors": <VisitorsPage />,
    "/personnel": <PersonnelPage />,
    "/devices": <DevicesPage />,
    "/reports": <ReportsPage />,
    "/engaged-inmates": <EngagedInmatesPage />,
    "/engaged-personnel": <EngagedPersonnelPage />,
    "/engaged-sectors": <EngagedSectorsPage />,
    "/engaged-devices": <EngagedDevicesPage />,
    "/couriers": <CouriersPage />,
    "/vehicles": <VehiclesPage />,
    "/deliveries": <DeliveriesPage />,
    "/activities": <ActivitiesPage />,
    "/availabilities": <AvailabilitiesPage />,
    "/zones": <ZonesPage />,
    "/routines": <RoutinesPage />,
    "/partecipations": <PartecipationsPage />,
    "/surveillances": <SurveillancesPage />,
    // other
    "/overview": <OverviewPage />,
    "/visits-and-guests": <VisitsAndGuestsPage />,
    "/couriers-and-vehicles": <CouriersAndVehiclesPage />,
} as const
const defaultRoute: keyof typeof routes = "/overview" as const

const tabs: TabStructure[] = [
    {
        title: "Overview",
        icon: <MdBarChart />,
        routes: getRouteStructure(routes, "/overview"),
    },
    {
        title: "People",
        icon: <MdGroup />,
        routes: getRouteStructure(routes, "/people"),
    },
    {
        title: "Infrastructure",
        icon: <MdApartment />,
        routes: [
            {
                title: "Sectors",
                route: getRouteStructure(routes, "/sectors"),
            },
            {
                title: "Cells",
                route: getRouteStructure(routes, "/cells"),
            },
            {
                title: "Zones",
                route: getRouteStructure(routes, "/zones"),
            },
            {
                title: "Devices",
                route: getRouteStructure(routes, "/devices"),
            },
        ],
    },
    {
        title: "Inmates",
        icon: <MdPestControlRodent />,
        routes: [
            {
                title: "Inmates",
                route: getRouteStructure(routes, "/inmates"),
            },
            {
                title: "Movements",
                route: getRouteStructure(routes, "/movements"),
            },
            {
                title: "Visits & Guests",
                route: getRouteStructure(routes, "/visits-and-guests"),
            },
        ],
    },
    {
        title: "Personnel",
        icon: <MdLocalPolice />,
        routes: [
            {
                title: "Personnel",
                route: getRouteStructure(routes, "/personnel"),
            },
            {
                title: "Reports",
                route: getRouteStructure(routes, "/reports"),
            },
        ],
    },
    {
        title: "Deliveries",
        icon: <MdLocalShipping />,
        routes: [
            {
                title: "Deliveries",
                route: getRouteStructure(routes, "/deliveries"),
            },
            {
                title: "Couriers & Vehicles",
                route: getRouteStructure(routes, "/couriers-and-vehicles")
            },
        ],
    },
    {
        title: "Activities",
        icon: <MdClass />,
        routes: [
            {
                title: "Activities",
                route: getRouteStructure(routes, "/activities")
            },
            {
                title: "Routines",
                route: getRouteStructure(routes, "/routines")
            },
        ],
    },
]

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

    const routeStructures = (Object.keys(routes) as (keyof typeof routes)[])
        .map(key => getRouteStructure(routes, key))

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
                            <Route index element={defaultRoute === undefined ? null : <Navigate to={defaultRoute} replace />} />
                        }
                        {
                            routeStructures.map(r => <Route path={r.path} element={r.page} />)
                        }
                    </Route>
                    <Route path="*" element={<NotFountPage />} />
                </Routes>
            </BrowserRouter>
        </CssVarsProvider >
    )
}
