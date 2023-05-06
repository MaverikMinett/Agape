
import { Model, Field, Primary } from '@agape/model'



@Model export class Event {

    @Primary id?: string

    @Field name: string

    constructor( params: Partial<Pick<Event, keyof Event>>) {
        Object.assign( this, params )
    }

}