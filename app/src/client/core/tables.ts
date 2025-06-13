import { FreeDocumentIDsEntry } from "../../common/api/people"
import { ACTIVITIES_STRUCTURE, ActivitiesEntry, AVAILABILITIES_STRUCTURE, AvailabilitiesEntry, CELLS_STRUCTURE, CellsEntry, COURIERS_STRUCTURE, CouriersEntry, DELIVERIES_STRUCTURE, DeliveriesEntry, DEVICES_STRUCTURE, DevicesEntry, ENGAGED_DEVICES_STRUCTURE, ENGAGED_INMATES_STRUCTURE, ENGAGED_PERSONNEL_STRUCTURE, ENGAGED_SECTORS_STRUCTURE, EngagedDevicesEntry, EngagedInmatesEntry, EngagedPersonnelEntry, EngagedSectorsEntry, EnumEntry, EnumTable, GUESTS_STRUCTURE, GuestsEntry, INMATES_STRUCTURE, InmatesEntry, MOVEMENTS_STRUCTURE, MovementsEntry, PARTECIPATIONS_STRUCTURE, PartecipationsEntry, PEOPLE_STRUCTURE, PeopleEntry, PERSONNEL_STRUCTURE, PersonnelEntry, REPORTS_STRUCTURE, ReportsEntry, ROUTINES_STRUCTURE, RoutinesEntry, SECTORS_STRUCTURE, SectorsEntry, SURVEILLANCES_STRUCTURE, SurveillancesEntry, VEHICLES_STRUCTURE, VehiclesEntry, VISITORS_STRUCTURE, VisitorsEntry, VISITS_STRUCTURE, VisitsEntry, ZONES_STRUCTURE, ZonesEntry } from "../../common/structures"
import { useTableReference, useTableReferenceFilter } from "./dataReference"
import { createDisplay, dateInputNode, numberInputNode, selectInputNode, stringInputNode, textInputNode } from "./tableDisplay"

export function useEnumReference(table: EnumTable): EnumEntry["ID"][] {
    return useTableReference<EnumEntry, "ID">(`/enums/${table.toLowerCase()}`, "ID")
}

export function usePeopleDisplay() {
    const genders = useEnumReference("Genders")

    return createDisplay<PeopleEntry>(PEOPLE_STRUCTURE, {
        detailTitle: "Person",
        keys: {
            DocumentID: {
                title: "Document ID",
                inputNode: stringInputNode(),
            },
            Name: {
                inputNode: stringInputNode(),
            },
            Surname: {
                inputNode: stringInputNode(),
            },
            GenderID: {
                title: "Gender",
                inputNode: selectInputNode(genders)
            },
            Birthday: {
                inputNode: dateInputNode({ includeTime: false }),
            },
            BirthPlace: {
                inputNode: stringInputNode(),
            }
        }
    })
}
export function usePeopleReference() {
    const apiRoute = "/people"
    const DocumentID = useTableReference<PeopleEntry, "DocumentID">(apiRoute, "DocumentID")
    return { DocumentID }
}

export function useFreePeopleReference() {
    const apiRoute = "/people/free-documents"
    const DocumentID = useTableReference<FreeDocumentIDsEntry, "DocumentID">(apiRoute, "DocumentID", {
        apiRoot: ""
    })
    return { DocumentID }
}

export function useSectorsDisplay() {
    const genders = useEnumReference("Genders")
    const securityLevels = useEnumReference("SecurityLevels")

    return createDisplay<SectorsEntry>(SECTORS_STRUCTURE, {
        detailTitle: "Sector",
        keys: {
            ID: {},
            Name: {
                inputNode: stringInputNode()
            },
            GenderID: {
                title: "Gender",
                inputNode: selectInputNode(genders, { required: false })
            },
            SecurityLevelID: {
                title: "Security level",
                inputNode: selectInputNode(securityLevels)
            },
            TotalInmates: {
                title: "Total inmates",
            },
        }
    })
}
export function useSectorsReference() {
    const apiRoute = "/sectors"
    const ID = useTableReference<SectorsEntry, "ID">(apiRoute, "ID")
    return { ID }
}

