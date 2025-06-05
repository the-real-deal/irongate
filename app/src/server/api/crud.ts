import { Router } from "express"
import { ACTIVITIES_STRUCTURE, AVAILABILITIES_STRUCTURE, CELLS_STRUCTURE, COURIERS_STRUCTURE, DELIVERIES_STRUCTURE, DEVICES_STRUCTURE, ENGAGED_DEVICES_STRUCTURE, ENGAGED_INMATES_STRUCTURE, ENGAGED_PERSONNEL_STRUCTURE, ENGAGED_SECTORS_STRUCTURE, ENUM_TABLES, enumStructure, GUESTS_STRUCTURE, INMATES_STRUCTURE, MOVEMENTS_STRUCTURE, PARTECIPATIONS_STRUCTURE, PEOPLE_STRUCTURE, PERSONNEL_STRUCTURE, REPORTS_STRUCTURE, ROUTINES_STRUCTURE, SECTORS_STRUCTURE, SURVEILLANCES_STRUCTURE, VEHICLES_STRUCTURE, VISITORS_STRUCTURE, VISITS_STRUCTURE, ZONES_STRUCTURE } from "../../common/structures"
import CRUDOperations, { createCRUDRouter } from "../core/crud"

const crudRouter = Router()

for (const table of ENUM_TABLES) {
    crudRouter.use(
        `/enums/${table.toLowerCase()}`,
        createCRUDRouter(
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
        ))
}

crudRouter.use(
    "/people",
    createCRUDRouter(new CRUDOperations(PEOPLE_STRUCTURE)),
)

crudRouter.use(
    "/sectors",
    createCRUDRouter(new CRUDOperations(SECTORS_STRUCTURE)),
)

crudRouter.use(
    "/cells",
    createCRUDRouter(new CRUDOperations(CELLS_STRUCTURE)),
)

crudRouter.use(
    "/inmates",
    createCRUDRouter(new CRUDOperations(INMATES_STRUCTURE)),
)

crudRouter.use(
    "/movements",
    createCRUDRouter(new CRUDOperations(MOVEMENTS_STRUCTURE, {
        get: {
            orderBy: [{ column: "Datetime", direction: "DESC" }]
        }
    })),
)

crudRouter.use(
    "/guests",
    createCRUDRouter(new CRUDOperations(GUESTS_STRUCTURE)),
)

crudRouter.use(
    "/visits",
    createCRUDRouter(new CRUDOperations(VISITS_STRUCTURE, {
        get: {
            orderBy: [{ column: "Datetime", direction: "DESC" }]
        }
    })),
)

crudRouter.use(
    "/visitors",
    createCRUDRouter(new CRUDOperations(VISITORS_STRUCTURE, {
        get: {
            orderBy: [{ column: "VisitDatetime", direction: "DESC" }, "VisitInmateNumber"]
        }
    })),
)

crudRouter.use(
    "/personnel",
    createCRUDRouter(new CRUDOperations(PERSONNEL_STRUCTURE)),
)

crudRouter.use(
    "/devices",
    createCRUDRouter(new CRUDOperations(DEVICES_STRUCTURE)),
)

crudRouter.use(
    "/reports",
    createCRUDRouter(new CRUDOperations(REPORTS_STRUCTURE, {
        get: {
            orderBy: [{ column: "ID", direction: "DESC" }]
        }
    })),
)

crudRouter.use(
    "/engaged-inmates",
    createCRUDRouter(new CRUDOperations(ENGAGED_INMATES_STRUCTURE, {
        get: {
            orderBy: [{ column: "ReportID", direction: "DESC" }]
        }
    })),
)

crudRouter.use(
    "/engaged-personnel",
    createCRUDRouter(new CRUDOperations(ENGAGED_PERSONNEL_STRUCTURE, {
        get: {
            orderBy: [{ column: "ReportID", direction: "DESC" }]
        }
    })),
)

crudRouter.use(
    "/engaged-sectors",
    createCRUDRouter(new CRUDOperations(ENGAGED_SECTORS_STRUCTURE, {
        get: {
            orderBy: [{ column: "ReportID", direction: "DESC" }]
        }
    })),
)

crudRouter.use(
    "/engaged-devices",
    createCRUDRouter(new CRUDOperations(ENGAGED_DEVICES_STRUCTURE, {
        get: {
            orderBy: [{ column: "ReportID", direction: "DESC" }]
        }
    })),
)

crudRouter.use(
    "/couriers",
    createCRUDRouter(new CRUDOperations(COURIERS_STRUCTURE)),
)

crudRouter.use(
    "/vehicles",
    createCRUDRouter(new CRUDOperations(VEHICLES_STRUCTURE)),
)

crudRouter.use(
    "/deliveries",
    createCRUDRouter(new CRUDOperations(DELIVERIES_STRUCTURE, {
        get: {
            orderBy: [{ column: "Datetime", direction: "DESC" }]
        }
    })),
)

crudRouter.use(
    "/activities",
    createCRUDRouter(new CRUDOperations(ACTIVITIES_STRUCTURE)),
)

crudRouter.use(
    "/availabilities",
    createCRUDRouter(new CRUDOperations(AVAILABILITIES_STRUCTURE, {
        get: {
            orderBy: ["SecurityLevelID"]
        }
    })),
)

crudRouter.use(
    "/zones",
    createCRUDRouter(new CRUDOperations(ZONES_STRUCTURE)),
)

crudRouter.use(
    "/routines",
    createCRUDRouter(new CRUDOperations(ROUTINES_STRUCTURE, {
        get: {
            orderBy: [{ column: "Datetime", direction: "DESC" }]
        }
    })),
)

crudRouter.use(
    "/partecipations",
    createCRUDRouter(new CRUDOperations(PARTECIPATIONS_STRUCTURE, {
        get: {
            orderBy: [{ column: "RoutineDatetime", direction: "DESC" }]
        }
    })),
)

crudRouter.use(
    "/surveillances",
    createCRUDRouter(new CRUDOperations(SURVEILLANCES_STRUCTURE, {
        get: {
            orderBy: [{ column: "RoutineDatetime", direction: "DESC" }]
        }
    })),
)

export default crudRouter
