
import { Document, Model, Field, Primary } from '@agape/model'
import { Organization } from './organization.document';


@Model export class Event extends Document {

    @Primary id?: string

    @Field({ example: 'ACME' })
    orgCode: string;

    @Field
    organization: Organization    

    @Field({ example: 'Some Charitable Event'})
    name: string

    @Field({ example: new Date('2012-01-01 15:00:00') })
    timeStart: Date

    @Field({ example: new Date('2012-01-01 20:00:00') }) 
    timeEnd: Date

    @Field({ example: 'The Community Center' })
    locationName: string

    @Field({ example: '742 Evergreen Terrace' })
    locationAddress: string

    @Field({ example: '555 555 5555' })
     contactPhone: string

    @Field({ example: 'martin@example.com' }) 
    contactEmail: string

    @Field({ example: 'Please attend our charitable event.' })
    description: string

    constructor( params?: Partial<Pick<Event, keyof Event>>) {
        super()
        Object.assign( this, params )
    }

}