import { Document, Model, Field, Primary } from '@agape/model'



@Model export class Organization extends Document {
    
    @Primary id?: string

    @Field name: string

    @Field code: string

}