export function useCellsDisplay() {
    const sectors = useSectorsReference()

    return createDisplay<CellsEntry>(CELLS_STRUCTURE, {
        detailTitle: "Cell",
        keys: {
            SectorID: {
                title: "Sector ID",
                inputNode: selectInputNode(sectors.ID)
            },
            Number: {
                inputNode: numberInputNode()
            },
            Capacity: {
                inputNode: numberInputNode()
            },
        }
    })
}
export function useCellsReference() {
    const apiRoute = "/cells"
    const SectorID = {
        values: useTableReference<CellsEntry, "SectorID">(apiRoute, "SectorID"),
        filter: useTableReferenceFilter<CellsEntry, "SectorID">("SectorID")
    }
    const Number = useTableReference<CellsEntry, "Number">(apiRoute, "Number", {
        fetchFilter: SectorID.filter.fetchFilter
    })
    return {
        SectorID: {
            values: SectorID.values,
            setValue: SectorID.filter.setValue,
        },
        Number,
    }

}

export function useInmatesDisplay() {
    const freePeople = useFreePeopleReference()

    return createDisplay<InmatesEntry>(INMATES_STRUCTURE, {
        detailTitle: "Inmate",
        keys: {
            Number: {
                inputNode: stringInputNode(),
            },
            DocumentID: {
                title: "Document ID",
                inputNode: selectInputNode(freePeople.DocumentID)
            },
            IncarcerationDate: {
                title: "Incarceration date",
                inputNode: dateInputNode({ includeTime: false })
            },
            SentenceDuration: {
                title: "Sentence duration (months)",
                inputNode: numberInputNode()
            },
            CriminalRecord: {
                title: "Criminal record",
                inputNode: textInputNode()
            },
        }
    })
}
export function useInmatesReference() {
    const apiRoute = "/inmates"
    const Number = useTableReference<InmatesEntry, "Number">(apiRoute, "Number")
    return { Number }
}

export function useMovementsDisplay() {
    const inmates = useInmatesReference()
    const cells = useCellsReference()

    return createDisplay<MovementsEntry>(MOVEMENTS_STRUCTURE, {
        detailTitle: "Movement",
        keys: {
            Datetime: {
                inputNode: dateInputNode()
            },
            InmateNumber: {
                title: "Inmate number",
                inputNode: selectInputNode(inmates.Number)
            },
            CellSectorID: {
                title: "Cell sector ID",
                inputNode: selectInputNode(cells.SectorID.values, { onChange: cells.SectorID.setValue })
            },
            CellNumber: {
                title: "Cell number",
                inputNode: selectInputNode(cells.Number)
            },
        }
    })
}
export function useMovementsReference() {
    const apiRoute = "/movements"
    const Datetime = {
        values: useTableReference<MovementsEntry, "Datetime">(apiRoute, "Datetime"),
        filter: useTableReferenceFilter<MovementsEntry, "Datetime">("Datetime"),
    }
    const InmateNumber = useTableReference<MovementsEntry, "InmateNumber">(apiRoute, "InmateNumber", {
        fetchFilter: Datetime.filter.fetchFilter
    })
    return {
        Datetime: {
            values: Datetime.values,
            setValue: Datetime.filter.setValue
        },
        InmateNumber,
    }
}

export function useGuestsDisplay() {
    const freePeople = useFreePeopleReference()

    return createDisplay<GuestsEntry>(GUESTS_STRUCTURE, {
        detailTitle: "Guest",
        keys: {
            DocumentID: {
                title: "Document ID",
                inputNode: selectInputNode(freePeople.DocumentID)
            }
        }
    })
}
export function useGuestsReference() {
    const apiRoute = "/guests"
    const DocumentID = useTableReference<GuestsEntry, "DocumentID">(apiRoute, "DocumentID")
    return { DocumentID }
}

export function useVisitsDisplay() {
    const inmates = useInmatesReference()

    return createDisplay<VisitsEntry>(VISITS_STRUCTURE, {
        detailTitle: "Visit",
        keys: {
            Datetime: {
                inputNode: dateInputNode()
            },
            InmateNumber: {
                title: "Inmate number",
                inputNode: selectInputNode(inmates.Number)
            },
        }
    })
}
export function useVisitsReference() {
    const apiRoute = "/visits"
    const Datetime = {
        values: useTableReference<VisitsEntry, "Datetime">(apiRoute, "Datetime"),
        filter: useTableReferenceFilter<VisitsEntry, "Datetime">("Datetime"),
    }
    const InmateNumber = useTableReference<VisitsEntry, "InmateNumber">(apiRoute, "InmateNumber", {
        fetchFilter: Datetime.filter.fetchFilter
    })
    return {
        Datetime: {
            values: Datetime.values,
            setValue: Datetime.filter.setValue
        },
        InmateNumber,
    }
}

