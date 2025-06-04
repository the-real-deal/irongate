import ScrollFillBox from "../../../components/ScrollFillBox"
import { BaseProps } from "../../../core/utils"
import CouriersPage, { CouriersPageProps } from "../../routes/CouriersPage"
import VehiclesPage, { VehiclesPageProps } from "../../routes/VehiclesPage"

export interface CouriersAndVehiclesPageProps extends BaseProps {
    couriersPageProps?: CouriersPageProps
    vehiclesPageProps?: VehiclesPageProps
}

export default function CouriersAndVehiclesPage({
    couriersPageProps,
    vehiclesPageProps,
    sx,
}: CouriersAndVehiclesPageProps) {
    return (
        <ScrollFillBox sx={sx}>
            <CouriersPage {...couriersPageProps} />
            <VehiclesPage {...vehiclesPageProps} />
        </ScrollFillBox>
    )
}