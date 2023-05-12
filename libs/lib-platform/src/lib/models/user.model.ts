import { Model, Field, Primary } from '@agape/model'



@Model export class User {

    @Primary id?: string

    @Field name: string

    @Field username: string

    @Field({ readable: false })
     password: string

}