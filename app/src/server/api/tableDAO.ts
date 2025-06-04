import { Router } from "express"
import { ACTIVITIES_STRUCTURE, AVAILABILITIES_STRUCTURE, CELLS_STRUCTURE, COURIERS_STRUCTURE, DELIVERIES_STRUCTURE, DEVICES_STRUCTURE, ENGAGED_DEVICES_STRUCTURE, ENGAGED_INMATES_STRUCTURE, ENGAGED_PERSONNEL_STRUCTURE, ENGAGED_SECTORS_STRUCTURE, ENUM_TABLES, enumStructure, GUESTS_STRUCTURE, INMATES_STRUCTURE, MOVEMENTS_STRUCTURE, PARTECIPATIONS_STRUCTURE, PEOPLE_STRUCTURE, PERSONNEL_STRUCTURE, REPORTS_STRUCTURE, ROUTINES_STRUCTURE, SECTORS_STRUCTURE, SURVEILLANCES_STRUCTURE, VEHICLES_STRUCTURE, VISITORS_STRUCTURE, VISITS_STRUCTURE, ZONES_STRUCTURE } from "../../common/structures"
import { createCRUDRouter, CRUDRouterOptions } from "./crud"
import CRUDOperations from "../core/crud"
import { TableEntry, TableRecord } from "../../common/db"

export interface TableDAO<T extends TableEntry<TableRecord>> {
    route: string
    crud: CRUDOperations<T>
    router: Router
}

export const TABLE_DAOS: TableDAO<TableEntry<TableRecord>>[] = [] as const

function createTableDAO<T extends TableEntry<TableRecord>>(
    route: string,
    crud: CRUDOperations<T>,
    routerOptions?: CRUDRouterOptions,
): TableDAO<T> {
    const router = createCRUDRouter(crud, routerOptions)
    const dao = {
        route,
        crud,
        router
    }
    TABLE_DAOS.push(dao as TableDAO<TableEntry<TableRecord>>)
    return dao
}

for (const table of ENUM_TABLES) {
    createTableDAO(
        `/enums/${table.toLowerCase()}`,
        new CRUDOperations(enumStructure(table), {
            get: {
                orderBy: ["ID"]
            }
        }),
        {
            get: true,
            delete: false,
            put: false,
            post: false,
        },
    )
}

export const peopleDAO = createTableDAO(
    "/people",
    new CRUDOperations(PEOPLE_STRUCTURE),
)

export const sectorsDAO = createTableDAO(
    "/sectors",
    new CRUDOperations(SECTORS_STRUCTURE),
)

export const cellsDAO = createTableDAO(
    "/cells",
    new CRUDOperations(CELLS_STRUCTURE),
)

export const inmatesDAO = createTableDAO(
    "/inmates",
    new CRUDOperations(INMATES_STRUCTURE),
)

export const movementsDAO = createTableDAO(
    "/movements",
    new CRUDOperations(MOVEMENTS_STRUCTURE, {
        get: {
            orderBy: [{ column: "Datetime", direction: "DESC" }]
        }
    })
)

export const guestsDAO = createTableDAO(
    "/guests",
    new CRUDOperations(GUESTS_STRUCTURE),
)

export const visitsDAO = createTableDAO(
    "/visits",
    new CRUDOperations(VISITS_STRUCTURE, {
        get: {
            orderBy: [{ column: "Datetime", direction: "DESC" }]
        }
    })
)

export const visitorsDAO = createTableDAO(
    "/visitors",
    new CRUDOperations(VISITORS_STRUCTURE, {
        get: {
            orderBy: [{ column: "VisitDatetime", direction: "DESC" }, "VisitInmateNumber"]
        }
    })
)

export const personnelDAO = createTableDAO(
    "/personnel",
    new CRUDOperations(PERSONNEL_STRUCTURE),
)

export const devicesDAO = createTableDAO(
    "/devices",
    new CRUDOperations(DEVICES_STRUCTURE),
)

export const reportsDAO = createTableDAO(
    "/reports",
    new CRUDOperations(REPORTS_STRUCTURE, {
        get: {
            orderBy: [{ column: "ID", direction: "DESC" }]
        }
    })
)

export const engagedInmatesDAO = createTableDAO(
    "/engaged-inmates",
    new CRUDOperations(ENGAGED_INMATES_STRUCTURE, {
        get: {
            orderBy: [{ column: "ReportID", direction: "DESC" }]
        }
    }),
)

export const engagedPersonnelDAO = createTableDAO(
    "/engaged-personnel",
    new CRUDOperations(ENGAGED_PERSONNEL_STRUCTURE, {
        get: {
            orderBy: [{ column: "ReportID", direction: "DESC" }]
        }
    }),
)

export const engagedSectorsDAO = createTableDAO(
    "/engaged-sectors",
    new CRUDOperations(ENGAGED_SECTORS_STRUCTURE, {
        get: {
            orderBy: [{ column: "ReportID", direction: "DESC" }]
        }
    }),
)

export const engagedDevicesDAO = createTableDAO(
    "/engaged-devices",
    new CRUDOperations(ENGAGED_DEVICES_STRUCTURE, {
        get: {
            orderBy: [{ column: "ReportID", direction: "DESC" }]
        }
    }),
)

export const couriersDAO = createTableDAO(
    "/couriers",
    new CRUDOperations(COURIERS_STRUCTURE),
)

export const vehiclesDAO = createTableDAO(
    "/vehicles",
    new CRUDOperations(VEHICLES_STRUCTURE),
)

export const deliveriesDAO = createTableDAO(
    "/deliveries",
    new CRUDOperations(DELIVERIES_STRUCTURE, {
        get: {
            orderBy: [{ column: "Datetime", direction: "DESC" }]
        }
    }),
)

export const activitiesDAO = createTableDAO(
    "/activities",
    new CRUDOperations(ACTIVITIES_STRUCTURE),
)

export const availabilitiesDAO = createTableDAO(
    "/availabilities",
    new CRUDOperations(AVAILABILITIES_STRUCTURE, {
        get: {
            orderBy: ["SecurityLevelID"]
        }
    }),
)

export const zonesDAO = createTableDAO(
    "/zones",
    new CRUDOperations(ZONES_STRUCTURE),
)

export const routinesDAO = createTableDAO(
    "/routines",
    new CRUDOperations(ROUTINES_STRUCTURE, {
        get: {
            orderBy: [{ column: "Datetime", direction: "DESC" }]
        }
    }),
)

export const partecipationsDAO = createTableDAO(
    "/partecipations",
    new CRUDOperations(PARTECIPATIONS_STRUCTURE, {
        get: {
            orderBy: [{ column: "RoutineDatetime", direction: "DESC" }]
        }
    }),
)

export const surveillancesDAO = createTableDAO(
    "/surveillances",
    new CRUDOperations(SURVEILLANCES_STRUCTURE, {
        get: {
            orderBy: [{ column: "RoutineDatetime", direction: "DESC" }]
        }
    }),
)