export function useVisitorsDisplay() {
    const visits = useVisitsReference()
    const guests = useGuestsReference()

    return createDisplay<VisitorsEntry>(VISITORS_STRUCTURE, {
        detailTitle: "Visitor",
        keys: {
            VisitDatetime: {
                title: "Visit datetime",
                inputNode: selectInputNode(visits.Datetime.values, { onChange: visits.Datetime.setValue })
            },
            VisitInmateNumber: {
                title: "Visit inmate number",
                inputNode: selectInputNode(visits.InmateNumber)
            },
            GuestDocumentID: {
                title: "Guest document ID",
                inputNode: selectInputNode(guests.DocumentID)
            },
        }
    })
}
export function useVisitorsReference() {
    const apiRoute = "/visitors"
    const VisitsDatetime = {
        values: useTableReference<VisitorsEntry, "VisitDatetime">(apiRoute, "VisitDatetime"),
        filter: useTableReferenceFilter<VisitsEntry, "Datetime">("Datetime"),
    }
    const InmatesNumber = useTableReference<VisitsEntry, "InmateNumber">(apiRoute, "InmateNumber", {
        fetchFilter: VisitsDatetime.filter.fetchFilter
    })
    return {
        VisitsDatetime: {
            values: VisitsDatetime.values,
            setValue: VisitsDatetime.filter.setValue
        },
        InmatesNumber,
    }
}

export function usePersonnelDisplay() {
    const personnelTypes = useEnumReference("PersonnelTypes")
    const freePeople = useFreePeopleReference()
    const sectors = useSectorsReference()

    return createDisplay<PersonnelEntry>(PERSONNEL_STRUCTURE, {
        keys: {
            ID: {
                inputNode: stringInputNode()
            },
            DocumentID: {
                title: "Document ID",
                inputNode: selectInputNode(freePeople.DocumentID)
            },
            PersonnelTypeID: {
                title: "Personnel type",
                inputNode: selectInputNode(personnelTypes)
            },
            SectorID: {
                title: "Sector ID",
                inputNode: selectInputNode(sectors.ID, { required: false })
            },
        }
    })
}
export function usePersonnelReference() {
    const apiRoute = "/personnel"
    const ID = useTableReference<PersonnelEntry, "ID">(apiRoute, "ID")
    return { ID }
}

export function useDevicesDisplay() {
    const deviceTypes = useEnumReference("DeviceTypes")
    const sectors = useSectorsReference()

    return createDisplay<DevicesEntry>(DEVICES_STRUCTURE, {
        detailTitle: "Device",
        keys: {
            Serial: {
                inputNode: stringInputNode()
            },
            SectorID: {
                title: "Sector ID",
                inputNode: selectInputNode(sectors.ID)
            },
            Number: {
                inputNode: numberInputNode()
            },
            DeviceTypeID: {
                title: "Device type",
                inputNode: selectInputNode(deviceTypes)
            },
        }
    })
}
export function useDevicesReference() {
    const apiRoute = "/devices"
    const Serial = useTableReference<DevicesEntry, "Serial">(apiRoute, "Serial")
    return { Serial }
}

export function useReportsDisplay() {
    const personnel = usePersonnelReference()

    return createDisplay<ReportsEntry>(REPORTS_STRUCTURE, {
        detailTitle: "Report",
        keys: {
            ID: {
                inputNode: numberInputNode()
            },
            Datetime: {
                inputNode: dateInputNode()
            },
            ResponsiblePersonnelID: {
                title: "Responsible personnel ID",
                inputNode: selectInputNode(personnel.ID)
            },
            Description: {
                inputNode: textInputNode()
            },
        }
    })
}
export function useReportsReference() {
    const apiRoute = "/reports"
    const ID = useTableReference<ReportsEntry, "ID">(apiRoute, "ID")
    return { ID }
}

