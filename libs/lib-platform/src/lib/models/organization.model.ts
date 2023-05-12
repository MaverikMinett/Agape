import { Model, Field, Primary } from '@agape/model'





@Model export class Organization {
    
    @Primary id?: string

    @Field name: string

    @Field code: string
}