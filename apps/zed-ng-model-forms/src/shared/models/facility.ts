import { Enum, Field, Model, Primary } from "@agape/model";


export enum FacilityStatus {
    Active = 'active',
    Inactive = 'inactive'
}


@Model export class Facility {
    @Primary id: string

    @Field label: string

    @Enum(FacilityStatus)
    @Field status: FacilityStatus

    @Field({min: 0}) stations: number
}