export function useEngagedInmatesDisplay() {
    const reports = useReportsReference()
    const inmates = useInmatesReference()

    return createDisplay<EngagedInmatesEntry>(ENGAGED_INMATES_STRUCTURE, {
        tableTitle: "Engaged inmates",
        detailTitle: "Engaged inmate",
        keys: {
            ReportID: {
                title: "Report ID",
                inputNode: selectInputNode(reports.ID)
            },
            InmateNumber: {
                title: "Inmate number",
                inputNode: selectInputNode(inmates.Number)
            },
        }
    })
}
export function useEngagedInmatesReference() {
    const apiRoute = "/engaged-inmates"
    const ReportID = {
        values: useTableReference<EngagedInmatesEntry, "ReportID">(apiRoute, "ReportID"),
        filter: useTableReferenceFilter<EngagedInmatesEntry, "ReportID">("ReportID"),
    }
    const InmateNumber = useTableReference<EngagedInmatesEntry, "InmateNumber">(apiRoute, "InmateNumber", {
        fetchFilter: ReportID.filter.fetchFilter
    })
    return {
        ReportID: {
            values: ReportID.values,
            setValue: ReportID.filter.setValue
        },
        InmateNumber,
    }
}

export function useEngagedPersonnelDisplay() {
    const reports = useReportsReference()
    const personnel = usePersonnelReference()

    return createDisplay<EngagedPersonnelEntry>(ENGAGED_PERSONNEL_STRUCTURE, {
        tableTitle: "Engaged personnel",
        keys: {
            ReportID: {
                title: "Report ID",
                inputNode: selectInputNode(reports.ID)
            },
            PersonnelID: {
                title: "Personnel ID",
                inputNode: selectInputNode(personnel.ID)
            },
        }
    })
}
export function useEngagedPersonnelReference() {
    const apiRoute = "/engaged-personnel"
    const ReportID = {
        values: useTableReference<EngagedPersonnelEntry, "ReportID">(apiRoute, "ReportID"),
        filter: useTableReferenceFilter<EngagedPersonnelEntry, "ReportID">("ReportID"),
    }
    const PersonnelID = useTableReference<EngagedPersonnelEntry, "PersonnelID">(apiRoute, "PersonnelID", {
        fetchFilter: ReportID.filter.fetchFilter
    })
    return {
        ReportID: {
            values: ReportID.values,
            setValue: ReportID.filter.setValue
        },
        PersonnelID,
    }
}

export function useEngagedSectorsDisplay() {
    const reports = useReportsReference()
    const sectors = useSectorsReference()

    return createDisplay<EngagedSectorsEntry>(ENGAGED_SECTORS_STRUCTURE, {
        tableTitle: "Engaged sectors",
        detailTitle: "Engaged sector",
        keys: {
            ReportID: {
                title: "Report ID",
                inputNode: selectInputNode(reports.ID)
            },
            SectorID: {
                title: "Sector ID",
                inputNode: selectInputNode(sectors.ID)
            },
        }
    })
}
export function useEngagedSectorsReference() {
    const apiRoute = "/engaged-sectors"
    const ReportID = {
        values: useTableReference<EngagedSectorsEntry, "ReportID">(apiRoute, "ReportID"),
        filter: useTableReferenceFilter<EngagedSectorsEntry, "ReportID">("ReportID"),
    }
    const SectorID = useTableReference<EngagedSectorsEntry, "SectorID">(apiRoute, "SectorID", {
        fetchFilter: ReportID.filter.fetchFilter
    })
    return {
        ReportID: {
            values: ReportID.values,
            setValue: ReportID.filter.setValue
        },
        SectorID,
    }
}

export function useEngagedDevicesDisplay() {
    const reports = useReportsReference()
    const devices = useDevicesReference()

    return createDisplay<EngagedDevicesEntry>(ENGAGED_DEVICES_STRUCTURE, {
        tableTitle: "Engaged devices",
        detailTitle: "Engaged device",
        keys: {
            ReportID: {
                title: "Report ID",
                inputNode: selectInputNode(reports.ID)
            },
            DeviceSerial: {
                title: "Device serial",
                inputNode: selectInputNode(devices.Serial)
            },
        }
    })
}
export function useEngagedDevicesReference() {
    const apiRoute = "/engaged-devices"
    const ReportID = {
        values: useTableReference<EngagedDevicesEntry, "ReportID">(apiRoute, "ReportID"),
        filter: useTableReferenceFilter<EngagedDevicesEntry, "ReportID">("ReportID"),
    }
    const DeviceSerial = useTableReference<EngagedDevicesEntry, "DeviceSerial">(apiRoute, "DeviceSerial", {
        fetchFilter: ReportID.filter.fetchFilter
    })
    return {
        ReportID: {
            values: ReportID.values,
            setValue: ReportID.filter.setValue
        },
        DeviceSerial,
    }
}

