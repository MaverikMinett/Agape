
import { Model } from '@agape/model'



@Model export class Event {

    id?: string

    name: string

    constructor( params: Partial<Pick<Event, keyof Event>>) {
        Object.assign( this, params )
    }

}