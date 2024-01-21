import { Field, Model, Primary } from "@agape/model";


export enum EmployeeStatus {
    Active = 'active',
    Disabled = 'disabled'
}


@Model export class Employee {

    @Primary
    @Field id: string

    @Field number: string

    @Field firstName: string

    @Field lastName: string

    @Field birthdate: Date

    @Field notes: string

    @Field status: EmployeeStatus

}

console.log("Hello world")
console.log(Model.descriptor(Employee).field('status').designType)