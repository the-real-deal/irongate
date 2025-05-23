import { Box, Typography } from "@mui/joy"
import TableView from "../../components/core/TableView"
import { PeopleEntry } from "../../api/tables/people"
import { MdFemale, MdMale } from "react-icons/md"

export default function PeoplePage() {
    return (
        <Box>
            <Typography level="h1">People</Typography>
            <TableView<PeopleEntry>
                structure={{
                    DocumentID: {
                        title: "Document ID"
                    },
                    Name: {},
                    Surname: {},
                    GenderID: {
                        title: "Gender",
                        map: (field) => field === 0 ? <MdMale /> : <MdFemale />
                    }
                }}
                data={[]}
            />
        </Box>
    )
}
