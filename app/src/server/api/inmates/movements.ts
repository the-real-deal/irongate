import { MOVEMENTS_STRUCTURE } from "../../../common/structures"
import { createCRUDRouter } from "../core/crud"

const movementsRouter = createCRUDRouter("Movements", MOVEMENTS_STRUCTURE, {
    get: {
        orderBy: [{ column: "DateTime", direction: "DESC" }]
    }
})
export default movementsRouter
