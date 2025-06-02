import { createCRUDRouter } from "./core/crud"
import { PEOPLE_STRUCTURE } from "../../common/structures"

const peopleRouter = createCRUDRouter("People", PEOPLE_STRUCTURE)
export default peopleRouter
