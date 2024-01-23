import { Enum, Field, ForeignKey, Model, Primary, Required, Text, View } from "@agape/model";
import { Facility } from "./facility";


export enum EmployeeStatus {
    Active = 'active',
    Disabled = 'disabled'
}


@Model export class Employee extends Document {

    @Primary
    @Field id: string

    @Required
    @Field number: string

    @Required
    @Field firstName: string

    @Required
    @Field lastName: string

    @Field birthdate: Date

    @Text
    @Field notes: string

    @Field facility: Facility

    @Required
    @Enum(EmployeeStatus)
    @Field status: EmployeeStatus

}

export interface EmployeeEditView extends Omit<Employee,'id'|'facility'> { }

@View(Employee, { omit: ['id','facility'] }) 
export class EmployeeEditView {
    @ForeignKey(Facility)
    @Field facility: string
}


console.log(">>",Model.descriptor(EmployeeEditView).field('facility'))
console.log(">>",Model.descriptor(EmployeeEditView).field('status'))