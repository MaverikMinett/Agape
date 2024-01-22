import { Enum, Field, Model, Primary, Required, View } from "@agape/model";


export enum FacilityStatus {
    Active = 'active',
    Inactive = 'inactive'
}


@Model export class Facility {
    @Primary id: string

    @Required
    @Field label: string

    @Required
    @Field({min: 0}) stations: number

    @Required
    @Enum(FacilityStatus)
    @Field status: FacilityStatus

}



export interface FacilityEditView extends Omit<Facility, 'id'> { }

@View(Facility, { omit: ['id'] }) 
export class FacilityEditView {

}