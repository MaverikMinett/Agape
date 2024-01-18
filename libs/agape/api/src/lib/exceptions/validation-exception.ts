import { Exception } from "@agape/exception";
import { Field, Model } from "@agape/model";
import { ErrorReport } from '@agape/alchemy'

@Model export class ValidationException<T> extends Exception {

    @Field status: number

    @Field message: string

    @Field error: ErrorReport<T>

    constructor( message: string, error: ErrorReport<T> )
    constructor( error: ErrorReport<T> ) 
    constructor( ...args: any[] ) {
        let message: string
        let error: ErrorReport<T>
        if ( args.length === 1 ) {
            [error] = args
            message = 'Validation error'
        }
        else {
            [message, error] = args
        }
        super(400, message)
        this.error = error
    }

}
