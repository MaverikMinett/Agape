
import { Model, Document } from '@agape/model'



@Model export class Foo extends Document {

    id: string

    name: string

    constructor( params: Partial<Pick<Foo, keyof Foo>>) {
        super()
        Object.assign( this, params )
    }

}