export function useCouriersDisplay() {
    const freePeople = useFreePeopleReference()

    return createDisplay<CouriersEntry>(COURIERS_STRUCTURE, {
        detailTitle: "Courier",
        keys: {
            DocumentID: {
                title: "Document ID",
                inputNode: selectInputNode(freePeople.DocumentID)
            },
        }
    })
}
export function useCouriersReference() {
    const apiRoute = "/couriers"
    const DocumentID = useTableReference<CouriersEntry, "DocumentID">(apiRoute, "DocumentID")
    return { DocumentID }
}

export function useVehiclesDisplay() {
    const couriers = useCouriersReference()

    return createDisplay<VehiclesEntry>(VEHICLES_STRUCTURE, {
        detailTitle: "Vehicle",
        keys: {
            PlateNumber: {
                title: "Plate number",
                inputNode: stringInputNode()
            },
            CourierDocumentID: {
                title: "Courier document ID",
                inputNode: selectInputNode(couriers.DocumentID)
            },
        }
    })
}
export function useVehiclesReference() {
    const apiRoute = "/vehicles"
    const PlateNumber = useTableReference<VehiclesEntry, "PlateNumber">(apiRoute, "PlateNumber")
    return { PlateNumber }
}

export function useDeliveriesDisplay() {
    const goodsTypes = useEnumReference("GoodsTypes")
    const vehicles = useVehiclesReference()

    return createDisplay<DeliveriesEntry>(DELIVERIES_STRUCTURE, {
        detailTitle: "Delivery",
        keys: {
            Datetime: {
                inputNode: dateInputNode()
            },
            GoodsTypeID: {
                title: "Goods type",
                inputNode: selectInputNode(goodsTypes)
            },
            Quantity: {
                inputNode: numberInputNode()
            },
            VehiclePlateNumber: {
                title: "Vehicle plate number",
                inputNode: selectInputNode(vehicles.PlateNumber)
            },
        }
    })
}
export function useDeliveriesReference() {
    const apiRoute = "/deliveries"
    const Datetime = {
        values: useTableReference<DeliveriesEntry, "Datetime">(apiRoute, "Datetime"),
        filter: useTableReferenceFilter<DeliveriesEntry, "GoodsTypeID">("GoodsTypeID"),
    }
    const GoodsTypeID = useTableReference<DeliveriesEntry, "GoodsTypeID">(apiRoute, "GoodsTypeID", {
        fetchFilter: Datetime.filter.fetchFilter
    })
    return {
        Datetime: {
            values: Datetime.values,
            setValue: Datetime.filter.setValue,
        },
        GoodsTypeID,
    }
}

export function useActivitiesDisplay() {
    return createDisplay<ActivitiesEntry>(ACTIVITIES_STRUCTURE, {
        detailTitle: "Activity",
        keys: {
            ID: {
                inputNode: stringInputNode()
            },
            Description: {
                inputNode: stringInputNode()
            },
            Duration: {
                title: "Duration (minutes)",
                inputNode: numberInputNode()
            },
        }
    })
}
export function useActivitiesReference() {
    const apiRoute = "/activities"
    const ID = useTableReference<ActivitiesEntry, "ID">(apiRoute, "ID")
    return { ID }
}

export function useAvailabilitiesDisplay() {
    const securityLevels = useEnumReference("SecurityLevels")
    const activities = useActivitiesReference()

    return createDisplay<AvailabilitiesEntry>(AVAILABILITIES_STRUCTURE, {
        detailTitle: "Availability",
        keys: {
            SecurityLevelID: {
                title: "Security level",
                inputNode: selectInputNode(securityLevels)
            },
            ActivityID: {
                title: "Activity ID",
                inputNode: selectInputNode(activities.ID)
            },
        }
    })
}
export function useAvailabilitiesReference() {
    const apiRoute = "/availabilities"
    const SecurityLevelID = {
        values: useTableReference<AvailabilitiesEntry, "SecurityLevelID">(apiRoute, "SecurityLevelID"),
        filter: useTableReferenceFilter<AvailabilitiesEntry, "SecurityLevelID">("SecurityLevelID"),
    }
    const ActivityID = useTableReference<AvailabilitiesEntry, "ActivityID">(apiRoute, "ActivityID", {
        fetchFilter: SecurityLevelID.filter.fetchFilter
    })
    return {
        SecurityLevelID: {
            values: SecurityLevelID.values,
            setValue: SecurityLevelID.filter.setValue,
        },
        ActivityID,
    }
}

