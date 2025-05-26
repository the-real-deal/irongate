import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy"
import { useEffect, useState } from "react"
import ErrorNotification from "./components/errors/ErrorNotification"
import { Route, BrowserRouter, Routes, Navigate } from "react-router"
import MainLayout from "./layouts/MainLayout"
import OverviewPage from "./pages/OverviewPage"
import InfrastructurePage from "./pages/InfrastructurePage"
import PeoplePage from "./pages/PeoplePage"
import InmatesPage from "./pages/InmatesPage"
import PersonnelPage from "./pages/PersonnelPage"
import DeliveriesPage from "./pages/DeliveriesPage"
import ActivitiesPage from "./pages/ActivitiesPage"

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
        function handleError(e: ErrorEvent | PromiseRejectionEvent) {
            if ("error" in e) {
                setError(e.error)
            } else if ("reason" in e) {
                setError(e.reason)
            } else {
                setError(new Error("Unknown error"))
            }
        }
        window.addEventListener("error", handleError)
        window.addEventListener("unhandledrejection", handleError)
        return () => {
            window.removeEventListener("error", handleError)
            window.removeEventListener("unhandledrejection", handleError)
        }
    }, [])

    return (
        <CssVarsProvider theme={THEME}>
            <CssBaseline />
            <ErrorNotification
                error={error}
                onClose={() => setError(null)}
            />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Navigate to="/overview" replace />} />
                        <Route path="overview" element={<OverviewPage />} />
                        <Route path="infrastructure" element={<InfrastructurePage />} />
                        <Route path="people" element={<PeoplePage />} />
                        <Route path="inmates" element={<InmatesPage />} />
                        <Route path="personnel" element={<PersonnelPage />} />
                        <Route path="deliveries" element={<DeliveriesPage />} />
                        <Route path="activities" element={<ActivitiesPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </CssVarsProvider >
    )
}
