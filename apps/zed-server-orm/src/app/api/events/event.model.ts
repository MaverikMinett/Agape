
import { Model, Field } from '@agape/model'



@Model export class Event {

    @Field({ primary: true }) id?: string

    @Field name: string

    constructor( params: Partial<Pick<Event, keyof Event>>) {
        Object.assign( this, params )
    }

}