export function useZonesDisplay() {
    const sectors = useSectorsReference()

    return createDisplay<ZonesEntry>(ZONES_STRUCTURE, {
        detailTitle: "Zone",
        keys: {
            SectorID: {
                title: "Sector ID",
                inputNode: selectInputNode(sectors.ID)
            },
            Number: {
                inputNode: numberInputNode()
            },
            Name: {
                inputNode: stringInputNode()
            },
            Capacity: {
                inputNode: numberInputNode()
            },
        }
    })
}
export function useZonesReference() {
    const apiRoute = "/zones"
    const SectorID = {
        values: useTableReference<ZonesEntry, "SectorID">(apiRoute, "SectorID"),
        filter: useTableReferenceFilter<ZonesEntry, "SectorID">("SectorID"),
    }
    const Number = useTableReference<ZonesEntry, "Number">(apiRoute, "Number", {
        fetchFilter: SectorID.filter.fetchFilter
    })
    return {
        SectorID: {
            values: SectorID.values,
            setValue: SectorID.filter.setValue,
        },
        Number,
    }
}

export function useRoutinesDisplay() {
    const zones = useZonesReference()
    const activities = useActivitiesReference()

    return createDisplay<RoutinesEntry>(ROUTINES_STRUCTURE, {
        detailTitle: "Routine",
        keys: {
            Datetime: {
                inputNode: dateInputNode()
            },
            ZoneSectorID: {
                title: "Zone sector ID",
                inputNode: selectInputNode(zones.SectorID.values, { onChange: zones.SectorID.setValue })
            },
            ZoneNumber: {
                title: "Zone number",
                inputNode: selectInputNode(zones.Number)
            },
            ActivityID: {
                title: "Activity ID",
                inputNode: selectInputNode(activities.ID)
            },
        }
    })
}
export function useRoutinesReference() {
    const apiRoute = "/routines"
    const Datetime = {
        values: useTableReference<RoutinesEntry, "Datetime">(apiRoute, "Datetime"),
        filter: useTableReferenceFilter<RoutinesEntry, "Datetime">("Datetime"),
    }
    const ZoneSectorID = {
        values: useTableReference<RoutinesEntry, "ZoneSectorID">(apiRoute, "ZoneSectorID", {
            fetchFilter: Datetime.filter.fetchFilter
        }),
        filter: useTableReferenceFilter<RoutinesEntry, "ZoneSectorID">("ZoneSectorID"),
    }
    const ZoneNumber = useTableReference<RoutinesEntry, "ZoneNumber">(apiRoute, "ZoneNumber", {
        fetchFilter: ZoneSectorID.filter.fetchFilter
    })
    return {
        Datetime: {
            values: Datetime.values,
            setValue: Datetime.filter.setValue,
        },
        ZoneSectorID: {
            values: ZoneSectorID.values,
            setValue: ZoneSectorID.filter.setValue,
        },
        ZoneNumber,
    }
}

