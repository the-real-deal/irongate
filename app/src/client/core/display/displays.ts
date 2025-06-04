import { ACTIVITIES_STRUCTURE, ActivitiesEntry, AVAILABILITIES_STRUCTURE, AvailabilitiesEntry, CELLS_STRUCTURE, CellsEntry, COURIERS_STRUCTURE, CouriersEntry, DELIVERIES_STRUCTURE, DeliveriesEntry, DEVICES_STRUCTURE, DevicesEntry, ENGAGED_DEVICES_STRUCTURE, ENGAGED_INMATES_STRUCTURE, ENGAGED_PERSONNEL_STRUCTURE, ENGAGED_SECTORS_STRUCTURE, EngagedDevicesEntry, EngagedInmatesEntry, EngagedPersonnelEntry, EngagedSectorsEntry, GUESTS_STRUCTURE, GuestsEntry, INMATES_STRUCTURE, InmatesEntry, MOVEMENTS_STRUCTURE, MovementsEntry, PARTECIPATIONS_STRUCTURE, PartecipationsEntry, PEOPLE_STRUCTURE, PeopleEntry, PERSONNEL_STRUCTURE, PersonnelEntry, REPORTS_STRUCTURE, ReportsEntry, ROUTINES_STRUCTURE, RoutinesEntry, SECTORS_STRUCTURE, SectorsEntry, SURVEILLANCES_STRUCTURE, SurveillancesEntry, VEHICLES_STRUCTURE, VehiclesEntry, VISITORS_STRUCTURE, VisitorsEntry, VISITS_STRUCTURE, VisitsEntry, ZONES_STRUCTURE, ZonesEntry } from "../../../common/structures"
import { useEnumReference } from "../hooks"
import { createDisplay, dateInputNode, numberInputNode, selectInputNode, stringInputNode, textInputNode } from "./tableDisplay"

