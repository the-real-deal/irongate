import { CellsEntry, EnumEntry, EnumTable, InmatesEntry, MovementsEntry, PeopleEntry, SectorsEntry } from "../../../common/structures"
import { useEnumReference } from "../hooks"
import { adaptEnumDisplay, adaptKeyDisplay, createDisplay, dateInputNode, numberInputNode, selectInputNode, stringInputNode, textInputNode } from "./tableDisplay"

export function useEnumDisplay(table: EnumTable, title: string, required?: boolean) {
    const values = useEnumReference(table)

    return createDisplay<EnumEntry>(table, {
        ID: {
            title,
            inputNode: selectInputNode(values, { required })
        }
    })
}

export function useGendersDisplay(required?: boolean) {
    return useEnumDisplay("Genders", "Gender", required)
}

export function usePeopleDisplay() {
    const gendersDisplay = useGendersDisplay()

    return createDisplay<PeopleEntry>("People", {
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
        GenderID: adaptEnumDisplay(gendersDisplay),
        Birthday: {
            inputNode: dateInputNode({ includeTime: false }),
        },
        BirthPlace: {
            inputNode: stringInputNode(),
        }
    })
}

export function useSecurityLevelsDisplay() {
    return useEnumDisplay("SecurityLevels", "Security level")
}

export function useSectorsDisplay() {
    const gendersDisplay = useGendersDisplay(false)
    const securityLevelsDisplay = useSecurityLevelsDisplay()

    return createDisplay<SectorsEntry>("Sectors", {
        ID: {
            inputNode: stringInputNode()
        },
        Name: {
            inputNode: stringInputNode()
        },
        GenderID: adaptEnumDisplay(gendersDisplay),
        SecurityLevelID: adaptEnumDisplay(securityLevelsDisplay)
    })
}

export function useCellsDisplay() {
    const sectorsDisplay = useSectorsDisplay()

    return createDisplay<CellsEntry>("Cells", {
        SectorID: {
            ...adaptKeyDisplay(sectorsDisplay, "ID"),
            title: "Sector",
        },
        Number: {
            inputNode: numberInputNode()
        },
        Capacity: {
            inputNode: numberInputNode()
        },
    })
}

export function useInmatesDisplay() {
    const cellsDisplay = useCellsDisplay()

    return createDisplay<InmatesEntry>("Inmates", {
        Number: {
            inputNode: stringInputNode(),
        },
        DocumentID: adaptKeyDisplay(usePeopleDisplay(), "DocumentID"),
        IncarcerationDate: {
            title: "Incarceration date",
            inputNode: dateInputNode({ includeTime: false })
        },
        SentenceDuration: {
            title: "Sentence duration",
            inputNode: numberInputNode()
        },
        CriminalRecord: {
            title: "Criminal record",
            inputNode: textInputNode()
        },
        CellSectorID: {
            ...adaptKeyDisplay(cellsDisplay, "SectorID"),
            title: "Cell sector"
        },
        CellNumber: {
            ...adaptKeyDisplay(cellsDisplay, "Number"),
            title: "Cell number"
        },
    })
}

export function useMovementsDisplay() {
    const inmatesDisplay = useInmatesDisplay()
    const cellsDisplay = useCellsDisplay()

    return createDisplay<MovementsEntry>("Movements", {
        DateTime: {
            inputNode: dateInputNode()
        },
        InmateNumber: {
            ...adaptKeyDisplay(inmatesDisplay, "Number"),
            title: "Inmate number"
        },
        CellSectorID: {
            ...adaptKeyDisplay(cellsDisplay, "SectorID"),
            title: "Cell sector"
        },
        CellNumber: {
            ...adaptKeyDisplay(cellsDisplay, "Number"),
            title: "Cell number"
        },
    })
}