export function usePartecipationsDisplay() {
    const routines = useRoutinesReference()
    const sectors = useSectorsReference()

    return createDisplay<PartecipationsEntry>(PARTECIPATIONS_STRUCTURE, {
        detailTitle: "Partecipation",
        keys: {
            RoutineDatetime: {
                title: "Routine datetime",
                inputNode: selectInputNode(routines.Datetime.values, { onChange: routines.Datetime.setValue })
            },
            RoutineZoneSectorID: {
                title: "Routine zone sector ID",
                inputNode: selectInputNode(routines.ZoneSectorID.values, { onChange: routines.ZoneSectorID.setValue })
            },
            RoutineZoneNumber: {
                title: "Routine zone number",
                inputNode: selectInputNode(routines.ZoneNumber)
            },
            SectorID: {
                title: "Sector ID",
                inputNode: selectInputNode(sectors.ID)
            },
        }
    })
}
export function usePartecipationsReference() {
    const apiRoute = "/partecipations"
    const RoutineDatetime = {
        values: useTableReference<PartecipationsEntry, "RoutineDatetime">(apiRoute, "RoutineDatetime"),
        filter: useTableReferenceFilter<PartecipationsEntry, "RoutineDatetime">("RoutineDatetime"),
    }
    const RoutineZoneSectorID = {
        values: useTableReference<PartecipationsEntry, "RoutineZoneSectorID">(apiRoute, "RoutineZoneSectorID", {
            fetchFilter: RoutineDatetime.filter.fetchFilter
        }),
        filter: useTableReferenceFilter<PartecipationsEntry, "RoutineZoneSectorID">("RoutineZoneSectorID"),
    }
    const RoutineZoneNumber = {
        values: useTableReference<PartecipationsEntry, "RoutineZoneNumber">(apiRoute, "RoutineZoneNumber", {
            fetchFilter: RoutineZoneSectorID.filter.fetchFilter
        }),
        filter: useTableReferenceFilter<PartecipationsEntry, "RoutineZoneNumber">("RoutineZoneNumber"),
    }
    const SectorID = useTableReference<PartecipationsEntry, "SectorID">(apiRoute, "SectorID", {
        fetchFilter: RoutineZoneNumber.filter.fetchFilter
    })
    return {
        RoutineDatetime: {
            values: RoutineDatetime.values,
            setValue: RoutineDatetime.filter.setValue,
        },
        RoutineZoneSectorID: {
            values: RoutineZoneSectorID.values,
            setValue: RoutineZoneSectorID.filter.setValue,
        },
        RoutineZoneNumber: {
            values: RoutineZoneNumber.values,
            setValue: RoutineZoneNumber.filter.setValue,
        },
        SectorID,
    }
}

export function useSurveillancesDisplay() {
    const routines = useRoutinesReference()
    const personnel = usePersonnelReference()

    return createDisplay<SurveillancesEntry>(SURVEILLANCES_STRUCTURE, {
        detailTitle: "Surveillance",
        keys: {
            RoutineDatetime: {
                title: "Routine datetime",
                inputNode: selectInputNode(routines.Datetime.values, { onChange: routines.Datetime.setValue })
            },
            RoutineZoneSectorID: {
                title: "Routine zone sector ID",
                inputNode: selectInputNode(routines.ZoneSectorID.values, { onChange: routines.ZoneSectorID.setValue })
            },
            RoutineZoneNumber: {
                title: "Routine zone number",
                inputNode: selectInputNode(routines.ZoneNumber)
            },
            PersonnelID: {
                title: "Personnel ID",
                inputNode: selectInputNode(personnel.ID)
            },
        }
    })
}
export function useSurveillancesReference() {
    const apiRoute = "/surveillances"
    const RoutineDatetime = {
        values: useTableReference<SurveillancesEntry, "RoutineDatetime">(apiRoute, "RoutineDatetime"),
        filter: useTableReferenceFilter<SurveillancesEntry, "RoutineDatetime">("RoutineDatetime"),
    }
    const RoutineZoneSectorID = {
        values: useTableReference<SurveillancesEntry, "RoutineZoneSectorID">(apiRoute, "RoutineZoneSectorID", {
            fetchFilter: RoutineDatetime.filter.fetchFilter
        }),
        filter: useTableReferenceFilter<SurveillancesEntry, "RoutineZoneSectorID">("RoutineZoneSectorID"),
    }
    const RoutineZoneNumber = {
        values: useTableReference<SurveillancesEntry, "RoutineZoneNumber">(apiRoute, "RoutineZoneNumber", {
            fetchFilter: RoutineZoneSectorID.filter.fetchFilter
        }),
        filter: useTableReferenceFilter<SurveillancesEntry, "RoutineZoneNumber">("RoutineZoneNumber"),
    }
    const PersonnelID = useTableReference<SurveillancesEntry, "PersonnelID">(apiRoute, "PersonnelID", {
        fetchFilter: RoutineZoneNumber.filter.fetchFilter
    })
    return {
        RoutineDatetime: {
            values: RoutineDatetime.values,
            setValue: RoutineDatetime.filter.setValue,
        },
        RoutineZoneSectorID: {
            values: RoutineZoneSectorID.values,
            setValue: RoutineZoneSectorID.filter.setValue,
        },
        RoutineZoneNumber: {
            values: RoutineZoneNumber.values,
            setValue: RoutineZoneNumber.filter.setValue,
        },
        PersonnelID,
    }
}
