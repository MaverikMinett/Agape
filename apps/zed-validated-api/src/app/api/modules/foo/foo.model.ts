
import { Model, Document, Field } from '@agape/model'



@Model export class Foo extends Document {

    id: string

    name: string

    constructor( params: Partial<Pick<Foo, keyof Foo>>) {
        super()
        Object.assign( this, params )
    }

}


@Model export class FooResponse {
    @Field({ example: "pong"}) 
    message: string;
}