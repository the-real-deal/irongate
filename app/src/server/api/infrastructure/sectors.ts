import { SECTORS_STRUCTURE } from "../../../common/structures"
import { createCRUDRouter } from "../core/crud"

const sectorsRouter = createCRUDRouter("Sectors", SECTORS_STRUCTURE)
export default sectorsRouter
