import { ReactElement, ReactNode } from "react"

export interface RouteStructure {
    path: string,
    page: ReactNode
}

export interface TabStructure {
    title: string
    icon: ReactElement
    routes: RouteStructure | {
        title: string
        route: RouteStructure
    }[]
}

export function getTabsRoutes(tabs: TabStructure[]): RouteStructure[] {
    return tabs
        .flatMap(t => Array.isArray(t.routes) ? t.routes.map(r => r.route) : [t.routes])
}
