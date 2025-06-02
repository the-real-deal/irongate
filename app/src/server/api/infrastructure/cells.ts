import { createCRUDRouter } from "../core/crud"
import { CELLS_STRUCTURE } from "../../../common/structures"

const cellsRouter = createCRUDRouter("Cells", CELLS_STRUCTURE)
export default cellsRouter
