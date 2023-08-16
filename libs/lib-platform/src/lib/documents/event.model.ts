
import { Document, Model, Field, Primary } from '@agape/model'



@Model export class Event extends Document {

    @Primary id?: string

    @Field name: string

    @Field timeStart: Date

    @Field timeEnd: Date

    @Field locationName: string

    @Field locationAddress: string

    @Field contactPhone: string

    @Field contactEmail: string

    @Field description: string

    constructor( params?: Partial<Pick<Event, keyof Event>>) {
        super()
        Object.assign( this, params )
    }

}