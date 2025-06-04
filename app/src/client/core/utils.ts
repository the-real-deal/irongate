import { SxProps } from "@mui/joy/styles/types"
import { DBTablePageProps } from "../components/tables/DBTablePage"
import { TableEntry, TableRecord } from "../../common/db"

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
