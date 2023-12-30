
import { Model, Field, Primary, Document } from '@agape/model'

/* Organization Document */
@Model export class Organization extends Document {

    @Primary id: string

    @Field({ example: 'ACME' }) 
    code: string

    @Field({ example: 'Acme Charitable Corporation' })
    name: string

}

