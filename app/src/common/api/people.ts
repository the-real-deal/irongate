import { TableEntry } from "../db"
import { PeopleEntry } from "../structures"

export type FreeDocumentIDsEntry = TableEntry<{
    DocumentID: PeopleEntry["DocumentID"]
}>