export function usePeopleDisplay() {
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
                inputNode: selectInputNode(useEnumReference("Genders"))
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

export function useSectorsDisplay() {
    return createDisplay<SectorsEntry>(SECTORS_STRUCTURE, {
        detailTitle: "Sector",
        keys: {
            ID: {
                inputNode: stringInputNode()
            },
            Name: {
                inputNode: stringInputNode()
            },
            GenderID: {
                title: "Gender",
                inputNode: selectInputNode(useEnumReference("Genders"), { required: false })
            },
            SecurityLevelID: {
                title: "Security level",
                inputNode: selectInputNode(useEnumReference("SecurityLevels"))
            },
        }
    })
}

export function useCellsDisplay() {
    return createDisplay<CellsEntry>(CELLS_STRUCTURE, {
        detailTitle: "Cell",
        keys: {
            SectorID: {
                title: "Sector ID",
                inputNode: stringInputNode()
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

export function useInmatesDisplay() {
    return createDisplay<InmatesEntry>(INMATES_STRUCTURE, {
        detailTitle: "Inmate",
        keys: {
            Number: {
                inputNode: stringInputNode(),
            },
            DocumentID: {
                title: "Document ID",
                inputNode: stringInputNode()
            },
            IncarcerationDate: {
                title: "Incarceration date",
                inputNode: dateInputNode({ includeTime: false })
            },
            SentenceDuration: {
                title: "Sentence duration (months)",
                inputNode: numberInputNode()
            },
            CellSectorID: {
                title: "Cell sector ID",
                inputNode: stringInputNode()
            },
            CellNumber: {
                title: "Cell number",
                inputNode: numberInputNode()
            },
            CriminalRecord: {
                title: "Criminal record",
                inputNode: textInputNode()
            },
        }
    })
}

export function useMovementsDisplay() {
    return createDisplay<MovementsEntry>(MOVEMENTS_STRUCTURE, {
        detailTitle: "Movement",
        keys: {
            Datetime: {
                inputNode: dateInputNode()
            },
            InmateNumber: {
                title: "Inmate number",
                inputNode: stringInputNode()
            },
            CellSectorID: {
                title: "Cell sector ID",
                inputNode: stringInputNode()
            },
            CellNumber: {
                title: "Cell number",
                inputNode: numberInputNode()
            },
        }
    })
}

export function useGuestsDisplay() {
    return createDisplay<GuestsEntry>(GUESTS_STRUCTURE, {
        detailTitle: "Guest",
        keys: {
            DocumentID: {
                title: "Document ID",
                inputNode: stringInputNode()
            }
        }
    })
}

export function useVisitsDisplay() {
    return createDisplay<VisitsEntry>(VISITS_STRUCTURE, {
        detailTitle: "Visit",
        keys: {
            Datetime: {
                inputNode: dateInputNode()
            },
            InmateNumber: {
                title: "Inmate number",
                inputNode: stringInputNode()
            },
        }
    })
}

export function useVisitorsDisplay() {
    return createDisplay<VisitorsEntry>(VISITORS_STRUCTURE, {
        detailTitle: "Visitor",
        keys: {
            VisitDatetime: {
                title: "Visit datetime",
                inputNode: dateInputNode()
            },
            VisitInmateNumber: {
                title: "Visit inmate number",
                inputNode: stringInputNode()
            },
            GuestDocumentID: {
                title: "Guest document ID",
                inputNode: stringInputNode()
            },
        }
    })
}

export function usePersonnelDisplay() {
    return createDisplay<PersonnelEntry>(PERSONNEL_STRUCTURE, {
        keys: {
            ID: {
                inputNode: stringInputNode()
            },
            DocumentID: {
                title: "Document ID",
                inputNode: stringInputNode()
            },
            PersonnelTypeID: {
                title: "Personnel type",
                inputNode: selectInputNode(useEnumReference("PersonnelTypes"))
            },
            SectorID: {
                title: "Sector ID",
                inputNode: stringInputNode({ required: false })
            },
        }
    })
}

export function useDevicesDisplay() {
    return createDisplay<DevicesEntry>(DEVICES_STRUCTURE, {
        detailTitle: "Device",
        keys: {
            Serial: {
                inputNode: stringInputNode()
            },
            SectorID: {
                title: "Sector ID",
                inputNode: stringInputNode()
            },
            Number: {
                inputNode: numberInputNode()
            },
            DeviceTypeID: {
                title: "Device type",
                inputNode: selectInputNode(useEnumReference("DeviceTypes"))
            },
        }
    })
}

export function useReportsDisplay() {
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
                inputNode: stringInputNode()
            },
            Description: {
                inputNode: textInputNode()
            },
        }
    })
}

export function useEngagedInmatesDisplay() {
    return createDisplay<EngagedInmatesEntry>(ENGAGED_INMATES_STRUCTURE, {
        tableTitle: "Engaged inmates",
        detailTitle: "Engaged inmate",
        keys: {
            ReportID: {
                title: "Report ID",
                inputNode: numberInputNode()
            },
            InmateNumber: {
                title: "Inmate number",
                inputNode: stringInputNode()
            },
        }
    })
}

export function useEngagedPersonnelDisplay() {
    return createDisplay<EngagedPersonnelEntry>(ENGAGED_PERSONNEL_STRUCTURE, {
        tableTitle: "Engaged personnel",
        keys: {
            ReportID: {
                title: "Report ID",
                inputNode: numberInputNode()
            },
            PersonnelID: {
                title: "Personnel ID",
                inputNode: stringInputNode()
            },
        }
    })
}

export function useEngagedSectorsDisplay() {
    return createDisplay<EngagedSectorsEntry>(ENGAGED_SECTORS_STRUCTURE, {
        tableTitle: "Engaged sectors",
        detailTitle: "Engaged sector",
        keys: {
            ReportID: {
                title: "Report ID",
                inputNode: numberInputNode()
            },
            SectorID: {
                title: "Sector ID",
                inputNode: stringInputNode()
            },
        }
    })
}

export function useEngagedDevicesDisplay() {
    return createDisplay<EngagedDevicesEntry>(ENGAGED_DEVICES_STRUCTURE, {
        tableTitle: "Engaged devices",
        detailTitle: "Engaged device",
        keys: {
            ReportID: {
                title: "Report ID",
                inputNode: numberInputNode()
            },
            DeviceSerial: {
                title: "Device serial",
                inputNode: stringInputNode()
            },
        }
    })
}

export function useCouriersDisplay() {
    return createDisplay<CouriersEntry>(COURIERS_STRUCTURE, {
        detailTitle: "Courier",
        keys: {
            DocumentID: {
                title: "Document ID",
                inputNode: stringInputNode()
            },
        }
    })
}

export function useVehiclesDisplay() {
    return createDisplay<VehiclesEntry>(VEHICLES_STRUCTURE, {
        detailTitle: "Vehicle",
        keys: {
            PlateNumber: {
                title: "Plate number",
                inputNode: stringInputNode()
            },
            CourierDocumentID: {
                title: "Courier document ID",
                inputNode: stringInputNode()
            },
        }
    })
}

export function useDeliveriesDisplay() {
    return createDisplay<DeliveriesEntry>(DELIVERIES_STRUCTURE, {
        detailTitle: "Delivery",
        keys: {
            Datetime: {
                inputNode: dateInputNode()
            },
            GoodsTypeID: {
                title: "Goods type",
                inputNode: selectInputNode(useEnumReference("GoodsTypes"))
            },
            Quantity: {
                inputNode: numberInputNode()
            },
            VehiclePlateNumber: {
                title: "Vehicle plate number",
                inputNode: stringInputNode()
            },
        }
    })
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

export function useAvailabilitiesDisplay() {
    return createDisplay<AvailabilitiesEntry>(AVAILABILITIES_STRUCTURE, {
        detailTitle: "Availability",
        keys: {
            SecurityLevelID: {
                title: "Security level",
                inputNode: selectInputNode(useEnumReference("SecurityLevels"))
            },
            ActivityID: {
                title: "Activity ID",
                inputNode: stringInputNode()
            },
        }
    })
}

export function useZonesDisplay() {
    return createDisplay<ZonesEntry>(ZONES_STRUCTURE, {
        detailTitle: "Zone",
        keys: {
            SectorID: {
                title: "Sector ID",
                inputNode: stringInputNode()
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

export function useRoutinesDisplay() {
    return createDisplay<RoutinesEntry>(ROUTINES_STRUCTURE, {
        detailTitle: "Routine",
        keys: {
            Datetime: {
                inputNode: dateInputNode()
            },
            ZoneSectorID: {
                title: "Zone sector ID",
                inputNode: stringInputNode()
            },
            ZoneNumber: {
                title: "Zone number",
                inputNode: numberInputNode()
            },
            ActivityID: {
                title: "Activity ID",
                inputNode: stringInputNode()
            },
        }
    })
}

export function usePartecipationsDisplay() {
    return createDisplay<PartecipationsEntry>(PARTECIPATIONS_STRUCTURE, {
        detailTitle: "Partecipation",
        keys: {
            RoutineDatetime: {
                title: "Routine datetime",
                inputNode: dateInputNode()
            },
            RoutineZoneSectorID: {
                title: "Routine zone sector ID",
                inputNode: stringInputNode()
            },
            RoutineZoneNumber: {
                title: "Routine zone number",
                inputNode: numberInputNode()
            },
            SectorID: {
                title: "Sector ID",
                inputNode: stringInputNode()
            },
        }
    })
}

export function useSurveillancesDisplay() {
    return createDisplay<SurveillancesEntry>(SURVEILLANCES_STRUCTURE, {
        detailTitle: "Surveillance",
        keys: {
            RoutineDatetime: {
                title: "Routine datetime",
                inputNode: dateInputNode()
            },
            RoutineZoneSectorID: {
                title: "Routine zone sector ID",
                inputNode: stringInputNode()
            },
            RoutineZoneNumber: {
                title: "Routine zone number",
                inputNode: numberInputNode()
            },
            PersonnelID: {
                title: "Personnel ID",
                inputNode: stringInputNode()
            },
        }
    })
}
