/**
 * Describe a service method
 */
import { Exception } from '@agape/exception'


export class OperationDescriptor {

    ʘdescription: string

    ʘexceptions: Exception[]

    constructor( public name: string ) {

    }

    description(): string
    description( description: string ): this
    description( description?: string ) {        
        if ( description === undefined ) return this.ʘdescription
        this.ʘdescription = description
        return this
    }

    exceptions( ): Exception[]
    exceptions( ...exceptions: Exception[] ): this
    exceptions( ...exceptions: Exception[] ) {
        if ( exceptions.length === 0 ) {
            return this.ʘexceptions
        }

        this.ʘexceptions ??= []
        this.ʘexceptions.push(...exceptions)
        return this
    }
}
