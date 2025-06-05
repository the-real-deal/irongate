import { SxProps } from "@mui/joy/styles/types"
import { DBTablePageProps } from "../components/tables/DBTablePage"
import { TableEntry, TableRecord } from "../../common/db"
import { ChartsSlotProps } from "@mui/x-charts/internals"
import { ChartsTooltipSlotProps } from "@mui/x-charts"

export interface BaseProps {
    sx?: SxProps
}

export function tablePageViewProps<T extends TableEntry<TableRecord>>(): Partial<DBTablePageProps<T>> {
    return {
        search: false
    }
}

export function tableDetailsViewProps<T extends TableEntry<TableRecord>>(): Partial<DBTablePageProps<T>> {
    return {
        ...tablePageViewProps(),
        edit: false,
        remove: false,
        detailsLink: true,
        detailsBody: undefined,
        defaultDetails: true,
    }
}

export function chartSlotProps<T extends ChartsSlotProps & ChartsTooltipSlotProps>(): Partial<T> {
    return {
        tooltip: {
            sx: {
                backgroundColor: "background.level1"
            }
        }
    } as Partial<T>
}
