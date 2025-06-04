import ScrollFillBox from "../../../components/ScrollFillBox"
import { BaseProps } from "../../../core/utils"
import GuestsPage, { GuestsPageProps } from "../../routes/GuestsPage"
import VisitsPage, { VisitsPageProps } from "../../routes/VisitsPage"

export interface VisitsAndGuestsPageProps extends BaseProps {
    visitsPageProps?: VisitsPageProps
    guestsPageProps?: GuestsPageProps
}

export default function VisitsAndGuestsPage({
    visitsPageProps,
    guestsPageProps,
    sx,
}: VisitsAndGuestsPageProps) {
    return (
        <ScrollFillBox sx={sx}>
            <VisitsPage {...visitsPageProps} />
            <GuestsPage {...guestsPageProps} />
        </ScrollFillBox>
    )
}