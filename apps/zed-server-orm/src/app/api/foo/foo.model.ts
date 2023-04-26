
import { Model } from '@agape/model'



@Model export class Foo {

    id: string

    name: string

    constructor( params: Partial<Pick<Foo, keyof Foo>>) {
        Object.assign( this, params )
    }

}