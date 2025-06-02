import { INMATES_STRUCTURE } from "../../../common/structures"
import { createCRUDRouter } from "../core/crud"

const inmatesRouter = createCRUDRouter("Inmates", INMATES_STRUCTURE)
export default inmatesRouter
